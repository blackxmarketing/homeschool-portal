import type { Lesson } from "../types";
import { k5Course } from "./base";

/**
 * math-3: Grade 3 math (Common Core), taught by Professor Pascal on the
 * Sky Islands. Lessons follow the year: multiplication and division first,
 * then big numbers, fractions, measurement, data, and area and shapes.
 */
const lessons: Lesson[] = [
  // 1. Multiplication: equal groups and arrays
  {
    id: "math-3.multiply",
    title: "Multiplication: Equal Groups and Arrays",
    minutes: 30,
    stage: "grammar",
    standards: ["3.OA.A.1", "3.OA.A.3", "3.OA.A.4"],
    read: [
      "Up on the Sky Islands, the balloon makers tie balloons in bunches. Each bunch has 4 balloons. If there are 3 bunches, how many balloons are there? You could count them one by one. But there is a faster way: multiplication.",
      "Multiplication is a quick way to add equal groups. 3 groups of 4 is 4 + 4 + 4, which is 12. We write it as 3 × 4 = 12. The first number tells how many groups there are. The second number tells how many are in each group. The answer is called the product, and the numbers we multiply are called factors.",
      "You can also show multiplication with an array. An array is a set of things in neat rows and columns, like eggs in a carton or seats in a theater. An array with 3 rows of 5 chairs has 3 × 5 = 15 chairs. Count the rows, count how many in each row, and multiply.",
      "Multiplication helps with word problems too. If a bridge has 7 sections and each section needs 6 planks, the builders need 7 × 6 = 42 planks. Draw a picture or think about the groups to see what to multiply.",
      "Sometimes a number is missing. In 4 × ? = 20, ask yourself: 4 groups of what make 20? Count by 4s: 4, 8, 12, 16, 20. That is 5 jumps, so the missing number is 5. Let's figure it out together!",
    ].join("\n\n"),
    keyIdeas: [
      "Multiplication is a fast way to add equal groups: 3 × 4 means 3 groups of 4.",
      "An array shows multiplication as rows and columns: rows × number in each row.",
      "The numbers we multiply are factors, and the answer is the product.",
      "To find a missing factor, skip count until you reach the product.",
    ],
    hook: {
      text: "The balloon makers of the Sky Islands need balloons to lift a new bridge. They tie them in bunches of 4. Pip counts 3 bunches. Counting one balloon at a time is slow, and the wind keeps moving them! Is there a faster way to know how many balloons there are?",
    },
    teach: [
      {
        title: "Equal Groups",
        teach:
          "Multiplication is a fast way to add equal groups. Look at 3 bunches of balloons with 4 balloons in each bunch. You could add 4 + 4 + 4 and get 12. Or you can say 3 times 4 equals 12. The first number tells how many groups. The second number tells how many are in each group. The numbers we multiply are called factors. The answer is called the product. The groups must be equal. If one bunch had 5 balloons, you could not just multiply.",
        visual: {
          type: "flip",
          cards: [
            { front: "3 × 4", back: "3 groups of 4. That is 4 + 4 + 4 = 12." },
            { front: "Factor", back: "A number we multiply. In 3 × 4 = 12, the factors are 3 and 4." },
            { front: "Product", back: "The answer to a multiplication problem. In 3 × 4 = 12, the product is 12." },
            { front: "Equal groups", back: "Every group has the same number. Multiplication only works when the groups are equal." },
          ],
        },
        probe: {
          type: "cloze",
          text: "🎈🎈🎈🎈 🎈🎈🎈🎈 🎈🎈🎈🎈 🎈🎈🎈🎈 🎈🎈🎈🎈 shows {0} groups of {1}. That makes {2} balloons in all.",
          blanks: [{ answers: ["5"] }, { answers: ["4"] }, { answers: ["20"] }],
          bank: ["5", "4", "20", "9", "16"],
          hint: "Count the bunches first. Then count the balloons in one bunch.",
          mistakes: [
            { match: "9", coach: "9 is 5 + 4. Multiplication means 5 groups of 4: 4 + 4 + 4 + 4 + 4." },
            { match: "16", coach: "16 is 4 groups of 4. Count the bunches again: there are 5." },
          ],
          seconds: 40,
        },
        think: {
          q: "Which means the same as 5 groups of 2?",
          choices: ["5 + 2", "5 × 2", "2 + 2"],
          answer: 1,
          why: "5 groups of 2 is 5 × 2, which is 2 + 2 + 2 + 2 + 2 = 10.",
          hints: [
            "5 + 2 only adds one 5 and one 2. We need five groups of 2.",
            "",
            "2 + 2 is only two groups of 2. We need five groups.",
          ],
        },
        approaches: {
          analogy:
            "Multiplying is like buying packs of juice boxes. If every pack has 4 boxes and you buy 3 packs, you don't open them to count. You know it is 3 packs of 4.",
          example:
            "6 spiders each have 8 legs. That is 6 groups of 8. 8 + 8 + 8 + 8 + 8 + 8 = 48, so 6 × 8 = 48 legs.",
          simpler: {
            q: "What is 2 groups of 3?",
            choices: ["5", "6", "23"],
            answer: 1,
            why: "3 + 3 = 6.",
            hints: ["5 is 2 + 3. Two groups of 3 means 3 + 3.", "", "We don't write the numbers side by side. Add 3 + 3."],
          },
        },
      },
      {
        title: "Arrays",
        teach:
          "An array is a set of things lined up in rows and columns. Rows go across, like seats in a theater. Columns go up and down. Eggs in a carton make an array. So do windows on a tall building. To find how many, multiply the number of rows by the number in each row. A carton with 2 rows of 6 eggs holds 2 times 6, which is 12 eggs. Here is a neat trick. Turn the carton sideways. Now it is 6 rows of 2. It still holds 12 eggs!",
        visual: {
          type: "hotspots",
          title: "An array of eggs: 2 rows of 6",
          center: "2 × 6 = 12",
          spots: [
            { label: "Rows", icon: "➡️", detail: "Rows go across. This carton has 2 rows." },
            { label: "Columns", icon: "⬇️", detail: "Columns go up and down. This carton has 6 columns." },
            { label: "Multiply", icon: "✖️", detail: "2 rows of 6 is 2 × 6 = 12 eggs." },
            { label: "Turn it", icon: "🔄", detail: "Turn the carton: 6 rows of 2. Still 12 eggs." },
          ],
        },
        probe: {
          type: "number",
          prompt: "🌻 A sky garden has 4 rows of sunflowers. Each row has 6 sunflowers. How many sunflowers are there?",
          answer: 24,
          unit: "sunflowers",
          hint: "4 rows of 6 is 4 × 6. Skip count by 6 four times: 6, 12, 18, 24.",
          mistakes: [
            { match: "10", coach: "10 is 4 + 6. An array means 4 rows of 6, so multiply 4 × 6." },
            { match: "18", coach: "18 is only 3 rows of 6. Add one more row of 6." },
          ],
          seconds: 30,
        },
        think: {
          q: "An array has 3 rows with 5 stars in each row. Which tells how many stars?",
          choices: ["3 + 5", "5 - 3", "3 × 5"],
          answer: 2,
          why: "3 rows of 5 is 3 × 5 = 15.",
          hints: [
            "3 + 5 is only 8. Each of the 3 rows has 5 stars, so that is 5 + 5 + 5.",
            "Subtracting doesn't count the stars. 3 rows of 5 means three groups of 5.",
            "",
          ],
        },
        approaches: {
          analogy:
            "An array is like a muffin pan. You don't count every cup. You see 3 rows of 4 cups and know there are 12.",
          example:
            "A wall has 5 rows of windows with 3 windows in each row. 5 × 3: count by 3s five times: 3, 6, 9, 12, 15. There are 15 windows.",
          simpler: {
            q: "2 rows of 2 cookies. How many cookies?",
            choices: ["4", "2", "22"],
            answer: 0,
            why: "2 + 2 = 4.",
            hints: ["", "That is only one row. There are two rows of 2.", "Don't write the numbers side by side. 2 rows of 2 is 2 + 2."],
          },
        },
      },
      {
        title: "Word Problems and Missing Numbers",
        teach:
          "Multiplication solves real problems. A bridge has 7 sections. Each section needs 6 planks. How many planks? That is 7 groups of 6, so 7 times 6, which is 42 planks. Sometimes a number is missing instead. Four baskets hold 20 apples in all, with the same number in each. How many apples are in each basket? Write 4 times what equals 20. Count by 4s: 4, 8, 12, 16, 20. That took 5 jumps. So each basket holds 5 apples. The missing number is a factor.",
        visual: {
          type: "flip",
          cards: [
            { front: "7 sections, 6 planks each", back: "7 × 6 = 42 planks." },
            { front: "4 × ? = 20", back: "Count by 4s: 4, 8, 12, 16, 20. That is 5 jumps, so ? = 5." },
            { front: "? × 3 = 18", back: "Count by 3s: 3, 6, 9, 12, 15, 18. That is 6 jumps, so ? = 6." },
          ],
        },
        probe: {
          type: "number",
          prompt: "Find the missing factor: 6 × ? = 42",
          answer: 7,
          hint: "Count by 6s until you reach 42. How many jumps did it take?",
          mistakes: [
            { match: "36", coach: "36 is 42 - 6. We want the number of 6s that make 42." },
            { match: "6", coach: "6 × 6 is 36. One more 6 makes 42." },
          ],
          seconds: 35,
        },
        think: {
          q: "3 × ? = 15. What is the missing number?",
          choices: ["12", "5", "18"],
          answer: 1,
          why: "Count by 3s: 3, 6, 9, 12, 15. That is 5 jumps.",
          hints: [
            "12 is 15 - 3. We need how many 3s make 15.",
            "",
            "18 is 15 + 3. We want how many 3s make 15.",
          ],
        },
        approaches: {
          analogy:
            "A missing factor is like knowing how many cookies are on the plate and how many friends there are, then asking how many cookies each friend gets.",
          example:
            "5 × ? = 30. Count by 5s: 5, 10, 15, 20, 25, 30. That is 6 jumps. So 5 × 6 = 30, and the missing number is 6.",
          simpler: {
            q: "2 × ? = 8",
            choices: ["6", "4", "10"],
            answer: 1,
            why: "Count by 2s: 2, 4, 6, 8. That is 4 jumps.",
            hints: ["6 is 8 - 2. Count by 2s up to 8 and count the jumps.", "", "10 is too big. 2 × 5 is 10, not 8."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each one by its product.",
      buckets: ["Makes 12", "Makes 18", "Makes 20"],
      items: [
        { text: "🎈 3 groups of 4", bucket: 0 },
        { text: "🥚 2 rows of 6", bucket: 0 },
        { text: "4 + 4 + 4", bucket: 0 },
        { text: "🌻 3 rows of 6", bucket: 1 },
        { text: "6 + 6 + 6", bucket: 1 },
        { text: "2 × 9", bucket: 1 },
        { text: "🍎 4 baskets of 5", bucket: 2 },
        { text: "5 + 5 + 5 + 5", bucket: 2 },
        { text: "10 × 2", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Tell Professor Pascal what 4 × 6 means and how you could find the answer.",
      keyPoints: [
        "4 × 6 means 4 equal groups of 6",
        "It is the same as adding 6 + 6 + 6 + 6",
        "You can draw an array with 4 rows of 6",
        "The product is 24",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "🕷️ 5 spiders each have 8 legs. How many legs in all?",
        answer: 40,
        unit: "legs",
        hint: "5 groups of 8 is 5 × 8. Count by 8s: 8, 16, 24, 32, 40.",
        mistakes: [{ match: "13", coach: "13 is 5 + 8. Each spider has 8 legs, so it is 5 groups of 8." }],
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each picture or problem to its product.",
        pairs: [
          { left: "🍪🍪🍪 🍪🍪🍪 (2 groups of 3)", right: "6" },
          { left: "3 rows of 3 chairs", right: "9" },
          { left: "4 × 5", right: "20" },
          { left: "7 + 7 + 7", right: "21" },
        ],
        hint: "Find each product first: groups times how many in each group.",
        seconds: 45,
      },
      {
        type: "cloze",
        text: "Find the missing factors: 8 × {0} = 32, and {1} × 9 = 27.",
        blanks: [{ answers: ["4"] }, { answers: ["3"] }],
        bank: ["4", "3", "24", "18", "5"],
        hint: "Count by 8s up to 32. Then count by 9s up to 27.",
        mistakes: [
          { match: "24", coach: "24 is 32 - 8. Count the jumps of 8 it takes to reach 32." },
          { match: "18", coach: "18 is 27 - 9. Count the jumps of 9 it takes to reach 27." },
        ],
        seconds: 40,
      },
      {
        type: "build",
        prompt: "A bridge has 7 sections with 6 planks in each. Build the number sentence for how many planks.",
        tiles: ["7", "×", "6", "=", "42"],
        distractors: ["+", "13"],
        hint: "7 groups of 6 is a multiplication. 7 × 6 is 42.",
        seconds: 30,
      },
    ],
    check: [
      { q: "What does 4 × 3 mean?", choices: ["4 + 3", "4 groups of 3", "4 minus 3"], answer: 1, why: "4 × 3 means 4 equal groups of 3, which is 12." },
      { q: "In 6 × 5 = 30, what is 30 called?", choices: ["The product", "A factor", "The sum"], answer: 0, why: "The answer to a multiplication is the product. 6 and 5 are factors." },
      { q: "An array has 4 rows of 7. How many in all?", choices: ["11", "24", "28"], answer: 2, why: "4 × 7 = 28. Count by 7s: 7, 14, 21, 28." },
      { q: "5 × ? = 35. What is the missing number?", choices: ["30", "7", "6"], answer: 1, why: "Count by 5s: 5, 10, 15, 20, 25, 30, 35. That is 7 jumps." },
    ],
    task: {
      kind: "project",
      prompt: "Go on an array hunt at home with a parent. Find 4 arrays (an egg carton, a muffin pan, windows, tiles, a game board). For each one, write the rows, how many in each row, and the multiplication sentence.",
      rubric: [
        "Finds 4 real arrays at home",
        "Counts rows and how many are in each row correctly",
        "Writes a correct multiplication sentence for each one",
      ],
    },
  },

  // 2. Division: sharing and grouping
  {
    id: "math-3.divide",
    title: "Division: Sharing and Grouping",
    minutes: 30,
    stage: "grammar",
    standards: ["3.OA.A.2", "3.OA.A.3", "3.OA.A.4", "3.OA.B.6"],
    read: [
      "Division means splitting a total into equal groups. There are two kinds of division problems, and both use the same sign: ÷.",
      "The first kind is sharing. You know how many groups there are, and you want to know how many go in each group. If 12 sky berries are shared equally by 3 friends, each friend gets 4. We write 12 ÷ 3 = 4. You can act it out by dealing the berries one at a time, like dealing cards, until they are all gone.",
      "The second kind is grouping. You know how many go in each group, and you want to know how many groups you can make. If a balloon basket holds 5 people and 15 people want a ride, you need 15 ÷ 5 = 3 baskets. You can act this out by making groups of 5 until nobody is left.",
      "The number being divided is called the dividend. The number you divide by is the divisor. The answer is the quotient. In 12 ÷ 3 = 4, the dividend is 12, the divisor is 3 and the quotient is 4.",
      "Here is the secret that makes division easy: division is multiplication backwards. To find 32 ÷ 8, ask yourself what times 8 makes 32. You know 4 × 8 = 32, so 32 ÷ 8 = 4. Multiplication and division facts come in families. The family for 3, 4 and 12 is 3 × 4 = 12, 4 × 3 = 12, 12 ÷ 3 = 4 and 12 ÷ 4 = 3. When you know one fact, you know the whole family.",
    ].join("\n\n"),
    keyIdeas: [
      "Division splits a total into equal groups.",
      "Sharing: you know the number of groups and find how many in each. Grouping: you know the size of each group and find how many groups.",
      "Division is multiplication backwards: 32 ÷ 8 asks what times 8 makes 32.",
      "Fact families connect multiplication and division: 3 × 4 = 12 and 12 ÷ 3 = 4.",
    ],
    hook: {
      text: "Three friends find a bush of sky berries on a floating island. They pick 12 berries. Everybody wants a fair share, with nobody getting more than anyone else. How many berries should each friend get? And how can you be sure it's fair?",
    },
    teach: [
      {
        title: "Sharing Equally",
        teach:
          "Division means splitting a total into equal groups. Sharing is the first kind. You know how many groups there are. You want to find how many go in each group. Three friends share 12 berries. Deal them out one at a time, like dealing cards. One for you, one for you, one for you. Keep going until the berries are gone. Each friend ends up with 4. We write 12 divided by 3 equals 4. The number being divided is the dividend. The number you divide by is the divisor. The answer is the quotient.",
        visual: {
          type: "flip",
          cards: [
            { front: "12 ÷ 3", back: "12 shared equally by 3. Each gets 4." },
            { front: "Dividend", back: "The number being divided. In 12 ÷ 3 = 4, it is 12." },
            { front: "Divisor", back: "The number you divide by. In 12 ÷ 3 = 4, it is 3." },
            { front: "Quotient", back: "The answer to a division problem. In 12 ÷ 3 = 4, it is 4." },
          ],
        },
        probe: {
          type: "number",
          prompt: "🫐 18 berries are shared equally by 3 friends. How many berries does each friend get?",
          answer: 6,
          unit: "berries",
          hint: "Deal the berries out one at a time to 3 friends. Or ask: 3 times what makes 18?",
          mistakes: [
            { match: "15", coach: "15 is 18 - 3. We are splitting 18 into 3 equal shares, not taking 3 away." },
            { match: "21", coach: "21 is 18 + 3. Sharing makes each pile smaller than the total." },
          ],
          seconds: 30,
        },
        think: {
          q: "20 marbles shared equally by 4 kids. How many does each kid get?",
          choices: ["5", "16", "24"],
          answer: 0,
          why: "20 ÷ 4 = 5, because 4 × 5 = 20.",
          hints: ["", "16 is 20 - 4. Sharing splits 20 into 4 equal piles.", "24 is 20 + 4. Sharing makes smaller piles, not a bigger total."],
        },
        approaches: {
          analogy:
            "Sharing is like dealing cards in a game. Everyone gets one card, then another, around and around, until the deck is gone. Then everyone has the same number.",
          example:
            "15 crayons go into 5 cups equally. Put one in each cup: that uses 5. Again: 10. Again: 15. Each cup has 3 crayons, so 15 ÷ 5 = 3.",
          simpler: {
            q: "6 cookies shared by 2 friends. How many each?",
            choices: ["4", "3", "8"],
            answer: 1,
            why: "3 + 3 = 6, so each friend gets 3.",
            hints: ["4 + 4 is 8, which is more than 6 cookies.", "", "8 is more cookies than we have. Split 6 into 2 equal piles."],
          },
        },
      },
      {
        title: "Making Groups",
        teach:
          "The second kind of division is grouping. This time you know how many go in each group. You want to find how many groups you can make. A sky balloon basket holds 5 people. Fifteen people want a ride. How many baskets do we need? Make groups of 5 until nobody is left: 5, 10, 15. That is 3 groups. So 15 divided by 5 equals 3 baskets. Sharing and grouping use the same sign. The question is just different. Are you finding the size of each group, or the number of groups?",
        visual: {
          type: "compare",
          left: { title: "Sharing", points: ["You know how many groups", "Find how many in each group", "12 berries, 3 friends: 4 each"] },
          right: { title: "Grouping", points: ["You know how many in each group", "Find how many groups", "15 people, 5 per basket: 3 baskets"] },
        },
        probe: {
          type: "sort",
          prompt: "Is each problem sharing or grouping?",
          buckets: ["Sharing: find how many in each group", "Grouping: find how many groups"],
          items: [
            { text: "24 stickers shared by 4 kids. How many each?", bucket: 0 },
            { text: "30 apples go into 5 baskets equally. How many in each basket?", bucket: 0 },
            { text: "28 legs. Each horse has 4 legs. How many horses?", bucket: 1 },
            { text: "40 cards in packs of 10. How many packs?", bucket: 1 },
            { text: "18 kids in teams of 6. How many teams?", bucket: 1 },
          ],
          hint: "Look for what you already know. If you know the number of groups, it is sharing. If you know the size of each group, it is grouping.",
          seconds: 50,
        },
        think: {
          q: "35 people ride in boats that hold 7 each. How many boats?",
          choices: ["28", "42", "5"],
          answer: 2,
          why: "Groups of 7: 7, 14, 21, 28, 35. That is 5 boats.",
          hints: [
            "28 is 35 - 7. Count how many groups of 7 make 35.",
            "42 is 35 + 7. We want how many groups of 7 fit into 35.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Grouping is like packing eggs into cartons of 12. You keep filling cartons until the eggs run out, then count the cartons.",
          example:
            "24 wheels. Each wagon has 4 wheels. Count by 4s: 4, 8, 12, 16, 20, 24. That is 6 jumps, so 24 ÷ 4 = 6 wagons.",
          simpler: {
            q: "10 socks in pairs of 2. How many pairs?",
            choices: ["5", "8", "12"],
            answer: 0,
            why: "Count by 2s: 2, 4, 6, 8, 10. That is 5 pairs.",
            hints: ["", "8 is 10 - 2. Count the groups of 2 instead.", "12 is more than the 10 socks we have."],
          },
        },
      },
      {
        title: "Division Is Multiplication Backwards",
        teach:
          "Here is the secret that makes division easy. Every division problem hides a multiplication problem. To find 32 divided by 8, ask: what times 8 makes 32? You know 4 times 8 is 32. So 32 divided by 8 is 4. The missing number is a factor. Facts come in families of four. The family for 3, 4 and 12 is: 3 times 4 is 12, 4 times 3 is 12, 12 divided by 3 is 4, and 12 divided by 4 is 3. Know one fact, and you know the whole family.",
        visual: {
          type: "hotspots",
          title: "The fact family for 3, 4 and 12",
          center: "3, 4, 12",
          spots: [
            { label: "3 × 4 = 12", icon: "✖️", detail: "3 groups of 4 make 12." },
            { label: "4 × 3 = 12", icon: "🔄", detail: "Turn it around: 4 groups of 3 also make 12." },
            { label: "12 ÷ 3 = 4", icon: "➗", detail: "Share 12 by 3 and each gets 4." },
            { label: "12 ÷ 4 = 3", icon: "➗", detail: "Share 12 by 4 and each gets 3." },
          ],
        },
        probe: {
          type: "cloze",
          text: "To find 56 ÷ 8, think {0} × 8 = 56. So 56 ÷ 8 = {1}.",
          blanks: [{ answers: ["7"] }, { answers: ["7", "seven"] }],
          bank: ["7", "6", "48", "64"],
          hint: "Count by 8s until you reach 56: 8, 16, 24, 32, 40, 48, 56. How many jumps?",
          mistakes: [
            { match: "6", coach: "6 × 8 is 48. One more 8 makes 56." },
            { match: "48", coach: "48 is 56 - 8. We want how many 8s make 56." },
          ],
          seconds: 40,
        },
        think: {
          q: "Which multiplication fact helps you solve 27 ÷ 3?",
          choices: ["3 × 9 = 27", "3 + 24 = 27", "27 - 3 = 24"],
          answer: 0,
          why: "27 ÷ 3 asks what times 3 makes 27. 9 × 3 = 27, so the answer is 9.",
          hints: ["", "That is an addition fact. Division hides a multiplication fact.", "Taking away 3 once doesn't split 27 into groups of 3."],
        },
        approaches: {
          analogy:
            "Division and multiplication are like going up and down the same staircase. Multiplying takes you up to 32. Dividing walks you back down to see how many steps of 8 it took.",
          example:
            "45 ÷ 5: what times 5 makes 45? Count by 5s: 5, 10, 15, 20, 25, 30, 35, 40, 45. That is 9. So 45 ÷ 5 = 9, because 9 × 5 = 45.",
          simpler: {
            q: "2 × 5 = 10. So what is 10 ÷ 2?",
            choices: ["8", "5", "12"],
            answer: 1,
            why: "10 ÷ 2 asks what times 2 makes 10. That is 5.",
            hints: ["8 is 10 - 2. Use the multiplication fact: 2 × 5 = 10.", "", "12 is 10 + 2. Division makes the number smaller."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each division problem by its quotient (the answer).",
      buckets: ["Quotient is 4", "Quotient is 6", "Quotient is 9"],
      items: [
        { text: "32 ÷ 8", bucket: 0 },
        { text: "20 ÷ 5", bucket: 0 },
        { text: "🫐 16 berries shared by 4 friends", bucket: 0 },
        { text: "42 ÷ 7", bucket: 1 },
        { text: "36 ÷ 6", bucket: 1 },
        { text: "🎈 30 people, 5 per basket: how many baskets?", bucket: 1 },
        { text: "81 ÷ 9", bucket: 2 },
        { text: "27 ÷ 3", bucket: 2 },
        { text: "🍪 18 cookies in bags of 2: how many bags?", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Explain to Professor Pascal how you would find 24 ÷ 6. What multiplication fact helps?",
      keyPoints: [
        "24 ÷ 6 means splitting 24 into equal groups",
        "Ask what times 6 makes 24",
        "4 × 6 = 24",
        "So 24 ÷ 6 = 4",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "🚤 48 travelers ride sky boats. Each boat holds 8. How many boats do they need?",
        answer: 6,
        unit: "boats",
        hint: "Count by 8s until you reach 48, or ask: what times 8 makes 48?",
        mistakes: [{ match: "40", coach: "40 is 48 - 8. Count how many groups of 8 make 48." }],
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each division fact to the multiplication fact that solves it.",
        pairs: [
          { left: "35 ÷ 5", right: "7 × 5 = 35" },
          { left: "54 ÷ 9", right: "6 × 9 = 54" },
          { left: "16 ÷ 2", right: "8 × 2 = 16" },
          { left: "21 ÷ 3", right: "7 × 3 = 21" },
        ],
        hint: "Look at the number you divide by. Find the multiplication fact with that number and the same total.",
        seconds: 45,
      },
      {
        type: "cloze",
        text: "Finish the fact family for 5, 9 and 45: 5 × 9 = {0}, 9 × {1} = 45, 45 ÷ 5 = {2}.",
        blanks: [{ answers: ["45"] }, { answers: ["5"] }, { answers: ["9"] }],
        bank: ["45", "5", "9", "14", "40"],
        hint: "Every fact in the family uses the same three numbers: 5, 9 and 45.",
        mistakes: [
          { match: "14", coach: "14 is 5 + 9. A fact family multiplies: 5 × 9 = 45." },
          { match: "40", coach: "40 is 5 × 8. Use the numbers in this family: 5, 9 and 45." },
        ],
        seconds: 40,
      },
      {
        type: "build",
        prompt: "4 friends share 28 shells equally. Build the division sentence.",
        tiles: ["28", "÷", "4", "=", "7"],
        distractors: ["×", "24"],
        hint: "Start with the total, 28. Divide by the number of friends.",
        seconds: 30,
      },
    ],
    check: [
      { q: "15 apples shared equally by 3 kids. How many does each kid get?", choices: ["12", "5", "18"], answer: 1, why: "15 ÷ 3 = 5, because 5 × 3 = 15." },
      { q: "Which fact helps you find 63 ÷ 9?", choices: ["9 + 54 = 63", "63 - 9 = 54", "7 × 9 = 63"], answer: 2, why: "63 ÷ 9 asks what times 9 makes 63. That is 7." },
      { q: "In 20 ÷ 4 = 5, what is 5 called?", choices: ["The quotient", "The divisor", "The dividend"], answer: 0, why: "The answer to a division problem is the quotient." },
      { q: "? ÷ 4 = 6. What is the missing number?", choices: ["10", "2", "24"], answer: 2, why: "6 groups of 4 make 24, so 24 ÷ 4 = 6." },
    ],
    task: {
      kind: "project",
      prompt: "Get 24 small things (beans, coins or blocks). With a parent, share them equally into 2, 3, 4, 6 and 8 piles. Write a division sentence for each one, plus the multiplication fact that matches it.",
      rubric: [
        "Shares the 24 things into equal piles each time",
        "Writes a correct division sentence for each sharing",
        "Writes the matching multiplication fact for each one",
      ],
    },
  },

  // 3. Properties and fact strategies
  {
    id: "math-3.properties",
    title: "Multiplication Tricks: Properties and Strategies",
    minutes: 30,
    stage: "logic",
    standards: ["3.OA.B.5", "3.OA.C.7"],
    read: [
      "By the end of third grade, a mathematician knows all the multiplication facts up to 10 × 10 by heart. That sounds like a lot to memorize. But you don't have to learn each fact alone. A few clever rules, called properties, do most of the work.",
      "The commutative property says you can multiply in any order. 3 × 8 and 8 × 3 are both 24. So if you know one, you know the other. That cuts the facts to learn almost in half. Two more rules help: any number times 1 is itself, and any number times 0 is 0.",
      "The associative property says you can group factors in any way. 2 × 3 × 5 can be done as 6 × 5 or as 2 × 15. Both make 30. Pick the grouping that is easiest.",
      "The distributive property lets you break a hard fact into easy ones. To find 7 × 8, split the 8 into 5 and 3. 7 × 5 = 35 and 7 × 3 = 21. Add them: 35 + 21 = 56. So 7 × 8 = 56.",
      "Some facts have patterns that help. Times 2 is doubling. Times 4 is doubling and doubling again. Times 5 always ends in 0 or 5, and times 10 just adds a zero. For times 9, multiply by 10 and take one group away: 9 × 6 = 60 - 6 = 54.",
      "Use these tricks while you practice, and the facts will come faster every day until you just know them.",
    ].join("\n\n"),
    keyIdeas: [
      "You can multiply in any order: 3 × 8 = 8 × 3.",
      "You can group factors any way: (2 × 3) × 5 = 2 × (3 × 5).",
      "Break a hard fact into easy ones: 7 × 8 = 7 × 5 + 7 × 3 = 35 + 21 = 56.",
      "Patterns help: ×2 doubles, ×4 doubles twice, ×10 adds a zero, ×9 is ×10 minus one group.",
    ],
    hook: {
      text: "There are 100 facts in the multiplication table, from 1 × 1 all the way to 10 × 10. Does a mathematician really memorize all 100, one at a time? No way! Today you'll learn four tricks that make the table shrink before your eyes.",
    },
    teach: [
      {
        title: "Any Order Works",
        teach:
          "Here is the first trick. You can multiply in any order and get the same product. Three rows of 8 chairs is 24 chairs. Turn the rows sideways and you have 8 rows of 3. Still 24 chairs! Mathematicians call this the commutative property. It means that if you know 3 times 8, you also know 8 times 3. That cuts the facts to learn almost in half. Two more rules are easy. Any number times 1 is itself. Any number times 0 is 0, because zero groups hold nothing.",
        visual: {
          type: "flip",
          cards: [
            { front: "3 × 8 and 8 × 3", back: "Both are 24. You can multiply in any order (the commutative property)." },
            { front: "9 × 1", back: "9. One group of 9 is just 9." },
            { front: "7 × 0", back: "0. Seven groups of nothing is nothing." },
          ],
        },
        probe: {
          type: "cloze",
          text: "6 × 9 = 54, so 9 × 6 = {0}. 8 × 1 = {1}. 5 × 0 = {2}.",
          blanks: [{ answers: ["54"] }, { answers: ["8"] }, { answers: ["0", "zero"] }],
          bank: ["54", "8", "0", "1", "5", "15"],
          hint: "Turning the factors around keeps the product the same. Times 1 keeps a number the same. Times 0 makes 0.",
          mistakes: [
            { match: "1", coach: "8 × 1 means one group of 8, which is 8." },
            { match: "5", coach: "5 × 0 means 5 groups with nothing in them. That is 0." },
          ],
          seconds: 35,
        },
        think: {
          q: "You know 4 × 7 = 28. What is 7 × 4?",
          choices: ["11", "28", "47"],
          answer: 1,
          why: "You can multiply in any order, so 7 × 4 = 28 too.",
          hints: [
            "11 is 7 + 4. Turning the factors around keeps the product: 28.",
            "",
            "Don't put the digits side by side. Swap the order and the product stays 28.",
          ],
        },
        approaches: {
          analogy:
            "It's like a box of chocolates with 2 rows of 6. Spin the box around and you see 6 rows of 2. You didn't eat any chocolates, so there are still 12.",
          example:
            "Stuck on 9 × 2? Flip it to 2 × 9. Doubling 9 is easy: 9 + 9 = 18. So 9 × 2 = 18.",
          simpler: {
            q: "2 × 5 = 10. What is 5 × 2?",
            choices: ["7", "25", "10"],
            answer: 2,
            why: "Same factors, any order: 10.",
            hints: ["7 is 5 + 2. Multiply, and the order doesn't matter.", "That puts the digits side by side. 5 × 2 is the same as 2 × 5.", ""],
          },
        },
      },
      {
        title: "Group Any Way",
        teach:
          "Sometimes you multiply three numbers. Say a balloon shop has 2 shelves. Each shelf has 3 boxes, and each box has 5 balloons. That is 2 times 3 times 5. You can group the numbers any way you like. Do 2 times 3 first to get 6, then 6 times 5 is 30. Or do 3 times 5 first to get 15, then 2 times 15 is 30. Same answer! This is the associative property. Smart mathematicians pick the grouping that makes the problem easiest. Grouping 2 and 5 makes 10, and tens are easy.",
        visual: {
          type: "compare",
          left: { title: "(2 × 3) × 5", points: ["First 2 × 3 = 6", "Then 6 × 5 = 30"] },
          right: { title: "2 × (3 × 5)", points: ["First 3 × 5 = 15", "Then 2 × 15 = 30"] },
        },
        probe: {
          type: "number",
          prompt: "Use a smart grouping: 5 × 7 × 2 = ? (Try 5 × 2 first.)",
          answer: 70,
          hint: "5 × 2 = 10. Then 10 × 7 is easy.",
          mistakes: [
            { match: "14", coach: "14 is just 7 × 2. Multiply by the 5 too: 10 × 7 = 70." },
            { match: "35", coach: "35 is 5 × 7. Don't forget to multiply by the 2 as well." },
          ],
          seconds: 35,
        },
        think: {
          q: "Which grouping makes 4 × 5 × 3 easiest?",
          choices: ["(4 × 5) × 3 = 20 × 3", "4 + 5 + 3", "4 × 53"],
          answer: 0,
          why: "4 × 5 = 20, and 20 × 3 = 60 is easy to find.",
          hints: ["", "We are multiplying, not adding. Group two of the factors.", "5 and 3 are separate factors. Don't stick them together into 53."],
        },
        approaches: {
          analogy:
            "Grouping factors is like carrying groceries. Whether you put the milk and eggs in one bag first or the eggs and bread first, you still carry home the same food.",
          example:
            "3 × 2 × 4: group (3 × 2) = 6, then 6 × 4 = 24. Or (2 × 4) = 8, then 3 × 8 = 24. Both make 24.",
          simpler: {
            q: "What is 2 × 5?",
            choices: ["7", "10", "25"],
            answer: 1,
            why: "Two groups of 5 make 10.",
            hints: ["7 is 2 + 5. Two groups of 5 is 5 + 5.", "", "Don't put the digits side by side. Two groups of 5 is 10."],
          },
        },
      },
      {
        title: "Break Apart a Hard Fact",
        teach:
          "What if you forget 7 times 8? Break it into easy pieces! Think of 7 rows of 8 dots. Cut each row into 5 dots and 3 dots. Now you have two easy facts. 7 times 5 is 35. 7 times 3 is 21. Put them back together: 35 plus 21 is 56. So 7 times 8 is 56. This is the distributive property. Fives and tens make great pieces because they are easy to multiply. You can always build a hard fact from facts you already know.",
        visual: {
          type: "hotspots",
          title: "Break apart 7 × 8",
          center: "7 × 8 = 56",
          spots: [
            { label: "Split the 8", icon: "✂️", detail: "8 = 5 + 3. Cut each row of 8 into 5 and 3." },
            { label: "7 × 5", icon: "🖐️", detail: "7 rows of 5 = 35." },
            { label: "7 × 3", icon: "🔢", detail: "7 rows of 3 = 21." },
            { label: "Add", icon: "➕", detail: "35 + 21 = 56. So 7 × 8 = 56." },
          ],
        },
        probe: {
          type: "cloze",
          text: "6 × 7 = 6 × 5 + 6 × 2 = {0} + {1} = {2}",
          blanks: [{ answers: ["30"] }, { answers: ["12"] }, { answers: ["42"] }],
          bank: ["30", "12", "42", "35", "13"],
          hint: "Find 6 × 5 and 6 × 2 first. Then add them.",
          mistakes: [
            { match: "35", coach: "35 is 7 × 5. Here we need 6 × 5, which is 30." },
            { match: "13", coach: "13 is 6 + 7. Multiply the pieces: 30 + 12." },
          ],
          seconds: 45,
        },
        think: {
          q: "Which is a way to break apart 8 × 6?",
          choices: ["8 × 3 + 8 × 3", "8 + 6", "8 × 3 + 6"],
          answer: 0,
          why: "6 = 3 + 3, so 8 × 6 = 8 × 3 + 8 × 3 = 24 + 24 = 48.",
          hints: [
            "",
            "Adding 8 + 6 gives 14, not 48. Break the 6 into pieces and multiply each by 8.",
            "Both pieces need to be multiplied by 8. The 6 must become 3 + 3.",
          ],
        },
        approaches: {
          analogy:
            "It's like paying for 8 snacks that cost 7 cents each. Pay for 5 snacks, then 3 more snacks. Add the two amounts, and you've paid for all 8.",
          example:
            "9 × 7: split 7 into 5 and 2. 9 × 5 = 45 and 9 × 2 = 18. 45 + 18 = 63. So 9 × 7 = 63.",
          simpler: {
            q: "4 × 5 = 20 and 4 × 1 = 4. What is 4 × 6?",
            choices: ["24", "20", "10"],
            answer: 0,
            why: "6 = 5 + 1, so 4 × 6 = 20 + 4 = 24.",
            hints: ["", "20 is just 4 × 5. Add the extra group: 4 × 1.", "10 is 4 + 6. Use the pieces: 20 + 4."],
          },
        },
      },
      {
        title: "Fact Patterns",
        teach:
          "Some facts have patterns that make them quick. Times 2 is doubling: 2 times 8 is 8 plus 8, which is 16. Times 4 is doubling twice. For 4 times 7, double 7 to get 14, then double 14 to get 28. Times 5 always ends in 0 or 5. Times 10 just puts a zero on the end, so 10 times 6 is 60. Times 9 has a clever trick. Multiply by 10, then take one group away. 9 times 6 is 60 minus 6, which is 54. Practice a few facts each day, and soon you'll just know them.",
        visual: {
          type: "flip",
          cards: [
            { front: "× 2", back: "Double it. 2 × 8 = 8 + 8 = 16." },
            { front: "× 4", back: "Double, then double again. 4 × 7: 14, then 28." },
            { front: "× 5", back: "Ends in 0 or 5. Half of times 10: 5 × 8 = 40." },
            { front: "× 10", back: "Put a zero on the end. 10 × 6 = 60." },
            { front: "× 9", back: "Times 10, minus one group. 9 × 6 = 60 - 6 = 54." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Use a pattern to match each fact to its product.",
          pairs: [
            { left: "4 × 6 (double 6, then double again)", right: "24" },
            { left: "9 × 8 (80 minus 8)", right: "72" },
            { left: "10 × 7", right: "70" },
            { left: "5 × 9", right: "45" },
          ],
          hint: "Double twice for 4s. For 9s, multiply by 10 and take one group away.",
          seconds: 45,
        },
        think: {
          q: "How can you find 9 × 4 using the times-10 trick?",
          choices: ["40 + 4 = 44", "40 - 4 = 36", "9 + 4 = 13"],
          answer: 1,
          why: "10 × 4 = 40. Nine groups is one group less: 40 - 4 = 36.",
          hints: [
            "Nine groups is one group less than ten, so take 4 away instead of adding.",
            "",
            "That adds the numbers. Multiply: 10 × 4 = 40, then take away one 4.",
          ],
        },
        approaches: {
          analogy:
            "The 9s trick is like buying 9 tickets when 10 tickets cost $40. Nine tickets is just $40 minus one ticket.",
          example:
            "4 × 8: double 8 is 16. Double 16 is 32. So 4 × 8 = 32.",
          simpler: {
            q: "What is double 7?",
            choices: ["14", "9", "77"],
            answer: 0,
            why: "7 + 7 = 14.",
            hints: ["", "9 is 7 + 2. Doubling 7 means 7 + 7.", "Don't write the 7 twice. Add 7 + 7."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which trick is each one using?",
      buckets: ["Any order", "Group any way", "Break apart"],
      items: [
        { text: "6 × 4 = 4 × 6", bucket: 0 },
        { text: "9 × 2 = 2 × 9", bucket: 0 },
        { text: "(2 × 5) × 7 = 2 × (5 × 7)", bucket: 1 },
        { text: "3 × 2 × 5 = 3 × 10", bucket: 1 },
        { text: "7 × 8 = 7 × 5 + 7 × 3", bucket: 2 },
        { text: "6 × 9 = 6 × 10 - 6", bucket: 2 },
        { text: "8 × 6 = 8 × 3 + 8 × 3", bucket: 2 },
      ],
    },
    explain: {
      prompt: "You forgot 6 × 8. Explain to Professor Pascal two different tricks you could use to find it.",
      keyPoints: [
        "Turn it around: 8 × 6 is the same",
        "Break 8 into 5 and 3: 6 × 5 = 30 and 6 × 3 = 18",
        "Add the pieces: 30 + 18 = 48",
        "Or double 6 × 4 = 24 to get 48",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "8 × 7 = 8 × 5 + 8 × 2 = {0} + {1} = {2}",
        blanks: [{ answers: ["40"] }, { answers: ["16"] }, { answers: ["56"] }],
        bank: ["40", "16", "56", "15", "54"],
        hint: "Find 8 × 5 and 8 × 2. Then add.",
        mistakes: [{ match: "54", coach: "Check the adding: 40 + 16 = 56." }],
        seconds: 45,
      },
      {
        type: "number",
        prompt: "Use the times-10 trick: 9 × 7 = ?",
        answer: 63,
        hint: "10 × 7 = 70. Take one 7 away.",
        mistakes: [{ match: "77", coach: "Nine groups is one group less than ten, so subtract: 70 - 7 = 63." }],
        seconds: 25,
      },
      {
        type: "number",
        prompt: "Group smartly: 2 × 9 × 5 = ?",
        answer: 90,
        hint: "2 × 5 = 10 first. Then 10 × 9.",
        mistakes: [{ match: "16", coach: "16 adds the numbers. Multiply: 2 × 5 = 10, and 10 × 9 = 90." }],
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each fact to its product.",
        pairs: [
          { left: "6 × 6", right: "36" },
          { left: "7 × 7", right: "49" },
          { left: "8 × 4", right: "32" },
          { left: "9 × 3", right: "27" },
          { left: "6 × 0", right: "0" },
        ],
        hint: "Use your tricks: doubles, break apart, times 10 minus one group.",
        seconds: 50,
      },
    ],
    check: [
      { q: "8 × 3 = 24. What is 3 × 8?", choices: ["11", "38", "24"], answer: 2, why: "You can multiply in any order, so 3 × 8 = 24." },
      { q: "Which equals 7 × 6?", choices: ["7 × 5 + 7 × 1", "7 + 6", "7 × 5 + 1"], answer: 0, why: "6 = 5 + 1, so 7 × 6 = 35 + 7 = 42." },
      { q: "What is 9 × 0?", choices: ["9", "0", "1"], answer: 1, why: "Nine groups of nothing is nothing: 0." },
      { q: "What is 4 × 9?", choices: ["36", "32", "45"], answer: 0, why: "Double 9 is 18, double 18 is 36. Or 10 × 4 - 4 = 36." },
    ],
    task: {
      kind: "project",
      prompt: "Make a 10 × 10 multiplication table with a parent. Color all the facts you already know in one color. Then pick 5 facts you don't know yet and write a trick for each (turn it around, break it apart, double, or times 10). Practice them for 5 minutes a day this week.",
      rubric: [
        "Builds a correct 10 × 10 multiplication table",
        "Writes a working trick for 5 facts that were hard",
        "Practices and can say those 5 facts quickly by the end of the week",
      ],
    },
  },

  // 4. Two-step word problems and patterns
  {
    id: "math-3.problems",
    title: "Two-Step Problems and Number Patterns",
    minutes: 30,
    stage: "logic",
    standards: ["3.OA.D.8", "3.OA.D.9", "3.OA.A.3"],
    read: [
      "Some word problems take two steps. Read this one: The balloon shop had 50 balloons. It sold 4 bunches of 6 balloons. How many balloons are left? First find how many were sold: 4 × 6 = 24. Then find how many are left: 50 - 24 = 26. Each step answers a smaller question on the way to the big one.",
      "Mathematicians often use a letter for the number they don't know yet. We could write the second step as 50 - 24 = b, where b stands for the balloons left. A letter is just a placeholder, like an empty box waiting for its number.",
      "After you solve a problem, ask: does my answer make sense? One way to check is to estimate. Round the numbers to easy ones and do the math in your head. If a store sold about 20 balloons out of about 50, about 30 should be left. Our answer, 26, is close to 30, so it makes sense. If we had gotten 74, we would know something went wrong, because the shop can't have more balloons left than it started with.",
      "Numbers are full of patterns, and spotting them is part of thinking like a mathematician. In the times table, every product of 2 is even. Every product of 4 is even too, because 4 groups are the same as 2 groups doubled. Products of 5 end in 0 or 5. And when you add two odd numbers, like 3 + 5, the answer is always even. Patterns help you check your work and remember your facts.",
    ].join("\n\n"),
    keyIdeas: [
      "Two-step problems: solve a smaller question first, then use its answer.",
      "A letter can stand for the unknown number: 50 - 24 = b.",
      "Estimate with rounded numbers to check that an answer makes sense.",
      "Patterns help: products of 4 are always even, and products of 5 end in 0 or 5.",
    ],
    hook: {
      text: "The balloon shop starts the day with 50 balloons. By lunch, it has sold 4 bunches of 6. The shopkeeper needs at least 20 balloons for the afternoon bridge lift. Does she have enough, or must she blow up more? You'll need two steps to find out.",
    },
    teach: [
      {
        title: "Two Steps to the Answer",
        teach:
          "Some problems hide two questions inside. The balloon shop had 50 balloons and sold 4 bunches of 6. How many are left? Step one: how many were sold? 4 times 6 is 24. Step two: how many are left? 50 minus 24 is 26. The shop has 26 balloons, so it has enough for the bridge lift. A good plan is to ask, what do I need to know first? Find that, then use it to answer the big question.",
        visual: {
          type: "hotspots",
          title: "Solving a two-step problem",
          center: "50 - (4 × 6) = 26",
          spots: [
            { label: "Read", icon: "📖", detail: "50 balloons. Sold 4 bunches of 6. How many are left?" },
            { label: "Step 1", icon: "1️⃣", detail: "How many were sold? 4 × 6 = 24." },
            { label: "Step 2", icon: "2️⃣", detail: "How many are left? 50 - 24 = 26." },
            { label: "Answer", icon: "✅", detail: "26 balloons are left. That's more than 20, so there are enough." },
          ],
        },
        probe: {
          type: "number",
          prompt: "🚤 Sky boats carry 3 people each. 8 boats are full, and 5 more people are waiting on the dock. How many people are there in all?",
          answer: 29,
          unit: "people",
          hint: "Step 1: people in the boats, 8 × 3. Step 2: add the people waiting.",
          mistakes: [
            { match: "24", coach: "24 is just the people in the boats. Add the 5 people still waiting." },
            { match: "16", coach: "16 adds 8 + 3 + 5. The boats hold 3 people each, so multiply 8 × 3 first." },
          ],
          seconds: 50,
        },
        think: {
          q: "Max had $30. He bought 3 kites for $6 each. What should he find first?",
          choices: ["30 + 6", "How much the kites cost: 3 × 6", "30 + 3"],
          answer: 1,
          why: "First find the cost of the kites, 3 × 6 = $18. Then 30 - 18 = $12 left.",
          hints: [
            "Adding $6 doesn't fit. He spent money, and he bought 3 kites, not 1.",
            "",
            "3 is the number of kites, not dollars. First find what all 3 kites cost.",
          ],
        },
        approaches: {
          analogy:
            "A two-step problem is like crossing two bridges to reach a far island. You can't jump to the end. You cross the first bridge, then the second.",
          example:
            "Mia read 5 pages a day for 6 days, then 7 more pages. Step 1: 5 × 6 = 30. Step 2: 30 + 7 = 37 pages.",
          simpler: {
            q: "4 bags with 5 apples each. How many apples?",
            choices: ["9", "20", "45"],
            answer: 1,
            why: "4 × 5 = 20.",
            hints: ["9 is 4 + 5. Each bag has 5, so multiply.", "", "Don't put the digits side by side. 4 groups of 5 is 20."],
          },
        },
      },
      {
        title: "Letters for Unknowns",
        teach:
          "Mathematicians often use a letter to stand for a number they don't know yet. The letter is like an empty box waiting for its number. Here's a problem. Four friends share 36 sky berries equally. Then each friend eats 2. How many berries does each friend have left? Step one: 36 divided by 4 is 9. Step two: 9 minus 2 equals n. The letter n stands for the berries left. Now solve it: n is 7. Writing the letter helps you see exactly what you are looking for.",
        visual: {
          type: "flip",
          cards: [
            { front: "n", back: "A letter that stands for an unknown number, like an empty box." },
            { front: "36 ÷ 4 = 9", back: "Step 1: each friend's share of the berries." },
            { front: "9 - 2 = n", back: "Step 2: each friend eats 2. n = 7." },
          ],
        },
        probe: {
          type: "build",
          prompt: "Jo has 5 packs of 8 stickers. She gives away 12. Build the equation for step 2, with s for the stickers left. (Step 1: 5 × 8 = 40.)",
          tiles: ["40", "-", "12", "=", "s"],
          distractors: ["+", "8"],
          hint: "She starts with 40 stickers and gives some away. Giving away means subtract.",
          seconds: 40,
        },
        think: {
          q: "A farmer has 6 rows of 7 plants. He picks 10 plants. Which equation finds p, the plants left, after step 1?",
          choices: ["42 - 10 = p", "42 + 10 = p", "7 - 6 = p"],
          answer: 0,
          why: "6 × 7 = 42 plants. Picking 10 means take away: 42 - 10 = p, so p = 32.",
          hints: ["", "Picking plants makes fewer plants, so subtract, don't add.", "That compares the rows and plants. First multiply 6 × 7 to find all the plants."],
        },
        approaches: {
          analogy:
            "A letter in math is like a name tag on a present you haven't opened yet. You know something is in there. Solving the problem opens the box.",
          example:
            "There are 3 vans with 9 kids in each. 4 kids go home. 3 × 9 = 27. Then 27 - 4 = k. k = 23 kids.",
          simpler: {
            q: "10 - 3 = n. What is n?",
            choices: ["13", "7", "3"],
            answer: 1,
            why: "10 take away 3 is 7.",
            hints: ["13 is 10 + 3. The sign says subtract.", "", "3 is what we took away. What is left is n."],
          },
        },
      },
      {
        title: "Does It Make Sense?",
        teach:
          "Good mathematicians check their answers. One way is to estimate. Round the numbers to friendly ones and do the math in your head. Say a shop had 52 balloons and sold 19. Round them: 50 minus 20 is about 30. If you solved it and got 33, that's close to 30, so it makes sense. If you got 71, something went wrong. A shop can't have more balloons left than it started with! Always ask: is my answer too big, too small, or about right?",
        visual: {
          type: "compare",
          left: { title: "Exact", points: ["52 - 19", "= 33", "The true answer"] },
          right: { title: "Estimate", points: ["50 - 20", "= about 30", "Checks that 33 makes sense"] },
        },
        probe: {
          type: "highlight",
          prompt: "Each kid solved 61 - 28. Estimate (60 - 30). Tap the answers that make sense.",
          sentences: ["Ava got 33.", "Ben got 89.", "Cal got 47.", "Dee got 33 and checked it: 33 + 28 = 61."],
          correct: [0, 3],
          hint: "60 - 30 is 30. A sensible answer is close to 30.",
          seconds: 40,
        },
        think: {
          q: "Sam says 48 + 31 = 59. Estimate: 50 + 30. Is Sam's answer reasonable?",
          choices: ["Yes, it is close to 80", "No, it should be close to 80", "Yes, adding makes smaller numbers"],
          answer: 1,
          why: "50 + 30 = 80. 59 is far from 80, so Sam made a mistake. The real answer is 79.",
          hints: [
            "59 is not close to 80. It is 21 away. Check the estimate again.",
            "",
            "Adding makes numbers bigger. 48 + 31 must be more than 48 and more than 31.",
          ],
        },
        approaches: {
          analogy:
            "Estimating is like looking at a mountain before you climb it. You don't know exactly how tall it is, but you know it's not as small as a house.",
          example:
            "39 + 42: estimate 40 + 40 = 80. Solve: 39 + 42 = 81. 81 is close to 80, so the answer makes sense.",
          simpler: {
            q: "About how much is 29 + 21?",
            choices: ["About 50", "About 10", "About 90"],
            answer: 0,
            why: "29 is about 30 and 21 is about 20. 30 + 20 = 50.",
            hints: ["", "That's too small. Round 29 to 30 and 21 to 20, then add.", "That's too big. 30 + 20 is 50."],
          },
        },
      },
      {
        title: "Patterns in the Table",
        teach:
          "Numbers are full of patterns, and spotting them is real mathematician work. Look at the times table. Every product of 2 is even: 2, 4, 6, 8, 10. Every product of 4 is even too. Why? Four groups is just two groups doubled, and doubling always makes an even number. Products of 5 end in 0 or 5. Here's one more. Add two odd numbers, like 3 plus 5, and you always get an even number. Odd plus odd is even. Patterns help you check answers and remember facts.",
        visual: {
          type: "flip",
          cards: [
            { front: "× 2 and × 4", back: "Always even: 8, 12, 16, 20, 24." },
            { front: "× 5", back: "Always ends in 0 or 5: 15, 20, 25, 30." },
            { front: "Odd + odd", back: "Always even: 3 + 5 = 8, 7 + 9 = 16." },
            { front: "Even + even", back: "Always even: 4 + 6 = 10." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each number: could it be a product of 4, or not?",
          buckets: ["Could be a product of 4", "Can't be a product of 4"],
          items: [
            { text: "28", bucket: 0 },
            { text: "36", bucket: 0 },
            { text: "16", bucket: 0 },
            { text: "27", bucket: 1 },
            { text: "35", bucket: 1 },
            { text: "21", bucket: 1 },
          ],
          hint: "Products of 4 are always even. Then check: is it in the 4s count (4, 8, 12, 16...)?",
          seconds: 40,
        },
        think: {
          q: "Why is 4 × 7 even?",
          choices: ["Because 7 is odd", "Because 4 groups is 2 groups doubled", "Because it ends in 5"],
          answer: 1,
          why: "4 × 7 is (2 × 7) doubled, and doubling always makes an even number: 28.",
          hints: [
            "7 is odd, but 4 × 7 is still even. Think about what 4 groups are made of.",
            "",
            "4 × 7 is 28, which ends in 8, not 5.",
          ],
        },
        approaches: {
          analogy:
            "An even number is like pairs of shoes: everything has a partner. Doubling makes pairs, so doubles are always even.",
          example:
            "4 × 9: 2 × 9 = 18, doubled is 36. 36 is even. Any 4s product can split into two equal halves.",
          simpler: {
            q: "Is 3 + 5 even or odd?",
            choices: ["Even", "Odd", "Neither"],
            answer: 0,
            why: "3 + 5 = 8, which is even.",
            hints: ["", "Add them first: 3 + 5 = 8. Can 8 be split into pairs?", "Every whole number is even or odd."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the steps in order to solve: 'A class has 27 pencils. They buy 3 boxes of 10 more. How many pencils now?'",
      steps: [
        "Read the problem and find the question.",
        "Step 1: find the new pencils: 3 × 10 = 30.",
        "Step 2: add them to the old ones: 27 + 30 = p.",
        "Solve: p = 57.",
        "Check by estimating: 30 + 30 = 60, close to 57.",
      ],
    },
    explain: {
      prompt: "A shop had 40 kites and sold 3 boxes of 5 kites. Tell Professor Pascal how you would find the kites left, and how you'd check your answer.",
      keyPoints: [
        "First find the kites sold: 3 × 5 = 15",
        "Then subtract: 40 - 15 = 25 kites left",
        "Use a letter for the unknown, like 40 - 15 = k",
        "Check by estimating or adding back: 25 + 15 = 40",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "🎟️ Tickets cost $4 each. A family buys 6 tickets and pays with a $50 bill. How much change do they get?",
        answer: 26,
        unit: "dollars",
        hint: "Step 1: cost of the tickets, 6 × 4. Step 2: subtract that from 50.",
        mistakes: [{ match: "24", coach: "$24 is what the tickets cost. Now subtract it from $50 to find the change." }],
        seconds: 50,
      },
      {
        type: "cloze",
        text: "A baker makes 7 trays of 8 rolls. She sells 30. Step 1: 7 × 8 = {0}. Step 2: subtract the 30 sold, so r = {1}.",
        blanks: [{ answers: ["56"] }, { answers: ["26"] }],
        bank: ["56", "26", "15", "86", "48"],
        hint: "Find all the rolls first: 7 × 8. Then take away the 30 sold.",
        mistakes: [
          { match: "15", coach: "15 is 7 + 8. Seven trays of 8 rolls means 7 × 8." },
          { match: "86", coach: "Selling rolls means fewer rolls, so subtract 30, don't add." },
        ],
        seconds: 50,
      },
      {
        type: "highlight",
        prompt: "Tap every true pattern.",
        sentences: [
          "Every product of 4 is even.",
          "Every product of 5 ends in 0 or 5.",
          "Odd plus odd is always odd.",
          "Every product of 2 is even.",
        ],
        correct: [0, 1, 3],
        hint: "Try examples: 3 + 5 = 8. Is 8 odd?",
        seconds: 40,
      },
      {
        type: "sort",
        prompt: "Each kid solved 38 + 41. Estimate 40 + 40 = 80. Sort the answers.",
        buckets: ["Makes sense", "Can't be right"],
        items: [
          { text: "79", bucket: 0 },
          { text: "81", bucket: 0 },
          { text: "39", bucket: 1 },
          { text: "149", bucket: 1 },
        ],
        hint: "A sensible answer is close to 80.",
        seconds: 30,
      },
    ],
    check: [
      { q: "Lee has 4 bags of 9 marbles and loses 6. How many are left?", choices: ["30", "36", "42"], answer: 0, why: "4 × 9 = 36, then 36 - 6 = 30." },
      { q: "Which estimate helps check 49 + 52?", choices: ["40 + 40", "50 + 50", "10 + 10"], answer: 1, why: "49 rounds to 50 and 52 rounds to 50, so the answer should be about 100." },
      { q: "In 30 - 12 = m, what does m stand for?", choices: ["Always the number 30", "Minus", "The unknown answer"], answer: 2, why: "A letter stands for the number we are trying to find. Here m = 18." },
      { q: "Which number can't be a product of 4?", choices: ["32", "25", "20"], answer: 1, why: "Products of 4 are always even. 25 is odd." },
    ],
    task: {
      kind: "project",
      prompt: "Write two two-step word problems about your own home (snacks, toys, chores or money). Solve each with a letter for the unknown, then check it with an estimate. Read them to a parent and have them solve one too.",
      rubric: [
        "Each problem really needs two steps to solve",
        "Uses a letter for the unknown and solves it correctly",
        "Checks each answer with an estimate",
      ],
    },
  },

  // 5. Big numbers: rounding, adding and subtracting within 1000, times tens
  {
    id: "math-3.bignumbers",
    title: "Big Numbers: Rounding, Adding and Subtracting",
    minutes: 35,
    stage: "grammar",
    standards: ["3.NBT.A.1", "3.NBT.A.2", "3.NBT.A.3"],
    read: [
      "Numbers up to 1000 are built from hundreds, tens and ones. In 347, the 3 means 3 hundreds, the 4 means 4 tens and the 7 means 7 ones. Knowing place value makes big numbers easy to work with.",
      "Rounding gives a nearby friendly number. To round to the nearest ten, find the two tens a number sits between and see which one it is closer to. 347 is between 340 and 350, and it is closer to 350. If a number is exactly halfway, like 345, we round up to 350. To round to the nearest hundred, look at the tens: 347 is between 300 and 400 and rounds to 300, because 47 is less than 50.",
      "To add big numbers, line up the places and add ones, then tens, then hundreds. If a place adds up to 10 or more, regroup: 10 ones make 1 ten, and 10 tens make 1 hundred. For 268 + 157: 8 + 7 = 15 ones, so write 5 and carry 1 ten. 6 + 5 + 1 = 12 tens, so write 2 and carry 1 hundred. 2 + 1 + 1 = 4 hundreds. The answer is 425.",
      "To subtract, also go place by place. If there aren't enough ones, trade 1 ten for 10 ones. You can always check subtraction with addition: if 425 - 157 = 268, then 268 + 157 should equal 425.",
      "Multiplying by tens is quick with place value. 4 × 30 means 4 groups of 3 tens, which is 12 tens, or 120. So 4 × 30 = 120. Use the fact you know, then remember you are counting tens.",
    ].join("\n\n"),
    keyIdeas: [
      "Round to the nearest 10 or 100 by finding which is closer; halfway rounds up.",
      "Add and subtract big numbers place by place, regrouping when needed.",
      "Check subtraction with addition.",
      "Multiply by tens with a basic fact: 4 × 30 = 4 × 3 tens = 12 tens = 120.",
    ],
    hook: {
      text: "The Sky Islands are drifting apart! The bridge builders need rope. One island needs 268 feet of rope, and the next needs 157 feet. The rope shop sells it only by the hundred feet. How much rope do the builders need, and how many hundreds should they buy?",
    },
    teach: [
      {
        title: "Rounding to Tens and Hundreds",
        teach:
          "Rounding gives you a nearby friendly number that is easy to work with. To round to the nearest ten, find the two tens your number sits between. 347 sits between 340 and 350. On a number line, 347 is closer to 350, so it rounds to 350. If a number is exactly halfway, like 345, we round up. To round to the nearest hundred, look between hundreds. 347 sits between 300 and 400. The halfway mark is 350. 347 hasn't reached it, so it rounds down to 300.",
        visual: {
          type: "hotspots",
          title: "Rounding 347",
          center: "347",
          spots: [
            { label: "Nearest ten", icon: "🔟", detail: "347 is between 340 and 350. It's closer to 350." },
            { label: "Nearest hundred", icon: "💯", detail: "347 is between 300 and 400. It's closer to 300." },
            { label: "Halfway", icon: "⚖️", detail: "Exactly halfway, like 345 or 350, rounds up." },
          ],
        },
        probe: {
          type: "place",
          prompt: "Round each number to the nearest hundred and drag it to that hundred on the line.",
          min: 0,
          max: 1000,
          step: 100,
          tolerance: 0,
          items: [
            { label: "347", value: 300 },
            { label: "682", value: 700 },
            { label: "850", value: 900 },
            { label: "129", value: 100 },
          ],
          hint: "Look at the tens digit. 50 or more rounds up to the next hundred. Less than 50 rounds down.",
          seconds: 50,
        },
        think: {
          q: "What is 263 rounded to the nearest ten?",
          choices: ["260", "270", "300"],
          answer: 0,
          why: "263 is between 260 and 270. The 3 ones is less than 5, so it rounds to 260.",
          hints: ["", "263 is closer to 260 than to 270. Only 5 or more ones rounds up.", "300 is rounding to the nearest hundred. We want the nearest ten."],
        },
        approaches: {
          analogy:
            "Rounding is like telling a friend you'll be there in about 10 minutes when it's really 8. You pick a close, simple number.",
          example:
            "Round 576 to the nearest ten: it's between 570 and 580. 6 ones is 5 or more, so round up to 580. To the nearest hundred: between 500 and 600, 76 is 50 or more, so 600.",
          simpler: {
            q: "Is 48 closer to 40 or to 50?",
            choices: ["40", "50", "It's exactly halfway"],
            answer: 1,
            why: "48 is only 2 away from 50 but 8 away from 40.",
            hints: ["48 is 8 away from 40, but only 2 away from 50.", "", "Halfway between 40 and 50 is 45. 48 is past it."],
          },
        },
      },
      {
        title: "Adding Big Numbers",
        teach:
          "To add big numbers, line up the places. Add the ones, then the tens, then the hundreds. Let's add 268 plus 157 for the rope. Ones: 8 plus 7 is 15. That's 1 ten and 5 ones. Write 5 and carry the 1 ten over to the tens. Tens: 6 plus 5 plus the 1 we carried is 12 tens. Write 2 and carry 1 hundred. Hundreds: 2 plus 1 plus 1 is 4. The answer is 425 feet of rope. Check with an estimate: 270 plus 160 is about 430. Close!",
        visual: {
          type: "hotspots",
          title: "268 + 157 = 425",
          center: "425",
          spots: [
            { label: "Ones", icon: "1️⃣", detail: "8 + 7 = 15. Write 5, carry 1 ten." },
            { label: "Tens", icon: "🔟", detail: "6 + 5 + 1 = 12 tens. Write 2, carry 1 hundred." },
            { label: "Hundreds", icon: "💯", detail: "2 + 1 + 1 = 4 hundreds." },
            { label: "Check", icon: "✅", detail: "Estimate: 270 + 160 = 430. 425 is close." },
          ],
        },
        probe: {
          type: "number",
          prompt: "🪢 One bridge needs 386 feet of rope. Another needs 245 feet. How many feet in all?",
          answer: 631,
          unit: "feet",
          hint: "Ones: 6 + 5 = 11. Tens: 8 + 4 + 1. Hundreds: 3 + 2 + 1.",
          mistakes: [
            { match: "521", coach: "Remember to carry! 6 + 5 = 11 ones, so carry 1 ten. Then 8 + 4 + 1 = 13 tens, so carry 1 hundred." },
            { match: "5211", coach: "When a place makes 10 or more, write only the ones digit and carry the rest to the next place." },
          ],
          seconds: 60,
        },
        think: {
          q: "In 147 + 238, what happens in the ones place?",
          choices: ["7 + 8 = 15: write 5, carry 1 ten", "7 + 8 = 15: write 15", "7 + 8 = 1"],
          answer: 0,
          why: "15 ones is 1 ten and 5 ones. Write 5 and carry the ten. The answer is 385.",
          hints: ["", "Only one digit fits in each place. The extra ten moves to the tens place.", "7 + 8 is 15, not 1. Write the 5 and carry the 1 ten."],
        },
        approaches: {
          analogy:
            "Regrouping is like trading 10 pennies for a dime. When you have 10 or more ones, you trade them up for a ten.",
          example:
            "455 + 278: ones 5 + 8 = 13, write 3 carry 1. Tens 5 + 7 + 1 = 13, write 3 carry 1. Hundreds 4 + 2 + 1 = 7. Answer: 733.",
          simpler: {
            q: "What is 40 + 30?",
            choices: ["70", "7", "43"],
            answer: 0,
            why: "4 tens + 3 tens = 7 tens = 70.",
            hints: ["", "4 tens and 3 tens make 7 tens. That's 70, not 7.", "We add the tens: 4 tens plus 3 tens."],
          },
        },
      },
      {
        title: "Subtracting and Checking",
        teach:
          "Subtracting big numbers also goes place by place. Try 425 minus 157. Ones: 5 minus 7? There aren't enough ones. Trade 1 ten for 10 ones. Now there are 15 ones. 15 minus 7 is 8. Tens: we have 1 ten left, and we need to take away 5. Trade 1 hundred for 10 tens. Now 11 tens minus 5 is 6. Hundreds: 3 minus 1 is 2. The answer is 268. Check it with addition: 268 plus 157 is 425. It matches, so we're right!",
        visual: {
          type: "flip",
          cards: [
            { front: "Not enough ones?", back: "Trade 1 ten for 10 ones." },
            { front: "Not enough tens?", back: "Trade 1 hundred for 10 tens." },
            { front: "425 - 157", back: "268. Check: 268 + 157 = 425." },
          ],
        },
        probe: {
          type: "cloze",
          text: "604 - 238 = {0}. Check with addition: your answer + 238 should make {1}.",
          blanks: [{ answers: ["366"] }, { answers: ["604"] }],
          bank: ["366", "604", "434", "476"],
          hint: "There are 0 tens, so trade 1 hundred for 10 tens first. Then trade 1 ten for 10 ones.",
          mistakes: [
            { match: "434", coach: "434 comes from subtracting the smaller digit from the bigger one in each place. When the top digit is smaller, trade from the next place instead." },
            { match: "476", coach: "Check your trading. After trading, the tens have 9 left, and 9 - 3 = 6." },
          ],
          seconds: 60,
        },
        think: {
          q: "To check 500 - 175 = 325, what should you do?",
          choices: ["325 - 175", "325 + 500", "325 + 175"],
          answer: 2,
          why: "Add the answer to the number you took away. 325 + 175 = 500, so it checks out.",
          hints: [
            "Subtracting again doesn't check it. Add back what you took away.",
            "Add back only the part you took away, which is 175.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Trading in subtraction is like breaking a dollar into dimes when you need to pay 30 cents. You don't lose money; you just change its form.",
          example:
            "352 - 128: ones 2 - 8, trade a ten: 12 - 8 = 4. Tens: 4 - 2 = 2. Hundreds: 3 - 1 = 2. Answer 224. Check: 224 + 128 = 352.",
          simpler: {
            q: "What is 90 - 40?",
            choices: ["50", "130", "5"],
            answer: 0,
            why: "9 tens minus 4 tens is 5 tens: 50.",
            hints: ["", "130 is 90 + 40. The sign says subtract.", "9 tens minus 4 tens is 5 tens. That's 50, not 5."],
          },
        },
      },
      {
        title: "Times Tens",
        teach:
          "Multiplying by tens is quick when you think in place value. Look at 4 times 30. Thirty is 3 tens. So 4 times 30 is 4 groups of 3 tens. That's 12 tens, and 12 tens is 120. Use the fact you know, 4 times 3 is 12, then remember you're counting tens. Try 9 times 80. Nine times 8 is 72, so 9 times 80 is 72 tens, which is 720. The rope shop sells rope in coils of 50 feet. Six coils hold 6 times 50, which is 300 feet.",
        visual: {
          type: "flip",
          cards: [
            { front: "4 × 30", back: "4 × 3 tens = 12 tens = 120." },
            { front: "9 × 80", back: "9 × 8 tens = 72 tens = 720." },
            { front: "6 × 50", back: "6 × 5 tens = 30 tens = 300." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each product to its answer.",
          pairs: [
            { left: "3 × 40", right: "120" },
            { left: "7 × 60", right: "420" },
            { left: "5 × 90", right: "450" },
            { left: "8 × 20", right: "160" },
          ],
          hint: "Multiply the basic fact, then count it in tens: 3 × 4 = 12, so 3 × 40 = 120.",
          seconds: 45,
        },
        think: {
          q: "What is 6 × 70?",
          choices: ["42", "420", "4200"],
          answer: 1,
          why: "6 × 7 = 42, so 6 × 7 tens = 42 tens = 420.",
          hints: ["42 is 6 × 7. But 70 is 7 tens, so the answer is 42 tens.", "", "That is too many zeros. 42 tens is 420."],
        },
        approaches: {
          analogy:
            "Multiplying tens is like counting dimes. 4 piles of 3 dimes is 12 dimes, and 12 dimes is 120 cents.",
          example:
            "5 × 60: 5 × 6 = 30, so 5 × 6 tens = 30 tens = 300.",
          simpler: {
            q: "What is 2 × 30?",
            choices: ["60", "6", "32"],
            answer: 0,
            why: "2 × 3 tens = 6 tens = 60.",
            hints: ["", "2 × 3 = 6, but we have tens, so it's 6 tens.", "Multiply, don't stick the digits together."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each number by what it rounds to (nearest hundred).",
      buckets: ["Rounds to 300", "Rounds to 400", "Rounds to 500"],
      items: [
        { text: "312", bucket: 0 },
        { text: "349", bucket: 0 },
        { text: "251", bucket: 0 },
        { text: "350", bucket: 1 },
        { text: "438", bucket: 1 },
        { text: "401", bucket: 1 },
        { text: "462", bucket: 2 },
        { text: "550 - 99", bucket: 2 },
        { text: "4 × 120", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Explain to Professor Pascal how to add 357 + 268, and how you would know your answer makes sense.",
      keyPoints: [
        "Add ones first: 7 + 8 = 15, write 5 and carry 1 ten",
        "Tens: 5 + 6 + 1 = 12, write 2 and carry 1 hundred",
        "Hundreds: 3 + 2 + 1 = 6, so the answer is 625",
        "Estimate to check: 400 + 300 = 700 or 360 + 270 = 630",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "🏝️ An island has 703 trees. Workers plant 189 more. How many trees now?",
        answer: 892,
        unit: "trees",
        hint: "Ones: 3 + 9 = 12, carry 1. Tens: 0 + 8 + 1 = 9. Hundreds: 7 + 1.",
        mistakes: [{ match: "882", coach: "Don't forget the carried ten: 0 + 8 + 1 = 9 tens." }],
        seconds: 50,
      },
      {
        type: "number",
        prompt: "🎈 The shop had 500 balloons and sold 236. How many are left?",
        answer: 264,
        hint: "Trade 1 hundred for 10 tens, then 1 ten for 10 ones. Check by adding your answer to 236.",
        mistakes: [{ match: "336", coach: "Subtract the bottom digit from the top digit in each place, trading when there aren't enough. Check: 264 + 236 = 500." }],
        seconds: 60,
      },
      {
        type: "place",
        prompt: "Round each number to the nearest ten and drag it to that ten.",
        min: 200,
        max: 300,
        step: 10,
        tolerance: 0,
        items: [
          { label: "243", value: 240 },
          { label: "275", value: 280 },
          { label: "218", value: 220 },
        ],
        hint: "Look at the ones digit. 5 or more rounds up.",
        seconds: 40,
      },
      {
        type: "cloze",
        text: "8 × 7 = 56, so 8 × 70 = {0}. 5 × 40 = {1}.",
        blanks: [{ answers: ["560"] }, { answers: ["200"] }],
        bank: ["560", "200", "56", "20", "5600"],
        hint: "Use the basic fact, then count it in tens.",
        mistakes: [
          { match: "56", coach: "70 is 7 tens, so the answer is 56 tens: 560." },
          { match: "20", coach: "5 × 4 = 20, and we have tens: 20 tens = 200." },
        ],
        seconds: 35,
      },
    ],
    check: [
      { q: "What is 462 rounded to the nearest hundred?", choices: ["400", "460", "500"], answer: 2, why: "462 is between 400 and 500. 62 is 50 or more, so it rounds up to 500." },
      { q: "What is 345 + 278?", choices: ["513", "623", "613"], answer: 1, why: "5 + 8 = 13, carry 1. 4 + 7 + 1 = 12, carry 1. 3 + 2 + 1 = 6. Answer: 623." },
      { q: "Which checks 800 - 350 = 450?", choices: ["450 - 350", "800 + 350", "450 + 350"], answer: 2, why: "Add the answer to the part taken away: 450 + 350 = 800." },
      { q: "What is 3 × 60?", choices: ["18", "180", "90"], answer: 1, why: "3 × 6 tens = 18 tens = 180." },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, look at a store receipt or a price list. Pick two prices under $500 and add them. Then pretend you pay $1000 and find the change. Round each price to the nearest ten and hundred to check.",
      rubric: [
        "Adds two three-digit numbers correctly with regrouping",
        "Subtracts from 1000 correctly and checks with addition",
        "Rounds each price correctly to the nearest ten and hundred",
      ],
    },
  },

  // 6. Fractions: equal parts and the number line
  {
    id: "math-3.fractions",
    title: "Fractions: Equal Parts and the Number Line",
    minutes: 30,
    stage: "grammar",
    standards: ["3.NF.A.1", "3.NF.A.2", "3.G.A.2"],
    read: [
      "A fraction names part of a whole. But not just any part: the whole must be split into equal parts. If you cut a sky pie into 4 pieces that are all the same size, each piece is one fourth of the pie, written 1/4. If the pieces were different sizes, they would not be fourths at all.",
      "A fraction has two numbers. The bottom number, the denominator, tells how many equal parts the whole is split into. The top number, the numerator, tells how many of those parts we are talking about. A fraction with 1 on top, like 1/2, 1/3 or 1/8, is called a unit fraction. It is one single part.",
      "Bigger fractions are built from unit fractions. If you eat 3 pieces of a pie cut into 4 equal pieces, you ate 3 fourths, written 3/4. That is 1/4 + 1/4 + 1/4. If you eat all 4 pieces, you ate 4/4, which is the whole pie.",
      "Fractions are numbers, just like 1, 2 and 3, so they have a place on the number line. To show fourths, split the space from 0 to 1 into 4 equal jumps. The first mark is 1/4, then 2/4, then 3/4, and 4/4 lands right on 1. Each jump is the same length. The fraction tells how many jumps you take from 0.",
      "You can split shapes too. A rectangle cut into 6 equal parts has six parts that each cover the same area, and each one is 1/6 of the rectangle. The parts don't even need the same shape, as long as each one covers the same amount of space.",
    ].join("\n\n"),
    keyIdeas: [
      "A fraction names equal parts of a whole.",
      "The denominator (bottom) tells how many equal parts; the numerator (top) tells how many we have.",
      "3/4 is three of the unit fraction 1/4: 1/4 + 1/4 + 1/4.",
      "Fractions are numbers with places on the number line between whole numbers.",
    ],
    hook: {
      text: "Pip baked a sky pie for 4 friends. But Pip cut it in a hurry, and one piece is huge while another is tiny. Is each piece really one fourth of the pie? The friends are not happy. What makes a fair fraction?",
    },
    teach: [
      {
        title: "Equal Parts",
        teach:
          "A fraction names part of a whole. But the parts must be equal. Cut a pie into 4 pieces that are all the same size, and each piece is one fourth. We write it as 1 over 4. If the pieces are different sizes, they are not fourths at all. Equal means each part covers the same amount of space. Two equal parts are halves. Three are thirds. Four are fourths. Six are sixths, and eight are eighths. One single part, like one half or one eighth, is called a unit fraction.",
        visual: {
          type: "flip",
          cards: [
            { front: "Halves", back: "2 equal parts. One part is 1/2." },
            { front: "Thirds", back: "3 equal parts. One part is 1/3." },
            { front: "Fourths", back: "4 equal parts. One part is 1/4." },
            { front: "Unit fraction", back: "One single equal part: 1/2, 1/3, 1/4, 1/6, 1/8." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each piece to its unit fraction.",
          pairs: [
            { left: "🍕 1 slice of a pizza cut into 8 equal slices", right: "1/8" },
            { left: "🍫 1 piece of a bar broken into 3 equal pieces", right: "1/3" },
            { left: "🥧 1 piece of a pie cut into 6 equal pieces", right: "1/6" },
            { left: "🍎 1 half of an apple cut into 2 equal parts", right: "1/2" },
          ],
          hint: "The number of equal parts in the whole goes on the bottom.",
          seconds: 40,
        },
        think: {
          q: "A sandwich is cut into 2 pieces: one big and one small. Is each piece 1/2?",
          choices: ["Yes, there are 2 pieces", "No, the pieces are not equal", "Yes, it's still a sandwich"],
          answer: 1,
          why: "Halves must be 2 equal parts. A big piece and a small piece are not halves.",
          hints: [
            "Counting 2 pieces isn't enough. Each half must be the same size.",
            "",
            "It is still a sandwich, but fractions need equal parts.",
          ],
        },
        approaches: {
          analogy:
            "Fractions are like sharing a cake at a party. If one friend gets a giant slice and another a sliver, nobody would call that fair shares. Fractions are the fair shares.",
          example:
            "A chocolate bar has 6 equal squares. One square is 1/6 of the bar. If someone breaks off a chunk of 2 squares, that chunk is not a unit fraction; it is 2/6.",
          simpler: {
            q: "A pie is cut into 4 equal pieces. What is one piece?",
            choices: ["1/4", "4/1", "1/2"],
            answer: 0,
            why: "4 equal pieces, 1 of them: 1/4.",
            hints: ["", "The number of pieces in the whole goes on the bottom.", "1/2 would mean 2 equal pieces. This pie has 4."],
          },
        },
      },
      {
        title: "Building Fractions",
        teach:
          "A fraction has two numbers. The bottom number is the denominator. It tells how many equal parts the whole has. The top number is the numerator. It tells how many of those parts we have. Say you eat 3 pieces of a pie cut into 4 equal pieces. You ate three fourths, written 3 over 4. That is one fourth plus one fourth plus one fourth. Bigger fractions are built from unit fractions. Eat all 4 pieces, and you ate 4 fourths. That's the whole pie!",
        visual: {
          type: "hotspots",
          title: "The fraction 3/4",
          center: "3/4",
          spots: [
            { label: "Numerator: 3", icon: "⬆️", detail: "The top number. How many parts we have." },
            { label: "Denominator: 4", icon: "⬇️", detail: "The bottom number. How many equal parts in the whole." },
            { label: "Built from 1/4", icon: "🧱", detail: "3/4 = 1/4 + 1/4 + 1/4." },
            { label: "4/4", icon: "🥧", detail: "All 4 parts make the whole: 4/4 = 1." },
          ],
        },
        probe: {
          type: "cloze",
          text: "🟦🟦🟦⬜⬜ A bar has 5 equal parts and 3 are blue. The blue part is {0} out of {1} equal parts, so it is the fraction {2}.",
          blanks: [{ answers: ["3", "three"] }, { answers: ["5", "five"] }, { answers: ["3/5"] }],
          bank: ["3", "5", "3/5", "2", "5/3"],
          hint: "Count the blue parts for the top. Count all the equal parts for the bottom.",
          mistakes: [
            { match: "5/3", coach: "The bottom number is all the equal parts, 5. The top is the blue parts, 3." },
            { match: "2", coach: "2 parts are white. We want the blue parts." },
          ],
          seconds: 40,
        },
        think: {
          q: "In the fraction 5/8, what does the 8 tell you?",
          choices: ["We have 8 parts", "The whole has 8 equal parts", "8 parts are missing"],
          answer: 1,
          why: "The denominator, 8, tells how many equal parts the whole is split into.",
          hints: [
            "The top number, 5, tells how many parts we have.",
            "",
            "8 is all the parts in the whole, not the missing ones. 3 are missing.",
          ],
        },
        approaches: {
          analogy:
            "A fraction is like a parking lot sign. The bottom number tells how many spaces the lot has. The top number tells how many are filled.",
          example:
            "An egg carton has 6 equal cups in a row, and 5 have eggs. 5 of 6 equal parts are filled, so 5/6 of the row is full. That is 1/6 + 1/6 + 1/6 + 1/6 + 1/6.",
          simpler: {
            q: "A pie has 3 equal pieces. You eat 2. What did you eat?",
            choices: ["3/2", "2/3", "1/3"],
            answer: 1,
            why: "2 pieces out of 3 equal pieces: 2/3.",
            hints: ["The whole goes on the bottom: 3 pieces in all.", "", "You ate 2 pieces, not 1."],
          },
        },
      },
      {
        title: "Fractions on the Number Line",
        teach:
          "Fractions are numbers, just like 1, 2 and 3. So they have spots on the number line. Look at the space from 0 to 1. To show fourths, split it into 4 equal jumps. The first mark is one fourth. Then come two fourths and three fourths. Four fourths lands right on 1. Each jump is the same length. The denominator tells how many jumps fit between 0 and 1. The numerator tells how many jumps you take from 0.",
        visual: {
          type: "hotspots",
          title: "Fourths on the number line",
          center: "0 to 1",
          spots: [
            { label: "1/4", icon: "1️⃣", detail: "One jump from 0." },
            { label: "2/4", icon: "2️⃣", detail: "Two jumps from 0. Halfway to 1." },
            { label: "3/4", icon: "3️⃣", detail: "Three jumps from 0." },
            { label: "4/4", icon: "🎯", detail: "Four jumps lands on 1. A whole." },
          ],
        },
        probe: {
          type: "place",
          prompt: "Drag each fraction to its spot between 0 and 1.",
          min: 0,
          max: 1,
          step: 0.25,
          tolerance: 0.01,
          items: [
            { label: "1/4", value: 0.25 },
            { label: "3/4", value: 0.75 },
            { label: "2/4", value: 0.5 },
          ],
          hint: "Split 0 to 1 into 4 equal jumps. The top number is how many jumps from 0.",
          seconds: 40,
        },
        think: {
          q: "A line from 0 to 1 is split into 3 equal jumps. Where is 2/3?",
          choices: ["One jump from 0", "Two jumps from 0", "At 2"],
          answer: 1,
          why: "Each jump is 1/3. Two jumps from 0 is 2/3.",
          hints: [
            "One jump from 0 is 1/3. The top number says take 2 jumps.",
            "",
            "2/3 is less than 1, so it is between 0 and 1, not at 2.",
          ],
        },
        approaches: {
          analogy:
            "It's like a path from your door to the mailbox with 4 equal stepping stones. Each stone is 1/4 of the way. Three stones gets you 3/4 of the way there.",
          example:
            "For eighths, split 0 to 1 into 8 equal jumps. 5/8 is 5 jumps from 0. 8/8 is 8 jumps, right on 1.",
          simpler: {
            q: "A line from 0 to 1 is split into 2 equal jumps. What is at the middle?",
            choices: ["1/2", "2", "1"],
            answer: 0,
            why: "One of 2 equal jumps is 1/2.",
            hints: ["", "2 is past the end of this line. The middle is less than 1.", "1 is at the end, not the middle."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each fraction: unit fraction, more than one part, or a whole?",
      buckets: ["Unit fraction (1 part)", "More than one part, less than a whole", "A whole"],
      items: [
        { text: "1/3", bucket: 0 },
        { text: "1/8", bucket: 0 },
        { text: "1/6", bucket: 0 },
        { text: "2/3", bucket: 1 },
        { text: "5/8", bucket: 1 },
        { text: "3/4", bucket: 1 },
        { text: "4/4", bucket: 2 },
        { text: "6/6", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Tell Professor Pascal what 3/8 means, and how you'd find it on a number line.",
      keyPoints: [
        "The whole is split into 8 equal parts",
        "3/8 means 3 of those parts",
        "It is 1/8 + 1/8 + 1/8",
        "On a number line, split 0 to 1 into 8 equal jumps and take 3",
      ],
    },
    mastery: [
      {
        type: "place",
        prompt: "Drag each fraction to its spot. The line goes from 0 to 1 in eighths.",
        min: 0,
        max: 1,
        step: 0.125,
        tolerance: 0.01,
        items: [
          { label: "1/8", value: 0.125 },
          { label: "5/8", value: 0.625 },
          { label: "7/8", value: 0.875 },
          { label: "8/8", value: 1 },
        ],
        hint: "Count jumps of 1/8 from 0. 8 jumps lands on 1.",
        seconds: 45,
      },
      {
        type: "cloze",
        text: "🟩🟩⬜⬜⬜⬜ This bar has {0} equal parts. 2 are green, so the green part is {1}.",
        blanks: [{ answers: ["6", "six"] }, { answers: ["2/6"] }],
        bank: ["6", "2/6", "4", "6/2", "2/4"],
        hint: "Count every part for the bottom number. Count the green parts for the top.",
        mistakes: [
          { match: "2/4", coach: "4 is just the white parts. The bottom number counts all 6 equal parts." },
          { match: "6/2", coach: "The total parts go on the bottom: 2/6." },
        ],
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each picture to its fraction.",
        pairs: [
          { left: "🟥⬜⬜⬜", right: "1/4" },
          { left: "🟥🟥🟥⬜", right: "3/4" },
          { left: "🟥⬜⬜", right: "1/3" },
          { left: "🟥🟥⬜", right: "2/3" },
        ],
        hint: "All the squares make the bottom number. The red squares make the top number.",
        seconds: 35,
      },
      {
        type: "number",
        prompt: "How many 1/6 pieces make 5/6?",
        answer: 5,
        hint: "5/6 = 1/6 + 1/6 + ... How many sixths?",
        mistakes: [{ match: "6", coach: "6 sixths would be the whole. 5/6 is five of them." }],
        seconds: 20,
      },
    ],
    check: [
      { q: "A pizza is cut into 8 equal slices. What fraction is one slice?", choices: ["8/1", "1/8", "1/4"], answer: 1, why: "1 slice out of 8 equal slices is 1/8." },
      { q: "In 2/5, what is the denominator?", choices: ["5", "2", "7"], answer: 0, why: "The denominator is the bottom number: 5 equal parts." },
      { q: "Which is the same as 3/4?", choices: ["1/3 + 1/3 + 1/3", "3 + 4", "1/4 + 1/4 + 1/4"], answer: 2, why: "3/4 is three of the unit fraction 1/4." },
      { q: "On a number line from 0 to 1 split into 4 equal jumps, where is 4/4?", choices: ["At 1", "At 0", "At 4"], answer: 0, why: "Four jumps of 1/4 land right on 1." },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, fold paper strips into halves, fourths and eighths (fold in half, then again, then again). Label each part. Then draw a number line from 0 to 1 and mark the halves, fourths and eighths on it.",
      rubric: [
        "Folds each strip into equal parts",
        "Labels the parts with the right unit fractions",
        "Marks halves, fourths and eighths correctly on a number line",
      ],
    },
  },

  // 7. Equivalent and comparing fractions
  {
    id: "math-3.compare-fractions",
    title: "Same Size, Bigger or Smaller: Comparing Fractions",
    minutes: 30,
    stage: "logic",
    standards: ["3.NF.A.3"],
    read: [
      "Two fractions can look different and still be the same size. Fold a paper strip in half and color one half. Now fold it in half again. The same colored part is now 2 of 4 equal parts, or 2/4. You didn't add any color, so 1/2 = 2/4. Fractions that name the same amount are called equivalent fractions. On a number line, they land on exactly the same spot. 1/2, 2/4 and 4/8 are all equivalent.",
      "Whole numbers can be written as fractions too. A whole pie cut into 6 pieces is 6/6, which equals 1. And 3 whole pies, each counted as 1 whole, is 3/1, which equals 3. Whenever the top and bottom numbers are the same, the fraction is 1.",
      "To compare fractions with the same denominator, the pieces are the same size. So just compare how many pieces. 5/8 is more than 3/8, because 5 pieces of the same size is more than 3. We write 5/8 > 3/8.",
      "To compare fractions with the same numerator, look at the size of the pieces. 1/3 is bigger than 1/8, because cutting something into 3 pieces makes bigger pieces than cutting it into 8. The more pieces you cut, the smaller each one gets. So 2/3 > 2/8.",
      "One important rule: you can only compare fractions when they are parts of the same size whole. Half of a big watermelon is more food than half of a small grape!",
    ].join("\n\n"),
    keyIdeas: [
      "Equivalent fractions name the same amount: 1/2 = 2/4 = 4/8.",
      "Whole numbers can be fractions: 6/6 = 1 and 3/1 = 3.",
      "Same denominator: more pieces means bigger (5/8 > 3/8).",
      "Same numerator: a bigger denominator means smaller pieces (1/3 > 1/8).",
    ],
    hook: {
      text: "Two friends get pancakes of the same size. Ada's pancake is cut into 2 pieces, and she eats 1. Ben's is cut into 4 pieces, and he eats 2. Ben says he ate more because 2 is more than 1. Is Ben right?",
    },
    teach: [
      {
        title: "Equivalent Fractions",
        teach:
          "Two fractions can look different and still be the same size. Fold a paper strip in half and color one half. Now fold it in half again. The colored part is now 2 of 4 equal parts. You didn't add any color, so one half equals two fourths. Fractions that name the same amount are called equivalent. On a number line, they land on the very same spot. One half, two fourths and four eighths all sit at the same point. So Ada and Ben ate the same amount!",
        visual: {
          type: "flip",
          cards: [
            { front: "1/2 = 2/4", back: "Fold a half in half again: 2 of 4 parts. Same amount." },
            { front: "1/2 = 4/8", back: "Fold again: 4 of 8 parts. Still the same amount." },
            { front: "1/3 = 2/6", back: "Cut each third in two: 2 of 6 parts." },
            { front: "Equivalent", back: "Fractions that name the same amount and the same spot on the number line." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each fraction to an equivalent fraction.",
          pairs: [
            { left: "1/2", right: "2/4" },
            { left: "1/3", right: "2/6" },
            { left: "3/4", right: "6/8" },
            { left: "1/4", right: "2/8" },
          ],
          hint: "Cut each piece in two. The number of parts doubles on both top and bottom.",
          seconds: 45,
        },
        think: {
          q: "Which fraction is equivalent to 1/2?",
          choices: ["1/4", "2/2", "3/6"],
          answer: 2,
          why: "3 of 6 equal parts is half of the whole, the same as 1/2.",
          hints: [
            "1/4 is only half of a half. It's smaller.",
            "2/2 is the whole thing, not half.",
            "",
          ],
        },
        approaches: {
          analogy:
            "Equivalent fractions are like a dollar paid as 2 half-dollars or 4 quarters. Different coins, same money.",
          example:
            "A chocolate bar has 8 squares. Eat 4 squares and you ate 4/8. Since 4 is half of 8, that's also 1/2 of the bar.",
          simpler: {
            q: "Is 2/4 the same amount as 1/2?",
            choices: ["Yes", "No, 2/4 is bigger", "No, 2/4 is smaller"],
            answer: 0,
            why: "2 of 4 equal parts is half the whole.",
            hints: ["", "The number 2 is bigger, but the pieces are smaller. It's the same amount.", "There are more pieces, but each is smaller. It's the same amount."],
          },
        },
      },
      {
        title: "Whole Numbers as Fractions",
        teach:
          "Whole numbers can be written as fractions too. Cut a whole pie into 6 equal pieces. If you have all 6 pieces, you have 6 sixths. That is the whole pie, so 6 sixths equals 1. Whenever the top and bottom numbers match, the fraction equals 1. Now picture 3 whole pies, each one not cut at all. Each pie is one whole, so we have 3 wholes, written 3 over 1. That equals 3. On the number line, 4 fourths sits right on top of 1.",
        visual: {
          type: "flip",
          cards: [
            { front: "6/6", back: "All 6 of 6 pieces: 1 whole." },
            { front: "8/8", back: "All 8 of 8 pieces: 1 whole." },
            { front: "3/1", back: "3 wholes: 3." },
            { front: "8/4", back: "8 fourths: two wholes of 4 fourths each. That's 2." },
          ],
        },
        probe: {
          type: "cloze",
          text: "4/4 = {0}. 7/1 = {1}. The whole number 2 can be written as {2}/1.",
          blanks: [{ answers: ["1", "one"] }, { answers: ["7", "seven"] }, { answers: ["2", "two"] }],
          bank: ["1", "7", "2", "4", "0"],
          hint: "When top and bottom match, it's 1 whole. A number over 1 is that many wholes.",
          mistakes: [
            { match: "4", coach: "4/4 means all 4 of 4 parts. That is 1 whole." },
            { match: "0", coach: "4/4 is all the parts, not none of them. It equals 1." },
          ],
          seconds: 35,
        },
        think: {
          q: "What is 5/5 equal to?",
          choices: ["5", "0", "1"],
          answer: 2,
          why: "5 of 5 equal parts is the whole thing: 1.",
          hints: ["5/5 is not 5 wholes. It is 5 parts of one whole.", "You have all the parts, not none of them.", ""],
        },
        approaches: {
          analogy:
            "It's like a pizza cut into 8 slices. If all 8 slices are still in the box, you still have 1 whole pizza.",
          example:
            "A muffin pan holds 6 muffins. A full pan is 6/6 of a pan, which is 1 pan. Two full pans would be 12/6, which is 2.",
          simpler: {
            q: "A pie has 2 halves. You have both halves. How much pie?",
            choices: ["1 whole pie", "2 pies", "Half a pie"],
            answer: 0,
            why: "2/2 is the whole pie.",
            hints: ["", "The two halves are parts of the same one pie.", "You have both halves, not just one."],
          },
        },
      },
      {
        title: "Same Bottom Number",
        teach:
          "Now let's compare. When two fractions have the same denominator, the pieces are the same size. So just count the pieces! Compare 5 eighths and 3 eighths. Both are made of eighths. Five pieces is more than three pieces. So 5 eighths is greater than 3 eighths. We use the greater-than sign. The open side of the sign always faces the bigger number. One important rule: only compare fractions of the same size whole. Half of a big watermelon is more than half of a tiny grape!",
        visual: {
          type: "compare",
          left: { title: "5/8", points: ["5 pieces", "Each piece is 1/8", "More pieces: bigger"] },
          right: { title: "3/8", points: ["3 pieces", "Each piece is 1/8", "Fewer pieces: smaller"] },
        },
        probe: {
          type: "cloze",
          text: "Fill in <, > or =. 3/6 {0} 5/6. 7/8 {1} 2/8. 2/4 {2} 2/4.",
          blanks: [{ answers: ["<"] }, { answers: [">"] }, { answers: ["="] }],
          bank: ["<", ">", "="],
          hint: "The pieces are the same size, so compare the top numbers. The open side faces the bigger one.",
          mistakes: [{ match: ">", coach: "3 sixths is fewer pieces than 5 sixths, so 3/6 < 5/6." }],
          seconds: 40,
        },
        think: {
          q: "Which is bigger: 2/6 or 5/6?",
          choices: ["2/6", "5/6", "They're equal"],
          answer: 1,
          why: "Both are sixths, so the pieces are the same size. 5 pieces is more than 2.",
          hints: ["2 sixths is fewer pieces than 5 sixths.", "", "The tops are different, so the amounts are different."],
        },
        approaches: {
          analogy:
            "It's like slices from the same pizza. If you have 5 slices and your friend has 3 slices, you have more pizza.",
          example:
            "Compare 4/5 and 2/5. Both are fifths. 4 fifths is more than 2 fifths, so 4/5 > 2/5.",
          simpler: {
            q: "You have 3 cookies. A friend has 1 same-size cookie. Who has more?",
            choices: ["You", "Your friend", "The same"],
            answer: 0,
            why: "3 same-size cookies is more than 1.",
            hints: ["", "Your friend has only 1. You have 3 of the same size.", "3 and 1 are not the same."],
          },
        },
      },
      {
        title: "Same Top Number",
        teach:
          "What if the numerators are the same? Then look at the size of the pieces. Compare one third and one eighth. Cut a pie into 3 pieces, and each piece is big. Cut the same pie into 8 pieces, and each piece is small. So one third is greater than one eighth. Here's the surprise: the bigger the denominator, the smaller each piece. More cuts make smaller slices. So 2 thirds is more than 2 eighths. You have the same number of pieces, but thirds are bigger pieces.",
        visual: {
          type: "flip",
          cards: [
            { front: "1/3 or 1/8?", back: "1/3 is bigger. 3 cuts make bigger pieces than 8 cuts." },
            { front: "2/4 or 2/6?", back: "2/4 is bigger. Fourths are bigger pieces than sixths." },
            { front: "The rule", back: "Same top number: the smaller bottom number wins." },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put these unit fractions in order from smallest to biggest.",
          steps: ["1/8", "1/6", "1/4", "1/3", "1/2"],
          hint: "More pieces means smaller pieces. The biggest denominator is the smallest fraction.",
          seconds: 40,
        },
        think: {
          q: "Which is bigger: 3/4 or 3/8?",
          choices: ["3/8, because 8 is bigger", "3/4, because fourths are bigger pieces", "They are equal"],
          answer: 1,
          why: "Both are 3 pieces. Fourths are bigger pieces than eighths, so 3/4 > 3/8.",
          hints: [
            "A bigger denominator means more cuts, so smaller pieces.",
            "",
            "Same number of pieces, but the pieces are different sizes.",
          ],
        },
        approaches: {
          analogy:
            "Sharing one pizza with 2 friends gives everyone a big slice. Sharing it with 8 friends gives everyone a small slice. More sharers, smaller slices.",
          example:
            "Compare 2/3 and 2/6. Both have 2 pieces. Thirds are bigger than sixths, so 2/3 > 2/6.",
          simpler: {
            q: "A pie is cut into 2 pieces. Another same pie is cut into 10 pieces. Which pieces are bigger?",
            choices: ["The 10 pieces", "The 2 pieces", "They are the same"],
            answer: 1,
            why: "Fewer cuts make bigger pieces.",
            hints: ["10 cuts make lots of small pieces.", "", "Cutting into 2 or into 10 can't make the same size pieces."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each fraction: less than 1/2, equal to 1/2, or more than 1/2?",
      buckets: ["Less than 1/2", "Equal to 1/2", "More than 1/2"],
      items: [
        { text: "1/4", bucket: 0 },
        { text: "1/8", bucket: 0 },
        { text: "1/3", bucket: 0 },
        { text: "2/4", bucket: 1 },
        { text: "3/6", bucket: 1 },
        { text: "4/8", bucket: 1 },
        { text: "3/4", bucket: 2 },
        { text: "5/6", bucket: 2 },
        { text: "6/6", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Ben says 1/8 is bigger than 1/3 because 8 is bigger than 3. Explain to Professor Pascal why Ben is wrong.",
      keyPoints: [
        "Both fractions have 1 piece",
        "The denominator tells how many pieces the whole is cut into",
        "More pieces means smaller pieces",
        "So 1/3 is bigger than 1/8",
      ],
    },
    mastery: [
      {
        type: "cloze",
        text: "Fill in <, > or =. 1/6 {0} 1/2. 4/8 {1} 1/2. 3/3 {2} 1/3.",
        blanks: [{ answers: ["<"] }, { answers: ["="] }, { answers: [">"] }],
        bank: ["<", ">", "="],
        hint: "Same top: smaller bottom is bigger. Is 4/8 half? Same bottom: more pieces is bigger.",
        seconds: 45,
      },
      {
        type: "place",
        prompt: "Drag each fraction to its spot. Equivalent fractions share a spot!",
        min: 0,
        max: 2,
        step: 0.25,
        tolerance: 0.01,
        items: [
          { label: "2/4", value: 0.5 },
          { label: "4/4", value: 1 },
          { label: "6/4", value: 1.5 },
          { label: "2/1", value: 2 },
        ],
        hint: "Each jump is 1/4. 4 fourths make 1 whole.",
        seconds: 45,
      },
      {
        type: "match",
        prompt: "Match each fraction to the one it equals.",
        pairs: [
          { left: "2/8", right: "1/4" },
          { left: "4/6", right: "2/3" },
          { left: "5/5", right: "1" },
          { left: "6/2", right: "3" },
        ],
        hint: "Look for fractions at the same spot on the number line. 6/2 is 6 halves.",
        seconds: 45,
      },
      {
        type: "sequence",
        prompt: "Order these from smallest to biggest.",
        steps: ["2/8", "4/8", "5/8", "7/8"],
        hint: "They are all eighths, so compare the top numbers.",
        seconds: 30,
      },
    ],
    check: [
      { q: "Which is equivalent to 1/2?", choices: ["2/3", "4/8", "1/4"], answer: 1, why: "4 of 8 equal parts is half: 4/8 = 1/2." },
      { q: "Which is bigger: 1/4 or 1/6?", choices: ["1/6", "They are equal", "1/4"], answer: 2, why: "Same top number. Fourths are bigger pieces than sixths." },
      { q: "What is 8/8 equal to?", choices: ["1", "8", "0"], answer: 0, why: "All 8 of 8 parts is one whole." },
      { q: "Which is true?", choices: ["2/5 > 4/5", "4/5 > 2/5", "2/5 = 4/5"], answer: 1, why: "Both are fifths, and 4 pieces is more than 2." },
    ],
    task: {
      kind: "project",
      prompt: "Make a fraction wall with a parent. Cut 5 paper strips the same length. Leave one whole, and fold the others into halves, thirds, fourths and sixths. Label every piece. Use your wall to find 3 pairs of equivalent fractions and to compare 1/3 and 1/4.",
      rubric: [
        "Makes strips of the same length folded into equal parts",
        "Finds 3 correct pairs of equivalent fractions",
        "Explains which is bigger, 1/3 or 1/4, using the strips",
      ],
    },
  },

  // 8. Time, liquid volume and mass
  {
    id: "math-3.time-measure",
    title: "Minutes, Liters and Kilograms",
    minutes: 30,
    stage: "grammar",
    standards: ["3.MD.A.1", "3.MD.A.2"],
    read: [
      "A clock has two hands. The short hour hand points to the hour. The long minute hand counts minutes. Between each pair of numbers on the clock are 5 minutes, and the little marks show single minutes. To read the minutes, count by 5s to the number just before the minute hand, then count on by 1s. If the minute hand is 3 marks past the 8, that is 40 + 3 = 43 minutes. If the hour hand is between 7 and 8, the time is 7:43.",
      "Elapsed time is how much time passes from start to finish. A number line helps. If a lesson starts at 2:15 and ends at 2:55, jump from 2:15 to 2:55: that is 40 minutes. If a trip starts at 9:40 and lasts 35 minutes, jump 20 minutes to 10:00, then 15 more to 10:15.",
      "Liquid volume is how much liquid a container holds. One unit is the liter. A large water bottle holds about 1 liter. A bathtub holds a lot more, often well over 100 liters. A cup of tea holds much less than a liter.",
      "Mass is how much matter is in an object. Light things are measured in grams: a paper clip has a mass of about 1 gram. Heavier things are measured in kilograms. One kilogram is 1000 grams. A liter of water has a mass of about 1 kilogram, so a large bottle of water is a good way to feel what a kilogram is like.",
      "You can add, subtract, multiply and divide with measurements just like with any numbers. If 3 bags of flour each have a mass of 2 kilograms, together they have a mass of 3 × 2 = 6 kilograms.",
    ].join("\n\n"),
    keyIdeas: [
      "Read minutes by counting by 5s, then by 1s: 3 marks past the 8 is 43 minutes.",
      "Find elapsed time by jumping on a number line, using the next hour as a stop.",
      "Liquid volume is measured in liters; a big water bottle holds about 1 liter.",
      "Mass is measured in grams (a paper clip is about 1 g) and kilograms (1 kg = 1000 g).",
    ],
    hook: {
      text: "The sky ferry leaves at 7:43 and the ride takes 35 minutes. The ferry can carry only so many kilograms of cargo, and the crew must fill the water tank with liters of fresh water. Today you'll learn to measure time, liquid and mass like a ferry captain.",
    },
    teach: [
      {
        title: "Telling Time to the Minute",
        teach:
          "A clock has two hands. The short hand is the hour hand. The long hand is the minute hand. Between each pair of numbers on the clock are 5 minutes. The tiny marks show single minutes. To read the minutes, count by 5s to the number just before the minute hand. Then count on by 1s. Say the minute hand is 3 marks past the 8. Count 5, 10, 15, all the way to 40 at the 8. Then 41, 42, 43. If the hour hand is between 7 and 8, the time is 7:43.",
        visual: {
          type: "hotspots",
          title: "Reading 7:43",
          center: "7:43",
          spots: [
            { label: "Hour hand", icon: "⏰", detail: "The short hand. It's between 7 and 8, so the hour is 7." },
            { label: "Count by 5s", icon: "🖐️", detail: "Each number is 5 more minutes. At the 8, it's 40 minutes." },
            { label: "Count by 1s", icon: "☝️", detail: "3 little marks past the 8: 41, 42, 43." },
          ],
        },
        probe: {
          type: "number",
          prompt: "🕒 The minute hand is 2 little marks past the 6. How many minutes after the hour is it?",
          answer: 32,
          unit: "minutes",
          hint: "Count by 5s to the 6: 5, 10, 15, 20, 25, 30. Then count on 2 more.",
          mistakes: [
            { match: "8", coach: "Each number on the clock means 5 minutes, not 1. The 6 means 30 minutes." },
            { match: "62", coach: "Don't put the digits side by side. The 6 means 30 minutes, then add 2." },
          ],
          seconds: 30,
        },
        think: {
          q: "The minute hand points exactly at the 9. How many minutes after the hour is it?",
          choices: ["9", "45", "90"],
          answer: 1,
          why: "Count by 5s nine times: 5, 10, 15, 20, 25, 30, 35, 40, 45.",
          hints: ["Each number means 5 minutes, so the 9 is 9 fives.", "", "There are only 60 minutes in an hour. 9 fives is 45."],
        },
        approaches: {
          analogy:
            "The clock numbers are like mile markers every 5 miles, and the tiny marks are the single miles in between.",
          example:
            "Hour hand between 3 and 4, minute hand 4 marks past the 2. At the 2 it's 10 minutes. Then 11, 12, 13, 14. The time is 3:14.",
          simpler: {
            q: "The minute hand points at the 3. How many minutes?",
            choices: ["3", "15", "30"],
            answer: 1,
            why: "5, 10, 15. Three fives is 15.",
            hints: ["Each number on the clock is worth 5 minutes.", "", "30 is at the 6. Count 5, 10, 15 to the 3."],
          },
        },
      },
      {
        title: "How Much Time Passed?",
        teach:
          "Elapsed time is how much time passes from start to finish. A number line makes it easy. The ferry leaves at 7:43 and the ride takes 35 minutes. When does it land? Jump from 7:43 to the next hour, 8:00. That's 17 minutes. We still need 18 more minutes, because 35 minus 17 is 18. Jump 18 more to 8:18. The ferry lands at 8:18. The next hour is a great stopping place, because there are 60 minutes in every hour.",
        visual: {
          type: "flip",
          cards: [
            { front: "7:43 + 35 minutes", back: "7:43 to 8:00 is 17 minutes. 18 more is 8:18." },
            { front: "2:15 to 2:55", back: "40 minutes." },
            { front: "9:40 to 10:15", back: "20 minutes to 10:00, then 15 more: 35 minutes." },
          ],
        },
        probe: {
          type: "number",
          prompt: "⏱️ Swim practice starts at 4:35 and ends at 5:20. How many minutes long is it?",
          answer: 45,
          unit: "minutes",
          hint: "Jump from 4:35 to 5:00 first. Then from 5:00 to 5:20. Add the jumps.",
          mistakes: [
            { match: "85", coach: "An hour has 60 minutes, not 100. 4:35 to 5:00 is 25 minutes, then 20 more." },
            { match: "25", coach: "25 minutes gets you to 5:00. Practice goes 20 more minutes after that." },
          ],
          seconds: 45,
        },
        think: {
          q: "A movie starts at 6:50 and lasts 30 minutes. When does it end?",
          choices: ["7:20", "6:80", "7:80"],
          answer: 0,
          why: "6:50 to 7:00 is 10 minutes. 20 more minutes is 7:20.",
          hints: ["", "There's no 6:80. After 59 minutes, a new hour starts.", "Minutes only go up to 59. Jump to 7:00 first, then 20 more."],
        },
        approaches: {
          analogy:
            "Elapsed time is like a car trip with a rest stop. Drive to the rest stop (the next hour), then drive the rest of the way.",
          example:
            "Bake cookies at 3:45 for 25 minutes. 3:45 to 4:00 is 15 minutes. 10 more is 4:10. The cookies are done at 4:10.",
          simpler: {
            q: "It's 2:00. What time is it 20 minutes later?",
            choices: ["2:20", "4:00", "22:00"],
            answer: 0,
            why: "Add 20 minutes: 2:20.",
            hints: ["", "That's 2 hours later. We want 20 minutes.", "Minutes are added after the colon: 2:20."],
          },
        },
      },
      {
        title: "Liters",
        teach:
          "Liquid volume is how much liquid a container can hold. We measure it in liters. A large water bottle holds about 1 liter. A bathtub holds much more, often over 100 liters. A teacup holds much less than a liter. To measure, fill a container and read the marks on its side, like on a measuring jug. You can do math with liters too. The ferry's tank holds 60 liters, and each bucket holds 6 liters. How many buckets fill it? 60 divided by 6 is 10 buckets.",
        visual: {
          type: "flip",
          cards: [
            { front: "Liter", back: "A unit of liquid volume. A large water bottle holds about 1 liter." },
            { front: "Less than 1 liter", back: "A teacup, a spoonful of medicine, a juice box." },
            { front: "More than 1 liter", back: "A bucket, a fish tank, a bathtub." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Sort each container by how much it holds.",
          buckets: ["Less than 1 liter", "About 1 liter", "Much more than 1 liter"],
          items: [
            { text: "☕ A teacup", bucket: 0 },
            { text: "🥄 A spoon", bucket: 0 },
            { text: "🧃 A juice box", bucket: 0 },
            { text: "💧 A large water bottle", bucket: 1 },
            { text: "🛁 A bathtub", bucket: 2 },
            { text: "🐟 A fish pond", bucket: 2 },
            { text: "🪣 A big bucket", bucket: 2 },
          ],
          hint: "Picture a large water bottle. That's about 1 liter. Is each container smaller, about the same, or much bigger?",
          seconds: 45,
        },
        think: {
          q: "About how much water does a bathtub hold?",
          choices: ["About 1 liter", "Less than 1 liter", "More than 100 liters"],
          answer: 2,
          why: "A bathtub holds a lot of water, often well over 100 liters.",
          hints: ["1 liter is just one large water bottle. A bathtub holds far more.", "Less than a liter is like a cup. A bathtub is huge.", ""],
        },
        approaches: {
          analogy:
            "A liter is like a big water bottle. To guess how much something holds, ask: how many of those bottles would it take to fill it?",
          example:
            "A watering can holds 5 liters. To water the garden, you fill it 4 times. 4 × 5 = 20 liters of water.",
          simpler: {
            q: "Which holds more: a cup or a bucket?",
            choices: ["A bucket", "A cup", "They're the same"],
            answer: 0,
            why: "A bucket is much bigger than a cup.",
            hints: ["", "A cup is small. A bucket can fill many cups.", "A bucket is much bigger than a cup."],
          },
        },
      },
      {
        title: "Grams and Kilograms",
        teach:
          "Mass is how much matter is in an object. Light things are measured in grams. A paper clip has a mass of about 1 gram. Heavier things are measured in kilograms. One kilogram is 1000 grams. A liter of water has a mass of about 1 kilogram. So a large bottle of water is a good way to feel a kilogram. We measure mass with a scale or a balance. The ferry carries 3 crates of 8 kilograms each. That's 3 times 8, which is 24 kilograms of cargo.",
        visual: {
          type: "compare",
          left: { title: "Grams (g)", points: ["For light things", "A paper clip: about 1 gram", "A pencil, a coin, a leaf"] },
          right: { title: "Kilograms (kg)", points: ["For heavy things", "1 kilogram = 1000 grams", "A liter of water: about 1 kilogram"] },
        },
        probe: {
          type: "number",
          prompt: "📦 A crate of apples has a mass of 9 kilograms. A crate of melons has a mass of 17 kilograms. How many more kilograms is the melon crate?",
          answer: 8,
          unit: "kilograms",
          hint: "How many more means subtract: 17 - 9.",
          mistakes: [{ match: "26", coach: "26 is the two crates together. 'How many more' means find the difference: 17 - 9." }],
          seconds: 30,
        },
        think: {
          q: "Which unit would you use to measure the mass of a bicycle?",
          choices: ["Grams", "Kilograms", "Liters"],
          answer: 1,
          why: "A bicycle is heavy, so kilograms are the right unit.",
          hints: ["Grams are for light things like paper clips. A bicycle is much heavier.", "", "Liters measure liquid volume, not mass."],
        },
        approaches: {
          analogy:
            "Grams and kilograms are like cents and dollars. Small amounts are counted in cents, big amounts in dollars, and 1000 grams make a kilogram.",
          example:
            "Each bag of rice has a mass of 2 kilograms. 5 bags: 5 × 2 = 10 kilograms.",
          simpler: {
            q: "Is a paper clip light or heavy?",
            choices: ["Light", "Heavy", "Neither"],
            answer: 0,
            why: "A paper clip has a mass of only about 1 gram.",
            hints: ["", "You can lift a paper clip with one finger. It's light.", "Everything has some mass. A paper clip's is tiny."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which unit fits best?",
      buckets: ["Grams", "Kilograms", "Liters"],
      items: [
        { text: "📎 The mass of a paper clip", bucket: 0 },
        { text: "✏️ The mass of a pencil", bucket: 0 },
        { text: "🍃 The mass of a leaf", bucket: 0 },
        { text: "🐕 The mass of a dog", bucket: 1 },
        { text: "🚲 The mass of a bicycle", bucket: 1 },
        { text: "🍉 The mass of a big watermelon", bucket: 1 },
        { text: "🛁 The water in a bathtub", bucket: 2 },
        { text: "🪣 The water in a bucket", bucket: 2 },
      ],
    },
    explain: {
      prompt: "A lesson starts at 1:50 and ends at 2:25. Explain to Professor Pascal how to find how long it lasted.",
      keyPoints: [
        "Jump from 1:50 to the next hour, 2:00: that is 10 minutes",
        "Then jump from 2:00 to 2:25: 25 more minutes",
        "Add the jumps: 10 + 25 = 35 minutes",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "🕰️ The hour hand is between 5 and 6. The minute hand is 4 marks past the 3. What are the minutes? (The time is 5:__)",
        answer: 19,
        unit: "minutes",
        hint: "At the 3 it's 15 minutes. Count on 4 more.",
        mistakes: [{ match: "7", coach: "The 3 means 15 minutes, because each number is 5 minutes. Then add 4." }],
        seconds: 30,
      },
      {
        type: "place",
        prompt: "A trip starts at 3:00. Drag each event to how many minutes after 3:00 it happens.",
        min: 0,
        max: 60,
        step: 5,
        tolerance: 0,
        items: [
          { label: "Arrive at the bridge, 3:25", value: 25 },
          { label: "Lunch, 3:40", value: 40 },
          { label: "Home, 3:55", value: 55 },
        ],
        hint: "The minutes after the colon tell how far past 3:00.",
        seconds: 35,
      },
      {
        type: "cloze",
        text: "A fish tank holds 40 liters. A bucket holds 5 liters. It takes {0} buckets to fill the tank. A bag of sand has a mass of 6 kilograms, so 4 bags have a mass of {1} kilograms.",
        blanks: [{ answers: ["8", "eight"] }, { answers: ["24"] }],
        bank: ["8", "24", "35", "10", "45"],
        hint: "How many 5s make 40? Then 4 groups of 6.",
        mistakes: [
          { match: "35", coach: "35 is 40 - 5. We need how many buckets of 5 make 40." },
          { match: "10", coach: "10 is 6 + 4. Four bags of 6 kilograms means 4 × 6." },
        ],
        seconds: 45,
      },
      {
        type: "sort",
        prompt: "Grams or kilograms?",
        buckets: ["Grams", "Kilograms"],
        items: [
          { text: "🪙 A coin", bucket: 0 },
          { text: "🍓 A strawberry", bucket: 0 },
          { text: "🧳 A full suitcase", bucket: 1 },
          { text: "👦 A third grader", bucket: 1 },
        ],
        hint: "Light things you can hold in your fingers are grams. Heavy things are kilograms.",
        seconds: 30,
      },
    ],
    check: [
      { q: "The minute hand is 1 mark past the 4. How many minutes after the hour?", choices: ["5", "41", "21"], answer: 2, why: "At the 4 it's 20 minutes. One more is 21." },
      { q: "A game starts at 3:40 and lasts 30 minutes. When does it end?", choices: ["4:10", "3:70", "4:30"], answer: 0, why: "3:40 to 4:00 is 20 minutes. 10 more is 4:10." },
      { q: "About how much does a large water bottle hold?", choices: ["About 100 liters", "About 1 liter", "About 1 gram"], answer: 1, why: "A large water bottle holds about 1 liter." },
      { q: "How many grams are in 1 kilogram?", choices: ["10", "100", "1000"], answer: 2, why: "1 kilogram = 1000 grams." },
    ],
    task: {
      kind: "lab",
      prompt: "With a parent, time three things you do today (brushing teeth, eating lunch, a walk) by writing the start and end times, and find how many minutes each took. Then use a kitchen scale and a measuring jug: find 3 things lighter than 1 kilogram and 1 thing heavier, and fill a 1-liter bottle with water to feel a liter.",
      rubric: [
        "Writes start and end times and finds the elapsed minutes correctly",
        "Weighs objects and sorts them by more or less than 1 kilogram",
        "Measures 1 liter of water and tells about how much it is",
      ],
    },
  },

  // 9. Picture graphs, bar graphs and line plots
  {
    id: "math-3.graphs",
    title: "Picture Graphs, Bar Graphs and Line Plots",
    minutes: 30,
    stage: "logic",
    standards: ["3.MD.B.3", "3.MD.B.4"],
    read: [
      "Graphs turn a pile of numbers into a picture you can read at a glance. Every graph has a title that tells what it's about and labels that tell what each part means.",
      "A picture graph uses symbols. In a scaled picture graph, each symbol stands for more than one thing. The key tells how many. If the key says one balloon stands for 5 balloons, then a row of 4 balloon symbols means 4 × 5 = 20 balloons. Always read the key before you count.",
      "A bar graph uses bars. The scale on the side counts by a jump, like 2s, 5s or 10s. To read a bar, look across from its top to the scale. If a bar stops halfway between 20 and 30 on a scale of 10s, it shows 25.",
      "Graphs help answer questions like how many more and how many fewer. If 35 kids picked apples and 20 picked pears, then 35 - 20 = 15 more kids picked apples. Some questions take two steps, like comparing apples to pears and plums put together: add first, then subtract.",
      "A line plot shows measurements. First measure things carefully with a ruler, to the nearest half inch or quarter inch. Then draw a number line with those marks and put an X above the number for each measurement. If you measured 10 feathers, there are 10 Xs. The tallest stack shows the most common length.",
    ].join("\n\n"),
    keyIdeas: [
      "In a scaled picture graph, the key tells how many each symbol stands for.",
      "Bar graphs use a scale that counts by 2s, 5s or 10s; read across from the top of the bar.",
      "Graphs answer 'how many more' and 'how many fewer' by subtracting.",
      "A line plot shows measurements with an X for each one, even halves and quarters of an inch.",
    ],
    hook: {
      text: "The islanders voted for the new bridge color. There are hundreds of votes on little slips of paper! Nobody can tell which color won by staring at the pile. How can we turn all those slips into a picture that anyone can read in one second?",
    },
    teach: [
      {
        title: "Scaled Picture Graphs",
        teach:
          "A picture graph uses little symbols to show numbers. In a scaled picture graph, each symbol stands for more than one thing. The key tells you how many. Say the key shows one balloon for every 5 balloons. If the red row has 4 balloon symbols, that's 4 groups of 5. So 4 times 5 is 20 red balloons. Always read the key first! Without it, you might think the row shows only 4 balloons. A key lets a short row stand for a big number.",
        visual: {
          type: "hotspots",
          title: "Balloons sold (key: 🎈 = 5 balloons)",
          center: "🎈 = 5",
          spots: [
            { label: "Red: 🎈🎈🎈🎈", icon: "🔴", detail: "4 symbols × 5 = 20 red balloons." },
            { label: "Blue: 🎈🎈🎈🎈🎈🎈", icon: "🔵", detail: "6 symbols × 5 = 30 blue balloons." },
            { label: "Green: 🎈🎈", icon: "🟢", detail: "2 symbols × 5 = 10 green balloons." },
            { label: "Key", icon: "🔑", detail: "Each balloon symbol stands for 5 balloons. Read it first!" },
          ],
        },
        probe: {
          type: "number",
          prompt: "Key: ⭐ = 10 votes. The blue bridge row shows ⭐⭐⭐⭐⭐⭐⭐. How many votes did blue get?",
          answer: 70,
          unit: "votes",
          hint: "Count the stars, then multiply by the key: each star is 10 votes.",
          mistakes: [{ match: "7", coach: "Each star stands for 10 votes, not 1. So 7 stars is 7 × 10." }],
          seconds: 30,
        },
        think: {
          q: "Key: 🍎 = 2 apples. A row shows 🍎🍎🍎. How many apples?",
          choices: ["3", "5", "6"],
          answer: 2,
          why: "3 symbols × 2 apples each = 6 apples.",
          hints: ["3 is just the number of symbols. Each one stands for 2 apples.", "5 is 3 + 2. Multiply: 3 groups of 2.", ""],
        },
        approaches: {
          analogy:
            "A key is like a coin. A dime is one coin, but it's worth 10 cents. Each symbol is one picture, but it's worth more than one thing.",
          example:
            "Key: 📚 = 4 books. Sam's row has 5 symbols. 5 × 4 = 20 books.",
          simpler: {
            q: "Key: ⭐ = 2. One star stands for how many?",
            choices: ["2", "1", "0"],
            answer: 0,
            why: "The key says each star is 2.",
            hints: ["", "The key changes it: each star is worth 2.", "A star is worth something. Look at the key."],
          },
        },
      },
      {
        title: "Bar Graphs",
        teach:
          "A bar graph uses bars instead of pictures. Along the side is a scale. The scale counts by jumps, like 2s, 5s or 10s. To read a bar, slide your finger from the top of the bar straight across to the scale. Say the scale counts by 10s and the green bar stops halfway between 20 and 30. Halfway between 20 and 30 is 25. So green got 25 votes. Bar graphs make it easy to see which is biggest. The tallest bar wins!",
        visual: {
          type: "flip",
          cards: [
            { front: "Scale", back: "The numbers on the side. It counts by a jump, like 2s, 5s or 10s." },
            { front: "Read a bar", back: "Look straight across from the top of the bar to the scale." },
            { front: "Halfway", back: "On a scale of 10s, halfway between 20 and 30 is 25." },
            { front: "Title and labels", back: "Tell what the graph is about and what each bar means." },
          ],
        },
        probe: {
          type: "place",
          prompt: "Bridge color votes. Drag each bar's top to its value on the scale.",
          min: 0,
          max: 50,
          step: 5,
          tolerance: 0,
          items: [
            { label: "Red: 3 squares tall, 10 votes per square", value: 30 },
            { label: "Green: halfway between 20 and 30", value: 25 },
            { label: "Gold: 1 square and a half, 10 per square", value: 15 },
          ],
          hint: "Each square is 10 votes. Half a square is 5 votes.",
          seconds: 45,
        },
        think: {
          q: "A scale counts by 5s. A bar stops at the line just above 15. What does it show?",
          choices: ["16", "20", "25"],
          answer: 1,
          why: "Counting by 5s, the line after 15 is 20.",
          hints: ["The scale counts by 5s, not 1s. The next line after 15 is 20.", "", "25 is two lines above 15."],
        },
        approaches: {
          analogy:
            "Reading a bar graph is like checking your height on a growth chart. You look straight across from the top of your head to the numbers.",
          example:
            "Scale by 2s. The cat bar stops at the line after 8, which is 10. The dog bar stops halfway between 10 and 12, which is 11.",
          simpler: {
            q: "A scale counts by 10s: 0, 10, 20, 30. What comes after 20?",
            choices: ["21", "30", "25"],
            answer: 1,
            why: "Counting by 10s: 20, 30.",
            hints: ["That's counting by 1s. This scale counts by 10s.", "", "That's counting by 5s. This scale counts by 10s."],
          },
        },
      },
      {
        title: "How Many More? How Many Fewer?",
        teach:
          "Graphs answer questions. How many more people chose blue than red? Find both numbers, then subtract. Blue got 70 votes and red got 30. 70 minus 30 is 40. So blue got 40 more votes. How many fewer is the same subtraction, just asked the other way. Red got 40 fewer than blue. Some questions take two steps. How many more votes did blue get than red and gold together? Step one: 30 plus 15 is 45. Step two: 70 minus 45 is 25 more.",
        visual: {
          type: "compare",
          left: { title: "One step", points: ["How many more blue than red?", "70 - 30 = 40"] },
          right: { title: "Two steps", points: ["Blue compared to red and gold together?", "30 + 15 = 45", "70 - 45 = 25"] },
        },
        probe: {
          type: "number",
          prompt: "Favorite fruit: 🍎 apples 35, 🍐 pears 20, 🍑 peaches 10. How many more kids picked apples than pears and peaches together?",
          answer: 5,
          hint: "Step 1: add pears and peaches. Step 2: subtract that from apples.",
          mistakes: [
            { match: "15", coach: "15 compares apples to pears only. Add pears and peaches first: 20 + 10 = 30." },
            { match: "65", coach: "65 adds everything. We want how many MORE, so subtract." },
          ],
          seconds: 50,
        },
        think: {
          q: "Dogs: 18 votes. Cats: 12 votes. How many fewer votes did cats get?",
          choices: ["30", "6", "12"],
          answer: 1,
          why: "18 - 12 = 6. Cats got 6 fewer votes.",
          hints: ["30 adds them together. 'How many fewer' means subtract.", "", "12 is how many cats got, not how many fewer."],
        },
        approaches: {
          analogy:
            "How many more is like comparing two stacks of blocks. Put them side by side and count how many blocks stick up above the shorter one.",
          example:
            "Soccer 24, swim 16. How many more chose soccer? 24 - 16 = 8 more.",
          simpler: {
            q: "Tom has 9 stickers, Kim has 6. How many more does Tom have?",
            choices: ["3", "15", "6"],
            answer: 0,
            why: "9 - 6 = 3.",
            hints: ["", "15 is both together. Subtract to compare.", "6 is how many Kim has. Find the difference."],
          },
        },
      },
      {
        title: "Measuring and Line Plots",
        teach:
          "A line plot shows measurements. First, measure carefully with a ruler. Between each inch, the ruler has a mark for one half and smaller marks for quarters. A feather might be 3 and one quarter inches long. Next, draw a number line with those half and quarter marks. Put an X above the number for each thing you measured. If you measured 10 feathers, you draw 10 Xs. The tallest stack of Xs shows the most common length. A line plot shows you the whole group at once.",
        visual: {
          type: "hotspots",
          title: "Feather lengths (inches)",
          center: "Line plot",
          spots: [
            { label: "3 inches", icon: "✖️", detail: "X X: 2 feathers were exactly 3 inches." },
            { label: "3 1/4 inches", icon: "✖️", detail: "X X X X: 4 feathers. The most common length." },
            { label: "3 1/2 inches", icon: "✖️", detail: "X X X: 3 feathers." },
            { label: "3 3/4 inches", icon: "✖️", detail: "X: 1 feather. That makes 10 feathers in all." },
          ],
        },
        probe: {
          type: "place",
          prompt: "Drag each measurement to its mark on the ruler line (in inches).",
          min: 0,
          max: 4,
          step: 0.25,
          tolerance: 0.01,
          items: [
            { label: "🪶 Feather: 3 1/4 in", value: 3.25 },
            { label: "🍃 Leaf: 2 1/2 in", value: 2.5 },
            { label: "🐛 Caterpillar: 1 3/4 in", value: 1.75 },
          ],
          hint: "Each inch is split into 4 quarters. 1/2 is 2 quarters past the inch.",
          seconds: 45,
        },
        think: {
          q: "A line plot has 2 Xs above 4, 5 Xs above 4 1/2 and 1 X above 5. How many things were measured?",
          choices: ["3", "8", "5"],
          answer: 1,
          why: "Each X is one thing: 2 + 5 + 1 = 8.",
          hints: ["3 is the number of lengths. Count every X.", "", "5 is just the tallest stack. Add all the Xs."],
        },
        approaches: {
          analogy:
            "A line plot is like kids lining up behind signs for their shoe size. The longest line shows the most common size.",
          example:
            "Pencils measured: 5, 5 1/2, 5 1/2, 6, 5 1/2 inches. Put Xs: one above 5, three above 5 1/2, one above 6. 5 1/2 is most common.",
          simpler: {
            q: "A ruler mark is halfway between 2 and 3 inches. What is it?",
            choices: ["2 1/2 inches", "5 inches", "2 1/4 inches"],
            answer: 0,
            why: "Halfway between 2 and 3 is 2 and one half.",
            hints: ["", "5 is 2 + 3. Halfway between them is much smaller.", "2 1/4 is only a quarter of the way."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the steps in order to make a line plot of leaf lengths.",
      steps: [
        "Collect the leaves.",
        "Measure each leaf to the nearest quarter inch.",
        "Write down every measurement.",
        "Draw a number line with quarter-inch marks.",
        "Put an X above the length of each leaf.",
        "Give the plot a title and label the units.",
      ],
    },
    explain: {
      prompt: "A picture graph has the key 🐟 = 4 fish. The pond row shows 🐟🐟🐟🐟🐟. Explain to Professor Pascal how many fish that is, and why the key matters.",
      keyPoints: [
        "There are 5 symbols",
        "Each symbol stands for 4 fish",
        "5 × 4 = 20 fish",
        "Without the key you might think it's only 5",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "Key: 🎈 = 5. Red row: 🎈🎈🎈🎈🎈🎈🎈🎈 (8 symbols). Blue row: 🎈🎈🎈 (3 symbols). How many more red balloons than blue?",
        answer: 25,
        unit: "balloons",
        hint: "Red is 8 × 5 and blue is 3 × 5. Then subtract.",
        mistakes: [{ match: "5", coach: "5 is the difference in symbols. Each symbol is 5 balloons, so 5 × 5 = 25." }],
        seconds: 45,
      },
      {
        type: "cloze",
        text: "A bar graph's scale counts by 10s. The fiction bar stops at 60 and the poetry bar stops halfway between 30 and 40, at {0}. Fiction has {1} more books than poetry.",
        blanks: [{ answers: ["35"] }, { answers: ["25"] }],
        bank: ["35", "25", "34", "95", "30"],
        hint: "Halfway between 30 and 40 is 35. Then subtract from 60.",
        mistakes: [
          { match: "95", coach: "95 adds them. 'How many more' means subtract: 60 - 35." },
          { match: "34", coach: "Halfway between 30 and 40 is 35, right in the middle." },
        ],
        seconds: 45,
      },
      {
        type: "place",
        prompt: "Drag each pencil length to its mark (in inches).",
        min: 4,
        max: 7,
        step: 0.25,
        tolerance: 0.01,
        items: [
          { label: "✏️ 5 1/2 in", value: 5.5 },
          { label: "✏️ 6 3/4 in", value: 6.75 },
          { label: "✏️ 4 1/4 in", value: 4.25 },
        ],
        hint: "Find the whole inch, then count quarters past it.",
        seconds: 40,
      },
      {
        type: "number",
        prompt: "A line plot of shell lengths: 1 X above 2 in, 3 Xs above 2 1/4 in, 4 Xs above 2 1/2 in, 2 Xs above 2 3/4 in. How many shells were measured?",
        answer: 10,
        unit: "shells",
        hint: "Each X is one shell. Add all the Xs.",
        mistakes: [{ match: "4", coach: "4 is the tallest stack. Add every X: 1 + 3 + 4 + 2." }],
        seconds: 30,
      },
    ],
    check: [
      { q: "Key: ⭐ = 5. How many does ⭐⭐⭐⭐ show?", choices: ["4", "9", "20"], answer: 2, why: "4 symbols × 5 = 20." },
      { q: "A scale counts by 10s. A bar stops halfway between 40 and 50. What does it show?", choices: ["45", "41", "90"], answer: 0, why: "Halfway between 40 and 50 is 45." },
      { q: "Apples 28, pears 19. How many more apples?", choices: ["47", "9", "11"], answer: 1, why: "28 - 19 = 9." },
      { q: "On a line plot, what does each X stand for?", choices: ["One measured thing", "Ten things", "A wrong answer"], answer: 0, why: "Each X shows one measurement." },
    ],
    task: {
      kind: "project",
      prompt: "Collect 10 leaves, pencils or crayons. With a parent, measure each to the nearest quarter inch and make a line plot. Then ask 10 family members or friends their favorite fruit and make a bar graph with a scale of 2s. Write one 'how many more' question about your graph.",
      rubric: [
        "Measures 10 things to the nearest quarter inch and shows them on a line plot",
        "Makes a bar graph with a title, labels and a scale of 2s",
        "Writes and answers a correct 'how many more' question",
      ],
    },
  },

  // 10. Area, perimeter and shapes
  {
    id: "math-3.area-shapes",
    title: "Area, Perimeter and Shapes",
    minutes: 35,
    stage: "rhetoric",
    standards: ["3.MD.C.5", "3.MD.C.6", "3.MD.C.7", "3.MD.D.8", "3.G.A.1"],
    read: [
      "Area is how much flat space a shape covers. We measure area with unit squares: squares that are 1 unit long on each side. To find the area, cover the shape with unit squares, with no gaps and no overlaps, and count them. If the squares are 1 centimeter on each side, the area is in square centimeters. If they are 1 foot on each side, it's in square feet.",
      "Counting every square is slow. A rectangle is just an array of squares, so you can multiply. A garden 4 feet wide and 6 feet long has 4 rows of 6 squares: 4 × 6 = 24 square feet. Area = length × width.",
      "For an L-shaped space, split it into two rectangles, find each area, and add. This is the same break-apart idea we used for hard multiplication facts.",
      "Perimeter is different. It's the distance all the way around a shape. Add up the lengths of all the sides. A rectangle 4 feet by 6 feet has a perimeter of 4 + 6 + 4 + 6 = 20 feet. Area counts the squares inside; perimeter measures the fence around the outside. If you know the perimeter and all but one side, subtract to find the missing side. Two rectangles can have the same perimeter but different areas: a 1 by 5 rectangle and a 3 by 3 square both have a perimeter of 12, but their areas are 5 and 9.",
      "Shapes with four straight sides are called quadrilaterals. A rectangle has four square corners. A rhombus has four equal sides. A square has both: four equal sides and four square corners, so a square is a rectangle and a rhombus at the same time. Shapes in different families can share the same features.",
    ].join("\n\n"),
    keyIdeas: [
      "Area is the number of unit squares that cover a shape, with no gaps or overlaps.",
      "Area of a rectangle = length × width; split odd shapes into rectangles and add.",
      "Perimeter is the distance around: add all the side lengths.",
      "Quadrilaterals have 4 sides; a square is both a rectangle and a rhombus.",
    ],
    hook: {
      text: "The islanders want to plant a new garden on a floating island. They need to know two things: how much soil covers the ground, and how much fence goes around it. Those are two very different measurements. Today you'll learn both, and you'll design a garden of your own.",
    },
    teach: [
      {
        title: "Area: Covering with Squares",
        teach:
          "Area is how much flat space a shape covers. We measure it with unit squares. A unit square is 1 unit long on each side. To find the area, cover the shape with unit squares. Leave no gaps, and don't let any squares overlap. Then count them. If each square is 1 centimeter on each side, the area is in square centimeters. If each is 1 foot on each side, the area is in square feet. A rug covered by 12 square feet has an area of 12 square feet.",
        visual: {
          type: "flip",
          cards: [
            { front: "Area", back: "How much flat space a shape covers." },
            { front: "Unit square", back: "A square 1 unit long on each side. It has an area of 1 square unit." },
            { front: "No gaps, no overlaps", back: "Squares must cover every bit of the shape, without stacking." },
            { front: "Units", back: "Square centimeters, square inches, square feet, square meters." },
          ],
        },
        probe: {
          type: "number",
          prompt: "🟩🟩🟩🟩🟩 / 🟩🟩🟩🟩🟩 / 🟩🟩🟩🟩🟩 A patio is covered by these 1-foot squares (3 rows of 5). What is its area in square feet?",
          answer: 15,
          unit: "square feet",
          hint: "Count every square, or count the rows and how many in each row.",
          mistakes: [{ match: "8", coach: "8 is 3 + 5, which adds the sides. Area counts every square inside: 3 rows of 5." }],
          seconds: 30,
        },
        think: {
          q: "Why can't the unit squares overlap when you measure area?",
          choices: ["Overlaps would count some space twice", "Overlaps look messy", "Squares can't touch"],
          answer: 0,
          why: "If squares overlap, the same space is counted twice and the area comes out too big.",
          hints: [
            "",
            "It's not about looks. Think about what happens to the count.",
            "Squares must touch, with no gaps. They just can't stack on top of each other.",
          ],
        },
        approaches: {
          analogy:
            "Measuring area is like tiling a bathroom floor. Every bit of the floor gets a tile, and no tile sits on top of another. Count the tiles to know the area.",
          example:
            "A tabletop is covered by 2 rows of 4 square-foot tiles. Count: 8 tiles. The area is 8 square feet.",
          simpler: {
            q: "A shape is covered by 6 unit squares with no gaps. What is its area?",
            choices: ["6 square units", "6 units", "12 square units"],
            answer: 0,
            why: "Each unit square is 1 square unit, so 6 squares is 6 square units.",
            hints: ["", "Area is measured in square units, not plain units.", "Count the squares: there are 6."],
          },
        },
      },
      {
        title: "Area by Multiplying",
        teach:
          "Counting every square is slow. But a rectangle is an array of squares, so you can multiply! A garden is 4 feet wide and 6 feet long. That's 4 rows of 6 squares. 4 times 6 is 24 square feet. Area equals length times width. What about an L-shaped garden? Split it into two rectangles. Say one part is 3 by 5 and the other is 2 by 4. 3 times 5 is 15. 2 times 4 is 8. Add them: 15 plus 8 is 23 square feet.",
        visual: {
          type: "hotspots",
          title: "An L-shaped garden",
          center: "15 + 8 = 23",
          spots: [
            { label: "Part A: 3 × 5", icon: "🟩", detail: "3 rows of 5 squares: 15 square feet." },
            { label: "Part B: 2 × 4", icon: "🟦", detail: "2 rows of 4 squares: 8 square feet." },
            { label: "Add", icon: "➕", detail: "15 + 8 = 23 square feet in all." },
          ],
        },
        probe: {
          type: "cloze",
          text: "A room is 7 feet by 8 feet. Split the 8 into 5 + 3: 7 × 5 = {0} and 7 × 3 = {1}. The area is {2} square feet.",
          blanks: [{ answers: ["35"] }, { answers: ["21"] }, { answers: ["56"] }],
          bank: ["35", "21", "56", "15", "30"],
          hint: "Find each small rectangle's area, then add them.",
          mistakes: [
            { match: "15", coach: "15 is 7 + 8, the two sides added. Area multiplies: 35 + 21." },
            { match: "30", coach: "30 is 5 × 6. We need 7 × 5 here." },
          ],
          seconds: 50,
        },
        think: {
          q: "A rug is 3 feet by 9 feet. What is its area?",
          choices: ["12 square feet", "27 square feet", "24 square feet"],
          answer: 1,
          why: "Area = length × width = 3 × 9 = 27 square feet.",
          hints: ["12 is 3 + 9. Area multiplies the sides.", "", "24 is the perimeter: 3 + 9 + 3 + 9. Area is 3 × 9."],
        },
        approaches: {
          analogy:
            "A rectangle of tiles is like a muffin pan: you don't count every cup, you multiply rows by cups in each row.",
          example:
            "A sandbox is 5 feet by 4 feet. 5 × 4 = 20 square feet. Check by counting: 4 rows of 5 squares is 5, 10, 15, 20.",
          simpler: {
            q: "A rectangle has 2 rows of 3 squares. What is its area?",
            choices: ["5 square units", "6 square units", "23 square units"],
            answer: 1,
            why: "2 × 3 = 6 squares.",
            hints: ["5 is 2 + 3. Count the squares: 3 + 3.", "", "Multiply, don't put the digits side by side."],
          },
        },
      },
      {
        title: "Perimeter: The Distance Around",
        teach:
          "Perimeter is the distance all the way around a shape. To find it, add the lengths of all the sides. A garden 4 feet by 6 feet needs 4 plus 6 plus 4 plus 6. That's 20 feet of fence. Area counts squares inside. Perimeter measures the fence outside. Missing a side? If the perimeter is 20 and the other sides add to 14, the missing side is 20 minus 14, which is 6. Here's a surprise. A 1 by 5 garden and a 3 by 3 garden both need 12 feet of fence. But their areas are 5 and 9 square feet!",
        visual: {
          type: "compare",
          left: { title: "1 by 5 garden", points: ["Perimeter: 1 + 5 + 1 + 5 = 12 feet", "Area: 5 square feet"] },
          right: { title: "3 by 3 garden", points: ["Perimeter: 3 + 3 + 3 + 3 = 12 feet", "Area: 9 square feet"] },
        },
        probe: {
          type: "cloze",
          text: "A rectangle is 2 feet by 7 feet. Its perimeter is {0} feet and its area is {1} square feet.",
          blanks: [{ answers: ["18"] }, { answers: ["14"] }],
          bank: ["18", "14", "9", "28"],
          hint: "Perimeter: add all four sides, 2 + 7 + 2 + 7. Area: multiply 2 × 7.",
          mistakes: [
            { match: "9", coach: "9 is only two sides. A rectangle has four sides: 2 + 7 + 2 + 7." },
            { match: "28", coach: "28 is double the area. Area is just 2 × 7." },
          ],
          seconds: 45,
        },
        think: {
          q: "A square has sides of 5 feet. What is its perimeter?",
          choices: ["25 feet", "10 feet", "20 feet"],
          answer: 2,
          why: "A square has 4 equal sides: 5 + 5 + 5 + 5 = 20 feet.",
          hints: ["25 is 5 × 5, which is the area, not the distance around.", "10 is only two sides. A square has four.", ""],
        },
        approaches: {
          analogy:
            "Perimeter is like walking all the way around a playground along its edge. Area is like the grass you'd need to cover the whole playground.",
          example:
            "A triangle with sides 3, 4 and 5 inches has a perimeter of 3 + 4 + 5 = 12 inches. If a rectangle has a perimeter of 16 and sides 3, 5 and 3, the last side is 16 - 11 = 5.",
          simpler: {
            q: "A triangle has sides 2, 2 and 2 feet. What is its perimeter?",
            choices: ["6 feet", "4 feet", "222 feet"],
            answer: 0,
            why: "2 + 2 + 2 = 6 feet.",
            hints: ["", "Add all three sides, not two.", "Add the sides; don't stick the digits together."],
          },
        },
      },
      {
        title: "Quadrilaterals",
        teach:
          "Shapes with four straight sides are called quadrilaterals. Quad means four. Some quadrilaterals have special names. A rectangle has four square corners, like the corner of a book. A rhombus has four sides that are all the same length, like a diamond kite. A square has both! It has four equal sides and four square corners. So a square is a rectangle and a rhombus at the same time. Shapes from different families can share features. A trapezoid and a kite are quadrilaterals too. A triangle is not, because it has only three sides.",
        visual: {
          type: "hotspots",
          title: "The quadrilateral family",
          center: "4 sides",
          spots: [
            { label: "Rectangle", icon: "▭", detail: "4 sides and 4 square corners." },
            { label: "Rhombus", icon: "🔷", detail: "4 sides, all the same length." },
            { label: "Square", icon: "🟦", detail: "4 equal sides and 4 square corners. It's a rectangle and a rhombus." },
            { label: "Trapezoid", icon: "⏢", detail: "4 sides. It is a quadrilateral but not a rectangle." },
            { label: "Not one", icon: "🔺", detail: "A triangle has 3 sides, so it is not a quadrilateral." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Is each shape a quadrilateral or not?",
          buckets: ["Quadrilateral", "Not a quadrilateral"],
          items: [
            { text: "A square", bucket: 0 },
            { text: "A rhombus", bucket: 0 },
            { text: "A rectangle", bucket: 0 },
            { text: "A trapezoid", bucket: 0 },
            { text: "A triangle", bucket: 1 },
            { text: "A hexagon (6 sides)", bucket: 1 },
            { text: "A circle", bucket: 1 },
          ],
          hint: "Count the straight sides. A quadrilateral has exactly 4.",
          seconds: 40,
        },
        think: {
          q: "Why is a square also a rectangle?",
          choices: ["Because it has 4 square corners", "Because it is small", "Because it has 3 sides"],
          answer: 0,
          why: "A rectangle is any quadrilateral with 4 square corners. A square has them.",
          hints: ["", "Size doesn't matter. Look at the corners.", "A square has 4 sides, not 3."],
        },
        approaches: {
          analogy:
            "Shape families are like animal families. A robin is a bird and also an animal. A square is a rectangle and also a quadrilateral.",
          example:
            "A door has 4 sides and 4 square corners, so it's a rectangle. A diamond-shaped sign with 4 equal sides is a rhombus. A floor tile with 4 equal sides and square corners is a square, which is both.",
          simpler: {
            q: "How many sides does a quadrilateral have?",
            choices: ["3", "4", "5"],
            answer: 1,
            why: "Quad means four.",
            hints: ["3 sides is a triangle.", "", "5 sides is a pentagon."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Is each question about area or perimeter?",
      buckets: ["Area (covering)", "Perimeter (around)"],
      items: [
        { text: "How much carpet covers the floor?", bucket: 0 },
        { text: "How many tiles fit on the patio?", bucket: 0 },
        { text: "How much grass seed for the yard?", bucket: 0 },
        { text: "How much fence goes around the garden?", bucket: 1 },
        { text: "How much ribbon goes around a picture frame?", bucket: 1 },
        { text: "How far is one lap around the field?", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Design a garden for the Sky Islands. Tell Professor Pascal its length and width, then explain how you'd find its area and its perimeter, and how they are different.",
      keyPoints: [
        "Area is length times width, in square units",
        "Perimeter adds all four sides",
        "Area covers the inside; perimeter goes around the outside",
        "Gives correct numbers for the garden",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "🌱 An L-shaped garden splits into a 4 by 5 rectangle and a 2 by 3 rectangle. What is its total area in square feet?",
        answer: 26,
        unit: "square feet",
        hint: "Find each area: 4 × 5 and 2 × 3. Then add.",
        mistakes: [{ match: "14", coach: "14 adds the side lengths. Area multiplies: 20 + 6." }],
        seconds: 45,
      },
      {
        type: "number",
        prompt: "A rectangle has a perimeter of 24 feet. Three of its sides are 8, 4 and 8 feet. How long is the fourth side?",
        answer: 4,
        unit: "feet",
        hint: "Add the three sides you know, then subtract from 24.",
        mistakes: [{ match: "20", coach: "20 is the three sides added. Subtract it from 24 to find the missing side." }],
        seconds: 40,
      },
      {
        type: "match",
        prompt: "Match each garden to its area.",
        pairs: [
          { left: "3 ft by 4 ft", right: "12 sq ft" },
          { left: "5 ft by 5 ft", right: "25 sq ft" },
          { left: "2 ft by 8 ft", right: "16 sq ft" },
          { left: "6 ft by 7 ft", right: "42 sq ft" },
        ],
        hint: "Area = length × width.",
        seconds: 45,
      },
      {
        type: "highlight",
        prompt: "Tap every true sentence.",
        sentences: [
          "A square is a kind of rectangle.",
          "A square is a kind of rhombus.",
          "Every rectangle is a square.",
          "A trapezoid is a quadrilateral.",
          "A triangle is a quadrilateral.",
        ],
        correct: [0, 1, 3],
        hint: "A square has 4 equal sides and 4 square corners. Not every rectangle has equal sides.",
        seconds: 45,
      },
    ],
    check: [
      { q: "What is the area of a rectangle 6 feet by 3 feet?", choices: ["9 square feet", "18 square feet", "18 feet"], answer: 1, why: "Area = 6 × 3 = 18 square feet. Area uses square units." },
      { q: "What is the perimeter of a rectangle 6 feet by 3 feet?", choices: ["18 feet", "9 feet", "18 square feet"], answer: 0, why: "6 + 3 + 6 + 3 = 18 feet." },
      { q: "Which shape is both a rectangle and a rhombus?", choices: ["A trapezoid", "A triangle", "A square"], answer: 2, why: "A square has 4 square corners and 4 equal sides." },
      { q: "Which is about perimeter?", choices: ["Tiles to cover a floor", "Fence around a yard", "Paint for a wall"], answer: 1, why: "A fence goes around the outside, which is perimeter." },
    ],
    task: {
      kind: "project",
      prompt: "Design a garden on grid paper with a parent. Make it L-shaped or a rectangle. Label every side in feet. Find the area (in square feet) and the perimeter (in feet). Then draw a second garden with the same perimeter but a different area.",
      rubric: [
        "Draws a garden on grid paper with every side labeled",
        "Finds the area correctly, splitting into rectangles if needed",
        "Finds the perimeter correctly by adding all sides",
        "Draws a second garden with the same perimeter and a different area",
      ],
    },
  },
];

export const math3 = k5Course("math", 3, lessons);
