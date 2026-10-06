import { k5Course } from "./base";

/**
 * soc-k: Kindergarten social studies with Ranger Clark. Six lessons, written
 * for the ear (everything is read aloud): me and my family, rules, needs and
 * wants, jobs and helpers, maps of my room, American symbols and holidays.
 */
export const socK = k5Course("soc", 0, [
  // 1. Me and my family
  {
    id: "soc-k.me-family",
    title: "Me and My Family",
    minutes: 15,
    stage: "grammar",
    standards: ["SS.K.1", "SS.K.8", "D2.His.1.K-2", "D2.His.2.K-2"],
    read: [
      "Howdy, explorer! I am Ranger Clark. Today we learn about you!",
      "You are one of a kind. You have a name. You have a birthday, the day you were born. You like some foods and games best. No one else is just like you.",
      "You are part of a family. A family is the people who love you and care for you. Families can be big or small. A family may have a mom and a dad, brothers and sisters, and grandmas and grandpas.",
      "Families help each other. Dad may cook dinner. Mom may read a story. You can help too! You can set the table or feed the dog.",
      "You are growing up. Long ago, in the past, you were a tiny baby. Now, in the present, you can run, talk and draw. In the future, you will be even bigger. The past is before. The present is now. The future is later.",
    ].join("\n\n"),
    keyIdeas: [
      "You are one of a kind, with your own name and birthday.",
      "A family is the people who love you and care for you, and family members help each other.",
      "The past is before, the present is now, and the future is later.",
    ],
    hook: {
      text: "Howdy, explorer! Every good trip starts at home. Today we explore a very special place. It's you and your family!",
    },
    teach: [
      {
        title: "All About Me",
        teach:
          "You are one of a kind. You have your own name. You have a birthday. That is the day you were born. You have two hands and a big smile. You like some foods best. You like some games best. Your friend may like other things. That is fine! No one else in the whole world is just like you. Can you say your name out loud?",
        visual: {
          type: "flip",
          cards: [
            { front: "📛 Name", back: "What people call you." },
            { front: "🎂 Birthday", back: "The day you were born. We celebrate it each year!" },
            { front: "🌟 One of a kind", back: "No one else is just like you." },
          ],
        },
        probe: {
          type: "cloze",
          text: "The day you were born is your {0}. 🎂 What people call you is your {1}. 📛",
          blanks: [{ answers: ["birthday"] }, { answers: ["name"] }],
          bank: ["birthday", "name", "lunch", "shoe"],
          hint: "A birthday has cake 🎂. A name tag 📛 shows what people call you.",
          mistakes: [
            { match: "lunch", coach: "Lunch is a meal. Which word means the day you were born?" },
            { match: "shoe", coach: "A shoe goes on your foot. Which word tells what people call you?" },
          ],
          seconds: 30,
        },
        think: {
          q: "What is a birthday?",
          choices: ["The first day of school", "The day you were born", "The day you lost a tooth"],
          answer: 1,
          why: "Your birthday is the day you were born. We celebrate it every year.",
          hints: [
            "School starts each fall. A birthday is about the day you were born.",
            "",
            "Losing a tooth is exciting, but a birthday is the day you were born.",
          ],
        },
        approaches: {
          analogy: "You are like a snowflake. ❄️ Every snowflake has its own shape. No two snowflakes are the same, and no two kids are either.",
          example: "Meet Sam. His name is Sam. His birthday is in May. 🎂 He likes apples and tag. That is all about Sam!",
          simpler: {
            q: "Is anyone else just like you?",
            choices: ["No, I am one of a kind", "Yes, lots of kids"],
            answer: 0,
            why: "No one else in the world is just like you.",
            hints: ["", "Other kids may look a bit like you, but no one is just the same as you."],
          },
        },
      },
      {
        title: "My Family",
        teach:
          "A family is the people who love you and care for you. Families can be big or small. A family may have a mom and a dad. It may have brothers and sisters. It may have grandmas and grandpas too. Families help each other. Dad may cook dinner. Mom may read a story. You can help too! You can set the table. You can feed the dog.",
        visual: {
          type: "hotspots",
          title: "A family helps each other",
          center: "🏠 Home",
          spots: [
            { label: "Dad", icon: "👨", detail: "Dad may cook dinner." },
            { label: "Mom", icon: "👩", detail: "Mom may read a story." },
            { label: "Grandma", icon: "👵", detail: "Grandma may bake cookies with you." },
            { label: "Me", icon: "🧒", detail: "I can set the table or feed the dog!" },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Does this help your family?",
          buckets: ["👍 Helps", "👎 Does not help"],
          items: [
            { text: "🍽️ Set the table", bucket: 0 },
            { text: "🐶 Feed the dog", bucket: 0 },
            { text: "🧸 Put toys away", bucket: 0 },
            { text: "😠 Yell at your sister", bucket: 1 },
            { text: "🧦 Throw socks on the floor", bucket: 1 },
          ],
          hint: "Ask: does this make home nicer for everyone?",
          mistakes: [{ match: "😠 Yell at your sister", coach: "Yelling makes people sad. Helping makes home nicer." }],
          seconds: 45,
        },
        think: {
          q: "What does a family do?",
          choices: ["Only eats lunch together", "Lives at the zoo", "Loves you and cares for you"],
          answer: 2,
          why: "A family is the people who love you and care for you.",
          hints: [
            "Families do eat together, but they do much more. They love and care for you.",
            "Animals live at the zoo! A family is the people who love and care for you.",
            "",
          ],
        },
        approaches: {
          analogy: "A family is like a team. ⚽ Everyone on a team helps. When one person needs help, the others pitch in.",
          example: "Ana's family is busy at dinner time. Dad cooks the soup. Mom pours the milk. Ana sets out the spoons. 🥄 Everyone helps!",
          simpler: {
            q: "Can a kid help the family?",
            choices: ["Yes, like setting the table", "No, kids can't help"],
            answer: 0,
            why: "Kids can help in lots of ways, like setting the table or feeding the dog.",
            hints: ["", "Even little kids can help! You can put toys away or feed the dog."],
          },
        },
      },
      {
        title: "Past, Present, Future",
        teach:
          "You are growing! Long ago, you were a tiny baby. That was the past. The past is before. Now you can run and talk and draw. That is the present. The present is now. Someday you will be even bigger. That is the future. The future is later. Past, present, future. Before, now, later. Your whole life is a story in order!",
        visual: {
          type: "compare",
          left: { title: "👶 Then (the past)", points: ["Drank from a bottle", "Crawled on the floor", "Said goo-goo"] },
          right: { title: "🧒 Now (the present)", points: ["Eat with a fork", "Run and jump", "Talk and sing"] },
        },
        probe: {
          type: "sequence",
          prompt: "Put these in order, from first to last.",
          steps: ["👶 A baby", "🧸 A toddler learning to walk", "🧒 A kid at school", "🧑 A grown-up"],
          hint: "Start with the smallest. Everyone starts as a baby!",
          mistakes: [{ match: "🧑 A grown-up", coach: "A grown-up comes last. First you are a baby." }],
          seconds: 40,
        },
        think: {
          q: "When you were a baby, was that the past or the future?",
          choices: ["The future", "The past", "The present"],
          answer: 1,
          why: "Being a baby happened before, so it is the past.",
          hints: [
            "The future is later. Being a baby already happened.",
            "",
            "The present is right now. You are not a baby now.",
          ],
        },
        approaches: {
          analogy: "Your life is like a book. 📖 The pages you already read are the past. The page you are on is the present. The pages still to come are the future.",
          example: "Yesterday I ate pancakes. 🥞 That is the past. Today I am eating eggs. That is the present. Tomorrow I will eat toast. That is the future.",
          simpler: {
            q: "Which word means now?",
            choices: ["Past", "Present"],
            answer: 1,
            why: "The present is now.",
            hints: ["The past is before. Which word means now?", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "When I was a baby, or now?",
      buckets: ["👶 When I was a baby (past)", "🧒 Now (present)"],
      items: [
        { text: "🍼 Drank from a bottle", bucket: 0 },
        { text: "🛏️ Slept in a crib", bucket: 0 },
        { text: "🐛 Crawled on the floor", bucket: 0 },
        { text: "🏃 Run and jump", bucket: 1 },
        { text: "🖍️ Draw pictures", bucket: 1 },
        { text: "🗣️ Talk in sentences", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Tell Ranger Clark about you and your family. Who is in your family? How do you help? What could you do as a baby, and what can you do now?",
      keyPoints: [
        "Says their name or something about themselves",
        "Names people in their family",
        "Tells one way family members help each other",
        "Tells something from the past (as a baby) and something now",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each word to its picture.",
        pairs: [
          { left: "Birthday", right: "🎂" },
          { left: "Baby", right: "👶" },
          { left: "Grandpa", right: "👴" },
          { left: "Home", right: "🏠" },
        ],
        hint: "Listen to each word. Which picture shows it?",
        seconds: 40,
      },
      {
        type: "sequence",
        prompt: "Put Sam's day in order.",
        steps: ["🌅 Wake up", "🥣 Eat breakfast", "🛝 Play outside", "🛏️ Go to bed"],
        hint: "What do you do first thing in the morning? What do you do last at night?",
        seconds: 40,
      },
      {
        type: "cloze",
        text: "Before is the {0}. Now is the {1}. Later is the {2}.",
        blanks: [{ answers: ["past"] }, { answers: ["present"] }, { answers: ["future"] }],
        bank: ["past", "present", "future", "lunch"],
        hint: "Past is before, present is now, future is later.",
        mistakes: [{ match: "lunch", coach: "Lunch is a meal, not a time word. Try past, present or future." }],
        seconds: 35,
      },
      {
        type: "number",
        prompt: "Count the people in this family: 👩 👨 👧 👦 👶. How many?",
        answer: 5,
        hint: "Touch each person as you count: one, two, three...",
        mistakes: [{ match: "4", coach: "Don't forget the baby! Count again." }],
        seconds: 20,
      },
    ],
    check: [
      {
        q: "What is a family?",
        choices: ["The people who love you and care for you", "Kids in a race", "Animals on a farm"],
        answer: 0,
        why: "A family is the people who love you and care for you.",
      },
      {
        q: "Which is a way to help your family?",
        choices: ["Leave toys on the stairs", "Set the table", "Yell at dinner"],
        answer: 1,
        why: "Setting the table helps everyone get ready to eat.",
      },
      {
        q: "When you were a tiny baby, was that the past, present or future?",
        choices: ["Future", "Present", "Past"],
        answer: 2,
        why: "Being a baby happened before. Before is the past.",
      },
      {
        q: "What comes first?",
        choices: ["Eat breakfast", "Go to bed", "Wake up"],
        answer: 2,
        why: "First you wake up, then you eat breakfast. Bed comes last.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Draw a picture of your family. Then tell a grown-up each person's name and one way they help at home.",
      rubric: [
        "Draws the people in their family",
        "Says each person's name",
        "Tells one way each person helps at home",
      ],
    },
  },

  // 2. Rules and good citizens
  {
    id: "soc-k.rules",
    title: "Rules Keep Us Safe",
    minutes: 15,
    stage: "logic",
    standards: ["SS.K.2", "D2.Civ.3.K-2", "D2.Civ.7.K-2", "D2.Civ.8.K-2", "D2.Civ.9.K-2"],
    read: [
      "A rule tells us what to do. Rules keep us safe. Rules help us be fair. Rules help us get along.",
      "We have rules at home. Hold a grown-up's hand when you cross the street. Wash your hands before you eat. Put your toys away. Mom and Dad make the rules at home.",
      "We have rules at school too. Raise your hand to talk. Walk inside. Wait your turn in line. The teacher makes the rules at school.",
      "Some rules are for the whole town or country. These rules are called laws. Cars must stop at a red light. That is a law. Leaders make laws to keep everyone safe.",
      "A citizen is a member of a town or a country. A good citizen follows the rules, even when no one is looking. A good citizen is kind and honest. Honest means you tell the truth. A good citizen listens and takes turns.",
    ].join("\n\n"),
    keyIdeas: [
      "Rules keep us safe, help us be fair and help us get along.",
      "Parents make rules at home, teachers make rules at school, and leaders make laws.",
      "A good citizen follows the rules and is kind, honest and fair.",
    ],
    hook: {
      text: "Picture a soccer game with no rules. Everyone grabs the ball and runs every which way! Would that be fun or fair? Let's find out why we need rules.",
    },
    teach: [
      {
        title: "What Is a Rule?",
        teach:
          "A rule tells us what to do. Rules keep us safe. Rules help us be fair. Rules help us get along. Here is a rule. Hold a grown-up's hand when you cross the street. Why? It keeps you safe from cars! Here is another rule. Take turns on the slide. Why? So everyone gets a fair turn. Every good rule has a reason.",
        visual: {
          type: "flip",
          cards: [
            { front: "📏 Rule", back: "Tells us what to do." },
            { front: "🦺 Safe", back: "Nobody gets hurt." },
            { front: "⚖️ Fair", back: "Everyone gets a turn." },
            { front: "🤝 Get along", back: "We play and work together nicely." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each rule to its reason.",
          pairs: [
            { left: "🚸 Hold hands to cross the street", right: "Keeps you safe from cars" },
            { left: "🛝 Take turns on the slide", right: "So it is fair for everyone" },
            { left: "🧼 Wash hands before you eat", right: "Washes away germs" },
          ],
          hint: "Ask: why do we have this rule? Is it about cars, germs or being fair?",
          mistakes: [{ match: "Washes away germs", coach: "Soap and water wash away germs. Which rule uses soap?" }],
          seconds: 45,
        },
        think: {
          q: "Why do we take turns on the slide?",
          choices: ["So it is fair for everyone", "So the slide gets wet", "So we can go home"],
          answer: 0,
          why: "Taking turns means everyone gets a fair chance to slide.",
          hints: [
            "",
            "Water makes a slide wet. Turns are about being fair to every kid.",
            "Taking turns is not about going home. It lets every kid have a fair chance.",
          ],
        },
        approaches: {
          analogy: "Rules are like the lines on a road. 🛣️ The lines tell cars where to go, so they don't bump. Rules tell us what to do, so nobody gets hurt.",
          example: "Five kids want the swing. With no rule, they push and shove. With a rule, each kid counts to 20 and then it's the next kid's turn. Now everyone gets to swing!",
          simpler: {
            q: "Do rules help keep us safe?",
            choices: ["No, rules don't matter", "Yes, rules keep us safe"],
            answer: 1,
            why: "Many rules, like holding hands to cross the street, keep us safe.",
            hints: ["Think about crossing a street. A rule helps keep you safe from cars.", ""],
          },
        },
      },
      {
        title: "Who Makes the Rules?",
        teach:
          "We have rules at home. Put your toys away. Wash your hands before you eat. Mom and Dad make the rules at home. We have rules at school too. Raise your hand to talk. Walk, don't run, inside. The teacher makes the rules at school. Some rules are for the whole town or country. These rules are called laws. Cars must stop at a red light. That is a law. Leaders make the laws.",
        visual: {
          type: "compare",
          left: { title: "🏠 Home rules", points: ["Put your toys away", "Wash your hands before you eat", "Mom and Dad make them"] },
          right: { title: "🏫 School rules", points: ["Raise your hand to talk", "Walk inside", "The teacher makes them"] },
        },
        probe: {
          type: "sort",
          prompt: "Who makes this rule?",
          buckets: ["👪 Mom and Dad", "🍎 The teacher", "🏛️ Leaders (laws)"],
          items: [
            { text: "🛏️ Bedtime is at 8 o'clock", bucket: 0 },
            { text: "🪥 Brush your teeth before bed", bucket: 0 },
            { text: "✋ Raise your hand in class", bucket: 1 },
            { text: "🏫 Line up for recess", bucket: 1 },
            { text: "🚦 Cars stop at a red light", bucket: 2 },
          ],
          hint: "Home rules come from Mom and Dad. Class rules come from the teacher. Laws for everyone come from leaders.",
          mistakes: [{ match: "🚦 Cars stop at a red light", coach: "That rule is for every driver in the town. It is a law, made by leaders." }],
          seconds: 50,
        },
        think: {
          q: "Who makes the rules at school?",
          choices: ["The bus", "The kids at recess", "The teacher"],
          answer: 2,
          why: "The teacher is in charge of the class and makes the school rules.",
          hints: [
            "A bus can't make rules! Who is in charge of your class?",
            "Kids follow school rules. The grown-up in charge of the class makes them.",
            "",
          ],
        },
        approaches: {
          analogy: "Each place has a captain. 🧢 At home, the captains are Mom and Dad. At school, the captain is the teacher. For the whole town, the captains are leaders who make laws.",
          example: "At home, Dad says, \"Shoes off at the door.\" That is a home rule. At school, the teacher says, \"Raise your hand.\" That is a school rule. On the road, every car stops at a red light. That is a law.",
          simpler: {
            q: "Who makes the rules at home?",
            choices: ["Mom and Dad", "The dog"],
            answer: 0,
            why: "Parents are in charge at home, so they make the home rules.",
            hints: ["", "A dog can't make rules! Who is in charge at your house?"],
          },
        },
      },
      {
        title: "Being a Good Citizen",
        teach:
          "A citizen is a member of a town or country. A good citizen follows the rules. A good citizen is kind and honest. Honest means you tell the truth. A good citizen follows the rules even when no one is looking. In a group, a good citizen listens. They wait their turn to talk. They share and help. You can be a good citizen today!",
        visual: {
          type: "hotspots",
          title: "A good citizen is...",
          center: "🧒 Me",
          spots: [
            { label: "Kind", icon: "💛", detail: "Says nice words and helps others." },
            { label: "Honest", icon: "🗣️", detail: "Tells the truth, even when it's hard." },
            { label: "Fair", icon: "⚖️", detail: "Takes turns and shares." },
            { label: "A good listener", icon: "👂", detail: "Listens when others talk and waits for a turn." },
          ],
        },
        probe: {
          type: "cloze",
          text: "A good citizen tells the {0}. A good citizen waits for a {1}. A good citizen is {2} to others.",
          blanks: [{ answers: ["truth"] }, { answers: ["turn"] }, { answers: ["kind"] }],
          bank: ["truth", "turn", "kind", "fib", "mean"],
          hint: "Good citizens are honest, fair and kind.",
          mistakes: [
            { match: "fib", coach: "A fib is not true. Honest people tell the truth." },
            { match: "mean", coach: "Being mean hurts people. A good citizen is kind." },
          ],
          seconds: 40,
        },
        think: {
          q: "You find a toy that is not yours. What does a good citizen do?",
          choices: ["Hide it in a pocket", "Give it back to its owner", "Throw it away"],
          answer: 1,
          why: "A good citizen is honest and gives things back to their owners.",
          hints: [
            "Keeping it is not honest. The toy belongs to someone else.",
            "",
            "Throwing it away is not fair to the owner. They want it back!",
          ],
        },
        approaches: {
          analogy: "A good citizen is like a good teammate. 🏀 A good teammate plays fair, cheers for others and follows the rules of the game, even when the coach isn't watching.",
          example: "Leo drops his crayon. Mia picks it up and hands it back. Then she waits her turn to talk at circle time. Mia is a good citizen!",
          simpler: {
            q: "Is telling the truth honest?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Honest means telling the truth.",
            hints: ["", "Honest means you tell the truth. So telling the truth is honest!"],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Is this a good citizen?",
      buckets: ["👍 Good citizen", "👎 Not a good citizen"],
      items: [
        { text: "🗣️ Tell the truth", bucket: 0 },
        { text: "👂 Listen when a friend talks", bucket: 0 },
        { text: "🖍️ Share the crayons", bucket: 0 },
        { text: "🙊 Tell a fib", bucket: 1 },
        { text: "🏃 Cut in line", bucket: 1 },
        { text: "🗑️ Drop trash on the ground", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Tell Ranger Clark one rule you follow at home. Why do we have that rule? How can you be a good citizen?",
      keyPoints: [
        "Names a real rule",
        "Explains that the rule keeps us safe or fair",
        "Tells who makes the rule (parents, teacher or leaders)",
        "Names a good citizen habit like kind, honest or taking turns",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Rules keep us {0}. Rules help us be {1}.",
        blanks: [{ answers: ["safe"] }, { answers: ["fair"] }],
        bank: ["safe", "fair", "sleepy", "loud"],
        hint: "Rules stop people from getting hurt, and they give everyone a turn.",
        mistakes: [{ match: "sleepy", coach: "Rules don't make us sleepy! They keep us safe and fair." }],
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each rule to what kind of rule it is.",
        pairs: [
          { left: "🚦 Stop at a red light", right: "A law for everyone" },
          { left: "✋ Raise your hand to talk", right: "A school rule" },
          { left: "🛏️ Bedtime at 8 o'clock", right: "A home rule" },
        ],
        hint: "Laws are for the whole town. School rules are for class. Home rules are for your house.",
        seconds: 40,
      },
      {
        type: "sequence",
        prompt: "Put the steps in order to cross the street safely.",
        steps: ["🛑 Stop at the curb", "👀 Look both ways for cars", "🚶 Walk across with a grown-up"],
        hint: "First stop. Then look. Then walk.",
        seconds: 30,
      },
      {
        type: "number",
        prompt: "Five kids take turns on the slide. 🛝 Each kid gets one turn. How many turns in all?",
        answer: 5,
        hint: "One kid, one turn. Count the kids!",
        mistakes: [{ match: "1", coach: "Each kid gets a turn, not just one kid. Count all five." }],
        seconds: 20,
      },
    ],
    check: [
      {
        q: "Why do we have rules?",
        choices: ["To make us sad", "To keep us safe and fair", "To make noise"],
        answer: 1,
        why: "Rules keep us safe, help us be fair and help us get along.",
      },
      {
        q: "Who makes the rules at home?",
        choices: ["Mom and Dad", "The mail carrier", "The cat"],
        answer: 0,
        why: "Parents are in charge at home and make the home rules.",
      },
      {
        q: "What is a rule for the whole town or country called?",
        choices: ["A song", "A game", "A law"],
        answer: 2,
        why: "A rule for everyone in a town or country is called a law.",
      },
      {
        q: "What does honest mean?",
        choices: ["Running fast", "Telling the truth", "Being loud"],
        answer: 1,
        why: "Honest means you tell the truth.",
      },
    ],
    task: {
      kind: "project",
      prompt: "With a grown-up, make three family rules. Draw a picture for each rule. Tell why each rule is a good one.",
      rubric: [
        "Makes three rules with a grown-up",
        "Draws a picture for each rule",
        "Tells why each rule keeps people safe or fair",
      ],
    },
  },

  // 3. Needs and wants
  {
    id: "soc-k.needs-wants",
    title: "Needs and Wants",
    minutes: 15,
    stage: "logic",
    standards: ["SS.K.3", "D2.Eco.1.K-2", "D2.Eco.2.K-2", "D2.Eco.7.K-2"],
    read: [
      "Needs are things we must have to live. We need food. We need water. We need clothes to keep us warm. We need a home to keep us safe and dry.",
      "Wants are things that are nice to have. A toy is a want. Candy is a want. A new bike is a want. Wants are fun, but we can live without them.",
      "Families cannot buy everything. Money runs out. So families must choose. First they pay for needs. Then, if there is money left, they may buy a want.",
      "Choosing means giving something up. If you spend your dollar on a lollipop, you cannot spend it on a sticker too.",
      "Saving is smart. Saving means keeping money to use later. Put a coin in your piggy bank each week. One day you will have enough for something big!",
    ].join("\n\n"),
    keyIdeas: [
      "Needs are things we must have to live: food, water, clothes and a home.",
      "Wants are nice to have, but we can live without them.",
      "We can't buy everything, so we choose. Saving means keeping money for later.",
    ],
    hook: {
      text: "Pretend you sail to a little island. You can bring only a few things. Will you pick water or a video game? Let's learn what we truly need.",
    },
    teach: [
      {
        title: "What We Need",
        teach:
          "Needs are things we must have to live. We need food to eat. We need water to drink. We need clothes to keep us warm. We need a home to keep us safe and dry. Without these, we could not stay healthy. Every person in the world has these same needs. Food, water, clothes and a home!",
        visual: {
          type: "hotspots",
          title: "What every person needs",
          center: "🧒 Me",
          spots: [
            { label: "Food", icon: "🍎", detail: "Food gives us energy to grow and play." },
            { label: "Water", icon: "💧", detail: "We drink water every day to stay healthy." },
            { label: "Clothes", icon: "🧥", detail: "Clothes keep us warm and dry." },
            { label: "Home", icon: "🏠", detail: "A home keeps us safe, warm and dry." },
          ],
        },
        probe: {
          type: "cloze",
          text: "We eat {0}. 🍎 We drink {1}. 💧 We live in a {2}. 🏠",
          blanks: [{ answers: ["food"] }, { answers: ["water"] }, { answers: ["home"] }],
          bank: ["food", "water", "home", "candy", "toy"],
          hint: "Look at each picture: an apple, a drop of water, a house.",
          mistakes: [
            { match: "candy", coach: "Candy is a treat, a want. We need real food to grow." },
            { match: "toy", coach: "A toy is fun, but it's a want. Which word is a need?" },
          ],
          seconds: 35,
        },
        think: {
          q: "Which one is a need?",
          choices: ["A balloon", "A toy car", "Water"],
          answer: 2,
          why: "We must drink water to live, so water is a need.",
          hints: [
            "A balloon is fun, but we can live without it.",
            "A toy car is fun, but we can live without it.",
            "",
          ],
        },
        approaches: {
          analogy: "A plant needs water, sun and soil to grow. 🌱 Without them, it wilts. People have needs too: food, water, clothes and a home.",
          example: "On a cold day, Ben eats soup 🍲, drinks water, puts on his coat and goes home. Food, water, clothes, home: all needs!",
          simpler: {
            q: "Do we need food to live?",
            choices: ["No", "Yes"],
            answer: 1,
            why: "Our bodies need food to grow and stay healthy.",
            hints: ["Without food we'd get weak and sick. Food is something we must have.", ""],
          },
        },
      },
      {
        title: "What We Want",
        teach:
          "Wants are things that are nice to have. A toy is a want. Candy is a want. A new bike is a want. Wants are fun! But we can live without them. Here is a trick. Ask, could I live without it? If yes, it is a want. If no, it is a need. Water? We need it! A yo-yo? That is a want.",
        visual: {
          type: "compare",
          left: { title: "✅ Needs", points: ["🍎 Food", "💧 Water", "🧥 Clothes", "🏠 A home"] },
          right: { title: "🎁 Wants", points: ["🧸 Toys", "🍭 Candy", "🚲 A new bike", "🎮 Games"] },
        },
        probe: {
          type: "sort",
          prompt: "Is it a need or a want?",
          buckets: ["✅ Need", "🎁 Want"],
          items: [
            { text: "💧 Water", bucket: 0 },
            { text: "🍞 Bread", bucket: 0 },
            { text: "🧥 A warm coat", bucket: 0 },
            { text: "🏠 A home", bucket: 0 },
            { text: "🧸 A teddy bear", bucket: 1 },
            { text: "🍭 A lollipop", bucket: 1 },
            { text: "🎮 A video game", bucket: 1 },
            { text: "🎈 A balloon", bucket: 1 },
          ],
          hint: "Ask: could I live without it? If yes, it's a want.",
          mistakes: [{ match: "🍭 A lollipop", coach: "A lollipop is yummy, but you can live without it. It's a want." }],
          seconds: 60,
        },
        think: {
          q: "Could you live without a yo-yo?",
          choices: ["Yes, so it is a want", "No, so it is a need", "Only on Tuesdays"],
          answer: 0,
          why: "We can live without a yo-yo, so it is a want.",
          hints: [
            "",
            "A yo-yo is fun, but nobody needs one to live. It's a want.",
            "The day doesn't matter. Ask: could I live without it?",
          ],
        },
        approaches: {
          analogy: "Needs are like the wheels on a wagon. 🛞 The wagon can't go without them. Wants are like stickers on the wagon. Fun, but it rolls fine without them.",
          example: "At the store, Mom buys milk and bread. Those are needs. Kai asks for a toy truck. That is a want. Mom says, \"Needs first.\"",
          simpler: {
            q: "Is candy a need or a want?",
            choices: ["A need", "A want"],
            answer: 1,
            why: "Candy is a treat. We can live without it, so it is a want.",
            hints: ["Could you live without candy? Yes! So it's not a need.", ""],
          },
        },
      },
      {
        title: "Choosing and Saving",
        teach:
          "Families cannot buy everything. Money runs out. So we must choose. First we pay for needs. Then we may buy a want. Choosing means giving something up. If you spend your dollar on a lollipop, you can't spend it on a sticker. Saving is smart. Saving means keeping money for later. Drop a coin in your piggy bank each week. Soon you can buy something big!",
        visual: {
          type: "flip",
          cards: [
            { front: "🤔 Choose", back: "Pick one thing when you can't have them all." },
            { front: "👋 Give up", back: "When you pick one thing, you don't get the other." },
            { front: "🐷 Save", back: "Keep money to use later." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put the saving steps in order.",
          steps: ["💵 Get some money", "🐷 Put it in the piggy bank", "⏳ Keep saving for a while", "🚲 Buy something big"],
          hint: "First you get money. Last you buy the big thing.",
          mistakes: [{ match: "🚲 Buy something big", coach: "You can only buy it after you've saved enough. That comes last." }],
          seconds: 45,
        },
        think: {
          q: "You have one dollar. You buy a lollipop. Can you also buy a sticker with that dollar?",
          choices: ["Yes, buy both", "No, the dollar is spent", "Yes, if I smile"],
          answer: 1,
          why: "Once you spend the dollar, it's gone. Choosing means giving something up.",
          hints: [
            "One dollar can only be spent once. After the lollipop, it's gone.",
            "",
            "Smiling is nice, but it doesn't bring the dollar back. It's already spent.",
          ],
        },
        approaches: {
          analogy: "Money is like a cookie. 🍪 Once you eat it, it's gone. You have to choose what to spend it on, just like you choose when to eat your cookie.",
          example: "Zoe saves one coin each week. 🪙 After five weeks she has five coins. Now she has enough for a jump rope!",
          simpler: {
            q: "Saving means...",
            choices: ["Spending it all now", "Keeping money for later"],
            answer: 1,
            why: "Saving means keeping money to use later.",
            hints: ["Spending is the opposite of saving. Saving means keeping it.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "You can pack only your needs for the island trip. What goes in the bag?",
      buckets: ["🎒 Pack it (a need)", "🏠 Leave it home (a want)"],
      items: [
        { text: "💧 A big jug of water", bucket: 0 },
        { text: "🥪 Sandwiches", bucket: 0 },
        { text: "🧥 A warm jacket", bucket: 0 },
        { text: "⛺ A tent to sleep in", bucket: 0 },
        { text: "🎮 A video game", bucket: 1 },
        { text: "🧸 A stuffed bear", bucket: 1 },
        { text: "🍬 A bag of candy", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Tell Ranger Clark the difference between a need and a want. Give one of each. Why do people save money?",
      keyPoints: [
        "A need is something we must have to live",
        "A want is nice to have but we can live without it",
        "Names a need like food, water, clothes or a home",
        "Saving means keeping money for later",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each need to its picture.",
        pairs: [
          { left: "Food", right: "🍎" },
          { left: "Water", right: "💧" },
          { left: "Clothes", right: "🧥" },
          { left: "Home", right: "🏠" },
        ],
        hint: "Listen to each word, then find its picture.",
        seconds: 35,
      },
      {
        type: "number",
        prompt: "Ana has 🪙🪙🪙 in her piggy bank. She saves 🪙🪙 more. How many coins now?",
        answer: 5,
        unit: "coins",
        hint: "Count all the coins: the 3 she had and the 2 she added.",
        mistakes: [{ match: "3", coach: "Don't forget the 2 new coins! Count them all." }],
        seconds: 30,
      },
      {
        type: "cloze",
        text: "Things we must have are {0}. Things that are nice to have are {1}.",
        blanks: [{ answers: ["needs"] }, { answers: ["wants"] }],
        bank: ["needs", "wants", "toys"],
        hint: "We need food and water. We want toys and candy.",
        mistakes: [{ match: "toys", coach: "Toys are an example of wants. Which word names all of them?" }],
        seconds: 30,
      },
      {
        type: "sort",
        prompt: "Need or want?",
        buckets: ["✅ Need", "🎁 Want"],
        items: [
          { text: "🥛 Milk", bucket: 0 },
          { text: "👟 Shoes", bucket: 0 },
          { text: "🪁 A kite", bucket: 1 },
          { text: "🍦 Ice cream", bucket: 1 },
        ],
        hint: "Could you live without it? Then it's a want.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "Which one is a need?",
        choices: ["A toy robot", "Food", "A lollipop"],
        answer: 1,
        why: "We must eat food to live, so food is a need.",
      },
      {
        q: "Which one is a want?",
        choices: ["Water", "A home", "A new bike"],
        answer: 2,
        why: "A bike is fun, but we can live without it. It's a want.",
      },
      {
        q: "What does saving mean?",
        choices: ["Keeping money for later", "Spending all your money", "Losing your money"],
        answer: 0,
        why: "Saving means keeping money to use later.",
      },
      {
        q: "Why do families have to choose what to buy?",
        choices: ["Stores are closed", "Money runs out", "Toys are free"],
        answer: 1,
        why: "Families can't buy everything, so they choose. Needs come first.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Go on a walk through your kitchen with a grown-up. Find three needs and three wants. Then put one coin in a jar or piggy bank to start saving.",
      rubric: [
        "Finds three needs, like food or water",
        "Finds three wants, like treats or toys",
        "Puts a coin away to save it",
      ],
    },
  },

  // 4. Jobs and community helpers
  {
    id: "soc-k.helpers",
    title: "Jobs and Community Helpers",
    minutes: 15,
    stage: "grammar",
    standards: ["SS.K.4", "D2.Civ.2.K-2", "D2.Eco.3.K-2", "D2.Eco.6.K-2"],
    read: [
      "A community is a place where people live, work and play together. Many people there have jobs. A job is work people do.",
      "Some helpers keep us safe. A firefighter puts out fires. A police officer keeps people safe. Some helpers keep us healthy. A doctor helps sick people get well. A dentist keeps teeth strong.",
      "Some workers grow and make food. A farmer grows wheat. A baker uses flour to bake bread. A mail carrier brings our letters.",
      "Every job needs tools and skills. A farmer uses a tractor. A firefighter uses a hose. A doctor uses a stethoscope to hear your heart.",
      "Why do people work? To help others, and to earn money. Workers use the money to buy what their families need.",
      "Kids can help the community too! You can pick up trash or help a neighbor. Everyone can be a helper.",
    ].join("\n\n"),
    keyIdeas: [
      "A job is work people do. Community helpers keep us safe and healthy.",
      "Every job needs tools and skills.",
      "People work to help others and to earn money for their families.",
    ],
    hook: {
      text: "Whoo-whoo! A big red truck zooms down the road. Who is inside? Helpers! Let's meet the helpers in our town.",
    },
    teach: [
      {
        title: "Helpers Who Keep Us Safe",
        teach:
          "A community is where people live, work and play. Many people there have jobs. A job is work people do. Some helpers keep us safe. A firefighter puts out fires. A police officer keeps people safe. Some helpers keep us healthy. A doctor helps sick people get well. A dentist keeps teeth clean and strong.",
        visual: {
          type: "hotspots",
          title: "Helpers in our town",
          center: "🏘️ Town",
          spots: [
            { label: "Firefighter", icon: "🚒", detail: "Puts out fires and rescues people." },
            { label: "Police officer", icon: "👮", detail: "Keeps people safe and helps when there's trouble." },
            { label: "Doctor", icon: "🩺", detail: "Helps sick people get well." },
            { label: "Dentist", icon: "🦷", detail: "Keeps teeth clean and strong." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each helper to the job.",
          pairs: [
            { left: "🚒 Firefighter", right: "Puts out fires" },
            { left: "👮 Police officer", right: "Keeps people safe" },
            { left: "🩺 Doctor", right: "Helps sick people get well" },
            { left: "🦷 Dentist", right: "Keeps teeth strong" },
          ],
          hint: "Look at each helper's picture. What do they help with?",
          mistakes: [{ match: "Keeps teeth strong", coach: "Teeth are the dentist's job. Look for the tooth 🦷." }],
          seconds: 45,
        },
        think: {
          q: "Who puts out fires?",
          choices: ["A baker", "A firefighter", "A dentist"],
          answer: 1,
          why: "A firefighter rides the fire truck and puts out fires.",
          hints: [
            "A baker bakes bread. Who rides the big red truck?",
            "",
            "A dentist takes care of teeth. Who sprays water on fires?",
          ],
        },
        approaches: {
          analogy: "A town is like a big team. 🏘️ Each helper has a job, like players on a team. Together they keep everyone safe and well.",
          example: "Kim has a toothache. 🦷 Who can help? The dentist! Kim's grandpa has a cough. Who can help? The doctor!",
          simpler: {
            q: "Who helps sick people get well?",
            choices: ["A doctor", "A mail carrier"],
            answer: 0,
            why: "Doctors help sick people get well.",
            hints: ["", "A mail carrier brings letters. Who helps when you feel sick?"],
          },
        },
      },
      {
        title: "Workers and Their Tools",
        teach:
          "Some workers grow and make food. A farmer grows wheat. A baker uses flour made from wheat to bake bread. A mail carrier brings our letters. Every job needs tools. A tool helps you do the work. A farmer uses a tractor. A firefighter uses a hose. A doctor uses a stethoscope to hear your heart. Every job needs skills too. Skills are things you learn to do well.",
        visual: {
          type: "flip",
          cards: [
            { front: "🚜 Tractor", back: "A farmer uses it to plow and plant fields." },
            { front: "🧯 Hose and extinguisher", back: "A firefighter uses them to put out fires." },
            { front: "🩺 Stethoscope", back: "A doctor uses it to hear your heart." },
            { front: "📬 Mail bag", back: "A mail carrier uses it to bring letters." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each tool to the worker who uses it.",
          pairs: [
            { left: "🚜 Tractor", right: "🧑‍🌾 Farmer" },
            { left: "🩺 Stethoscope", right: "👩‍⚕️ Doctor" },
            { left: "🥖 Oven and flour", right: "🧑‍🍳 Baker" },
            { left: "✉️ Mail bag", right: "📬 Mail carrier" },
          ],
          hint: "Think: who would need this tool to do the job?",
          mistakes: [{ match: "🧑‍🍳 Baker", coach: "A baker needs an oven and flour to make bread." }],
          seconds: 45,
        },
        think: {
          q: "What does a doctor use to hear your heart?",
          choices: ["A hammer", "A tractor", "A stethoscope"],
          answer: 2,
          why: "A stethoscope lets a doctor listen to your heart.",
          hints: [
            "A hammer is for nails! A doctor listens with a special tool.",
            "A tractor is for farm fields. A doctor listens with a special tool.",
            "",
          ],
        },
        approaches: {
          analogy: "Tools are like your crayons. 🖍️ You need crayons to color. Workers need their tools to do their jobs.",
          example: "The farmer drives a tractor and grows wheat. 🌾 The wheat is ground into flour. The baker uses the flour to bake bread. 🍞",
          simpler: {
            q: "Who uses a tractor?",
            choices: ["A farmer", "A dentist"],
            answer: 0,
            why: "Farmers use tractors to work their fields.",
            hints: ["", "Dentists work on teeth. Tractors are for big farm fields."],
          },
        },
      },
      {
        title: "Why People Work",
        teach:
          "Why do people work? First, to help others. A baker feeds the town. A doctor helps us heal. Second, to earn money. Workers get paid for their work. They use the money to buy what their families need, like food and a home. Kids can help the community too! You can pick up trash. You can help a neighbor carry bags. Everyone can be a helper!",
        visual: {
          type: "hotspots",
          title: "Why do people work?",
          center: "👷 Work",
          spots: [
            { label: "To help others", icon: "🤝", detail: "A baker feeds the town. A doctor helps us heal." },
            { label: "To earn money", icon: "💵", detail: "Workers get paid for their work." },
            { label: "To buy needs", icon: "🏠", detail: "Money buys food, clothes and a home for the family." },
          ],
        },
        probe: {
          type: "cloze",
          text: "People work to help {0}. People work to earn {1}.",
          blanks: [{ answers: ["others"] }, { answers: ["money"] }],
          bank: ["others", "money", "naps", "rocks"],
          hint: "Workers help people, and they get paid.",
          mistakes: [
            { match: "naps", coach: "Naps are for resting, not working! What do workers get paid?" },
            { match: "rocks", coach: "Workers don't get paid in rocks. They get paid money." },
          ],
          seconds: 30,
        },
        think: {
          q: "What do workers get for their work?",
          choices: ["Money", "Nothing at all", "A new nose"],
          answer: 0,
          why: "Workers earn money, and they use it to buy what their families need.",
          hints: [
            "",
            "Workers do get something for their work. They get paid money.",
            "That's silly! Workers get paid money for their work.",
          ],
        },
        approaches: {
          analogy: "Work is like planting a garden. 🌻 You do the work, and later you get something back: flowers for you, money for a worker.",
          example: "Mr. Lee is a baker. He bakes bread for the town. People pay him for the bread. He uses the money to buy food and shoes for his kids.",
          simpler: {
            q: "Can kids help the community?",
            choices: ["No", "Yes, like picking up trash"],
            answer: 1,
            why: "Kids can help by picking up trash or helping a neighbor.",
            hints: ["Even kids can help! Think about picking up trash at the park.", ""],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Who can help with this?",
      buckets: ["🚒 Firefighter", "🩺 Doctor", "🦷 Dentist"],
      items: [
        { text: "🔥 A fire in a barn", bucket: 0 },
        { text: "💨 Smoke coming from a house", bucket: 0 },
        { text: "🤒 A bad fever", bucket: 1 },
        { text: "🤧 A cough that won't stop", bucket: 1 },
        { text: "🦷 A wiggly, achy tooth", bucket: 2 },
        { text: "🪥 A teeth checkup", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Pick a helper in our town. Tell Ranger Clark what they do, what tool they use, and why people work.",
      keyPoints: [
        "Names a community helper",
        "Tells what the helper does",
        "Names a tool the helper uses",
        "People work to help others and earn money",
      ],
    },
    mastery: [
      {
        type: "match",
        prompt: "Match each worker to where they work.",
        pairs: [
          { left: "🚒 Firefighter", right: "Fire station" },
          { left: "🧑‍🌾 Farmer", right: "Farm" },
          { left: "🧑‍🍳 Baker", right: "Bakery" },
          { left: "🍎 Teacher", right: "School" },
        ],
        hint: "Where would you find each worker during the day?",
        seconds: 40,
      },
      {
        type: "sequence",
        prompt: "How does bread get to your table? Put the steps in order.",
        steps: ["🌾 A farmer grows wheat", "⚙️ The wheat is ground into flour", "🍞 A baker bakes bread", "🛒 Your family buys the bread"],
        hint: "It starts on the farm and ends at your table.",
        seconds: 45,
      },
      {
        type: "number",
        prompt: "A farmer has 🐄🐄🐄 in the barn and 🐄🐄 in the field. How many cows?",
        answer: 5,
        unit: "cows",
        hint: "Count the cows in the barn, then keep counting the ones in the field.",
        mistakes: [{ match: "3", coach: "Those are just the barn cows. Add the cows in the field too!" }],
        seconds: 30,
      },
      {
        type: "cloze",
        text: "A {0} puts out fires. A {1} keeps teeth strong.",
        blanks: [{ answers: ["firefighter"] }, { answers: ["dentist"] }],
        bank: ["firefighter", "dentist", "baker"],
        hint: "Think fire truck 🚒 and tooth 🦷.",
        mistakes: [{ match: "baker", coach: "A baker bakes bread. Who rides the fire truck? Who checks teeth?" }],
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What is a job?",
        choices: ["A kind of food", "Work people do", "A toy"],
        answer: 1,
        why: "A job is work people do.",
      },
      {
        q: "Who keeps your teeth strong?",
        choices: ["A dentist", "A farmer", "A firefighter"],
        answer: 0,
        why: "A dentist cleans and checks teeth.",
      },
      {
        q: "What tool does a farmer use?",
        choices: ["A stethoscope", "A mail bag", "A tractor"],
        answer: 2,
        why: "Farmers use tractors to work their fields.",
      },
      {
        q: "Why do people work?",
        choices: ["To help others and earn money", "To take naps", "To stay home all day"],
        answer: 0,
        why: "People work to help others and to earn money for their families.",
      },
    ],
    task: {
      kind: "speak",
      prompt: "With a grown-up, talk to a helper in your town, like a librarian, a mail carrier or a store worker. Ask them what they do and what tools they use. Say thank you!",
      rubric: [
        "Asks a helper what their job is",
        "Learns one tool the helper uses",
        "Says thank you politely",
      ],
    },
  },

  // 5. Maps of my room and home
  {
    id: "soc-k.maps",
    title: "Maps of My Room",
    minutes: 20,
    stage: "grammar",
    standards: ["SS.K.5", "D2.Geo.1.K-2", "D2.Geo.2.K-2", "D2.Geo.3.K-2"],
    read: [
      "A map is a picture of a place. A map shows the place from above, the way a bird sees it.",
      "From high up, you see the tops of things. A round table looks like a circle. A bed looks like a rectangle.",
      "Maps use symbols. A symbol is a small picture that stands for a real thing. A tiny tree on a map stands for a real tree. Many maps have a key. The key tells what each symbol means.",
      "Place words tell where things are. Near means close by. Far means a long way off. Left and right tell which side. Above means over. Below means under.",
      "A globe is a round model of the whole Earth. The blue parts are water. The green and brown parts are land.",
      "You can make a map of your room! Draw your bed from above. Draw your door and your window. Now you are a mapmaker!",
    ].join("\n\n"),
    keyIdeas: [
      "A map is a picture of a place seen from above.",
      "Map symbols stand for real things, and the key tells what they mean.",
      "Near, far, left, right, above and below tell where things are.",
    ],
    hook: {
      text: "I'm Ranger Clark, and I love maps! On my trips, I draw maps of rivers and mountains. Today, you'll be a mapmaker too. Let's start with your very own room!",
    },
    teach: [
      {
        title: "A Bird's-Eye View",
        teach:
          "A map is a picture of a place. It shows the place from above. That is how a bird sees it! Pretend you are a bird. You fly over your kitchen. What do you see? You see the tops of things. A round table looks like a circle. A bed looks like a long rectangle. That is called a bird's-eye view.",
        visual: {
          type: "compare",
          left: { title: "👀 From the side", points: ["You see the table legs", "You see the front of the bed", "You see the side of a ball"] },
          right: { title: "🐦 From above", points: ["A round table is a circle", "A bed is a long rectangle", "A ball is a circle"] },
        },
        probe: {
          type: "match",
          prompt: "From above, what shape do you see?",
          pairs: [
            { left: "🍽️ A round table", right: "⚪ A circle" },
            { left: "📦 A square box", right: "🟦 A square" },
            { left: "🛏️ A bed", right: "▬ A long rectangle" },
          ],
          hint: "Pretend you are a bird looking straight down. You see only the top.",
          mistakes: [{ match: "▬ A long rectangle", coach: "A bed is long, so from above it looks like a long rectangle." }],
          seconds: 40,
        },
        think: {
          q: "A map shows a place from where?",
          choices: ["From under the ground", "From above", "From inside a box"],
          answer: 1,
          why: "A map shows a place from above, like a bird sees it.",
          hints: [
            "Under the ground you would only see dirt! Think of a bird flying high.",
            "",
            "Inside a box you couldn't see anything. Maps show places from up high.",
          ],
        },
        approaches: {
          analogy: "Stand on a chair and look down at your toy blocks. 🧱 You see only their tops. A map is like that, but from way higher up, like a bird.",
          example: "From the side, a table has four legs and a top. From above, you can't see the legs at all. A round table is just a circle!",
          simpler: {
            q: "Do birds see things from above?",
            choices: ["Yes, they fly up high", "No, they live underground"],
            answer: 0,
            why: "Birds fly high and look down on things.",
            hints: ["", "Worms live underground. Birds fly up high and look down."],
          },
        },
      },
      {
        title: "Map Symbols and Keys",
        teach:
          "Maps use symbols. A symbol is a small picture. It stands for a real thing. A tiny tree on a map stands for a real tree. A little house stands for a real house. A blue patch can stand for water, like a pond. Many maps have a key. The key tells what each symbol means. Look at the key, then find the symbol on the map!",
        visual: {
          type: "hotspots",
          title: "A map key",
          center: "🔑 Key",
          spots: [
            { label: "Tree", icon: "🌳", detail: "This symbol stands for a real tree." },
            { label: "House", icon: "🏠", detail: "This symbol stands for a real house." },
            { label: "Pond", icon: "🟦", detail: "A blue patch stands for water, like a pond." },
            { label: "Road", icon: "🛣️", detail: "This symbol stands for a road." },
          ],
        },
        probe: {
          type: "match",
          prompt: "What does each map symbol stand for?",
          pairs: [
            { left: "🌳", right: "A real tree" },
            { left: "🏠", right: "A real house" },
            { left: "🟦", right: "Water, like a pond" },
            { left: "🛣️", right: "A road" },
          ],
          hint: "Each symbol is a little picture of the real thing.",
          mistakes: [{ match: "Water, like a pond", coach: "Water on maps is blue. Look for the blue patch." }],
          seconds: 40,
        },
        think: {
          q: "What tells you what the symbols on a map mean?",
          choices: ["The key", "The paper", "The pencil"],
          answer: 0,
          why: "The map key tells what each symbol means.",
          hints: [
            "",
            "Paper holds the map, but it doesn't explain the symbols. The key does.",
            "A pencil draws the map, but the key explains the symbols.",
          ],
        },
        approaches: {
          analogy: "A map key is like a secret code card. 🔑 It tells you what each little picture means, so you can read the map.",
          example: "On Max's map, the key shows 🌳 = tree. Max finds three 🌳 on the map. So there are three trees in the park!",
          simpler: {
            q: "A tiny tree on a map stands for...",
            choices: ["A real tree", "A real car"],
            answer: 0,
            why: "A tree symbol stands for a real tree.",
            hints: ["", "A tree symbol is a little picture of a tree, not a car."],
          },
        },
      },
      {
        title: "Where Is It?",
        teach:
          "Place words tell where things are. Near means close by. Far means a long way off. Left and right tell which side. Above means over. Below means under. The lamp is above the table. The cat is below the table. The ball is near the cat. We use these words to give directions. Go left at the door. Walk to the bed. You found it!",
        visual: {
          type: "flip",
          cards: [
            { front: "⬆️ Above", back: "Over something. The lamp is above the table." },
            { front: "⬇️ Below", back: "Under something. The cat is below the table." },
            { front: "🤏 Near", back: "Close by. The ball is near the cat." },
            { front: "🔭 Far", back: "A long way off. The moon is far away." },
            { front: "👈 Left and right 👉", back: "Which side something is on." },
          ],
        },
        probe: {
          type: "cloze",
          text: "A bird flies {0} the house. ⬆️🏠 A worm digs {1} the ground. ⬇️🌱",
          blanks: [{ answers: ["above", "over"] }, { answers: ["below", "under"] }],
          bank: ["above", "below", "left", "inside"],
          hint: "Up high is above. Down low is below.",
          mistakes: [
            { match: "left", coach: "Left tells which side. Is the bird up high or down low?" },
            { match: "inside", coach: "The bird is not inside the house. It flies up high, over it." },
          ],
          seconds: 35,
        },
        think: {
          q: "The moon is a long way off. Is it near or far?",
          choices: ["Near", "Below", "Far"],
          answer: 2,
          why: "Far means a long way off, and the moon is very far away.",
          hints: [
            "Near means close by. The moon is a long, long way off.",
            "Below means under. The moon is up in the sky, a long way off.",
            "",
          ],
        },
        approaches: {
          analogy: "Place words are like arrows on a treasure map. 🗺️ They point you to where things are: up, down, close, far, left or right.",
          example: "Your shoes are below your bed. Your pillow is above your blanket. Your door is near your bed. Now a friend can find them!",
          simpler: {
            q: "Your feet are ___ your head.",
            choices: ["below", "above"],
            answer: 0,
            why: "Your feet are down low, so they are below your head.",
            hints: ["", "Your head is up high. Your feet are down low, under it."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Is it above the ground or below the ground?",
      buckets: ["⬆️ Above the ground", "⬇️ Below the ground"],
      items: [
        { text: "☁️ A cloud", bucket: 0 },
        { text: "🌙 The moon", bucket: 0 },
        { text: "🐦 A flying bird", bucket: 0 },
        { text: "🪱 A worm in the dirt", bucket: 1 },
        { text: "🐜 Ants in their tunnel", bucket: 1 },
        { text: "🥕 A carrot growing in the soil", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Tell Ranger Clark what a map is. What is a map symbol? Use a place word, like near, far, above or below, to tell where something in your room is.",
      keyPoints: [
        "A map is a picture of a place from above",
        "A symbol is a small picture that stands for a real thing",
        "The key tells what the symbols mean",
        "Uses a place word like near, far, above or below",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "Count the trees on this map: 🌳 🌳 🏠 🌳 🌳. How many trees?",
        answer: 4,
        unit: "trees",
        hint: "Count only the trees 🌳. Skip the house.",
        mistakes: [{ match: "5", coach: "One of those is a house 🏠! Count just the trees." }],
        seconds: 25,
      },
      {
        type: "cloze",
        text: "The school 🏫 is a long way off. It is {0}. The mailbox 📬 is right by my house. It is {1}.",
        blanks: [{ answers: ["far"] }, { answers: ["near"] }],
        bank: ["far", "near", "above"],
        hint: "A long way off is far. Close by is near.",
        mistakes: [{ match: "above", coach: "Above means over. Is the school close by or a long way off?" }],
        seconds: 30,
      },
      {
        type: "sequence",
        prompt: "Put the steps in order to make a map of your room.",
        steps: ["📄 Get paper and a crayon", "🛏️ Draw your bed from above", "🚪 Draw your door and window", "🔑 Make a key for your symbols"],
        hint: "First get your paper. The key comes last, after you draw the symbols.",
        seconds: 45,
      },
      {
        type: "match",
        prompt: "Match each symbol to what it stands for.",
        pairs: [
          { left: "🌳", right: "Tree" },
          { left: "🏫", right: "School" },
          { left: "🟦", right: "Pond" },
        ],
        hint: "Each symbol is a little picture of the real thing.",
        seconds: 30,
      },
    ],
    check: [
      {
        q: "What is a map?",
        choices: ["A kind of food", "A song", "A picture of a place from above"],
        answer: 2,
        why: "A map is a picture of a place seen from above.",
      },
      {
        q: "What does a map key tell you?",
        choices: ["What the symbols mean", "What time it is", "How to bake bread"],
        answer: 0,
        why: "The key tells what each symbol on the map means.",
      },
      {
        q: "On a globe, what do the blue parts show?",
        choices: ["Land", "Water", "Roads"],
        answer: 1,
        why: "On a globe, blue shows water. Green and brown show land.",
      },
      {
        q: "Which word means close by?",
        choices: ["Far", "Near", "Above"],
        answer: 1,
        why: "Near means close by. Far means a long way off.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Draw a map of your bedroom from above, like a bird. Draw your bed, door and window. Add a key with your symbols. Then show a grown-up and tell where things are using near, far, left or right.",
      rubric: [
        "Draws the room from above",
        "Shows the bed, door and window",
        "Makes a key with symbols",
        "Uses place words to tell where things are",
      ],
    },
  },

  // 6. American symbols and holidays
  {
    id: "soc-k.symbols",
    title: "American Symbols and Holidays",
    minutes: 20,
    stage: "grammar",
    standards: ["SS.K.6", "SS.K.7", "D2.His.3.K-2"],
    read: [
      "We live in the United States of America. Our country has symbols. A symbol stands for something.",
      "Our flag is red, white and blue. It has 50 stars, one for each state. It has 13 stripes for the first 13 colonies, where our country began. We say the Pledge of Allegiance to the flag. We stand tall and put our right hand over our heart.",
      "The bald eagle is a symbol of our country. It is strong and free. The Statue of Liberty stands in New York Harbor. She holds up a torch. She was a gift from France. The Liberty Bell is in Philadelphia. It has a big crack. Liberty means freedom.",
      "We have special days called holidays. On the Fourth of July, we celebrate our country's birthday. On Thanksgiving, we give thanks. On Presidents' Day, we remember George Washington, our first president. On Memorial Day and Veterans Day, we honor brave people who served our country.",
    ].join("\n\n"),
    keyIdeas: [
      "Our flag has 50 stars for the 50 states and 13 stripes for the first 13 colonies.",
      "The bald eagle, the Statue of Liberty and the Liberty Bell are symbols of our country.",
      "Holidays like the Fourth of July and Thanksgiving help us remember and give thanks.",
    ],
    hook: {
      text: "Look up! A bald eagle soars over a field. Down below, a flag waves in the wind. Both are symbols of our country. Let's find out what they mean!",
    },
    teach: [
      {
        title: "Our Flag",
        teach:
          "We live in the United States of America. Our flag is red, white and blue. It has 50 stars. There is one star for each state. It has 13 stripes. They stand for the first 13 colonies, where our country began. We say the Pledge of Allegiance to the flag. We stand tall. We put our right hand over our heart.",
        visual: {
          type: "hotspots",
          title: "The American flag",
          center: "🇺🇸 Flag",
          spots: [
            { label: "Stars", icon: "⭐", detail: "50 stars, one for each state." },
            { label: "Stripes", icon: "🟥", detail: "13 red and white stripes for the first 13 colonies." },
            { label: "Colors", icon: "🎨", detail: "Red, white and blue." },
            { label: "The Pledge", icon: "✋", detail: "We stand tall, face the flag and put our right hand over our heart." },
          ],
        },
        probe: {
          type: "number",
          prompt: "How many stars are on our flag? ⭐ (Hint: one for each state.)",
          answer: 50,
          unit: "stars",
          hint: "There is one star for each state, and we have 50 states.",
          mistakes: [{ match: "13", coach: "13 is the number of stripes. The stars stand for the 50 states." }],
          seconds: 25,
        },
        think: {
          q: "What colors are on our flag?",
          choices: ["Green and yellow", "Red, white and blue", "Pink and purple"],
          answer: 1,
          why: "Our flag is red, white and blue.",
          hints: [
            "Those aren't on our flag. Think of the stars and stripes.",
            "",
            "Those aren't flag colors. Our flag has red stripes, white stripes and a blue corner.",
          ],
        },
        approaches: {
          analogy: "A flag is like a team shirt. 👕 Everyone on the team wears it. Our flag is the shirt of our whole country!",
          example: "Count the stripes on a flag: red, white, red, white... There are 13 in all, 7 red and 6 white. They stand for the first 13 colonies.",
          simpler: {
            q: "Does our flag have stars on it?",
            choices: ["Yes", "No"],
            answer: 0,
            why: "Our flag has 50 white stars on a blue corner.",
            hints: ["", "Look at the blue corner of the flag. It's full of white stars!"],
          },
        },
      },
      {
        title: "Symbols of Freedom",
        teach:
          "A symbol stands for something. The bald eagle is a symbol of our country. It is strong and free. The Statue of Liberty stands in New York Harbor. She holds up a torch to welcome ships. She was a gift from France. The Liberty Bell is in Philadelphia. It has a big crack! Liberty means freedom.",
        visual: {
          type: "flip",
          cards: [
            { front: "🦅 Bald eagle", back: "A strong, free bird. A symbol of our country." },
            { front: "🗽 Statue of Liberty", back: "Stands in New York Harbor and holds up a torch. A gift from France." },
            { front: "🔔 Liberty Bell", back: "A big bell in Philadelphia with a crack in it." },
            { front: "🕊️ Liberty", back: "Liberty means freedom." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each picture to its name.",
          pairs: [
            { left: "🦅", right: "Bald eagle" },
            { left: "🗽", right: "Statue of Liberty" },
            { left: "🔔", right: "Liberty Bell" },
            { left: "🇺🇸", right: "American flag" },
          ],
          hint: "Look for the bird, the lady with a torch, the bell and the flag.",
          mistakes: [{ match: "Liberty Bell", coach: "The Liberty Bell is the bell 🔔 with a crack." }],
          seconds: 40,
        },
        think: {
          q: "What does liberty mean?",
          choices: ["Lunch", "Bedtime", "Freedom"],
          answer: 2,
          why: "Liberty means freedom.",
          hints: [
            "Lunch is a meal. Liberty is a big word that means freedom.",
            "Bedtime is when you sleep. Liberty means freedom.",
            "",
          ],
        },
        approaches: {
          analogy: "A symbol is like a picture that says a big idea. ❤️ A heart means love. An eagle means our strong, free country.",
          example: "The Statue of Liberty holds a torch high. 🗽 Long ago, ships sailed into New York Harbor and passed her. She welcomed them to America.",
          simpler: {
            q: "Which is a bird?",
            choices: ["The Liberty Bell", "The bald eagle"],
            answer: 1,
            why: "The bald eagle is a big bird, a symbol of our country.",
            hints: ["The Liberty Bell is a bell that rings. Which one has wings?", ""],
          },
        },
      },
      {
        title: "Our Holidays",
        teach:
          "Holidays are special days. On the Fourth of July, we celebrate our country's birthday. It began in 1776. On Thanksgiving, we give thanks. Long ago, the Pilgrims and their Wampanoag neighbors shared a harvest feast. On Presidents' Day, we remember George Washington, our first president. On Memorial Day and Veterans Day, we honor brave people who served our country.",
        visual: {
          type: "hotspots",
          title: "Our holidays",
          center: "📅 Year",
          spots: [
            { label: "Fourth of July", icon: "🎆", detail: "Our country's birthday, with fireworks and parades." },
            { label: "Thanksgiving", icon: "🦃", detail: "A day to give thanks, with a big family meal." },
            { label: "Presidents' Day", icon: "🏛️", detail: "We remember George Washington, our first president." },
            { label: "Memorial and Veterans Day", icon: "🎖️", detail: "We honor brave people who served our country." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each holiday to what we do.",
          pairs: [
            { left: "🎆 Fourth of July", right: "Celebrate our country's birthday" },
            { left: "🦃 Thanksgiving", right: "Give thanks at a big meal" },
            { left: "🏛️ Presidents' Day", right: "Remember George Washington" },
            { left: "🎖️ Veterans Day", right: "Honor people who served our country" },
          ],
          hint: "Fireworks are for a birthday. A turkey is for a thankful feast.",
          mistakes: [{ match: "Remember George Washington", coach: "Presidents' Day is when we remember our first president." }],
          seconds: 50,
        },
        think: {
          q: "On which holiday do we celebrate our country's birthday?",
          choices: ["The Fourth of July", "Thanksgiving", "Presidents' Day"],
          answer: 0,
          why: "The Fourth of July is our country's birthday. It began in 1776.",
          hints: [
            "",
            "Thanksgiving is for giving thanks. Which day has fireworks for a birthday?",
            "Presidents' Day remembers George Washington. Which day is the birthday?",
          ],
        },
        approaches: {
          analogy: "The Fourth of July is like a birthday party for the whole country. 🎂 Instead of candles, we light up the sky with fireworks!",
          example: "In November, a family sits down to a turkey dinner. 🦃 Each person says one thing they are thankful for. That's Thanksgiving!",
          simpler: {
            q: "Who was our first president?",
            choices: ["George Washington", "Ranger Clark"],
            answer: 0,
            why: "George Washington was our first president.",
            hints: ["", "I'm just a park ranger! Our first president was George Washington."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Is it a symbol or a holiday?",
      buckets: ["🇺🇸 Symbol", "🎉 Holiday"],
      items: [
        { text: "🦅 Bald eagle", bucket: 0 },
        { text: "🗽 Statue of Liberty", bucket: 0 },
        { text: "🔔 Liberty Bell", bucket: 0 },
        { text: "🎆 Fourth of July", bucket: 1 },
        { text: "🦃 Thanksgiving", bucket: 1 },
        { text: "📅 Presidents' Day", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Tell Ranger Clark about our flag. What do the stars and stripes stand for? Name another symbol and a holiday you like.",
      keyPoints: [
        "The flag is red, white and blue",
        "50 stars for the 50 states",
        "13 stripes for the first 13 colonies",
        "Names a symbol like the bald eagle, Statue of Liberty or Liberty Bell",
        "Names a holiday and what we do on it",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "How many stripes are on our flag?",
        answer: 13,
        unit: "stripes",
        hint: "One stripe for each of the first colonies.",
        mistakes: [{ match: "50", coach: "50 is the stars. There is one stripe for each of the first 13 colonies." }],
        seconds: 25,
      },
      {
        type: "cloze",
        text: "Our flag is red, white and {0}. The {1} has a big crack.",
        blanks: [{ answers: ["blue"] }, { answers: ["Liberty Bell"] }],
        bank: ["blue", "Liberty Bell", "green", "eagle"],
        hint: "Think of the flag's corner, and the bell in Philadelphia.",
        mistakes: [
          { match: "green", coach: "Our flag has no green. Its corner is blue." },
          { match: "eagle", coach: "The eagle is a bird. The thing with a crack is the bell." },
        ],
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each symbol to a fact.",
        pairs: [
          { left: "🗽 Statue of Liberty", right: "Holds up a torch" },
          { left: "🦅 Bald eagle", right: "A strong, free bird" },
          { left: "🔔 Liberty Bell", right: "Has a big crack" },
        ],
        hint: "Torch, bird, crack: which goes with which?",
        seconds: 35,
      },
      {
        type: "sequence",
        prompt: "Put these holidays in order through the year, starting in winter.",
        steps: ["🏛️ Presidents' Day (February)", "🎖️ Memorial Day (May)", "🎆 Fourth of July (July)", "🦃 Thanksgiving (November)"],
        hint: "Listen to the months: February, May, July, November.",
        seconds: 45,
      },
    ],
    check: [
      {
        q: "How many stars are on the American flag?",
        choices: ["13", "100", "50"],
        answer: 2,
        why: "There are 50 stars, one for each state.",
      },
      {
        q: "Where is the Statue of Liberty?",
        choices: ["New York Harbor", "On the Moon", "In a forest"],
        answer: 0,
        why: "The Statue of Liberty stands in New York Harbor.",
      },
      {
        q: "What do we do on Thanksgiving?",
        choices: ["Hunt for eggs", "Give thanks", "Go back to school"],
        answer: 1,
        why: "On Thanksgiving we give thanks, often at a big family meal.",
      },
      {
        q: "Who was our first president?",
        choices: ["Abraham Lincoln", "Benjamin Franklin", "George Washington"],
        answer: 2,
        why: "George Washington was our first president.",
      },
    ],
    task: {
      kind: "project",
      prompt: "Make your own American flag with paper and crayons. Count out 13 stripes. Then stand tall with a grown-up and say the Pledge of Allegiance together.",
      rubric: [
        "Uses red, white and blue",
        "Counts 13 stripes",
        "Adds stars in a blue corner",
        "Stands tall with hand over heart for the Pledge",
      ],
    },
  },
]);
