import type { Lesson } from "../types";
import { k5Course } from "./base";

/**
 * math-1: Grade 1 math (Common Core), taught by Professor Pascal in
 * Whisperwood Forest. Everything is read aloud, so sentences are short.
 */
const lessons: Lesson[] = [
  // 1. Adding within 20
  {
    id: "math-1.add20",
    title: "Adding Up to 20",
    minutes: 18,
    stage: "grammar",
    standards: ["1.OA.C.5", "1.OA.C.6", "1.OA.B.3"],
    read: [
      "Adding means putting groups together. When we add, we find how many in all.",
      "You can count every thing from 1. But there is a faster way. Start at the bigger number and count on. For 8 plus 3, hold 8 in your head. Then say 9, 10, 11. So 8 plus 3 equals 11.",
      "Ten is a magic number. To add 9 plus 5, move 1 from the 5 over to the 9. Now you have 10 plus 4. That is 14.",
      "Doubles are easy to remember. 6 plus 6 is 12. 7 plus 7 is 14. If you know 6 plus 6, then 6 plus 7 is just one more. It is 13.",
      "You can add in any order. 3 plus 5 is the same as 5 plus 3. Both make 8. Let's figure it out together!",
    ].join("\n\n"),
    keyIdeas: [
      "Start at the bigger number and count on.",
      "Make a ten to add fast: 9 + 5 = 10 + 4 = 14.",
      "Doubles help: 6 + 6 = 12, so 6 + 7 = 13.",
      "You can add in any order: 3 + 5 = 5 + 3.",
    ],
    hook: {
      text: "Pip found 8 acorns under an oak tree. Then 3 more fell down. Plop, plop, plop! How many acorns does Pip have now?",
    },
    teach: [
      {
        title: "Count On",
        teach:
          "Let's add 8 plus 3. You could count every acorn from 1. That takes a long time! Here is a faster way. Start at the bigger number. Hold 8 in your head. Now count on 3 more. Nine, ten, eleven. So 8 plus 3 equals 11. Always start with the bigger number. Then count on the little one.",
        visual: {
          type: "flip",
          cards: [
            { front: "Count on", back: "Start at the bigger number. Then count up the smaller one. 8 + 3: say 9, 10, 11." },
            { front: "6 + 2", back: "Start at 6. Count on 2: 7, 8. The answer is 8." },
            { front: "2 + 9", back: "Start at the bigger number, 9. Count on 2: 10, 11. The answer is 11." },
          ],
        },
        probe: {
          type: "place",
          prompt: "Count on! Drag each sum to its spot on the number line.",
          min: 0,
          max: 20,
          step: 1,
          tolerance: 0,
          items: [
            { label: "8 + 3", value: 11 },
            { label: "6 + 2", value: 8 },
            { label: "9 + 4", value: 13 },
          ],
          hint: "Start at the bigger number. Then hop forward one step for each number you add.",
          mistakes: [{ match: "Put 8 + 3 at 10", coach: "Start at 8 and say three numbers: 9, 10, 11. You land on 11." }],
          seconds: 40,
        },
        think: {
          q: "What is 9 + 2?",
          choices: ["10", "11", "12"],
          answer: 1,
          why: "Start at 9 and count on 2: 10, 11.",
          hints: ["That is only one hop past 9. Count on 2 hops: 10, 11.", "", "That is three hops past 9. We only add 2."],
        },
        approaches: {
          analogy: "Counting on is like climbing stairs when you are already on step 8. You don't go back to the bottom. You just climb 3 more steps.",
          example: "5 + 3: put 5 in your head. Put up 3 fingers. Touch each finger and say 6, 7, 8. So 5 + 3 = 8.",
          simpler: {
            q: "Start at 5. Count on 1. Where do you land?",
            choices: ["6", "4", "5"],
            answer: 0,
            why: "One more than 5 is 6.",
            hints: ["", "4 is one less than 5. Counting on goes up.", "5 is where you start. Count on one more."],
          },
        },
      },
      {
        title: "Make a Ten",
        teach:
          "Ten is a magic number. Adding to 10 is easy. 10 plus 4 is 14. 10 plus 7 is 17. So let's make a ten first! Look at 9 plus 5. The 9 wants to be a 10. It needs just 1 more. Take 1 from the 5. Now the 9 is 10, and the 5 is 4. 10 plus 4 is 14. So 9 plus 5 is 14.",
        visual: {
          type: "hotspots",
          title: "Make a ten: 9 + 5",
          center: "9 + 5 = 14",
          spots: [
            { label: "9 needs 1", icon: "🔟", detail: "9 is one away from 10. It needs 1 more." },
            { label: "Take 1 from 5", icon: "➡️", detail: "Move 1 from the 5 to the 9. The 5 becomes 4." },
            { label: "10 + 4", icon: "✅", detail: "Now it is 10 + 4. That is 14!" },
          ],
        },
        probe: {
          type: "cloze",
          text: "9 + 5 is the same as 10 + {0}. So 9 + 5 = {1}.",
          blanks: [{ answers: ["4"] }, { answers: ["14"] }],
          bank: ["4", "14", "5", "13", "15"],
          hint: "Move 1 from the 5 to the 9. The 9 becomes 10. What is left of the 5?",
          mistakes: [
            { match: "5", coach: "We moved 1 away from the 5 to make the ten. So 5 becomes 4." },
            { match: "15", coach: "10 + 4 is 14, not 15. Count the extra ones again." },
          ],
          seconds: 30,
        },
        think: {
          q: "8 + 4 is the same as 10 + what?",
          choices: ["4", "3", "2"],
          answer: 2,
          why: "8 needs 2 to make 10. Take 2 from the 4, and 2 is left.",
          hints: ["If you move 2 to the 8, the 4 does not stay 4. It gets smaller.", "8 needs 2 to make 10, not 1. So 4 loses 2.", ""],
        },
        approaches: {
          analogy: "An egg carton holds 10 eggs. If 9 spots are full, one egg from the other pile fills it. Then it is easy to count: one full carton and the rest.",
          example: "8 + 5: 8 needs 2 to make 10. Take 2 from the 5, so 3 are left. 10 + 3 = 13. So 8 + 5 = 13.",
          simpler: {
            q: "What is 10 + 3?",
            choices: ["13", "103", "7"],
            answer: 0,
            why: "Ten and three more is 13.",
            hints: ["", "We don't put the numbers side by side. 10 and 3 more is thirteen.", "7 is what you get when you take away. Here we add."],
          },
        },
      },
      {
        title: "Doubles and Turn-Arounds",
        teach:
          "Doubles are two of the same number. 5 plus 5 is 10. 6 plus 6 is 12. 7 plus 7 is 14. Doubles help with near doubles. If 6 plus 6 is 12, then 6 plus 7 is one more. It is 13. Here is another trick. You can add in any order. 3 plus 5 makes 8. 5 plus 3 makes 8 too. They are turn-around facts.",
        visual: {
          type: "flip",
          cards: [
            { front: "5 + 5", back: "10. Like two hands with 5 fingers each." },
            { front: "6 + 6", back: "12. Like an egg carton with two rows of 6." },
            { front: "6 + 7", back: "13. It is 6 + 6, plus one more." },
            { front: "3 + 5 and 5 + 3", back: "Both are 8. You can add in any order." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each double or near double to its sum.",
          pairs: [
            { left: "🐞🐞🐞🐞🐞 + 🐞🐞🐞🐞🐞 (5 + 5)", right: "10" },
            { left: "6 + 6", right: "12" },
            { left: "6 + 7", right: "13" },
            { left: "7 + 7", right: "14" },
          ],
          hint: "Find the doubles first. Then a near double is just one more.",
          seconds: 40,
        },
        think: {
          q: "If 7 + 7 = 14, what is 7 + 8?",
          choices: ["14", "16", "15"],
          answer: 2,
          why: "8 is one more than 7, so the sum is one more than 14.",
          hints: ["That is 7 + 7. Now one of the numbers is one bigger.", "That is two more than 14. 8 is only one more than 7.", ""],
        },
        approaches: {
          analogy: "Doubles are like a pair of shoes. Each foot gets the same. A near double is a pair plus one more sock.",
          example: "8 + 9: I know 8 + 8 = 16. 9 is one more than 8. So 8 + 9 = 17.",
          simpler: {
            q: "What is 4 + 4?",
            choices: ["6", "8", "9"],
            answer: 1,
            why: "Two groups of 4 make 8.",
            hints: ["Count 4, then 4 more: 5, 6, 7, 8.", "", "That is one too many. 4 and 4 make 8."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each addition fact by its sum.",
      buckets: ["Makes 10", "Makes 12", "Makes 14"],
      items: [
        { text: "🍄 4 + 6", bucket: 0 },
        { text: "🍄 7 + 3", bucket: 0 },
        { text: "🌰 8 + 4", bucket: 1 },
        { text: "🌰 9 + 3", bucket: 1 },
        { text: "🌰 6 + 6", bucket: 1 },
        { text: "🐦 7 + 7", bucket: 2 },
        { text: "🐦 9 + 5", bucket: 2 },
        { text: "🐦 8 + 6", bucket: 2 },
      ],
    },
    explain: {
      prompt: "Tell Professor Pascal how you would add 8 + 5 in your head.",
      keyPoints: [
        "Start with the bigger number, 8",
        "8 needs 2 more to make 10",
        "Take 2 from the 5, so 3 is left",
        "10 + 3 = 13",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "🐦 7 birds sit on a branch. 6 more fly in. What is 7 + 6?",
        answer: 13,
        hint: "Use a double: 6 + 6 = 12. Then 7 + 6 is one more.",
        mistakes: [{ match: "12", coach: "12 is 6 + 6. But 7 is one more than 6. So add one more." }],
        seconds: 25,
      },
      {
        type: "cloze",
        text: "8 + 6 is the same as 10 + {0}. So 8 + 6 = {1}.",
        blanks: [{ answers: ["4"] }, { answers: ["14"] }],
        bank: ["4", "14", "6", "12", "2"],
        hint: "8 needs 2 to make 10. Take 2 from the 6.",
        mistakes: [{ match: "6", coach: "We moved 2 away from the 6. So it becomes 4." }],
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build the turn-around fact for 2 + 9 = 11. Start with the 9.",
        tiles: ["9", "+", "2", "=", "11"],
        distractors: ["-", "7"],
        hint: "A turn-around fact uses the same numbers in the other order. The sum stays 11.",
        seconds: 25,
      },
      {
        type: "place",
        prompt: "Drag each sum to its spot on the number line.",
        min: 0,
        max: 20,
        step: 1,
        tolerance: 0,
        items: [
          { label: "9 + 9", value: 18 },
          { label: "5 + 4", value: 9 },
          { label: "10 + 6", value: 16 },
        ],
        hint: "Find each sum first. Use doubles and make a ten.",
        seconds: 40,
      },
    ],
    check: [
      { q: "What is 8 + 3?", choices: ["10", "11", "12"], answer: 1, why: "Start at 8 and count on 3: 9, 10, 11." },
      { q: "9 + 4 is the same as...", choices: ["10 + 3", "10 + 4", "10 + 5"], answer: 0, why: "Move 1 from the 4 to the 9. That makes 10 + 3." },
      { q: "If 5 + 5 = 10, what is 5 + 6?", choices: ["10", "12", "11"], answer: 2, why: "6 is one more than 5, so the sum is one more: 11." },
      { q: "Which is the same as 3 + 6?", choices: ["3 + 3", "6 + 3", "6 + 6"], answer: 1, why: "You can add in any order. 6 + 3 = 9, just like 3 + 6." },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, grab two handfuls of spoons, blocks or beans. Count each pile. Add them by counting on from the bigger pile. Do it 5 times.",
      rubric: [
        "Counts each pile correctly",
        "Starts counting on from the bigger pile",
        "Gets the right sum at least 4 times out of 5",
      ],
    },
  },

  // 2. Subtracting within 20
  {
    id: "math-1.subtract20",
    title: "Taking Away Within 20",
    minutes: 18,
    stage: "grammar",
    standards: ["1.OA.B.4", "1.OA.C.5", "1.OA.C.6"],
    read: [
      "Subtracting means taking away. When we subtract, we find how many are left.",
      "One way is to count back. For 12 minus 3, start at 12. Then say 11, 10, 9. So 12 minus 3 equals 9.",
      "Another way is to think addition. For 13 minus 8, ask: 8 plus what makes 13? 8 plus 5 makes 13. So 13 minus 8 equals 5.",
      "Ten helps here too. For 14 minus 6, first take away 4 to get to 10. Then take away 2 more. You land on 8.",
      "Adding and subtracting are a family. 9 plus 6 is 15. So 15 minus 6 is 9, and 15 minus 9 is 6. Let's figure it out together!",
    ].join("\n\n"),
    keyIdeas: [
      "Count back to take away a small number.",
      "Think addition: 13 - 8 asks 8 + ? = 13.",
      "Stop at 10 on the way down: 14 - 6 = 14 - 4 - 2 = 8.",
    ],
    hook: {
      text: "Twelve songbirds sat in the tall pine. Then the fog rolled in. Three birds flew away. How many birds are still in the tree?",
    },
    teach: [
      {
        title: "Count Back",
        teach:
          "Let's find 12 minus 3. Minus means take away. Start at 12. Now count back 3 times. Eleven, ten, nine. We land on 9. So 12 minus 3 equals 9. Counting back works best when you take away a small number. Take away 1, 2 or 3. Hop back on the number line, one hop at a time.",
        visual: {
          type: "flip",
          cards: [
            { front: "Count back", back: "Start at the big number. Say one number less for each one you take away." },
            { front: "12 - 3", back: "Start at 12. Say 11, 10, 9. The answer is 9." },
            { front: "15 - 2", back: "Start at 15. Say 14, 13. The answer is 13." },
          ],
        },
        probe: {
          type: "place",
          prompt: "Count back! Drag each answer to its spot on the number line.",
          min: 0,
          max: 20,
          step: 1,
          tolerance: 0,
          items: [
            { label: "12 - 3", value: 9 },
            { label: "17 - 2", value: 15 },
            { label: "11 - 3", value: 8 },
          ],
          hint: "Start at the first number. Hop back one step for each one you take away.",
          mistakes: [{ match: "Put 12 - 3 at 10", coach: "Don't count the 12 itself. Say 11, 10, 9. You land on 9." }],
          seconds: 40,
        },
        think: {
          q: "What is 14 - 2?",
          choices: ["16", "13", "12"],
          answer: 2,
          why: "Start at 14 and count back 2: 13, 12.",
          hints: ["16 is what you get if you add. Minus means count back.", "That is only one hop back. Count back 2: 13, 12.", ""],
        },
        approaches: {
          analogy: "Counting back is like walking down stairs. You start at step 12 and take 3 steps down. You end on step 9.",
          example: "11 - 2: start at 11. Put up 2 fingers. Touch each one and say 10, 9. So 11 - 2 = 9.",
          simpler: {
            q: "Start at 8. Count back 1. Where do you land?",
            choices: ["9", "7", "8"],
            answer: 1,
            why: "One less than 8 is 7.",
            hints: ["9 is one more. Counting back goes down.", "", "8 is where you start. Count back one."],
          },
        },
      },
      {
        title: "Think Addition",
        teach:
          "Here is a secret. Every take away fact hides an add fact. Let's find 13 minus 8. Ask a question. 8 plus what makes 13? Count up from 8. Nine, ten, eleven, twelve, thirteen. That is 5 more. So 8 plus 5 is 13. That means 13 minus 8 is 5. Adding and subtracting are a family. They use the same three numbers.",
        visual: {
          type: "hotspots",
          title: "A fact family: 6, 9 and 15",
          center: "6, 9, 15",
          spots: [
            { label: "9 + 6 = 15", icon: "➕", detail: "Put 9 and 6 together to make 15." },
            { label: "6 + 9 = 15", icon: "🔄", detail: "The turn-around fact. Still 15." },
            { label: "15 - 6 = 9", icon: "➖", detail: "Take the 6 away from 15, and 9 is left." },
            { label: "15 - 9 = 6", icon: "➖", detail: "Take the 9 away from 15, and 6 is left." },
          ],
        },
        probe: {
          type: "cloze",
          text: "9 + 6 = 15. So 15 - 9 = {0} and 15 - 6 = {1}.",
          blanks: [{ answers: ["6"] }, { answers: ["9"] }],
          bank: ["6", "9", "15", "5", "24"],
          hint: "The same three numbers make the whole family. Take one part away from 15, and the other part is left.",
          mistakes: [
            { match: "24", coach: "24 is 15 + 9. Here we take away, so the answer is smaller than 15." },
            { match: "15", coach: "15 is the whole. When we take a part away, the other part is left." },
          ],
          seconds: 30,
        },
        think: {
          q: "To find 11 - 7, which add fact helps?",
          choices: ["7 + 4 = 11", "11 + 7 = 18", "7 + 7 = 14"],
          answer: 0,
          why: "7 + 4 = 11 uses the same numbers. So 11 - 7 = 4.",
          hints: ["", "That adds 7 to 11. We need 7 plus something to make 11.", "That makes 14, not 11. We need a fact that makes 11."],
        },
        approaches: {
          analogy: "A fact family is like a family with three people. The same three numbers show up in every add and take away fact.",
          example: "16 - 9: ask 9 + ? = 16. Make a ten: 9 + 1 = 10, then 6 more to 16. 1 + 6 = 7. So 16 - 9 = 7.",
          simpler: {
            q: "5 + 3 = 8. So what is 8 - 3?",
            choices: ["3", "11", "5"],
            answer: 2,
            why: "Take the 3 away from 8, and the 5 is left.",
            hints: ["That is the part you took away. What is left?", "11 is 8 + 3. Taking away makes it smaller.", ""],
          },
        },
      },
      {
        title: "Back to Ten",
        teach:
          "Ten is a great resting spot. Let's find 14 minus 6. Step one: take away 4. That gets us to 10. Step two: we still need to take away 2 more. 10 minus 2 is 8. So 14 minus 6 equals 8. Break the number you take away into two parts. The first part gets you to 10. The second part finishes the job.",
        visual: {
          type: "sequence",
          prompt: "The steps for 14 - 6, in order.",
          steps: ["Start at 14", "Take away 4 to land on 10", "Take away 2 more", "You land on 8"],
        },
        probe: {
          type: "number",
          prompt: "🌰 15 acorns. A squirrel takes 7. Use the stop at 10. What is 15 - 7?",
          answer: 8,
          hint: "Take away 5 to get to 10. Then take away 2 more.",
          mistakes: [
            { match: "22", coach: "22 is 15 + 7. We are taking away, so the answer is less than 15." },
            { match: "10", coach: "10 is the stop on the way. You still have 2 more to take away." },
          ],
          seconds: 30,
        },
        think: {
          q: "For 13 - 5, what do you take away first to get to 10?",
          choices: ["5", "3", "2"],
          answer: 1,
          why: "13 take away 3 is 10. Then take away 2 more.",
          hints: ["Taking all 5 at once skips past 10. Find the part that lands on 10.", "", "13 take away 2 is 11, not 10."],
        },
        approaches: {
          analogy: "It's like going down a slide with a rest stop at 10. You slide to the stop first, then slide the rest of the way.",
          example: "12 - 5: take away 2 to get to 10. 5 is 2 and 3, so take away 3 more. 10 - 3 = 7. So 12 - 5 = 7.",
          simpler: {
            q: "What is 10 - 2?",
            choices: ["8", "12", "7"],
            answer: 0,
            why: "Count back 2 from 10: 9, 8.",
            hints: ["", "12 is 10 + 2. We take away here.", "That is one hop too far. Count back 2: 9, 8."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the steps for 13 - 5 in order.",
      steps: ["Start at 13", "Take away 3 to land on 10", "Take away 2 more", "You land on 8"],
    },
    explain: {
      prompt: "Tell Professor Pascal two ways to find 12 - 4.",
      keyPoints: [
        "Count back 4 from 12: 11, 10, 9, 8",
        "Think addition: 4 + 8 = 12",
        "Take away 2 to get to 10, then 2 more",
        "12 - 4 = 8",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "🐦 16 birds. 9 fly away. What is 16 - 9?",
        answer: 7,
        hint: "Think addition: 9 + ? = 16.",
        mistakes: [{ match: "25", coach: "25 is 16 + 9. Birds flew away, so there are fewer." }],
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each take-away fact to its answer.",
        pairs: [
          { left: "11 - 2", right: "9" },
          { left: "14 - 6", right: "8" },
          { left: "13 - 8", right: "5" },
          { left: "15 - 8", right: "7" },
        ],
        hint: "Count back for small numbers. Think addition for bigger ones.",
        seconds: 45,
      },
      {
        type: "cloze",
        text: "8 + 4 = 12. So 12 - 4 = {0} and 12 - 8 = {1}.",
        blanks: [{ answers: ["8"] }, { answers: ["4"] }],
        bank: ["8", "4", "12", "16", "6"],
        hint: "Same family, same three numbers: 4, 8 and 12.",
        seconds: 30,
      },
      {
        type: "sort",
        prompt: "Sort each fact by its answer.",
        buckets: ["Answer is 6", "Answer is 7"],
        items: [
          { text: "🍄 10 - 4", bucket: 0 },
          { text: "🍄 12 - 6", bucket: 0 },
          { text: "🍄 15 - 9", bucket: 0 },
          { text: "🌲 10 - 3", bucket: 1 },
          { text: "🌲 13 - 6", bucket: 1 },
          { text: "🌲 16 - 9", bucket: 1 },
        ],
        hint: "Think addition: 6 + what? 7 + what?",
        seconds: 45,
      },
    ],
    check: [
      { q: "What is 12 - 3?", choices: ["9", "10", "15"], answer: 0, why: "Start at 12 and count back 3: 11, 10, 9." },
      { q: "Which add fact helps with 13 - 8?", choices: ["8 + 8 = 16", "13 + 8 = 21", "8 + 5 = 13"], answer: 2, why: "8 + 5 = 13 uses the same numbers. So 13 - 8 = 5." },
      { q: "What is 14 - 6?", choices: ["7", "8", "10"], answer: 1, why: "Take away 4 to get to 10. Take away 2 more. That is 8." },
      { q: "9 + 7 = 16. So what is 16 - 7?", choices: ["7", "23", "9"], answer: 2, why: "Same family. Take the 7 away from 16, and 9 is left." },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, put 15 small snacks or beans on a plate. Take some away and say the take-away fact out loud, like 15 - 6 = 9. Do it 5 times, and check by counting what is left.",
      rubric: [
        "Says each take-away fact out loud",
        "Uses counting back, thinking addition or the stop at 10",
        "Checks the answer by counting what is left",
      ],
    },
  },

  // 3. Story problems and picture graphs
  {
    id: "math-1.stories",
    title: "Story Problems and Picture Graphs",
    minutes: 20,
    stage: "logic",
    standards: ["1.OA.A.1", "1.OA.A.2", "1.MD.C.4"],
    read: [
      "Math hides in stories. Listen to the story. Then ask: are things joining, or going away?",
      "When more come, or groups go together, we add. Seven birds sit on a branch. Five more fly in. 7 plus 5 is 12 birds.",
      "When some go away, we subtract. There are 15 mushrooms. A rabbit eats 6. 15 minus 6 leaves 9 mushrooms.",
      "When we compare, we find how many more. Owl has 9 berries. Fox has 6. Owl has 3 more.",
      "Some stories have three numbers. Pip finds 4 red leaves, 6 yellow leaves and 3 brown leaves. Add 4 and 6 first to make 10. Then 10 plus 3 is 13 leaves.",
      "A picture graph shows how many are in each group. Each picture stands for one thing. You can count each row, and see which row has more. Let's figure it out together!",
    ].join("\n\n"),
    keyIdeas: [
      "Joining stories add. Taking away stories subtract.",
      "To compare, find how many more or how many fewer.",
      "With three numbers, look for two that make 10.",
      "A picture graph shows how many are in each group.",
    ],
    hook: {
      text: "The forest birds are coming back! Pip counted them at the feeder. Some are robins, some are blue jays, and some are cardinals. Can we use math to tell their story?",
    },
    teach: [
      {
        title: "Join or Take Away?",
        teach:
          "Every story problem asks a question. First, listen for what happens. Seven birds sit on a branch. Five more fly in. More are coming, so we add. 7 plus 5 is 12. Now a new story. There are 15 mushrooms. A rabbit eats 6. Some are going away, so we subtract. 15 minus 6 is 9. Join means add. Go away means subtract.",
        visual: {
          type: "compare",
          left: { title: "Add ➕", points: ["More come", "Groups join together", "How many in all?"] },
          right: { title: "Subtract ➖", points: ["Some go away", "Some get eaten or used", "How many are left?"] },
        },
        probe: {
          type: "sort",
          prompt: "Do you add or subtract? Sort each story.",
          buckets: ["Add ➕", "Subtract ➖"],
          items: [
            { text: "🐸 6 frogs sit on a log. 3 more hop on.", bucket: 0 },
            { text: "🌰 Fox has 8 acorns. Owl gives him 4 more.", bucket: 0 },
            { text: "🍓 5 red berries and 7 blue berries. How many in all?", bucket: 0 },
            { text: "🐦 12 birds sit in a tree. 4 fly away.", bucket: 1 },
            { text: "🍄 10 mushrooms. A rabbit eats 3.", bucket: 1 },
            { text: "🎈 9 balloons. 2 pop.", bucket: 1 },
          ],
          hint: "Ask: are more coming, or are some going away?",
          seconds: 45,
        },
        think: {
          q: "There are 11 ducks in the creek. 3 swim away. Do you add or subtract?",
          choices: ["Add", "Subtract", "Neither"],
          answer: 1,
          why: "Ducks are going away, so we subtract: 11 - 3 = 8.",
          hints: ["We add when more come. Here ducks are leaving.", "", "Something did happen: 3 ducks left. That is a take-away story."],
        },
        approaches: {
          analogy: "Think of a bus. When people get on, the number goes up, so we add. When people get off, the number goes down, so we subtract.",
          example: "There are 9 apples in a bowl. Dad puts in 4 more. More are coming in, so add: 9 + 4 = 13 apples.",
          simpler: {
            q: "3 cats are on the porch. 2 more cats come. Are there more or fewer cats now?",
            choices: ["More", "Fewer", "The same"],
            answer: 0,
            why: "2 more cats came, so there are more.",
            hints: ["", "No cats left. 2 came. So there are more, not fewer.", "2 cats joined, so the number changed. It went up."],
          },
        },
      },
      {
        title: "How Many More? Three Numbers?",
        teach:
          "Some stories compare. Owl has 9 berries. Fox has 6 berries. How many more does Owl have? Line them up. Owl has 3 extra berries. So Owl has 3 more. 9 minus 6 is 3. Some stories have three numbers. Pip finds 4 red leaves, 6 yellow leaves and 3 brown leaves. Look for a ten! 4 plus 6 is 10. Then 10 plus 3 is 13 leaves.",
        visual: {
          type: "hotspots",
          title: "Owl and Fox compare berries",
          center: "Owl 9, Fox 6",
          spots: [
            { label: "Owl", icon: "🦉", detail: "🍓🍓🍓🍓🍓🍓🍓🍓🍓 Owl has 9 berries." },
            { label: "Fox", icon: "🦊", detail: "🍓🍓🍓🍓🍓🍓 Fox has 6 berries." },
            { label: "How many more?", icon: "➖", detail: "Line them up. Owl has 3 berries with no partner. 9 - 6 = 3." },
          ],
        },
        probe: {
          type: "number",
          prompt: "🍂 Pip finds 7 red leaves, 5 yellow leaves and 3 brown leaves. How many leaves in all?",
          answer: 15,
          hint: "Look for a ten! 7 + 3 makes 10. Then add the 5.",
          mistakes: [
            { match: "12", coach: "12 is 7 + 5. Don't forget the 3 brown leaves." },
            { match: "10", coach: "7 + 3 is 10. Now add the 5 yellow leaves too." },
          ],
          seconds: 35,
        },
        think: {
          q: "Bear has 8 fish. Otter has 5 fish. How many more fish does Bear have?",
          choices: ["13", "2", "3"],
          answer: 2,
          why: "8 - 5 = 3. Bear has 3 extra fish.",
          hints: ["13 is how many fish they have together. We want how many more.", "Line them up: 8 and 5. Count the fish with no partner again.", ""],
        },
        approaches: {
          analogy: "Comparing is like matching socks. Pair them up. The socks with no partner are how many more.",
          example: "2 + 5 + 8: I see 2 + 8 = 10. Then 10 + 5 = 15. So the answer is 15.",
          simpler: {
            q: "Which two numbers make 10: 4, 6 or 5?",
            choices: ["4 and 5", "4 and 6", "5 and 6"],
            answer: 1,
            why: "4 + 6 = 10.",
            hints: ["4 + 5 is 9. Close, but not 10.", "", "5 + 6 is 11. That is one too many."],
          },
        },
      },
      {
        title: "Picture Graphs",
        teach:
          "Pip counted birds at the feeder. A picture graph shows the count. Each bird picture stands for one bird. The robin row has 5 birds. The blue jay row has 3 birds. The cardinal row has 7 birds. Which row is longest? Cardinals! How many more cardinals than blue jays? 7 minus 3 is 4. How many birds in all? 5 plus 3 plus 7 is 15.",
        visual: {
          type: "hotspots",
          title: "Birds at the feeder",
          center: "Bird graph",
          spots: [
            { label: "Robins", icon: "🐦", detail: "🐦🐦🐦🐦🐦 5 robins" },
            { label: "Blue jays", icon: "🔵", detail: "🐦🐦🐦 3 blue jays" },
            { label: "Cardinals", icon: "🔴", detail: "🐦🐦🐦🐦🐦🐦🐦 7 cardinals, the most" },
          ],
        },
        probe: {
          type: "cloze",
          text: "Bird graph. Robins: 🐦🐦🐦🐦🐦. Blue jays: 🐦🐦🐦. Cardinals: 🐦🐦🐦🐦🐦🐦🐦. There are {0} robins. There are {1} more cardinals than blue jays. There are {2} birds in all.",
          blanks: [{ answers: ["5"] }, { answers: ["4"] }, { answers: ["15"] }],
          bank: ["5", "4", "15", "3", "10"],
          hint: "Count each row. For how many more, take the smaller row from the bigger row.",
          mistakes: [
            { match: "10", coach: "10 is 7 + 3. How many more means take away: 7 - 3." },
            { match: "3", coach: "3 is how many blue jays. How many more cardinals is 7 - 3." },
          ],
          seconds: 50,
        },
        think: {
          q: "Picture graph: 🍎🍎🍎🍎 apples, 🍐🍐 pears. How many more apples than pears?",
          choices: ["6", "2", "4"],
          answer: 1,
          why: "4 apples and 2 pears. 4 - 2 = 2 more apples.",
          hints: ["6 is how many in all. We want how many more.", "", "4 is how many apples. Compare them to the pears."],
        },
        approaches: {
          analogy: "A picture graph is like lining kids up by team. You can see which line is longest without counting everyone.",
          example: "Votes for snacks: 🥕🥕🥕 carrots, 🍌🍌🍌🍌🍌🍌 bananas. Bananas got 6 and carrots got 3. 6 - 3 = 3 more votes for bananas.",
          simpler: {
            q: "Picture graph: 🐶🐶🐶 dogs, 🐱 cats. Which has more?",
            choices: ["Cats", "They are the same", "Dogs"],
            answer: 2,
            why: "The dog row has 3 and the cat row has 1.",
            hints: ["The cat row has just 1 picture. Look at the longer row.", "Count each row: 3 dogs and 1 cat. Not the same.", ""],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap the stories where you ADD.",
      sentences: [
        "🐞 4 ladybugs sit on a leaf. 5 more land.",
        "🍪 There are 12 cookies. We eat 5.",
        "🦆 6 ducks, 4 geese and 2 swans swim. How many birds in all?",
        "🌼 Mom picks 8 flowers. 3 wilt.",
        "🪵 Dad stacks 9 logs. Then he adds 6 more.",
      ],
      correct: [0, 2, 4],
    },
    explain: {
      prompt: "Tell Professor Pascal how you know when a story problem means add or subtract.",
      keyPoints: [
        "When more come or groups join, you add",
        "When some go away, you subtract",
        "To compare, find how many more by taking away",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "🐸 13 frogs sit on a log. 5 hop into the pond. How many frogs are still on the log?",
        answer: 8,
        hint: "Frogs are leaving, so subtract: 13 - 5.",
        mistakes: [{ match: "18", coach: "18 is 13 + 5. Frogs hopped away, so there are fewer." }],
        seconds: 30,
      },
      {
        type: "build",
        prompt: "Build the number sentence: 12 acorns, then a squirrel takes 4. How many are left?",
        tiles: ["12", "-", "4", "=", "8"],
        distractors: ["+", "16"],
        hint: "Something is taken away, so use minus.",
        seconds: 30,
      },
      {
        type: "cloze",
        text: "Pet graph. Dogs: 🐶🐶🐶🐶🐶🐶. Cats: 🐱🐱. Fish: 🐟🐟🐟🐟. There are {0} more dogs than cats. There are {1} pets in all.",
        blanks: [{ answers: ["4"] }, { answers: ["12"] }],
        bank: ["4", "12", "8", "2", "6"],
        hint: "Count each row. How many more means take away. In all means add every row.",
        seconds: 45,
      },
      {
        type: "sort",
        prompt: "Sort each story by its answer.",
        buckets: ["Answer is 10", "Answer is 14"],
        items: [
          { text: "🐦 6 birds. 4 more come.", bucket: 0 },
          { text: "🍓 15 berries. 5 get eaten.", bucket: 0 },
          { text: "🍂 2 red, 5 yellow and 3 brown leaves.", bucket: 0 },
          { text: "🐞 9 ladybugs. 5 more land.", bucket: 1 },
          { text: "🌰 18 acorns. 4 roll away.", bucket: 1 },
          { text: "🪨 4, 3 and 7 pebbles.", bucket: 1 },
        ],
        hint: "Decide add or subtract first. Then work out each answer.",
        seconds: 60,
      },
    ],
    check: [
      { q: "8 birds sit in a tree. 5 more fly in. How many birds now?", choices: ["3", "12", "13"], answer: 2, why: "More birds came, so add: 8 + 5 = 13." },
      { q: "Owl has 10 berries. Fox has 7. How many more does Owl have?", choices: ["3", "17", "7"], answer: 0, why: "Compare: 10 - 7 = 3." },
      { q: "What is 3 + 5 + 7?", choices: ["14", "15", "10"], answer: 1, why: "3 + 7 = 10. Then 10 + 5 = 15." },
      { q: "A picture graph has 🍎🍎🍎 and 🍌🍌🍌🍌🍌. Which fruit has more?", choices: ["Apples", "Bananas", "They are the same"], answer: 1, why: "The banana row has 5 and the apple row has 3." },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, make a picture graph of something at home: the colors of your socks, the fruit in the kitchen, or the toys on a shelf. Use up to 3 groups. Then answer: which group has the most? How many more than the smallest group?",
      rubric: [
        "Sorts the things into up to 3 groups",
        "Draws one picture for each thing, in rows",
        "Tells which group has the most",
        "Finds how many more by subtracting",
      ],
    },
  },

  // 4. The equal sign and missing numbers
  {
    id: "math-1.equal",
    title: "The Equal Sign and Mystery Numbers",
    minutes: 18,
    stage: "logic",
    standards: ["1.OA.D.7", "1.OA.D.8", "1.OA.B.3"],
    read: [
      "The equal sign looks like two little lines. It means the same as. Both sides must have the same amount, like a balance scale that stays level.",
      "5 plus 2 equals 7 is true. 7 equals 5 plus 2 is true too. The answer does not have to be on the right side. 4 plus 3 equals 5 plus 2 is also true, because both sides make 7.",
      "Sometimes a number is hiding. 8 plus a mystery number equals 11. Count up from 8 to 11. That is 3. So the mystery number is 3.",
      "You can add in any order. 4 plus 9 equals 9 plus 4. You can also group numbers in a smart way. For 3 plus 7 plus 5, add 3 and 7 first to make 10. Then add 5 to get 15. Let's figure it out together!",
    ].join("\n\n"),
    keyIdeas: [
      "The equal sign means the same as.",
      "Both sides must make the same amount: 4 + 3 = 5 + 2.",
      "Find a mystery number by counting up or thinking addition.",
      "Add in any order, and group numbers to make 10.",
    ],
    hook: {
      text: "The mushroom village has an old balance scale. Put 5 pebbles on one side. Put 5 on the other. It stays level! What happens if one side gets more?",
    },
    teach: [
      {
        title: "Equal Means the Same As",
        teach:
          "Look at the equal sign. It is two little lines. It means the same as. Think of a balance scale. If both sides hold the same amount, it stays level. 6 equals 6 is true. 5 plus 2 equals 7 is true. 7 equals 5 plus 2 is true too! And 4 plus 3 equals 5 plus 2 is true. Both sides make 7. But 4 plus 1 equals 6 is false. 5 is not 6.",
        visual: {
          type: "compare",
          left: { title: "True ✅", points: ["6 = 6", "7 = 5 + 2", "4 + 3 = 5 + 2"] },
          right: { title: "False ❌", points: ["4 + 1 = 6", "8 = 3 + 3", "2 + 2 = 5 + 1"] },
        },
        probe: {
          type: "sort",
          prompt: "Is the scale level? Sort each number sentence.",
          buckets: ["True ✅", "False ❌"],
          items: [
            { text: "6 = 6", bucket: 0 },
            { text: "9 = 4 + 5", bucket: 0 },
            { text: "5 + 2 = 2 + 5", bucket: 0 },
            { text: "3 + 4 = 6 + 1", bucket: 0 },
            { text: "4 + 1 = 6", bucket: 1 },
            { text: "7 = 3 + 3", bucket: 1 },
            { text: "8 - 2 = 5", bucket: 1 },
          ],
          hint: "Work out each side. If both sides make the same number, it is true.",
          mistakes: [{ match: "9 = 4 + 5 sorted as false", coach: "The answer can be on the left side. 4 + 5 makes 9, so both sides match." }],
          seconds: 50,
        },
        think: {
          q: "Which is true?",
          choices: ["3 + 3 = 7", "8 = 4 + 4", "5 + 5 = 9"],
          answer: 1,
          why: "4 + 4 makes 8, so both sides are the same.",
          hints: ["3 + 3 is 6, not 7. The sides don't match.", "", "5 + 5 is 10, not 9. The sides don't match."],
        },
        approaches: {
          analogy: "The equal sign is like a seesaw with two friends who weigh the same. It only stays flat when both sides match.",
          example: "Is 2 + 6 = 5 + 3 true? Left side: 2 + 6 = 8. Right side: 5 + 3 = 8. Both are 8, so it is true.",
          simpler: {
            q: "Is 4 = 4 true or false?",
            choices: ["False", "True", "We can't tell"],
            answer: 1,
            why: "4 is the same as 4, so it is true.",
            hints: ["Both sides are 4. They are the same, so it is not false.", "", "We can tell! Both sides show 4."],
          },
        },
      },
      {
        title: "Mystery Numbers",
        teach:
          "Sometimes a number hides in a box. 8 plus box equals 11. What is in the box? Count up from 8 to 11. Nine, ten, eleven. That is 3 hops. So the mystery number is 3. Let's check. 8 plus 3 equals 11. Yes! Here is another one. Box minus 3 equals 5. What number, take away 3, leaves 5? Think 5 plus 3. It is 8.",
        visual: {
          type: "flip",
          cards: [
            { front: "8 + ☐ = 11", back: "Count up from 8 to 11: 9, 10, 11. The box is 3." },
            { front: "☐ - 3 = 5", back: "Think 5 + 3 = 8. The box is 8." },
            { front: "10 = 6 + ☐", back: "6 needs 4 more to make 10. The box is 4." },
          ],
        },
        probe: {
          type: "number",
          prompt: "🐿️ 8 + ☐ = 11. What number goes in the box?",
          answer: 3,
          hint: "Count up from 8 until you reach 11. Count the hops.",
          mistakes: [
            { match: "19", coach: "19 is 8 + 11. We need the number that makes 8 grow to 11." },
            { match: "11", coach: "11 is the total. What do you add to 8 to get 11?" },
          ],
          seconds: 30,
        },
        think: {
          q: "6 + ☐ = 10. What goes in the box?",
          choices: ["16", "4", "3"],
          answer: 1,
          why: "6 + 4 = 10.",
          hints: ["16 is 6 + 10. The total is only 10.", "", "6 + 3 is 9. Count up one more."],
        },
        approaches: {
          analogy: "A mystery number is like a hidden toy in a box. You know how many toys are out and how many in all. Count up to find what's hiding.",
          example: "☐ + 5 = 12. Think: 12 - 5. Count back 5 from 12: 11, 10, 9, 8, 7. The box is 7. Check: 7 + 5 = 12.",
          simpler: {
            q: "5 + ☐ = 6. What goes in the box?",
            choices: ["1", "11", "6"],
            answer: 0,
            why: "One more than 5 is 6.",
            hints: ["", "11 is 5 + 6. The total is only 6.", "6 is the total. 5 plus 6 would be 11."],
          },
        },
      },
      {
        title: "Turn It and Group It",
        teach:
          "Here are two adding tricks. Trick one. You can add in any order. 4 plus 9 equals 9 plus 4. Both make 13. Start with the bigger number to count on fast. Trick two. With three numbers, pick which two to add first. Look at 3 plus 7 plus 5. Add 3 and 7 first. That makes 10. Then 10 plus 5 is 15. Find the ten!",
        visual: {
          type: "hotspots",
          title: "3 + 7 + 5",
          center: "Find the ten",
          spots: [
            { label: "3 + 7", icon: "🔟", detail: "3 and 7 make 10. Add these first!" },
            { label: "+ 5", icon: "➕", detail: "10 + 5 = 15." },
            { label: "Any order", icon: "🔄", detail: "4 + 9 = 9 + 4. The sum stays the same." },
          ],
        },
        probe: {
          type: "cloze",
          text: "6 + 9 = 9 + {0}. For 2 + 5 + 8, add 2 + 8 first to make {1}. Then add 5 to get {2}.",
          blanks: [{ answers: ["6"] }, { answers: ["10"] }, { answers: ["15"] }],
          bank: ["6", "10", "15", "9", "7"],
          hint: "Turn-around facts use the same numbers. For three numbers, find two that make 10.",
          mistakes: [{ match: "9", coach: "The turn-around fact swaps the numbers. 6 + 9 = 9 + 6." }],
          seconds: 40,
        },
        think: {
          q: "For 4 + 5 + 6, which two should you add first?",
          choices: ["4 + 5", "5 + 6", "4 + 6"],
          answer: 2,
          why: "4 + 6 makes 10. Then 10 + 5 = 15.",
          hints: ["4 + 5 is 9. That works, but it does not make a ten.", "5 + 6 is 11. Look for two numbers that make exactly 10.", ""],
        },
        approaches: {
          analogy: "It's like putting on socks. Left first or right first, you still end up with two socks on. Order doesn't change the total.",
          example: "9 + 2 + 1: add 9 + 1 first to make 10. Then 10 + 2 = 12. That's faster than 9 + 2 = 11, then 11 + 1.",
          simpler: {
            q: "2 + 8 makes how many?",
            choices: ["10", "6", "28"],
            answer: 0,
            why: "2 + 8 = 10. They are ten partners.",
            hints: ["", "6 is 8 - 2. Here we add.", "We don't put the numbers side by side. Add them: 2 + 8."],
          },
        },
      },
    ],
    activity: {
      type: "highlight",
      prompt: "Tap every TRUE number sentence.",
      sentences: ["10 = 7 + 3", "5 + 4 = 8", "6 + 2 = 4 + 4", "9 - 3 = 7", "3 + 8 = 8 + 3"],
      correct: [0, 2, 4],
    },
    explain: {
      prompt: "Tell Professor Pascal what the equal sign means, and how you know if 4 + 3 = 5 + 2 is true.",
      keyPoints: [
        "The equal sign means the same as",
        "4 + 3 makes 7",
        "5 + 2 makes 7",
        "Both sides are the same, so it is true",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "☐ - 4 = 9. What number goes in the box?",
        answer: 13,
        hint: "Think addition: 9 + 4.",
        mistakes: [{ match: "5", coach: "5 is 9 - 4. But the box is the number we started with before taking 4 away. It must be bigger than 9." }],
        seconds: 35,
      },
      {
        type: "sort",
        prompt: "True or false? Sort each number sentence.",
        buckets: ["True ✅", "False ❌"],
        items: [
          { text: "12 = 6 + 6", bucket: 0 },
          { text: "2 + 7 = 7 + 2", bucket: 0 },
          { text: "5 + 5 = 9 + 1", bucket: 0 },
          { text: "10 - 1 = 8", bucket: 1 },
          { text: "4 + 4 = 6 + 3", bucket: 1 },
        ],
        hint: "Work out both sides. True means they match.",
        seconds: 45,
      },
      {
        type: "match",
        prompt: "Find each mystery number.",
        pairs: [
          { left: "☐ + 2 = 9", right: "7" },
          { left: "10 = 4 + ☐", right: "6" },
          { left: "12 - ☐ = 7", right: "5" },
          { left: "☐ - 6 = 8", right: "14" },
        ],
        hint: "Count up, or think of the add fact in the same family.",
        seconds: 60,
      },
      {
        type: "build",
        prompt: "Make the scale level! Build a true sentence: 5 + 4 = ? Use the 3 on the other side.",
        tiles: ["5 + 4", "=", "3 + 6"],
        distractors: ["3 + 5", "3 + 7"],
        hint: "5 + 4 makes 9. Which tile with a 3 also makes 9?",
        seconds: 35,
      },
    ],
    check: [
      { q: "What does the equal sign mean?", choices: ["Add them up", "The same as", "The answer comes next"], answer: 1, why: "The equal sign means both sides are the same amount." },
      { q: "Which is true?", choices: ["7 = 4 + 3", "6 = 4 + 3", "5 = 4 + 3"], answer: 0, why: "4 + 3 makes 7, so 7 = 4 + 3." },
      { q: "9 + ☐ = 12. What goes in the box?", choices: ["21", "4", "3"], answer: 2, why: "Count up from 9: 10, 11, 12. That is 3." },
      { q: "For 6 + 3 + 4, which two make 10?", choices: ["6 + 3", "3 + 4", "6 + 4"], answer: 2, why: "6 + 4 = 10. Then add 3 to get 13." },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, make a balance with a coat hanger and two cups, or use two plates. Put 4 blocks and 3 blocks on one side. Put 5 blocks and 2 blocks on the other. Is it equal? Make up 3 more equal sides.",
      rubric: [
        "Counts both sides correctly",
        "Says whether the two sides are equal",
        "Makes 3 more pairs of sides that are equal",
      ],
    },
  },

  // 5. Counting to 120
  {
    id: "math-1.count120",
    title: "Counting All the Way to 120",
    minutes: 17,
    stage: "grammar",
    standards: ["1.NBT.A.1"],
    read: [
      "You can count to 100. Now let's go past it! After 99 comes 100. Then we keep going: 101, 102, 103, all the way to 120.",
      "Big numbers follow the same pattern as small ones. After 100 we say one hundred one, one hundred two, and so on. After 109 comes 110. After 119 comes 120.",
      "You do not always have to start at 1. You can start counting at any number. Start at 87 and count on: 88, 89, 90, 91.",
      "Counting by tens is fast: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120.",
      "We can write big numbers too. One hundred seven is written 1, 0, 7. That is 107. One hundred fifteen is 115. Let's figure it out together!",
    ].join("\n\n"),
    keyIdeas: [
      "After 99 comes 100, then 101, 102 and on to 120.",
      "You can start counting at any number.",
      "Counting by tens: 10, 20, 30... 100, 110, 120.",
      "One hundred seven is written 107.",
    ],
    hook: {
      text: "The forest has a giant oak tree. Pip wants to count its acorns. There are more than 100! Can we count that high?",
    },
    teach: [
      {
        title: "Past 100",
        teach:
          "You know how to count to 100. Let's keep going! After 99 comes 100. Then 101, 102, 103. We say one hundred one, one hundred two. It's the same pattern as 1, 2, 3, with one hundred in front. Keep going. 108, 109, 110. Then 111, 112. All the way to 119, then 120. Tricky spots are when we reach a new ten. After 109 comes 110.",
        visual: {
          type: "flip",
          cards: [
            { front: "After 99", back: "100, one hundred" },
            { front: "After 100", back: "101, one hundred one" },
            { front: "After 109", back: "110, one hundred ten" },
            { front: "After 119", back: "120, one hundred twenty" },
          ],
        },
        probe: {
          type: "sequence",
          prompt: "Put these numbers in counting order, smallest first.",
          steps: ["107", "108", "109", "110", "111"],
          hint: "Count from 107: what comes next? After 109 comes a new ten.",
          seconds: 35,
        },
        think: {
          q: "What comes right after 109?",
          choices: ["1010", "110", "100"],
          answer: 1,
          why: "After 109 comes 110, a new ten.",
          hints: ["We don't write 10 after 10. After 109 comes one hundred ten: 110.", "", "100 comes before 109. We count up."],
        },
        approaches: {
          analogy: "Counting past 100 is like going around a running track again. You start the same pattern over, but now with one hundred in front.",
          example: "Count on from 98: 98, 99, 100, 101, 102. Each time, just one more.",
          simpler: {
            q: "What comes right after 99?",
            choices: ["100", "98", "90"],
            answer: 0,
            why: "After 99 comes 100.",
            hints: ["", "98 comes before 99. We count up.", "90 comes before 99. One more than 99 is 100."],
          },
        },
      },
      {
        title: "Count From Anywhere",
        teach:
          "You don't have to start at 1. You can start anywhere! Start at 87. Count on. 88, 89, 90, 91. You can count by tens too. 10, 20, 30, 40, 50. Keep going. 60, 70, 80, 90, 100. Then 110, 120! Counting by tens is fast. It helps us find numbers on a number line. 50 is halfway to 100.",
        visual: {
          type: "flip",
          cards: [
            { front: "Start at 87", back: "88, 89, 90, 91, 92..." },
            { front: "Count by tens", back: "10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120" },
            { front: "Halfway to 100", back: "50 is right in the middle of 0 and 100." },
          ],
        },
        probe: {
          type: "place",
          prompt: "Drag each number to its spot on the number line from 0 to 120.",
          min: 0,
          max: 120,
          step: 1,
          tolerance: 5,
          items: [
            { label: "50", value: 50 },
            { label: "100", value: 100 },
            { label: "120", value: 120 },
            { label: "20", value: 20 },
          ],
          hint: "Count by tens along the line: 10, 20, 30... Find each number's spot.",
          seconds: 40,
        },
        think: {
          q: "Count by tens: 80, 90, 100, ... What comes next?",
          choices: ["101", "200", "110"],
          answer: 2,
          why: "Counting by tens, 10 more than 100 is 110.",
          hints: ["101 is just one more. Counting by tens adds 10.", "200 is far too big. 10 more than 100 is 110.", ""],
        },
        approaches: {
          analogy: "Counting by tens is like counting dimes. Each dime is 10 cents, so you count 10, 20, 30.",
          example: "Start at 112 and count on 4: 113, 114, 115, 116. So 4 more than 112 is 116.",
          simpler: {
            q: "Count by tens: 10, 20, 30, ... What comes next?",
            choices: ["31", "40", "50"],
            answer: 1,
            why: "10 more than 30 is 40.",
            hints: ["31 is just one more. Counting by tens adds 10.", "", "50 skips 40. Count one ten at a time."],
          },
        },
      },
      {
        title: "Read and Write Big Numbers",
        teach:
          "Let's write big numbers. One hundred seven is 1, 0, 7. We write 107. The 1 shows one hundred. The 0 means no tens. The 7 means 7 ones. One hundred fifteen is 115. One hundred twenty is 120. Be careful! One hundred seven is not 1007. That number is much too big. Just write the 1 for one hundred, then the rest.",
        visual: {
          type: "flip",
          cards: [
            { front: "One hundred seven", back: "107" },
            { front: "One hundred fifteen", back: "115" },
            { front: "One hundred twenty", back: "120" },
            { front: "Not 1007!", back: "One hundred seven has 3 digits: 107." },
          ],
        },
        probe: {
          type: "number",
          prompt: "Write the number: one hundred eleven.",
          answer: 111,
          hint: "Write a 1 for one hundred. Then write eleven.",
          mistakes: [{ match: "10011", coach: "That is much too big. One hundred eleven is 1 for one hundred, then 11: 111." }],
          seconds: 25,
        },
        think: {
          q: "How do you write one hundred four?",
          choices: ["1004", "140", "104"],
          answer: 2,
          why: "One hundred four is 1 hundred, 0 tens and 4 ones: 104.",
          hints: ["That is one thousand four, much too big. Write 1, then 0, then 4.", "140 is one hundred forty. We want one hundred four.", ""],
        },
        approaches: {
          analogy: "Writing big numbers is like stacking blocks: one hundred block, then the tens, then the ones. No extra zeros in between.",
          example: "One hundred eighteen: write 1 for the hundred. Then write eighteen, 18. Together: 118.",
          simpler: {
            q: "How do you write one hundred?",
            choices: ["100", "10", "1000"],
            answer: 0,
            why: "One hundred is 100, a 1 and two zeros.",
            hints: ["", "10 is ten. One hundred has one more zero.", "1000 is one thousand. One hundred has two zeros."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort the numbers: less than 100 or more than 100?",
      buckets: ["Less than 100", "More than 100"],
      items: [
        { text: "🌰 87", bucket: 0 },
        { text: "🌰 99", bucket: 0 },
        { text: "🌰 64", bucket: 0 },
        { text: "🍄 101", bucket: 1 },
        { text: "🍄 115", bucket: 1 },
        { text: "🍄 120", bucket: 1 },
        { text: "🍄 110", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Count out loud from 97 to 112 for Professor Pascal. Then tell what comes after 119.",
      keyPoints: ["After 99 comes 100", "After 109 comes 110", "Counts one more each time", "After 119 comes 120"],
    },
    mastery: [
      {
        type: "number",
        prompt: "What number comes right after 119?",
        answer: 120,
        hint: "After 119 comes a new ten.",
        mistakes: [{ match: "1110", coach: "After 119 comes one hundred twenty: 120." }],
        seconds: 20,
      },
      {
        type: "cloze",
        text: "98, 99, {0}, {1}, 102",
        blanks: [{ answers: ["100"] }, { answers: ["101"] }],
        bank: ["100", "101", "910", "200"],
        hint: "Count one more each time. After 99 comes 100.",
        seconds: 25,
      },
      {
        type: "sequence",
        prompt: "Count by tens! Put them in order.",
        steps: ["70", "80", "90", "100", "110", "120"],
        hint: "Each number is 10 more than the one before it.",
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each number name to how we write it.",
        pairs: [
          { left: "One hundred six", right: "106" },
          { left: "One hundred sixteen", right: "116" },
          { left: "Sixty", right: "60" },
          { left: "One hundred twenty", right: "120" },
        ],
        hint: "Write a 1 for one hundred, then the rest of the number.",
        seconds: 40,
      },
    ],
    check: [
      { q: "What comes after 100?", choices: ["1001", "101", "110"], answer: 1, why: "One more than 100 is 101." },
      { q: "Count by tens: 90, 100, 110, ...", choices: ["120", "111", "200"], answer: 0, why: "10 more than 110 is 120." },
      { q: "How do you write one hundred twelve?", choices: ["10012", "102", "112"], answer: 2, why: "1 for one hundred, then 12: 112." },
      { q: "Start at 88. Count on 3. Where do you land?", choices: ["91", "85", "90"], answer: 0, why: "89, 90, 91." },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, count out 120 small things: beans, pasta or pennies. Put them in piles of 10 as you go. Count the piles by tens: 10, 20, 30... all the way to 120.",
      rubric: [
        "Counts each pile of 10 carefully",
        "Makes 12 piles of 10",
        "Counts by tens to 120 out loud",
      ],
    },
  },

  // 6. Tens and ones
  {
    id: "math-1.tens",
    title: "Tens and Ones",
    minutes: 18,
    stage: "logic",
    standards: ["1.NBT.B.2", "1.NBT.B.3"],
    read: [
      "Ten ones can be bundled together. Ten sticks with a rubber band make one ten.",
      "A two-digit number has a tens place and a ones place. In 47, the 4 means 4 tens. That is 40. The 7 means 7 ones. So 47 is 4 tens and 7 ones.",
      "The numbers 11 to 19 are one ten and some ones. 14 is one ten and four ones. Numbers like 30 and 80 are tens with zero ones left over.",
      "To compare two numbers, look at the tens first. 52 has 5 tens. 48 has 4 tens. So 52 is greater. If the tens are the same, look at the ones.",
      "We use signs to compare. The greater than sign opens toward the bigger number: 52 > 48. The less than sign is 48 < 52. If they are the same, use the equal sign. Let's figure it out together!",
    ].join("\n\n"),
    keyIdeas: [
      "Ten ones make one ten.",
      "In 47, the 4 means 4 tens and the 7 means 7 ones.",
      "Compare the tens first, then the ones.",
      "Use > for greater than, < for less than, and = for the same.",
    ],
    hook: {
      text: "Pip gathered a big pile of sticks for a campfire. Counting one by one is slow. What if we bundle them into tens?",
    },
    teach: [
      {
        title: "Bundles of Ten",
        teach:
          "Count ten sticks. Wrap a band around them. Now you have one ten! One ten is the same as ten ones. Look at 14. It is one bundle of ten and 4 loose sticks. 14 is one ten and four ones. 18 is one ten and eight ones. All the numbers from 11 to 19 have one ten. And 30 is three bundles with no loose sticks.",
        visual: {
          type: "flip",
          cards: [
            { front: "1 ten", back: "🪵🪵🪵🪵🪵🪵🪵🪵🪵🪵 ten ones bundled together" },
            { front: "14", back: "1 ten and 4 ones" },
            { front: "19", back: "1 ten and 9 ones" },
            { front: "30", back: "3 tens and 0 ones" },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match the tens and ones to the number.",
          pairs: [
            { left: "1 ten and 4 ones", right: "14" },
            { left: "1 ten and 7 ones", right: "17" },
            { left: "3 tens and 0 ones", right: "30" },
            { left: "1 ten and 0 ones", right: "10" },
          ],
          hint: "The tens go in the first spot. The ones go in the second spot.",
          seconds: 40,
        },
        think: {
          q: "How many ones make one ten?",
          choices: ["1", "100", "10"],
          answer: 2,
          why: "Ten ones bundled together make one ten.",
          hints: ["One stick is just one. A bundle of ten needs more.", "100 ones make one hundred. One ten is fewer.", ""],
        },
        approaches: {
          analogy: "A ten is like an egg carton with all ten spots full. Loose eggs on the counter are the ones.",
          example: "16 sticks: count out 10 and wrap them up. 6 are left loose. So 16 is 1 ten and 6 ones.",
          simpler: {
            q: "13 is one ten and how many ones?",
            choices: ["3", "1", "13"],
            answer: 0,
            why: "13 is one ten and 3 ones.",
            hints: ["", "1 is the number of tens. Look at the ones place.", "13 is the whole number. After the ten, how many are left?"],
          },
        },
      },
      {
        title: "Tens Place and Ones Place",
        teach:
          "Every two-digit number has two places. The left spot is the tens place. The right spot is the ones place. Look at 47. The 4 is in the tens place. It means 4 tens. That is 40. The 7 is in the ones place. It means 7 ones. So 47 is 4 tens and 7 ones. Now look at 74. Same digits, but a different number! 74 is 7 tens and 4 ones.",
        visual: {
          type: "compare",
          left: { title: "47", points: ["4 tens = 40", "7 ones = 7", "40 + 7 = 47"] },
          right: { title: "74", points: ["7 tens = 70", "4 ones = 4", "70 + 4 = 74"] },
        },
        probe: {
          type: "cloze",
          text: "63 has {0} tens and {1} ones. 8 tens and 5 ones is {2}.",
          blanks: [{ answers: ["6"] }, { answers: ["3"] }, { answers: ["85"] }],
          bank: ["6", "3", "85", "58", "36"],
          hint: "The left digit tells the tens. The right digit tells the ones.",
          mistakes: [{ match: "58", coach: "Tens come first. 8 tens and 5 ones is 85." }],
          seconds: 35,
        },
        think: {
          q: "In 52, what does the 5 mean?",
          choices: ["5 ones", "5 tens", "52 ones"],
          answer: 1,
          why: "The 5 is in the tens place, so it means 5 tens, or 50.",
          hints: ["The 5 is on the left, in the tens place. The ones digit is 2.", "", "The whole number is 52. Just the 5 means 5 tens."],
        },
        approaches: {
          analogy: "The tens place is like a garage that holds bundles of ten. The ones place is the porch for loose sticks.",
          example: "29: the 2 is in the tens place, so 2 tens, or 20. The 9 is in the ones place, so 9 ones. 20 + 9 = 29.",
          simpler: {
            q: "In 35, which digit is in the ones place?",
            choices: ["3", "35", "5"],
            answer: 2,
            why: "The right digit, 5, is in the ones place.",
            hints: ["3 is on the left, in the tens place.", "35 is the whole number. Pick just one digit.", ""],
          },
        },
      },
      {
        title: "Greater Than, Less Than",
        teach:
          "Which is bigger, 52 or 48? Look at the tens first. 52 has 5 tens. 48 has only 4 tens. So 52 is greater. We write 52 > 48. The open side faces the bigger number, like a hungry mouth! Now try 36 and 39. The tens are the same. So look at the ones. 9 ones is more than 6 ones. So 36 < 39.",
        visual: {
          type: "hotspots",
          title: "Comparing signs",
          center: "> < =",
          spots: [
            { label: ">", icon: "🐊", detail: "Greater than. 52 > 48. The open mouth faces the bigger number." },
            { label: "<", icon: "🐊", detail: "Less than. 36 < 39. The small point faces the smaller number." },
            { label: "=", icon: "⚖️", detail: "Equal. 25 = 25. Both sides are the same." },
          ],
        },
        probe: {
          type: "sort",
          prompt: "Is the first number greater or less? Sort each pair.",
          buckets: ["First is greater (>)", "First is less (<)"],
          items: [
            { text: "52 and 48", bucket: 0 },
            { text: "71 and 17", bucket: 0 },
            { text: "39 and 36", bucket: 0 },
            { text: "29 and 41", bucket: 1 },
            { text: "64 and 68", bucket: 1 },
            { text: "15 and 51", bucket: 1 },
          ],
          hint: "Compare the tens first. If the tens are the same, compare the ones.",
          seconds: 50,
        },
        think: {
          q: "Which is true?",
          choices: ["45 < 54", "45 > 54", "45 = 54"],
          answer: 0,
          why: "45 has 4 tens and 54 has 5 tens. So 45 is less.",
          hints: ["", "Look at the tens: 4 tens is fewer than 5 tens.", "These have the same digits, but in different places. They are not equal."],
        },
        approaches: {
          analogy: "Comparing numbers is like comparing piles of ten-dollar bills first. Whoever has more tens has more, no matter the ones.",
          example: "Compare 61 and 58. Tens: 6 and 5. 6 tens is more. So 61 > 58, even though 8 ones is more than 1 one.",
          simpler: {
            q: "Which has more tens: 30 or 50?",
            choices: ["30", "50", "They are the same"],
            answer: 1,
            why: "50 has 5 tens. 30 has 3 tens.",
            hints: ["30 has 3 tens. Is that more than 5 tens?", "", "3 tens and 5 tens are not the same."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort the numbers: more than 50 or less than 50?",
      buckets: ["Less than 50", "More than 50"],
      items: [
        { text: "🌲 45", bucket: 0 },
        { text: "🌲 19", bucket: 0 },
        { text: "🌲 38", bucket: 0 },
        { text: "🌲 49", bucket: 0 },
        { text: "🍄 54", bucket: 1 },
        { text: "🍄 91", bucket: 1 },
        { text: "🍄 83", bucket: 1 },
        { text: "🍄 60", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Tell Professor Pascal how you know 61 is greater than 58.",
      keyPoints: ["61 has 6 tens", "58 has 5 tens", "Compare the tens first", "6 tens is more, so 61 > 58"],
    },
    mastery: [
      {
        type: "number",
        prompt: "7 tens and 2 ones. What number is that?",
        answer: 72,
        hint: "7 tens is 70. Then add 2 ones.",
        mistakes: [{ match: "27", coach: "Tens come first. 7 tens and 2 ones is 72." }],
        seconds: 20,
      },
      {
        type: "build",
        prompt: "Build a true sentence comparing 38 and 83. Start with 38.",
        tiles: ["38", "<", "83"],
        distractors: [">", "="],
        hint: "38 has 3 tens. 83 has 8 tens. Which is less?",
        seconds: 25,
      },
      {
        type: "cloze",
        text: "In 91, the 9 means {0} tens and the 1 means {1} one. 1 ten and 6 ones is {2}.",
        blanks: [{ answers: ["9"] }, { answers: ["1"] }, { answers: ["16"] }],
        bank: ["9", "1", "16", "61", "90"],
        hint: "Left digit is the tens. Right digit is the ones.",
        seconds: 35,
      },
      {
        type: "match",
        prompt: "Match each number to its tens and ones.",
        pairs: [
          { left: "🪵 26", right: "2 tens and 6 ones" },
          { left: "🪵 62", right: "6 tens and 2 ones" },
          { left: "🪵 40", right: "4 tens and 0 ones" },
          { left: "🪵 11", right: "1 ten and 1 one" },
        ],
        hint: "The first digit tells the tens. The second tells the ones.",
        seconds: 40,
      },
    ],
    check: [
      { q: "What is 1 ten and 5 ones?", choices: ["51", "6", "15"], answer: 2, why: "1 ten is 10, plus 5 ones is 15." },
      { q: "In 84, what does the 8 mean?", choices: ["8 tens", "8 ones", "84 tens"], answer: 0, why: "The 8 is in the tens place: 8 tens, or 80." },
      { q: "Which is true?", choices: ["29 > 31", "47 < 52", "60 = 16"], answer: 1, why: "47 has 4 tens and 52 has 5 tens, so 47 < 52." },
      { q: "What is 9 tens and 0 ones?", choices: ["9", "19", "90"], answer: 2, why: "9 tens is 90, with no ones left over." },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, gather 30 to 60 small sticks, straws or crayons. Bundle them in tens with rubber bands or hair ties. Count the bundles and loose ones, then say the number. Do it with 3 different piles.",
      rubric: [
        "Makes bundles of exactly 10",
        "Says the tens and ones, like 4 tens and 3 ones",
        "Says the right number, like 43",
      ],
    },
  },

  // 7. Adding and subtracting with tens
  {
    id: "math-1.add100",
    title: "Adding and Subtracting Tens",
    minutes: 20,
    stage: "logic",
    standards: ["1.NBT.C.4", "1.NBT.C.5", "1.NBT.C.6"],
    read: [
      "Tens make big adding easy. 10 more than 34 is 44. 10 less than 34 is 24. Only the tens digit changes, so you don't need to count.",
      "Adding tens is like adding small numbers. 3 tens plus 4 tens is 7 tens. So 30 plus 40 equals 70. Taking away tens works the same way. 7 tens minus 3 tens is 4 tens. So 70 minus 30 equals 40.",
      "You can add tens to any number. 25 plus 30: add the tens, 2 tens and 3 tens make 5 tens. Keep the 5 ones. The answer is 55.",
      "To add a two-digit number and a one-digit number, add the ones. For 36 plus 7, 6 ones plus 7 ones is 13 ones. That is one new ten and 3 ones. Now there are 4 tens and 3 ones. The answer is 43. Let's figure it out together!",
    ].join("\n\n"),
    keyIdeas: [
      "10 more or 10 less changes only the tens digit.",
      "Add or subtract tens like small numbers: 30 + 40 = 70.",
      "Add tens to tens and ones to ones.",
      "10 ones make a new ten: 36 + 7 = 43.",
    ],
    hook: {
      text: "The mushroom village has 34 mushroom houses. The villagers build 10 more. Do we have to count every house again?",
    },
    teach: [
      {
        title: "10 More, 10 Less",
        teach:
          "Let's find 10 more than 34. Add one bundle of ten. 3 tens becomes 4 tens. The ones stay the same. So 10 more than 34 is 44. Now find 10 less than 34. Take away one bundle. 3 tens becomes 2 tens. So 10 less is 24. Only the tens digit changes. You don't need to count at all!",
        visual: {
          type: "compare",
          left: { title: "10 more ⬆️", points: ["34 → 44", "57 → 67", "80 → 90"] },
          right: { title: "10 less ⬇️", points: ["34 → 24", "57 → 47", "80 → 70"] },
        },
        probe: {
          type: "match",
          prompt: "Match each one to its answer.",
          pairs: [
            { left: "10 more than 34", right: "44" },
            { left: "10 less than 34", right: "24" },
            { left: "10 more than 58", right: "68" },
            { left: "10 less than 71", right: "61" },
          ],
          hint: "Change only the tens digit: one more ten or one less ten. The ones stay the same.",
          seconds: 40,
        },
        think: {
          q: "What is 10 more than 52?",
          choices: ["53", "62", "42"],
          answer: 1,
          why: "Add one ten: 5 tens becomes 6 tens. 62.",
          hints: ["53 is one more. 10 more changes the tens digit.", "", "42 is 10 less. We want 10 more."],
        },
        approaches: {
          analogy: "10 more is like riding an elevator up one floor. You land in the same spot, just one floor higher.",
          example: "10 less than 85: 8 tens becomes 7 tens. The 5 ones stay. So it is 75.",
          simpler: {
            q: "What is 10 more than 20?",
            choices: ["21", "40", "30"],
            answer: 2,
            why: "2 tens and 1 more ten make 3 tens: 30.",
            hints: ["21 is one more. Add a whole ten.", "40 is 20 more. Add just one ten.", ""],
          },
        },
      },
      {
        title: "Adding and Taking Away Tens",
        teach:
          "Adding tens is easy. Just count the tens. 30 plus 40 is 3 tens and 4 tens. That makes 7 tens. So the answer is 70. Taking away tens works the same way. 70 minus 30 is 7 tens take away 3 tens. That leaves 4 tens, or 40. You can add tens to any number too. 25 plus 30 is 5 tens and 5 ones. That's 55.",
        visual: {
          type: "flip",
          cards: [
            { front: "30 + 40", back: "3 tens + 4 tens = 7 tens = 70" },
            { front: "70 - 30", back: "7 tens - 3 tens = 4 tens = 40" },
            { front: "25 + 30", back: "2 tens + 3 tens = 5 tens. Keep the 5 ones. 55." },
          ],
        },
        probe: {
          type: "cloze",
          text: "50 + 20 = {0}. 90 - 40 = {1}. 43 + 30 = {2}.",
          blanks: [{ answers: ["70"] }, { answers: ["50"] }, { answers: ["73"] }],
          bank: ["70", "50", "73", "46", "130"],
          hint: "Count the tens like small numbers: 5 tens + 2 tens = 7 tens.",
          mistakes: [{ match: "46", coach: "43 + 30 adds 3 tens, not 3 ones. 4 tens + 3 tens = 7 tens. Keep the 3 ones: 73." }],
          seconds: 40,
        },
        think: {
          q: "What is 60 - 20?",
          choices: ["40", "4", "80"],
          answer: 0,
          why: "6 tens take away 2 tens is 4 tens: 40.",
          hints: ["", "4 tens is right, but 4 tens is the number 40, not 4.", "80 is 60 + 20. Minus means take away."],
        },
        approaches: {
          analogy: "Adding tens is like adding packs of crayons. 3 packs and 4 packs make 7 packs. Each pack holds 10.",
          example: "80 - 50: 8 tens take away 5 tens is 3 tens. 3 tens is 30. So 80 - 50 = 30.",
          simpler: {
            q: "What is 2 tens + 3 tens?",
            choices: ["23", "5 tens, which is 50", "6 tens"],
            answer: 1,
            why: "2 + 3 = 5, so it is 5 tens, or 50.",
            hints: ["23 just puts the digits side by side. Add the tens: 2 + 3.", "", "2 + 3 is 5, not 6."],
          },
        },
      },
      {
        title: "Make a New Ten",
        teach:
          "Let's add 36 plus 7. Add the ones first. 6 ones plus 7 ones is 13 ones. Whoa, that's more than ten! Bundle 10 of them into a new ten. Now there is 1 new ten and 3 ones left. The 3 tens plus the new ten make 4 tens. So the answer is 4 tens and 3 ones. 36 plus 7 equals 43.",
        visual: {
          type: "sequence",
          prompt: "The steps for 36 + 7, in order.",
          steps: ["Add the ones: 6 + 7 = 13", "Bundle 10 ones into a new ten", "3 tens + 1 new ten = 4 tens", "4 tens and 3 ones is 43"],
        },
        probe: {
          type: "number",
          prompt: "🌰 Pip has 28 acorns. He finds 5 more. What is 28 + 5?",
          answer: 33,
          hint: "Add the ones: 8 + 5 = 13. That's a new ten and 3 ones.",
          mistakes: [
            { match: "23", coach: "The 13 ones make a new ten. So the tens go up from 2 to 3, not stay at 2." },
            { match: "213", coach: "Don't write 13 in the ones place. Bundle 10 ones into a new ten: 3 tens and 3 ones." },
          ],
          seconds: 35,
        },
        think: {
          q: "What is 45 + 8?",
          choices: ["413", "53", "43"],
          answer: 1,
          why: "5 + 8 = 13 ones. That's a new ten and 3 ones. 4 tens + 1 ten = 5 tens. 53.",
          hints: ["13 ones can't fit in the ones place. Bundle 10 into a new ten.", "", "43 is less than 45. Adding makes the number bigger."],
        },
        approaches: {
          analogy: "When your ones cup overflows past ten, you pour ten into a new bundle and move it to the tens shelf.",
          example: "57 + 6: 7 + 6 = 13 ones. Bundle 10 into a ten. 5 tens + 1 ten = 6 tens, with 3 ones. 63.",
          simpler: {
            q: "What is 7 + 5?",
            choices: ["12", "2", "11"],
            answer: 0,
            why: "7 + 3 = 10, then 2 more is 12.",
            hints: ["", "2 is 7 - 5. Here we add.", "Make a ten: 7 + 3 = 10, then 2 more."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put the steps for 47 + 6 in order.",
      steps: ["Add the ones: 7 + 6 = 13", "Bundle 10 ones into a new ten", "4 tens + 1 new ten = 5 tens", "5 tens and 3 ones is 53"],
    },
    explain: {
      prompt: "Tell Professor Pascal how to add 38 + 5.",
      keyPoints: ["Add the ones: 8 + 5 = 13", "Make a new ten from 10 ones", "3 tens and 1 ten make 4 tens", "The answer is 43"],
    },
    mastery: [
      {
        type: "number",
        prompt: "What is 64 + 9?",
        answer: 73,
        hint: "Add the ones: 4 + 9 = 13. That makes a new ten.",
        mistakes: [{ match: "63", coach: "The 13 ones make a new ten. The tens go from 6 to 7." }],
        seconds: 35,
      },
      {
        type: "place",
        prompt: "Drag each answer to its spot on the number line.",
        min: 0,
        max: 100,
        step: 1,
        tolerance: 2,
        items: [
          { label: "10 more than 45", value: 55 },
          { label: "10 less than 45", value: 35 },
          { label: "80 - 60", value: 20 },
          { label: "40 + 50", value: 90 },
        ],
        hint: "Find each answer first. 10 more or 10 less changes only the tens digit.",
        seconds: 50,
      },
      {
        type: "match",
        prompt: "Match each problem to its answer.",
        pairs: [
          { left: "20 + 70", right: "90" },
          { left: "90 - 60", right: "30" },
          { left: "34 + 20", right: "54" },
          { left: "26 + 8", right: "34" },
        ],
        hint: "Add tens to tens and ones to ones.",
        seconds: 50,
      },
      {
        type: "cloze",
        text: "10 more than 67 is {0}. 10 less than 67 is {1}.",
        blanks: [{ answers: ["77"] }, { answers: ["57"] }],
        bank: ["77", "57", "68", "66", "167"],
        hint: "Change only the tens digit.",
        mistakes: [{ match: "68", coach: "68 is one more. 10 more changes the tens digit." }],
        seconds: 30,
      },
    ],
    check: [
      { q: "What is 10 more than 46?", choices: ["47", "36", "56"], answer: 2, why: "4 tens becomes 5 tens. The 6 ones stay. 56." },
      { q: "What is 50 + 30?", choices: ["80", "53", "20"], answer: 0, why: "5 tens + 3 tens = 8 tens: 80." },
      { q: "What is 90 - 20?", choices: ["110", "70", "88"], answer: 1, why: "9 tens take away 2 tens is 7 tens: 70." },
      { q: "What is 38 + 4?", choices: ["312", "34", "42"], answer: 2, why: "8 + 4 = 12 ones: a new ten and 2 ones. 3 tens + 1 ten = 4 tens. 42." },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, use dimes and pennies (or bundles of 10 sticks and loose sticks). Make 26 cents. Add 10 cents, then add 10 more. Then make 38 cents and add 5 pennies. Trade 10 pennies for a dime when you can.",
      rubric: [
        "Shows 10 more by adding one dime or bundle",
        "Trades 10 pennies for a dime when the ones pass ten",
        "Says the new total each time",
      ],
    },
  },

  // 8. Measuring length and telling time
  {
    id: "math-1.measure",
    title: "Measuring and Telling Time",
    minutes: 20,
    stage: "grammar",
    standards: ["1.MD.A.1", "1.MD.A.2", "1.MD.B.3"],
    read: [
      "We can compare how long things are. Line them up at one end, side by side. The one that sticks out farther is longer.",
      "You can even compare two things that can't touch. If a rope is longer than a stick, and the stick is longer than a pencil, then the rope is longer than the pencil.",
      "To measure, lay same-size units end to end, like paper clips or blocks. Leave no gaps. Don't let them overlap. Count the units. A leaf that is 5 paper clips long measures 5 paper clips.",
      "A clock has two hands. The short hand points to the hour. The long hand shows the minutes. When the long hand points straight up at the 12, it is something o'clock, like 3:00. When the long hand points straight down at the 6, it is half past the hour, like 3:30. Let's figure it out together!",
    ].join("\n\n"),
    keyIdeas: [
      "Line things up at one end to compare their length.",
      "Measure with same-size units, end to end, with no gaps or overlaps.",
      "The short hand shows the hour. The long hand shows the minutes.",
      "Long hand on 12 means o'clock. Long hand on 6 means half past.",
    ],
    hook: {
      text: "Pip found three fallen branches in the forest. Which one is the longest? And how can we know what time to head home?",
    },
    teach: [
      {
        title: "Longer and Shorter",
        teach:
          "Let's compare three branches. First, line them up at one end. Then look at the other end. The one that sticks out farthest is the longest. The one that stops first is the shortest. Here is a clever trick. A rope is longer than a stick. The stick is longer than a pencil. So the rope must be longer than the pencil! We didn't even put them side by side.",
        visual: {
          type: "compare",
          left: { title: "Fair compare ✅", points: ["Line up the ends", "Look at the other end", "Farthest one is longest"] },
          right: { title: "Not fair ❌", points: ["Ends don't line up", "One starts ahead", "Can't tell which is longer"] },
        },
        probe: {
          type: "sequence",
          prompt: "Put these in order from shortest to longest.",
          steps: ["🐜 an ant", "🖍️ a crayon", "🥄 a big spoon", "🐍 a long snake"],
          hint: "Think about how long each one really is. Start with the tiniest.",
          seconds: 35,
        },
        think: {
          q: "A ribbon is longer than a shoelace. The shoelace is longer than a crayon. Which is longest?",
          choices: ["The crayon", "The ribbon", "The shoelace"],
          answer: 1,
          why: "The ribbon is longer than the shoelace, and the shoelace is longer than the crayon. So the ribbon is longest.",
          hints: ["The crayon is shorter than the shoelace, so it is the shortest.", "", "The shoelace is shorter than the ribbon."],
        },
        approaches: {
          analogy: "Comparing length is like a race where everyone starts at the same line. You can only tell who went farther if they all started together.",
          example: "Hold a pencil and a fork with their bottoms on the table. The fork's top sticks up higher. So the fork is longer than the pencil.",
          simpler: {
            q: "Which is longer: a bus or a bike?",
            choices: ["A bike", "They are the same", "A bus"],
            answer: 2,
            why: "A bus is much longer than a bike.",
            hints: ["A bike fits in a garage easily. A bus is much bigger.", "Picture them side by side. The bus sticks out a lot farther.", ""],
          },
        },
      },
      {
        title: "Measure With Units",
        teach:
          "How long is a leaf? Let's measure it with paper clips. Every paper clip must be the same size. Lay them end to end, touching. Start right at the end of the leaf. Leave no gaps. Don't let them overlap. Then count. One, two, three, four, five. The leaf is 5 paper clips long. Gaps or overlaps would give the wrong number.",
        visual: {
          type: "compare",
          left: { title: "Good measuring ✅", points: ["Same-size units", "End to end, touching", "Start at the very end", "No gaps, no overlaps"] },
          right: { title: "Oops ❌", points: ["Big and small units mixed", "Gaps between units", "Units piled on top", "Starting in the middle"] },
        },
        probe: {
          type: "sort",
          prompt: "Is this a good way to measure? Sort each one.",
          buckets: ["Good measuring ✅", "Oops ❌"],
          items: [
            { text: "📎📎📎📎 Same paper clips, end to end", bucket: 0 },
            { text: "🧱🧱🧱 Same blocks, starting at the end", bucket: 0 },
            { text: "📎 📎 📎 Paper clips with gaps between", bucket: 1 },
            { text: "Paper clips piled on top of each other", bucket: 1 },
            { text: "Big blocks and tiny blocks mixed", bucket: 1 },
          ],
          hint: "Good measuring uses same-size units, touching end to end, with no gaps or overlaps.",
          seconds: 40,
        },
        think: {
          q: "A pencil is as long as 🧱🧱🧱🧱🧱🧱 blocks laid end to end. How long is it?",
          choices: ["6 blocks", "5 blocks", "7 blocks"],
          answer: 0,
          why: "Count the blocks: there are 6.",
          hints: ["", "Count again carefully. Touch each block.", "That is one too many. Count each block once."],
        },
        approaches: {
          analogy: "Measuring is like a line of train cars. Each car is the same size, and they hook together with no space between them.",
          example: "A spoon: lay blocks from one end of the spoon to the other. The blocks touch with no gaps. Count them: 1, 2, 3, 4. The spoon is 4 blocks long.",
          simpler: {
            q: "When you measure, should the units have gaps between them?",
            choices: ["Yes, big gaps", "No gaps at all", "Only a few gaps"],
            answer: 1,
            why: "Units must touch end to end, with no gaps.",
            hints: ["Gaps leave out part of the length, so the count is wrong.", "", "Even a few gaps make the count wrong."],
          },
        },
      },
      {
        title: "Tell Time to the Half Hour",
        teach:
          "A clock has two hands. The short hand is the hour hand. It tells the hour. The long hand is the minute hand. When the long hand points straight up to the 12, it is o'clock. Short hand on 3, long hand on 12. It's 3 o'clock, written 3:00. When the long hand points down to the 6, it is half past. Then it's 3:30.",
        visual: {
          type: "hotspots",
          title: "Reading a clock",
          center: "🕒",
          spots: [
            { label: "Short hand", icon: "⏱️", detail: "The hour hand. It points to the hour." },
            { label: "Long hand on 12", icon: "🕒", detail: "O'clock. Short hand on 3: it is 3:00." },
            { label: "Long hand on 6", icon: "🕞", detail: "Half past. The short hand is halfway between 3 and 4: it is 3:30." },
          ],
        },
        probe: {
          type: "match",
          prompt: "Match each clock to its time.",
          pairs: [
            { left: "🕒 Short hand on 3, long hand on 12", right: "3:00" },
            { left: "🕞 Short hand between 3 and 4, long hand on 6", right: "3:30" },
            { left: "🕖 Short hand on 7, long hand on 12", right: "7:00" },
            { left: "🕤 Short hand between 9 and 10, long hand on 6", right: "9:30" },
          ],
          hint: "Long hand on 12 means o'clock (:00). Long hand on 6 means half past (:30).",
          seconds: 50,
        },
        think: {
          q: "The short hand is on 8. The long hand is on 12. What time is it?",
          choices: ["12:00", "8:30", "8:00"],
          answer: 2,
          why: "Short hand on 8 means 8. Long hand on 12 means o'clock. 8:00.",
          hints: ["The short hand tells the hour, and it points to 8, not 12.", "Half past would have the long hand on the 6. Here it is on 12.", ""],
        },
        approaches: {
          analogy: "The short hand is like a slow turtle that tells the hour. The long hand is a fast rabbit that runs all the way around each hour.",
          example: "Short hand halfway between 5 and 6. Long hand on 6. The hour is still 5, and half past means :30. It is 5:30.",
          simpler: {
            q: "Which hand tells the hour?",
            choices: ["The short hand", "The long hand", "Neither hand"],
            answer: 0,
            why: "The short hand is the hour hand.",
            hints: ["", "The long hand tells the minutes.", "One of the hands does tell the hour: the short one."],
          },
        },
      },
    ],
    activity: {
      type: "sequence",
      prompt: "Put Pip's day in order by the clock.",
      steps: ["🕖 7:00 Wake up", "🕣 8:30 Math time", "🕛 12:00 Lunch", "🕒 3:00 Play outside", "🕢 7:30 Story time"],
    },
    explain: {
      prompt: "Tell Professor Pascal how to measure a spoon with paper clips, and how to read 4:30 on a clock.",
      keyPoints: [
        "Use paper clips that are all the same size",
        "Lay them end to end with no gaps or overlaps",
        "The short hand shows the hour",
        "Long hand on the 6 means half past",
      ],
    },
    mastery: [
      {
        type: "number",
        prompt: "A feather is as long as 📎📎📎📎📎📎📎 paper clips laid end to end. How many paper clips long is it?",
        answer: 7,
        hint: "Touch and count each paper clip once.",
        seconds: 20,
        unit: "paper clips",
      },
      {
        type: "match",
        prompt: "Match each clock to its time.",
        pairs: [
          { left: "🕐 Short hand on 1, long hand on 12", right: "1:00" },
          { left: "🕠 Short hand between 5 and 6, long hand on 6", right: "5:30" },
          { left: "🕙 Short hand on 10, long hand on 12", right: "10:00" },
          { left: "🕡 Short hand between 6 and 7, long hand on 6", right: "6:30" },
        ],
        hint: "The short hand tells the hour. Long hand on 6 means :30.",
        seconds: 50,
      },
      {
        type: "sequence",
        prompt: "Rope is longer than the stick. The stick is longer than the pencil. Put them from shortest to longest.",
        steps: ["✏️ Pencil", "🪵 Stick", "🪢 Rope"],
        hint: "The pencil is shorter than the stick, and the stick is shorter than the rope.",
        seconds: 30,
      },
      {
        type: "cloze",
        text: "When the long hand points to the 12, it is {0}. When the long hand points to the 6, it is {1} past.",
        blanks: [{ answers: ["o'clock", "oclock"] }, { answers: ["half"] }],
        bank: ["o'clock", "half", "noon", "late"],
        hint: "12 at the top means o'clock. 6 at the bottom means half past.",
        seconds: 30,
      },
    ],
    check: [
      { q: "How do you compare two pencils fairly?", choices: ["Line up their ends", "Hold them far apart", "Look at their colors"], answer: 0, why: "Line up one end. Then the one that sticks out farther is longer." },
      { q: "What is wrong with measuring using big and small blocks mixed?", choices: ["Nothing", "The units are not the same size", "Blocks are too heavy"], answer: 1, why: "Units must all be the same size, or the count doesn't mean anything." },
      { q: "The short hand is on 6. The long hand is on 12. What time is it?", choices: ["12:00", "6:30", "6:00"], answer: 2, why: "Short hand on 6, long hand on 12: 6 o'clock." },
      { q: "The long hand points to the 6. It is...", choices: ["Half past the hour", "Exactly o'clock", "Midnight"], answer: 0, why: "When the long hand is on the 6, it is half past, like 2:30." },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, measure 3 things at home (a spoon, a shoe and a book) with paper clips or blocks laid end to end. Put them in order from shortest to longest. Then look at a clock with hands at an o'clock or half-past time, and tell the time.",
      rubric: [
        "Uses same-size units with no gaps or overlaps",
        "Counts the units for each thing",
        "Orders the 3 things from shortest to longest",
        "Reads a time to the hour or half hour",
      ],
    },
  },

  // 9. Shapes and equal shares
  {
    id: "math-1.shapes",
    title: "Shapes and Equal Shares",
    minutes: 20,
    stage: "rhetoric",
    standards: ["1.G.A.1", "1.G.A.2", "1.G.A.3"],
    read: [
      "Some things make a shape what it is. A triangle has 3 straight sides and 3 corners. A square has 4 straight sides that are all the same length, and 4 square corners.",
      "Some things don't matter at all. A triangle can be big or small, red or blue, or turned upside down. It is still a triangle.",
      "Shapes can be put together to make new shapes. Two squares side by side make a rectangle. Two half circles make a circle. Six triangles can make a hexagon. Solid shapes stack too, like cubes in a tower.",
      "We can cut shapes into equal shares. Equal shares are the same size. Cut a pizza into 2 equal shares, and each piece is one half. Cut it into 4 equal shares, and each piece is one fourth, also called a quarter. The more shares you cut, the smaller each piece is. Let's figure it out together!",
    ].join("\n\n"),
    keyIdeas: [
      "Sides and corners make a shape what it is. Color, size and turning don't.",
      "Shapes can be put together to make new shapes.",
      "Equal shares are the same size.",
      "2 equal shares are halves. 4 equal shares are fourths, or quarters.",
    ],
    hook: {
      text: "The mushroom village is having a party! Pip has one big round pie. Four friends want a fair piece. How can we cut it so everyone gets the same?",
    },
    teach: [
      {
        title: "What Makes a Shape",
        teach:
          "What makes a triangle a triangle? It has 3 straight sides. It has 3 corners. And it is closed, with no gaps. Those things matter. What doesn't matter? Color doesn't matter. Size doesn't matter. Turning it doesn't matter. A tiny blue triangle, upside down, is still a triangle. But a shape with a curved side is not a triangle. A square has 4 equal sides and 4 square corners.",
        visual: {
          type: "compare",
          left: { title: "Matters ✅", points: ["Number of sides", "Number of corners", "Straight sides", "Closed, no gaps"] },
          right: { title: "Doesn't matter ❌", points: ["Color", "Size", "Which way it is turned"] },
        },
        probe: {
          type: "sort",
          prompt: "Is it a triangle? Sort each shape.",
          buckets: ["Triangle 🔺", "Not a triangle"],
          items: [
            { text: "A big blue shape with 3 straight sides and 3 corners", bucket: 0 },
            { text: "A tiny shape with 3 straight sides, turned upside down", bucket: 0 },
            { text: "A long, skinny shape with 3 straight sides and 3 corners", bucket: 0 },
            { text: "A red shape with 4 straight sides", bucket: 1 },
            { text: "A round shape with no corners", bucket: 1 },
            { text: "A shape with 3 sides, but one side is curved", bucket: 1 },
          ],
          hint: "Ignore color, size and turning. Check: 3 straight sides, 3 corners, closed.",
          seconds: 50,
        },
        think: {
          q: "A green triangle is turned upside down. What is it now?",
          choices: ["A square", "Still a triangle", "A circle"],
          answer: 1,
          why: "Turning a shape doesn't change its sides or corners. It is still a triangle.",
          hints: ["A square has 4 sides. Turning doesn't add a side.", "", "A circle has no corners. Turning doesn't take corners away."],
        },
        approaches: {
          analogy: "A shape is like a dog. A big dog, a small dog, a brown dog or a dog lying upside down is still a dog. What counts is what it's made of.",
          example: "A yield sign is a triangle that points down. It still has 3 straight sides and 3 corners, so it is a triangle.",
          simpler: {
            q: "How many sides does a triangle have?",
            choices: ["4", "2", "3"],
            answer: 2,
            why: "Tri means three. A triangle has 3 sides.",
            hints: ["4 sides makes a square or rectangle.", "2 sides can't close up into a shape.", ""],
          },
        },
      },
      {
        title: "Put Shapes Together",
        teach:
          "Shapes are like puzzle pieces. Put them together to make new shapes! Put two squares side by side. Now you have a rectangle. Put two half circles together. Now you have a whole circle. Put six triangles around a point. They make a hexagon, like a honeycomb cell. Solid shapes work too. Stack cubes to build a tower. Put a cone on a cylinder to make a rocket!",
        visual: {
          type: "hotspots",
          title: "Shape puzzles",
          center: "🧩",
          spots: [
            { label: "2 squares", icon: "🟦", detail: "Two squares side by side make a rectangle." },
            { label: "2 half circles", icon: "🌗", detail: "Two half circles make a whole circle." },
            { label: "6 triangles", icon: "🔺", detail: "Six triangles around a point make a hexagon, like a honeycomb cell." },
            { label: "Cone + cylinder", icon: "🚀", detail: "A cone on top of a cylinder makes a rocket shape." },
          ],
        },
        probe: {
          type: "match",
          prompt: "What do they make? Match the parts to the new shape.",
          pairs: [
            { left: "🟦🟦 Two squares side by side", right: "A rectangle" },
            { left: "🌗 Two half circles", right: "A circle" },
            { left: "🔺 Six triangles around a point", right: "A hexagon" },
            { left: "🧊 Cubes stacked up high", right: "A tower" },
          ],
          hint: "Picture putting the pieces together. What shape is the outside edge?",
          seconds: 45,
        },
        think: {
          q: "What do two squares side by side make?",
          choices: ["A triangle", "A circle", "A rectangle"],
          answer: 2,
          why: "Two squares next to each other make a longer shape with 4 sides and 4 square corners: a rectangle.",
          hints: ["A triangle has only 3 sides. Two squares make 4 outside sides.", "A circle is round. Squares have straight sides.", ""],
        },
        approaches: {
          analogy: "Putting shapes together is like building with blocks. Small pieces join to make something new and bigger.",
          example: "Cut a square from corner to corner. You get two triangles. Put them back together, and you have a square again.",
          simpler: {
            q: "Two half circles together make a...",
            choices: ["Circle", "Square", "Triangle"],
            answer: 0,
            why: "Two halves make a whole circle.",
            hints: ["", "A square has straight sides. Half circles are round.", "A triangle has corners. Half circles make something round."],
          },
        },
      },
      {
        title: "Halves and Fourths",
        teach:
          "Fair shares are equal shares. Equal means the same size. Cut a pie into 2 equal shares. Each piece is one half. Two halves make the whole pie. Now cut the pie into 4 equal shares. Each piece is one fourth. We also call it a quarter. Four fourths make the whole pie. Which piece is bigger? A half! More shares means smaller pieces.",
        visual: {
          type: "compare",
          left: { title: "Halves", points: ["2 equal shares", "Each is one half", "Bigger pieces"] },
          right: { title: "Fourths (quarters)", points: ["4 equal shares", "Each is one fourth", "Smaller pieces"] },
        },
        probe: {
          type: "cloze",
          text: "Cut a pie into 2 equal shares. Each piece is one {0}. Cut it into 4 equal shares. Each piece is one {1}. A half is {2} than a fourth.",
          blanks: [{ answers: ["half"] }, { answers: ["fourth", "quarter"] }, { answers: ["bigger", "larger"] }],
          bank: ["half", "fourth", "bigger", "smaller", "third"],
          hint: "2 shares are halves, 4 shares are fourths. More shares means smaller pieces.",
          mistakes: [{ match: "smaller", coach: "Fewer shares means bigger pieces. A half is bigger than a fourth." }],
          seconds: 40,
        },
        think: {
          q: "A sandwich is cut into 4 equal shares. What is each piece called?",
          choices: ["One half", "One third", "One fourth"],
          answer: 2,
          why: "4 equal shares are fourths, also called quarters.",
          hints: ["A half comes from 2 equal shares. Here there are 4.", "A third comes from 3 equal shares. Here there are 4.", ""],
        },
        approaches: {
          analogy: "Sharing equally is like splitting a pizza with friends. If the pieces aren't the same size, it isn't fair.",
          example: "Fold a piece of paper in half. Open it: 2 equal shares, halves. Fold it in half again. Open it: 4 equal shares, fourths.",
          simpler: {
            q: "A cookie is cut into 2 pieces that are the same size. Are they equal shares?",
            choices: ["No", "Yes", "Only if it's round"],
            answer: 1,
            why: "Same-size pieces are equal shares.",
            hints: ["They are the same size, so they are equal.", "", "Any shape can be cut into equal shares."],
          },
        },
      },
    ],
    activity: {
      type: "sort",
      prompt: "Equal shares or not? Sort each one.",
      buckets: ["Equal shares ✅", "Not equal ❌"],
      items: [
        { text: "🍕 A pizza cut into 4 same-size pieces", bucket: 0 },
        { text: "🥪 A sandwich cut down the middle into 2 same pieces", bucket: 0 },
        { text: "🟫 A brownie cut into 4 matching squares", bucket: 0 },
        { text: "🍰 A cake cut into 1 big piece and 1 tiny piece", bucket: 1 },
        { text: "🍪 A cookie cut into 3 pieces of different sizes", bucket: 1 },
        { text: "🍞 Bread with one slice much thicker than the other", bucket: 1 },
      ],
    },
    explain: {
      prompt: "Tell Professor Pascal how to share a pie fairly with 4 friends, and what each piece is called.",
      keyPoints: ["Cut it into 4 equal shares", "Equal means the same size", "Each piece is one fourth, or a quarter", "Fourths are smaller than halves"],
    },
    mastery: [
      {
        type: "number",
        prompt: "🍕 A pizza is cut into fourths. How many equal pieces is that?",
        answer: 4,
        hint: "Fourths means four equal shares.",
        mistakes: [{ match: "2", coach: "2 pieces would be halves. Fourths means 4 pieces." }],
        seconds: 15,
      },
      {
        type: "sort",
        prompt: "Is it a square? Sort each shape.",
        buckets: ["Square 🟦", "Not a square"],
        items: [
          { text: "A red shape with 4 equal straight sides and 4 square corners", bucket: 0 },
          { text: "A huge square turned on its corner like a diamond", bucket: 0 },
          { text: "A long shape with 2 long sides and 2 short sides", bucket: 1 },
          { text: "A shape with 3 sides", bucket: 1 },
          { text: "A round shape", bucket: 1 },
        ],
        hint: "A square has 4 equal straight sides and 4 square corners. Turning it doesn't change that.",
        seconds: 45,
      },
      {
        type: "cloze",
        text: "Two {0} side by side make a rectangle. Two half circles make a {1}.",
        blanks: [{ answers: ["squares"] }, { answers: ["circle"] }],
        bank: ["squares", "circle", "triangle", "cones"],
        hint: "Picture the pieces joining together.",
        seconds: 30,
      },
      {
        type: "match",
        prompt: "Match each way of cutting to its name.",
        pairs: [
          { left: "🍕 2 equal shares", right: "Halves" },
          { left: "🍕 4 equal shares", right: "Fourths" },
          { left: "🍕 1 piece, not cut", right: "The whole" },
        ],
        hint: "Halves come from 2 equal shares. Fourths come from 4.",
        seconds: 30,
      },
    ],
    check: [
      { q: "What makes a triangle a triangle?", choices: ["Its color", "3 straight sides and 3 corners", "Its size"], answer: 1, why: "Sides and corners matter. Color and size don't." },
      { q: "Two squares side by side make a...", choices: ["Circle", "Triangle", "Rectangle"], answer: 2, why: "They make a longer 4-sided shape with square corners: a rectangle." },
      { q: "A pie cut into 2 equal shares. Each piece is...", choices: ["One half", "One fourth", "One whole"], answer: 0, why: "2 equal shares are halves." },
      { q: "Which piece is bigger?", choices: ["One fourth of a pie", "One half of the same pie", "They are the same"], answer: 1, why: "Fewer shares means bigger pieces. A half is bigger than a fourth." },
    ],
    task: {
      kind: "project",
      prompt: "With a parent, fold a square piece of paper into 2 equal shares, then 4 equal shares. Color one fourth. Then share a snack like a sandwich or tortilla into halves or fourths. Make sure the pieces are equal!",
      rubric: [
        "Folds the paper into 2, then 4, equal shares",
        "Colors exactly one fourth",
        "Cuts the snack into equal shares",
        "Uses the words half and fourth (or quarter)",
      ],
    },
  },
];

export const math1 = k5Course("math", 1, lessons);
