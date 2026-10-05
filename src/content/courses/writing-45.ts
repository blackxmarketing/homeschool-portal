import type { Course } from "./types";
import { writing } from "./writing";

/**
 * Young Writers: grades 4-5. Same teacher as the grades 6-8 course;
 * lessons written for this grade band. See types.ts for the lesson format.
 */
export const writing45: Course = {
  ...writing,
  id: "writing-45",
  band: "sprout",
  title: "Young Writers",
  blurb: "Writing for grades 4-5: strong sentences, paragraphs, stories and opinions.",
  lessons: [
    // ------------------------------------------------------------------
    {
      id: "writing-45.sentences",
      title: "Complete Sentences",
      minutes: 30,
      stage: "grammar",
      read: `A sentence is a complete thought. Every complete sentence needs two parts. The subject tells who or what the sentence is about. The verb tells what the subject does or is. In "The fox jumped," fox is the subject and jumped is the verb.

If a group of words is missing one of these parts, it is a fragment, a broken piece of a sentence. "The hungry fox" is a fragment, because we don't know what the fox did. "Jumped at the grapes" is a fragment, too, because we don't know who jumped. Put them together and you get a complete sentence: "The hungry fox jumped at the grapes."

Every sentence begins with a capital letter. Names of people and places get capitals, too, like Peter, Mr. McGregor and London. The word "I" is always a capital.

Every sentence also ends with an end mark. A period ends a telling sentence: "The tortoise walked slowly." A question mark ends an asking sentence: "Who will win the race?" An exclamation mark ends a sentence with strong feeling: "The tortoise won!"

Good writers check every sentence with four quick questions. Who or what is it about? What does it do? Does it start with a capital? Does it end with the right mark? If the answer to all four is yes, you have built a complete sentence. Complete sentences are the bricks of all good writing, so it pays to make every one of them strong.`,
      keyIdeas: [
        "A complete sentence has a subject (who or what) and a verb (what it does) and makes a complete thought.",
        "A fragment is a broken piece of a sentence that is missing a subject or a verb.",
        "Every sentence starts with a capital letter and ends with a period, question mark or exclamation mark.",
      ],
      hook: {
        text: "Read this out loud: 'the hungry fox jumped and jumped at the grapes they were too high the fox walked away' Did you run out of breath? Without capital letters and end marks, words pile up like cars in a traffic jam. Today you will learn to build sentences that are complete, clear and easy to read.",
      },
      teach: [
        {
          title: "The subject: who or what",
          teach:
            "Every sentence is about someone or something. That someone or something is called the subject. In 'Peter ran,' the subject is Peter. In 'The old hen clucked,' the subject is hen. To find the subject, ask, 'Who or what is this sentence about?' The subject is usually near the start of the sentence. It can be a person, an animal, a place or a thing.",
          visual: {
            type: "flip",
            cards: [
              { front: "Subject", back: "Who or what the sentence is about: The old hen..." },
              { front: "How to find it", back: "Ask: who or what is this sentence about?" },
              { front: "Where it lives", back: "Usually near the start of the sentence." },
            ],
          },
          probe: {
            type: "cloze",
            text: "In 'The thirsty crow dropped a pebble into the pitcher,' the subject is {0}.",
            blanks: [{ answers: ["crow", "the crow", "the thirsty crow", "thirsty crow"] }],
            bank: ["crow", "pebble", "pitcher", "dropped", "thirsty"],
            hint: "Ask, 'Who or what is doing something in this sentence?' That is the subject.",
            mistakes: [
              { match: "pebble", coach: "The pebble gets dropped, but it isn't doing anything. Who did the dropping?" },
              { match: "pitcher", coach: "The pitcher is where the pebble lands. Who is the sentence about?" },
              { match: "dropped", coach: "'Dropped' is the action, so it is the verb. Who dropped the pebble?" },
              { match: "thirsty", coach: "'Thirsty' describes someone. Which word is it describing? That word is the subject." },
            ],
            seconds: 20,
          },
          think: {
            q: "In 'The little mouse nibbled the rope,' who or what is the sentence about?",
            choices: ["nibbled", "mouse", "rope", "little"],
            answer: 1,
            why: "The sentence is about the mouse; the mouse is the one doing the nibbling.",
            hints: [
              "'Nibbled' is the action, so it is the verb. Ask who did the nibbling.",
              "",
              "The rope is what got nibbled, but it isn't doing anything.",
              "'Little' describes the subject, but it isn't the subject. Which word does it describe?",
            ],
          },
          approaches: {
            analogy:
              "The subject is like the star of a tiny play. Every sentence has a star, and the rest of the words tell what the star does.",
            example:
              "'The lion slept under a tree.' Ask: who or what is this about? The lion. So lion is the subject. 'Slept' is what the lion did, and 'under a tree' tells where.",
            simpler: {
              q: "In 'Birds sing,' which word is the subject?",
              choices: ["Birds", "sing"],
              answer: 0,
              why: "The sentence is about birds; singing is what they do.",
              hints: ["", "'Sing' is what the birds do, so it is the verb. Who is singing?"],
            },
          },
        },
        {
          title: "The verb: what the subject does",
          teach:
            "The verb tells what the subject does. In 'Peter ran,' ran is the verb. Most verbs are action words, like jump, eat, squeak and dig. A few verbs tell what the subject is, like is, are, was and were: 'The hare was fast.' To find the verb, ask, 'What did the subject do?' Without a verb, nothing happens, and a group of words can't be a sentence.",
          visual: {
            type: "compare",
            left: { title: "Action verbs", points: ["jump", "squeeze", "nibble", "chase"] },
            right: { title: "Being verbs", points: ["is", "are", "was", "were"] },
          },
          probe: {
            type: "cloze",
            text: "Add a verb to finish each sentence: 'Peter Rabbit {0} under the gate. Mr. McGregor {1} after him.'",
            blanks: [
              { answers: ["squeezed", "crawled", "wriggled", "slipped", "ran", "hopped", "crept", "scooted", "dashed"] },
              { answers: ["ran", "chased", "hurried", "raced", "rushed", "dashed", "shouted", "yelled"] },
            ],
            bank: ["squeezed", "ran", "gate", "quickly", "under"],
            hint: "A verb is something you can do. What did Peter do at the gate? What did the farmer do next?",
            mistakes: [
              { match: "quickly", coach: "'Quickly' tells how, but it isn't the action itself. Which word is something you can do?" },
              { match: "gate", coach: "A gate is a thing, not an action. Pick a word that tells what someone did." },
              { match: "under", coach: "'Under' tells where. The verb is the action word." },
            ],
            seconds: 25,
          },
          think: {
            q: "Which word is the verb in 'The hare napped under a tree'?",
            choices: ["hare", "under", "napped", "tree"],
            answer: 2,
            why: "'Napped' tells what the hare did.",
            hints: [
              "The hare is who the sentence is about, so it is the subject.",
              "'Under' tells where, not what happened.",
              "",
              "The tree is a place, not an action.",
            ],
          },
          approaches: {
            analogy:
              "If the subject is the star of the play, the verb is what the star does on stage. A star with nothing to do makes a very boring play.",
            example:
              "'The ant carried a seed.' Ask: what did the ant do? It carried. So carried is the verb. Change the verb and you change the picture: 'The ant dropped a seed.'",
            simpler: {
              q: "Which word is an action you can do?",
              choices: ["table", "jump"],
              answer: 1,
              why: "You can jump. A table is a thing.",
              hints: ["A table is a thing you can touch, not something you do.", ""],
            },
          },
        },
        {
          title: "Complete sentence or fragment?",
          teach:
            "A complete sentence needs a subject and a verb, and it must make a complete thought. A fragment is a broken piece. 'The hungry fox' is a fragment: what did the fox do? 'Jumped at the grapes' is a fragment, too: who jumped? Put the pieces together and you get 'The hungry fox jumped at the grapes.' Now the thought is whole. Read your sentence aloud. If it leaves you asking 'who?' or 'what happened?', it is a fragment.",
          visual: {
            type: "compare",
            left: { title: "Fragment", points: ["The hungry fox", "Jumped at the grapes", "Under the tall vine"] },
            right: { title: "Complete sentence", points: ["The hungry fox jumped at the grapes.", "The grapes hung under the tall vine."] },
          },
          probe: {
            type: "sort",
            prompt: "Sort each line: is it a complete sentence or a fragment?",
            buckets: ["Complete sentence", "Fragment"],
            items: [
              { text: "The fox jumped at the grapes.", bucket: 0 },
              { text: "The hungry fox", bucket: 1 },
              { text: "The grapes hung high.", bucket: 0 },
              { text: "Jumped and jumped", bucket: 1 },
              { text: "Under the tall vine", bucket: 1 },
              { text: "The fox walked away.", bucket: 0 },
            ],
            hint: "For each line, ask: who or what is it about, and what did it do? A sentence needs both answers.",
            mistakes: [
              { match: "Put 'The hungry fox' under complete", coach: "We know who, but what did the fox do? There's no verb, so it's a fragment." },
              { match: "Put 'Under the tall vine' under complete", coach: "This tells where, but there is no subject and no verb." },
            ],
            seconds: 40,
          },
          think: {
            q: "Which one is a complete sentence?",
            choices: ["Under the big oak tree", "The lion roared.", "The angry lion", "Ran into the net"],
            answer: 1,
            why: "'The lion roared.' has a subject (lion) and a verb (roared) and makes a complete thought.",
            hints: [
              "This tells where, but who is there and what did they do?",
              "",
              "We know who, but what did the lion do? There is no verb.",
              "We know what happened, but who ran? There is no subject.",
            ],
          },
          approaches: {
            analogy:
              "A fragment is like a sandwich with only one slice of bread. You need both slices, the subject and the verb, to hold the thought together.",
            example:
              "'The little red hen.' Who? The hen. Did what? We don't know, so it's a fragment. Add a verb and finish the thought: 'The little red hen planted the wheat.' Now it's complete.",
            simpler: {
              q: "'The shy mouse' is missing what?",
              choices: ["a subject", "a verb"],
              answer: 1,
              why: "We know who (the mouse), but not what the mouse did.",
              hints: ["'Mouse' is already the subject. What's missing is what the mouse did.", ""],
            },
          },
        },
        {
          title: "Capitals and end marks",
          teach:
            "Every sentence starts with a capital letter. Names get capitals, too: Peter, Aesop, London. The word I is always a capital. Every sentence also ends with an end mark. A period ends a telling sentence. A question mark ends an asking sentence. An exclamation mark shows strong feeling, like surprise or excitement. 'The tortoise won the race.' 'Who won the race?' 'The tortoise won!' The end mark tells the reader how to read your sentence.",
          visual: {
            type: "flip",
            cards: [
              { front: ". Period", back: "Ends a telling sentence: The tortoise won the race." },
              { front: "? Question mark", back: "Ends an asking sentence: Who won the race?" },
              { front: "! Exclamation mark", back: "Shows strong feeling: The tortoise won!" },
              { front: "Capital letter", back: "Starts every sentence, every name, and the word I." },
            ],
          },
          probe: {
            type: "cloze",
            text: "Name the end mark. 'Where did the hare go' needs a {0}. 'The hare fell asleep' needs a {1}. 'Wake up, hare, the tortoise is winning' shouted loudly needs an {2}.",
            blanks: [
              { answers: ["question mark"] },
              { answers: ["period", "full stop"] },
              { answers: ["exclamation mark", "exclamation point"] },
            ],
            bank: ["question mark", "period", "exclamation mark", "comma", "capital letter"],
            hint: "Asking needs one mark, telling needs another, and strong feeling needs a third.",
            mistakes: [
              { match: "comma", coach: "A comma is a little pause inside a sentence. It never ends one." },
              { match: "capital letter", coach: "Capital letters start sentences. Which mark ends one?" },
            ],
            seconds: 30,
          },
          think: {
            q: "Which end mark belongs after 'Can you help me find my shoes'?",
            choices: ["a period", "a question mark", "an exclamation mark"],
            answer: 1,
            why: "The sentence asks something, so it needs a question mark.",
            hints: [
              "A period ends a telling sentence. Is this sentence telling or asking?",
              "",
              "An exclamation mark shows strong feeling. This sentence is asking for something.",
            ],
          },
          approaches: {
            analogy:
              "End marks are like traffic signs for readers. A period says stop, a question mark says wonder, and an exclamation mark says wow!",
            example:
              "'the crow was thirsty' becomes 'The crow was thirsty.' It gets a capital T at the start and a period at the end, because it tells something.",
            simpler: {
              q: "What kind of letter starts every sentence?",
              choices: ["a capital letter", "a small letter"],
              answer: 0,
              why: "Every sentence begins with a capital letter.",
              hints: ["", "Small letters are fine inside a sentence, but the first letter is always a capital."],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap every sentence that is complete and correct, with a capital letter and the right end mark.",
        sentences: [
          "the hare ran fast.",
          "The hare ran fast.",
          "Did the tortoise win?",
          "The slow tortoise",
          "the tortoise won!",
          "The tortoise won!",
        ],
        correct: [1, 2, 5],
      },
      explain: {
        prompt: "Explain to a younger kid how to tell if a group of words is a complete sentence.",
        keyPoints: [
          "It needs a subject: who or what the sentence is about.",
          "It needs a verb: what the subject does.",
          "It must make a complete thought, or it is a fragment.",
          "It starts with a capital letter and ends with a period, question mark or exclamation mark.",
        ],
      },
      mastery: [
        {
          type: "build",
          prompt: "Build a complete sentence. Watch the capital letter and the end mark.",
          tiles: ["The thirsty crow", "dropped", "pebbles", "into the pitcher."],
          distractors: ["the thirsty crow", "into the pitcher?"],
          hint: "Start with a capital letter, then the subject, then the verb. This sentence tells something, so pick the right end mark.",
          mistakes: [
            { match: "Used 'the thirsty crow'", coach: "A sentence must start with a capital letter. Look for the tile with a capital T." },
            { match: "Used 'into the pitcher?'", coach: "This sentence tells something; it doesn't ask. Which end mark goes with a telling sentence?" },
          ],
          seconds: 30,
        },
        {
          type: "cloze",
          text: "Fix the fragments by adding the missing part. '{0} hopped into the garden.' 'Mr. McGregor {1} after him with a rake.'",
          blanks: [
            { answers: ["Peter", "Peter Rabbit", "The rabbit", "A rabbit", "rabbit", "Benjamin"] },
            { answers: ["chased", "ran", "hurried", "raced", "rushed", "dashed"] },
          ],
          bank: ["Peter", "chased", "quickly", "under", "green"],
          hint: "The first fragment is missing who (a subject). The second is missing what he did (a verb).",
          mistakes: [
            { match: "quickly", coach: "'Quickly' tells how, but it isn't an action. What did Mr. McGregor do?" },
            { match: "under", coach: "'Under' tells where. You need a who in the first blank and an action in the second." },
            { match: "green", coach: "'Green' is a color word. It can't be the subject or the verb." },
          ],
          seconds: 30,
        },
        {
          type: "sort",
          prompt: "Sort each line from 'The Lion and the Mouse': complete sentence or fragment?",
          buckets: ["Complete sentence", "Fragment"],
          items: [
            { text: "The mouse chewed the ropes.", bucket: 0 },
            { text: "Chewed the ropes", bucket: 1 },
            { text: "The brave little mouse", bucket: 1 },
            { text: "The lion was free.", bucket: 0 },
            { text: "In the hunter's net", bucket: 1 },
            { text: "The lion roared for help.", bucket: 0 },
          ],
          hint: "Ask two questions for each line: who or what? did what? If either answer is missing, it's a fragment.",
          mistakes: [
            { match: "Put 'Chewed the ropes' under complete", coach: "Who chewed the ropes? There's no subject, so it's a fragment." },
          ],
          seconds: 40,
        },
        {
          type: "highlight",
          prompt: "Tap the sentences that use capital letters correctly.",
          sentences: [
            "peter lost his shoes.",
            "Peter lost his shoes.",
            "Peter and i ran home.",
            "Peter and I ran home.",
            "They lived in england.",
            "Beatrix Potter lived in England.",
          ],
          correct: [1, 3, 5],
          hint: "Check three things: the first word, every name of a person or place, and the word I.",
          mistakes: [
            { match: "Tapped 'Peter and i ran home.'", coach: "The word I is always a capital, even in the middle of a sentence." },
            { match: "Tapped 'They lived in england.'", coach: "England is the name of a place, so it needs a capital E." },
          ],
          seconds: 35,
        },
      ],
      check: [
        {
          q: "In 'The tortoise crawled past the hare,' what is the subject?",
          choices: ["crawled", "tortoise", "hare", "past"],
          answer: 1,
          why: "The sentence is about the tortoise, who is doing the crawling.",
        },
        {
          q: "Which one is a fragment?",
          choices: ["The busy little hen", "The hen baked bread.", "The hen ate the bread."],
          answer: 0,
          why: "'The busy little hen' tells who, but not what she did, so it is not a complete thought.",
        },
        {
          q: "Which end mark belongs after 'Where did Peter hide'?",
          choices: ["a period", "an exclamation mark", "a question mark"],
          answer: 2,
          why: "The sentence asks something, so it ends with a question mark.",
        },
        {
          q: "Which sentence uses capital letters correctly?",
          choices: ["my friend and i read Aesop.", "My friend and I read Aesop.", "My friend and i read aesop."],
          answer: 1,
          why: "The first word, the word I and the name Aesop all need capitals.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Fix these 4 broken lines so each one is a complete, correct sentence. Add a subject or verb if one is missing, and add capitals and end marks.\n1. the hungry fox\n2. jumped over the log\n3. where is my red ball\n4. we won the game\nThen write 3 sentences of your own about an animal you like: one telling sentence, one asking sentence and one exclaiming sentence.",
        rubric: [
          "All four lines are fixed into complete sentences with a subject and a verb.",
          "Every sentence starts with a capital letter, and names and the word I are capitalized.",
          "Each sentence ends with the right mark: period, question mark or exclamation mark.",
          "The three new sentences include one telling, one asking and one exclaiming sentence.",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "writing-45.paragraph",
      title: "Paragraph Power",
      minutes: 30,
      stage: "logic",
      read: `A paragraph is a group of sentences that all talk about one main idea. Think of it as a team: every sentence plays for the same side.

A good paragraph has three parts. First comes the topic sentence. It tells the reader what the whole paragraph is about. "Ants are some of the hardest workers in nature" is a topic sentence. It makes a promise: the rest of the paragraph will show how hard ants work.

Next come the details. Details are sentences that support, or prove, the topic sentence. They give facts, examples and reasons. "Ants can carry food many times heavier than their own bodies." "They work together to build huge underground nests." Each detail keeps the promise. A sentence that wanders off, like "My cousin has a pet hamster," doesn't belong, so a good writer takes it out.

Order words help the reader follow along. Words like first, next, also, then and finally act like stepping stones from one detail to the next.

Last comes the closing sentence. It wraps up the paragraph by saying the main idea again in new words: "Ants may be tiny, but they never stop working." A closing sentence is like the lid on a box. It tells the reader the paragraph is complete.

Aesop told a fable about a busy ant and a grasshopper who sang all summer. When winter came, the ant had food stored away and the grasshopper did not. Like the ant, a good writer plans ahead: topic sentence, details, closing sentence.`,
      keyIdeas: [
        "A paragraph is a group of sentences about one main idea.",
        "The topic sentence states the main idea, and the details support it.",
        "Order words link the details, and a closing sentence wraps up the main idea in new words.",
      ],
      hook: {
        text: "Imagine opening a puzzle box and finding that some of the pieces belong to a different puzzle. Frustrating! A paragraph is like a puzzle box: every sentence should fit the same picture. Today you will learn the three parts that make a paragraph fit together.",
      },
      teach: [
        {
          title: "The topic sentence",
          teach:
            "A paragraph is a group of sentences about one main idea. The topic sentence tells the reader what that idea is, and it usually comes first. 'Ants are some of the hardest workers in nature' is a topic sentence. It makes a promise to the reader: the rest of this paragraph will show how hard ants work. A good topic sentence is clear and gives the reader a reason to keep reading.",
          visual: {
            type: "flip",
            cards: [
              { front: "Topic sentence", back: "Tells the main idea. It usually comes first." },
              { front: "Details", back: "Facts, examples and reasons that support the main idea." },
              { front: "Closing sentence", back: "Wraps up the main idea in new words." },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "Tap the topic sentence of this paragraph.",
            sentences: [
              "Owls are amazing night hunters.",
              "Their big eyes help them see in dim light.",
              "Their soft feathers let them fly almost silently.",
              "Some owls can hear a mouse moving under the snow.",
              "When the sun goes down, owls are ready to hunt.",
            ],
            correct: [0],
            hint: "The topic sentence tells what the WHOLE paragraph is about. The other sentences each give one detail.",
            mistakes: [
              { match: "Tapped 'When the sun goes down, owls are ready to hunt.'", coach: "That one wraps the paragraph up, so it's the closing sentence. Which sentence makes the promise at the start?" },
              { match: "Tapped 'Their big eyes help them see in dim light.'", coach: "That's one detail about owls. Which sentence covers all of the details?" },
            ],
            seconds: 30,
          },
          think: {
            q: "Which sentence would make the best topic sentence for a paragraph about how dogs help people?",
            choices: [
              "Some dogs guide people who cannot see.",
              "Dogs help people in many different ways.",
              "My dog's name is Max.",
              "Some dogs herd sheep.",
            ],
            answer: 1,
            why: "It names the main idea that all the other sentences can support.",
            hints: [
              "This is a good detail, but it only covers one way dogs help.",
              "",
              "This is about one dog's name, not about how dogs help.",
              "This is one detail. A topic sentence covers the whole idea.",
            ],
          },
          approaches: {
            analogy:
              "A topic sentence is like the title on a cereal box. It tells you what's inside before you open it.",
            example:
              "Topic sentence: 'Bees are busy workers.' Every detail after it tells how bees are busy: they visit flowers, carry pollen and make honey. The topic sentence promised it, and the details deliver.",
            simpler: {
              q: "What does a topic sentence tell?",
              choices: ["one tiny detail", "the main idea"],
              answer: 1,
              why: "A topic sentence tells the main idea of the whole paragraph.",
              hints: ["Details come after the topic sentence. The topic sentence is bigger.", ""],
            },
          },
        },
        {
          title: "Details that support",
          teach:
            "After the topic sentence come the details. Details are sentences that support, or prove, the main idea. They give facts, examples and reasons. If the topic sentence says ants are hard workers, a good detail says, 'Ants can carry food many times heavier than their own bodies.' A sentence that wanders off, like 'My cousin has a pet hamster,' doesn't belong. Every detail must play for the same team as the topic sentence.",
          visual: {
            type: "compare",
            left: { title: "Belongs", points: ["Ants carry heavy food.", "Ants build huge nests.", "Ants work together."] },
            right: { title: "Wanders off", points: ["My cousin has a hamster.", "I like pizza.", "Robins sing in the morning."] },
          },
          probe: {
            type: "sort",
            prompt: "Topic sentence: 'Owls are amazing night hunters.' Sort each sentence.",
            buckets: ["Supports the topic", "Does not belong"],
            items: [
              { text: "Owls can see well in dim light.", bucket: 0 },
              { text: "Owls fly almost silently.", bucket: 0 },
              { text: "My aunt likes to bake pies.", bucket: 1 },
              { text: "Owls have sharp claws called talons.", bucket: 0 },
              { text: "Pizza is my favorite food.", bucket: 1 },
              { text: "Robins sing in the morning.", bucket: 1 },
            ],
            hint: "For each sentence, ask: does this help show that owls are amazing night hunters?",
            mistakes: [
              { match: "Put 'Robins sing in the morning.' under supports", coach: "It's about birds, but not owls, and not hunting. It wanders off the topic." },
            ],
            seconds: 40,
          },
          think: {
            q: "Topic: 'Spring is a busy time on a farm.' Which detail belongs?",
            choices: ["Penguins live near the South Pole.", "My favorite color is blue.", "Farmers plant seeds in the fields."],
            answer: 2,
            why: "Planting seeds is farm work in spring, so it supports the topic.",
            hints: [
              "Penguins are interesting, but they have nothing to do with farms in spring.",
              "Your favorite color doesn't show that farms are busy in spring.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Details are like the legs of a table. Each one holds up the tabletop, which is the main idea. A leg from a different table won't help.",
            example:
              "Topic: 'Apples are a great snack.' Detail: 'They are crunchy and sweet.' Detail: 'They fit in your pocket.' Not a detail: 'My brother plays soccer.' That one gets cut.",
            simpler: {
              q: "Topic: 'Cats are good climbers.' Which sentence belongs?",
              choices: ["Cats use sharp claws to grip tree bark.", "I had cereal for breakfast."],
              answer: 0,
              why: "Sharp claws help cats climb, so it supports the topic.",
              hints: ["", "Breakfast has nothing to do with cats climbing."],
            },
          },
        },
        {
          title: "Order words lead the way",
          teach:
            "Order words help the reader walk from one detail to the next. Words like first, next, then, also and finally act like stepping stones across a creek. 'First, the ant finds a crumb. Next, it brings its friends. Finally, they carry it home together.' Without order words, details can feel like a pile of loose stones. With them, the reader always knows where to step next.",
          visual: {
            type: "flip",
            cards: [
              { front: "First", back: "Starts the steps or the first detail." },
              { front: "Next / Then / Also", back: "Moves the reader to the next detail." },
              { front: "Finally", back: "Shows the last step or detail." },
            ],
          },
          probe: {
            type: "sequence",
            prompt: "Put this paragraph about planting a bean seed in order.",
            steps: [
              "Planting a bean seed is easy.",
              "First, fill a cup with soil.",
              "Next, push the seed into the soil.",
              "Then, water it and set it in a sunny window.",
              "Soon, you will have your very own bean plant.",
            ],
            hint: "Start with the topic sentence, follow the order words (first, next, then), and end with the closing sentence.",
            mistakes: [
              { match: "Put 'Soon, you will have your very own bean plant.' first", coach: "That sentence wraps things up. Which sentence tells what the whole paragraph is about?" },
            ],
            seconds: 40,
          },
          think: {
            q: "Which word tells the reader this is the last step?",
            choices: ["First", "Next", "Finally", "Also"],
            answer: 2,
            why: "'Finally' signals the last step or detail.",
            hints: [
              "'First' starts things off. It doesn't signal the end.",
              "'Next' moves to another step, but not the last one.",
              "",
              "'Also' adds one more detail, but doesn't say it's the last.",
            ],
          },
          approaches: {
            analogy:
              "Order words are like the numbers on a recipe card. They tell you what to do first and what to do last, so you don't crack the eggs after the cake is baked.",
            example:
              "Without order words: 'Wash the dog. Dry the dog. Fill the tub.' Confusing! With them: 'First, fill the tub. Next, wash the dog. Finally, dry the dog.' Now it makes sense.",
            simpler: {
              q: "Which word usually starts a list of steps?",
              choices: ["First", "Finally"],
              answer: 0,
              why: "'First' begins the steps.",
              hints: ["", "'Finally' is for the last step, not the first one."],
            },
          },
        },
        {
          title: "The closing sentence",
          teach:
            "A closing sentence wraps up the paragraph. It says the main idea again in new words, so the reader feels the paragraph is complete. Topic sentence: 'Ants are some of the hardest workers in nature.' Closing sentence: 'Ants may be tiny, but they never stop working.' Notice that it doesn't just copy the first sentence word for word. It's like the lid on a box: it closes everything up neatly.",
          visual: {
            type: "compare",
            left: { title: "Topic sentence", points: ["Ants are some of the hardest workers in nature."] },
            right: { title: "Closing sentence", points: ["Ants may be tiny, but they never stop working."] },
          },
          probe: {
            type: "build",
            prompt: "Build a closing sentence for a paragraph about owls as night hunters.",
            tiles: ["When night falls,", "owls become", "the best hunters", "in the woods."],
            distractors: ["at breakfast", "like robins"],
            hint: "A closing sentence says the main idea again: owls are great hunters at night.",
            mistakes: [
              { match: "Used 'at breakfast'", coach: "Owls hunt at night, not at breakfast. Keep the closing sentence on the main idea." },
              { match: "Used 'like robins'", coach: "Robins aren't night hunters. The closing sentence should stay on owls." },
            ],
            seconds: 30,
          },
          think: {
            q: "Which is the best closing sentence for a paragraph about why exercise is good for you?",
            choices: [
              "Some people like to swim.",
              "Exercise keeps your body and mind strong, so get moving!",
              "I have a red bike.",
            ],
            answer: 1,
            why: "It repeats the main idea, that exercise is good for you, in new words.",
            hints: [
              "This is one small detail, not a wrap-up of the whole idea.",
              "",
              "A red bike doesn't wrap up why exercise is good for you.",
            ],
          },
          approaches: {
            analogy:
              "A closing sentence is like saying goodbye at the end of a visit. It lets your guest know the visit is over, and it reminds them why they came.",
            example:
              "Topic: 'Bees are busy workers.' Closing: 'From morning to evening, bees never stop buzzing about their work.' Same main idea, new words.",
            simpler: {
              q: "Where does the closing sentence go?",
              choices: ["at the end of the paragraph", "at the start of the paragraph"],
              answer: 0,
              why: "The closing sentence wraps up the paragraph, so it comes last.",
              hints: ["", "The start is where the topic sentence goes."],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each sentence from this paragraph about honeybees.",
        buckets: ["Topic sentence", "Detail", "Closing sentence"],
        items: [
          { text: "Honeybees are busy helpers in a garden.", bucket: 0 },
          { text: "They carry pollen from flower to flower.", bucket: 1 },
          { text: "This helps plants make fruit and seeds.", bucket: 1 },
          { text: "They also make sweet honey.", bucket: 1 },
          { text: "A garden would not be the same without its hardworking bees.", bucket: 2 },
        ],
      },
      explain: {
        prompt: "Explain to a friend how to build a strong paragraph.",
        keyPoints: [
          "Start with a topic sentence that tells the main idea.",
          "Add details (facts, examples or reasons) that support the main idea.",
          "Take out sentences that don't belong, and use order words to link details.",
          "End with a closing sentence that says the main idea again in new words.",
        ],
      },
      mastery: [
        {
          type: "highlight",
          prompt: "Tap the sentence that does NOT belong in this paragraph.",
          sentences: [
            "Beavers are skilled builders.",
            "They cut down trees with their strong teeth.",
            "They pile up sticks and mud to make dams.",
            "My brother likes to play checkers.",
            "Beavers build cozy homes called lodges.",
            "Few animals change the land the way beavers do.",
          ],
          correct: [3],
          hint: "Every sentence should help show that beavers are skilled builders. Which one wanders off?",
          seconds: 30,
        },
        {
          type: "cloze",
          text: "Add order words: '{0}, mix the flour and water. {1}, knead the dough. {2}, bake the bread until it is golden.'",
          blanks: [
            { answers: ["First"] },
            { answers: ["Next", "Then", "Second"] },
            { answers: ["Finally", "Last", "Lastly"] },
          ],
          bank: ["First", "Next", "Finally", "Because", "Yesterday"],
          hint: "One word starts the steps, one moves to the middle step, and one shows the last step.",
          mistakes: [
            { match: "Because", coach: "'Because' gives a reason. It doesn't show which step comes when." },
            { match: "Yesterday", coach: "'Yesterday' tells when something happened, not the order of steps." },
          ],
          seconds: 30,
        },
        {
          type: "sequence",
          prompt: "Put this paragraph about the Little Red Hen in order: topic sentence, details, closing sentence.",
          steps: [
            "The little red hen was a hard worker.",
            "First, she planted the wheat.",
            "Next, she cut it and took it to the mill.",
            "Then, she baked the flour into bread.",
            "In the end, the hardworking hen enjoyed every bite.",
          ],
          hint: "Find the sentence that tells the main idea, then follow the order words to the wrap-up.",
          seconds: 40,
        },
        {
          type: "build",
          prompt: "Build a topic sentence for a paragraph about why dogs make good pets.",
          tiles: ["Dogs", "make", "loyal and", "friendly pets."],
          distractors: ["My cat", "sleeps."],
          hint: "A topic sentence names the main idea: dogs, and why they make good pets.",
          mistakes: [
            { match: "Used 'My cat'", coach: "The paragraph is about dogs. Start with the right animal." },
            { match: "Used 'sleeps.'", coach: "Sleeping doesn't tell why dogs make good pets." },
          ],
          seconds: 25,
        },
      ],
      check: [
        {
          q: "What does a topic sentence do?",
          choices: ["It tells the main idea of the paragraph.", "It gives one small detail.", "It ends the paragraph."],
          answer: 0,
          why: "The topic sentence states the main idea that the rest of the paragraph supports.",
        },
        {
          q: "Topic: 'Owls are amazing night hunters.' Which sentence does NOT belong?",
          choices: ["Owls fly almost silently.", "Owls can see in dim light.", "I like to eat cereal."],
          answer: 2,
          why: "Cereal has nothing to do with owls hunting at night, so it wanders off the topic.",
        },
        {
          q: "Which word is an order word?",
          choices: ["happy", "next", "owl", "green"],
          answer: 1,
          why: "'Next' moves the reader from one step or detail to another.",
        },
        {
          q: "What should a closing sentence do?",
          choices: [
            "Start a brand-new topic.",
            "Copy the topic sentence word for word.",
            "Say the main idea again in new words.",
          ],
          answer: 2,
          why: "A closing sentence wraps up the main idea, using fresh words.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Write one paragraph (5-7 sentences) about an animal you find amazing, or about how to do something you're good at, like making a sandwich or caring for a pet. Start with a topic sentence, add at least three details, use at least two order words (first, next, also, then, finally), and end with a closing sentence.",
        rubric: [
          "Begins with a clear topic sentence that tells the main idea.",
          "Has at least three details that all support the main idea, with nothing off-topic.",
          "Uses at least two order words to connect the details.",
          "Ends with a closing sentence that says the main idea again in new words, and every sentence has a capital and an end mark.",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "writing-45.senses",
      title: "Painting with Words",
      minutes: 30,
      stage: "rhetoric",
      read: `Good writers don't just tell readers what happened. They help readers see it, hear it and almost taste it. They do it with sensory details: words that tell what something looks, sounds, smells, feels and tastes like.

Compare these two sentences. "The garden was nice." "The garden smelled of warm earth, and fat red radishes poked out of the rows." The first one tells. The second one shows. Beatrix Potter did this in The Tale of Peter Rabbit. Peter doesn't just eat food in Mr. McGregor's garden. He eats lettuces, French beans and radishes. We can picture every bite.

Sight is the sense writers use most. Tell the color, size and shape of things: a tiny brown mouse, a tall gray tower. Sound brings a scene to life: the creak of a gate, the crunch of leaves, the buzz of a bee. Smell is powerful, because smells bring back memories: fresh bread, wet dogs, pine trees.

Touch tells how things feel: rough bark, a soft blanket, icy water. Taste is perfect for food scenes: sour lemons, salty pretzels, sweet ripe strawberries.

You can also compare. A simile compares two things using the word "like" or "as": "The snow was as soft as a pillow." "The thunder rumbled like a giant's tummy." Comparisons help the reader picture something new by thinking of something they already know.

You don't need all five senses in every sentence. Pick the details that matter most, and choose exact words. A painter picks colors with care. A writer picks words the same way.`,
      keyIdeas: [
        "Sensory details tell what things look, sound, smell, feel and taste like.",
        "Showing with details paints a picture; telling with words like 'nice' does not.",
        "A simile compares two things using 'like' or 'as' to help the reader picture something.",
      ],
      hook: {
        text: "Close your eyes and listen: 'The kitchen was nice.' Can you see anything? Now try this: 'Warm bread steamed on the counter, and cinnamon filled the air.' Did your nose twitch? Today you will learn to paint pictures with words, so your readers can see, hear and smell your writing.",
      },
      teach: [
        {
          title: "Show, don't just tell",
          teach:
            "Telling says, 'The garden was nice.' Showing paints it: 'Fat red radishes poked out of the warm, dark soil.' Showing uses sensory details, words about what we see, hear, smell, touch and taste. Beatrix Potter shows us Peter Rabbit's feast. He doesn't just eat food; he eats lettuces, French beans and radishes. When you write, ask yourself: what would I notice if I were standing right there?",
          visual: {
            type: "hotspots",
            title: "The five senses",
            center: "Sensory details",
            spots: [
              { label: "See", icon: "👀", detail: "Colors, sizes and shapes: a tiny brown mouse." },
              { label: "Hear", icon: "👂", detail: "Sounds: the creak of a gate, the buzz of a bee." },
              { label: "Smell", icon: "👃", detail: "Smells: fresh bread, pine trees, rain." },
              { label: "Touch", icon: "✋", detail: "How things feel: rough bark, icy water." },
              { label: "Taste", icon: "👅", detail: "Flavors: sour lemons, salty pretzels." },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "Tap the sentences that SHOW with sensory details instead of just telling.",
            sentences: [
              "The cake was good.",
              "The warm chocolate cake smelled sweet.",
              "The day was nice.",
              "Cold rain drummed on the tin roof.",
              "The dog was cute.",
            ],
            correct: [1, 3],
            hint: "Look for sentences where you can see, hear, smell, feel or taste something. Words like 'good' and 'nice' only tell.",
            mistakes: [
              { match: "Tapped 'The cake was good.'", coach: "'Good' tells, but what does the cake smell or taste like? There are no sense details." },
              { match: "Tapped 'The dog was cute.'", coach: "'Cute' tells. Showing would say what the dog looks like or does." },
            ],
            seconds: 30,
          },
          think: {
            q: "Which sentence shows instead of tells?",
            choices: ["The beach was fun.", "It was a great day.", "Waves crashed, and the hot sand burned my toes."],
            answer: 2,
            why: "You can hear the waves and feel the hot sand. That's showing.",
            hints: [
              "'Fun' tells us how the writer felt, but we can't see or hear anything.",
              "'Great' is a telling word. What would you see or hear at the beach?",
              "",
            ],
          },
          approaches: {
            analogy:
              "Telling is like saying 'I saw a pretty sunset.' Showing is like handing someone the photo. Sensory details are the photo.",
            example:
              "Telling: 'Lunch was yummy.' Showing: 'My grilled cheese crunched, and warm cheese stretched in long strings.' Now the reader can almost taste it.",
            simpler: {
              q: "Which sentence lets you picture something?",
              choices: ["The apple was nice.", "The apple was shiny and red."],
              answer: 1,
              why: "'Shiny and red' tells what the apple looks like.",
              hints: ["'Nice' doesn't show you anything about the apple.", ""],
            },
          },
        },
        {
          title: "Sight and sound",
          teach:
            "Sight is the sense writers use most. Tell the color, size and shape of things: a tiny brown mouse, a tall stone tower, a round orange moon. Sound makes a scene come alive. Try words that sound like the noise they name: the creak of a gate, the crunch of leaves, the buzz of a bee, the splash of a frog. Sound words help the reader hear your story, not just read it.",
          visual: {
            type: "compare",
            left: { title: "Sight words", points: ["tiny brown mouse", "tall stone tower", "round orange moon"] },
            right: { title: "Sound words", points: ["creak", "crunch", "buzz", "splash"] },
          },
          probe: {
            type: "cloze",
            text: "Add sound words: 'A bee {0} past my ear. Dry leaves {1} under my boots. A frog landed in the pond with a {2}.'",
            blanks: [
              { answers: ["buzzed", "zoomed", "zipped", "hummed", "droned", "zinged"] },
              { answers: ["crunched", "crackled", "crinkled", "rustled", "crumpled"] },
              { answers: ["splash", "plop", "plunk", "splish", "kerplunk"] },
            ],
            bank: ["buzzed", "crunched", "splash", "went", "moved", "thing"],
            hint: "Pick words that sound like the noise they name. Say them out loud!",
            mistakes: [
              { match: "went", coach: "'Went' tells us the bee moved, but we can't hear it. What noise does a bee make?" },
              { match: "moved", coach: "'Moved' is quiet and plain. What sound do dry leaves make when you step on them?" },
              { match: "thing", coach: "'Thing' doesn't make a sound at all. What noise does a frog make hitting the water?" },
            ],
            seconds: 30,
          },
          think: {
            q: "Which word helps you HEAR the scene?",
            choices: ["blue", "crunch", "tall", "round"],
            answer: 1,
            why: "'Crunch' sounds like the noise it names.",
            hints: [
              "'Blue' is a color. You see it, not hear it.",
              "",
              "'Tall' tells size, which you see.",
              "'Round' tells shape, which you see.",
            ],
          },
          approaches: {
            analogy:
              "Sight and sound words are like turning on the lights and the radio in a dark, quiet room. Suddenly the reader can see and hear what's going on.",
            example:
              "Plain: 'A bird was in the tree.' With sight and sound: 'A small red cardinal whistled from the top of the bare oak.' Now you can see it and hear it.",
            simpler: {
              q: "Which word is a sound?",
              choices: ["buzz", "green"],
              answer: 0,
              why: "'Buzz' is the sound a bee makes.",
              hints: ["", "'Green' is a color you see, not a sound you hear."],
            },
          },
        },
        {
          title: "Smell, touch and taste",
          teach:
            "Smell, touch and taste pull a reader right into a scene. Smells bring back memories: fresh bread, pine trees, a campfire. Touch tells how things feel: rough bark, a fuzzy peach, icy water. Taste is perfect for food: sour lemons, salty pretzels, sweet ripe strawberries. In Aesop's fable, a fox can't reach some grapes, so he says they must be sour. One taste word tells us exactly how he feels.",
          visual: {
            type: "flip",
            cards: [
              { front: "Smell", back: "fresh bread, pine trees, a campfire" },
              { front: "Touch", back: "rough bark, a fuzzy peach, icy water" },
              { front: "Taste", back: "sour lemons, salty pretzels, sweet strawberries" },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each detail to the sense it uses.",
            pairs: [
              { left: "rough tree bark", right: "touch" },
              { left: "a sour lemon", right: "taste" },
              { left: "the scent of pine trees", right: "smell" },
              { left: "a dog barking", right: "hearing" },
              { left: "a bright red barn", right: "sight" },
            ],
            hint: "For each detail, ask: would I notice this with my fingers, tongue, nose, ears or eyes?",
            mistakes: [
              { match: "Matched 'the scent of pine trees' with sight", coach: "A scent is something your nose notices, not your eyes." },
            ],
            seconds: 35,
          },
          think: {
            q: "'The kitten's fur was as soft as cotton.' Which sense is this?",
            choices: ["taste", "touch", "smell"],
            answer: 1,
            why: "Soft is how something feels, so it's touch.",
            hints: [
              "You wouldn't taste a kitten! How do you know it's soft?",
              "",
              "Soft isn't a smell. You'd notice it with your hands.",
            ],
          },
          approaches: {
            analogy:
              "Sight is the front door into a scene, but smell, touch and taste are secret side doors. Readers love to sneak in through them.",
            example:
              "Sight only: 'There was soup on the stove.' With more senses: 'Chicken soup bubbled on the stove, and the salty steam warmed my cold cheeks.' Smell, taste and touch all join in.",
            simpler: {
              q: "Which sense tells you a lemon is sour?",
              choices: ["taste", "hearing"],
              answer: 0,
              why: "You taste sourness with your tongue.",
              hints: ["", "A lemon doesn't make a sound. How would you know it's sour?"],
            },
          },
        },
        {
          title: "Comparisons that paint pictures",
          teach:
            "Sometimes the best way to describe something is to compare it to something else. A simile compares two things using the word like or as. 'The snow was as soft as a pillow.' 'The thunder rumbled like a giant's tummy.' Your reader already knows a pillow and a rumbling tummy, so now they can picture the snow and hear the thunder. Choose comparisons that fit the feeling you want.",
          visual: {
            type: "flip",
            cards: [
              { front: "as soft as...", back: "The snow was as soft as a pillow." },
              { front: "like...", back: "The thunder rumbled like a giant's tummy." },
              { front: "Your turn", back: "The moon glowed like a ____." },
            ],
          },
          probe: {
            type: "build",
            prompt: "Build a simile about the night sky.",
            tiles: ["The stars", "sparkled", "like", "tiny diamonds", "on black velvet."],
            distractors: ["was nice", "some stuff"],
            hint: "A simile uses 'like' or 'as' to compare. What could twinkling stars look like?",
            mistakes: [
              { match: "Used 'was nice'", coach: "'Nice' only tells. A simile shows by comparing the stars to something else." },
              { match: "Used 'some stuff'", coach: "'Stuff' is too vague to picture. Pick the comparison the reader can see." },
            ],
            seconds: 30,
          },
          think: {
            q: "Which sentence is a simile?",
            choices: ["The moon is bright.", "The moon glowed like a lantern.", "I saw the moon."],
            answer: 1,
            why: "It compares the moon to a lantern using 'like.'",
            hints: [
              "This describes the moon, but it doesn't compare it to anything.",
              "",
              "This tells what happened, but there's no comparison.",
            ],
          },
          approaches: {
            analogy:
              "A simile is like a bridge. It connects something new to something the reader already knows, so they can walk across and picture it.",
            example:
              "Plain: 'The puppy was fast.' Simile: 'The puppy shot across the yard like a rocket.' The reader knows how fast a rocket is, so now they can picture the puppy.",
            simpler: {
              q: "Which word often starts a simile's comparison?",
              choices: ["like", "the"],
              answer: 0,
              why: "Similes use 'like' or 'as' to compare.",
              hints: ["", "'The' appears in lots of sentences, but it doesn't make a comparison."],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each detail by the sense it uses.",
        buckets: ["See", "Hear", "Smell", "Touch", "Taste"],
        items: [
          { text: "a tall gray tower", bucket: 0 },
          { text: "a round orange moon", bucket: 0 },
          { text: "the creak of a gate", bucket: 1 },
          { text: "a bee's buzz", bucket: 1 },
          { text: "fresh bread baking", bucket: 2 },
          { text: "smoke from a campfire", bucket: 2 },
          { text: "a fuzzy peach skin", bucket: 3 },
          { text: "icy pond water", bucket: 3 },
          { text: "a salty pretzel", bucket: 4 },
          { text: "sweet ripe strawberries", bucket: 4 },
        ],
      },
      explain: {
        prompt: "Explain to a younger kid how to make their writing feel real to a reader.",
        keyPoints: [
          "Show with details instead of telling with words like nice or good.",
          "Use the five senses: what you see, hear, smell, touch and taste.",
          "Use a simile with like or as to compare something new to something the reader knows.",
          "Choose exact words that fit the picture you want.",
        ],
      },
      mastery: [
        {
          type: "match",
          prompt: "Match each telling sentence to a showing sentence.",
          pairs: [
            { left: "The soup was hot.", right: "Steam curled up from my bowl of soup." },
            { left: "The room was messy.", right: "Socks and books covered every inch of the floor." },
            { left: "The dog was happy.", right: "The dog wagged its tail and licked my nose." },
            { left: "It was cold outside.", right: "Frost sparkled on the windows, and my breath made little clouds." },
          ],
          hint: "For each telling sentence, find the showing sentence that paints that same idea with details.",
          mistakes: [
            { match: "Matched 'It was cold outside.' with the soup", coach: "Steam from soup shows heat, not cold. Which sentence has frost in it?" },
          ],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "Finish the similes: 'The ice was as cold as {0}.' 'The puppy ran as fast as {1}.'",
          blanks: [
            { answers: ["snow", "a snowball", "frost", "an icicle", "winter", "a glacier"] },
            { answers: ["the wind", "wind", "a rocket", "lightning", "a cheetah", "a race car"] },
          ],
          bank: ["snow", "the wind", "soup", "a sofa"],
          hint: "Compare each one to something your reader already knows is very cold or very fast.",
          mistakes: [
            { match: "soup", coach: "Soup is usually hot! Pick something famous for being cold." },
            { match: "a sofa", coach: "A sofa doesn't move at all. Pick something famous for being fast." },
          ],
          seconds: 25,
        },
        {
          type: "highlight",
          prompt: "Tap the sentences that use a sense OTHER than sight.",
          sentences: [
            "The church bell clanged.",
            "The barn was red.",
            "The bread smelled warm and yeasty.",
            "The tree was tall.",
            "The pond water felt icy on my toes.",
          ],
          correct: [0, 2, 4],
          hint: "Look for sounds, smells, feelings and tastes. Colors and sizes are things you see.",
          mistakes: [
            { match: "Tapped 'The barn was red.'", coach: "Red is a color, and colors are seen. Look for hearing, smell, touch or taste." },
          ],
          seconds: 30,
        },
        {
          type: "build",
          prompt: "Build a sentence that helps the reader hear and feel a storm.",
          tiles: ["Thunder", "shook", "the windows,", "and cold rain", "stung my face."],
          distractors: ["was bad", "a thing"],
          hint: "Choose tiles the reader can hear and feel, and skip the ones that only tell.",
          mistakes: [
            { match: "Used 'was bad'", coach: "'Bad' tells, but doesn't show. What did the thunder do?" },
            { match: "Used 'a thing'", coach: "'A thing' is too vague to picture. Keep the details you can hear and feel." },
          ],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "Which detail uses the sense of smell?",
          choices: ["a rough rock", "fresh cookies baking", "a loud drum", "a tall tree"],
          answer: 1,
          why: "You smell cookies baking with your nose.",
        },
        {
          q: "Which sentence SHOWS instead of telling?",
          choices: ["The puppy was cute.", "The party was fun.", "The puppy's floppy ears flapped as it ran."],
          answer: 2,
          why: "You can picture the floppy ears flapping. The others just tell.",
        },
        {
          q: "What does a simile do?",
          choices: [
            "It compares two things using 'like' or 'as.'",
            "It ends a sentence with a question mark.",
            "It lists the steps in order.",
          ],
          answer: 0,
          why: "A simile compares two things with 'like' or 'as,' such as 'soft as a pillow.'",
        },
        {
          q: "Which word helps the reader HEAR something?",
          choices: ["sparkle", "sticky", "creak", "purple"],
          answer: 2,
          why: "'Creak' names a sound, like an old door opening.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Pick a place you know well: your kitchen, a garden, a park, or a beach. Write a paragraph of 5-7 sentences describing it so a reader feels like they are standing there. Use all five senses (see, hear, smell, touch, taste) at least once, and include one simile using 'like' or 'as.' Don't use the words nice, good or fun.",
        rubric: [
          "Describes one real place in 5-7 complete sentences.",
          "Uses all five senses at least once, with specific details.",
          "Includes at least one simile using 'like' or 'as.'",
          "Shows instead of tells, avoiding vague words like nice, good and fun.",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "writing-45.story",
      title: "Story Building",
      minutes: 35,
      stage: "rhetoric",
      read: `Every good story is built from a few strong parts. Once you know them, you can build stories of your own.

First, a story needs characters: the people or animals the story is about. The main character is the one we follow and care about. In The Tale of Peter Rabbit, by Beatrix Potter, the main character is Peter. In The Three Little Pigs, the main characters are the pigs. Good characters want something. Peter wants the tasty vegetables in Mr. McGregor's garden.

A story also needs a setting: where and when it happens. A garden, a forest, a castle, long ago.

Most important of all, a story needs a problem. The problem is the trouble the character must face. Without a problem, nothing happens. Peter gets chased by Mr. McGregor and can't find his way out of the garden. The pigs must stay safe from a hungry wolf. Problems make readers worry, and worry keeps them reading.

Stories move in three parts. The beginning introduces the characters, the setting and what the character wants. The middle is where the problem grows and the character tries to solve it. Peter loses his shoes, gets caught in a net and hides in a watering can. The end shows how the problem is solved. Peter escapes under the gate and runs home, tired, to his mother.

Many stories also teach a lesson. In Aesop's fable of the lion and the mouse, a tiny mouse frees a mighty lion from a hunter's net by chewing through the ropes. The lesson: even the small can help the great.

When you plan a story, ask four questions. Who is it about? What do they want? What gets in the way? How does it end?`,
      keyIdeas: [
        "A story needs characters, a setting and a problem.",
        "Good characters want something, and the problem gets in the way.",
        "Stories move from beginning to middle to end, and the end solves the problem.",
      ],
      hook: {
        text: "Here is a story: a rabbit eats lunch and goes home. The end. Boring, right? Now try this: a rabbit sneaks into a garden he was told never to enter, and the farmer spots him! Suddenly you want to know what happens next. Today you will learn the secret parts inside every great story.",
      },
      teach: [
        {
          title: "Characters who want something",
          teach:
            "Characters are the people or animals a story is about. The main character is the one we follow and care about. In The Tale of Peter Rabbit, the main character is Peter. The best characters want something, and that want drives the story. Peter wants the tasty vegetables in Mr. McGregor's garden. The tortoise wants to win the race. When you meet a character, ask: what do they want?",
          visual: {
            type: "flip",
            cards: [
              { front: "Peter Rabbit", back: "Wants the vegetables in Mr. McGregor's garden." },
              { front: "The tortoise", back: "Wants to win the race against the hare." },
              { front: "The little red hen", back: "Wants to turn her wheat into bread." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each character to what they want.",
            pairs: [
              { left: "Peter Rabbit", right: "to eat vegetables in Mr. McGregor's garden" },
              { left: "the tortoise", right: "to win the race against the hare" },
              { left: "the fox", right: "to reach the grapes hanging high on the vine" },
              { left: "the thirsty crow", right: "to drink the water at the bottom of a pitcher" },
            ],
            hint: "Think about each story: what is each character trying to get or do?",
            mistakes: [
              { match: "Matched the fox with the pitcher", coach: "The fox was jumping for something on a vine. Who needed water?" },
            ],
            seconds: 35,
          },
          think: {
            q: "In 'The Tortoise and the Hare,' what does the tortoise want?",
            choices: ["to sleep under a tree", "to win the race", "to eat grapes"],
            answer: 1,
            why: "The tortoise wants to win the race against the speedy hare.",
            hints: ["That's what the hare does, not what the tortoise wants.", "", "That's the fox in a different fable."],
          },
          approaches: {
            analogy:
              "A character's want is like the engine in a car. Without it, the car just sits in the driveway and the story goes nowhere.",
            example:
              "Character: a girl named Rosa. Want: she wants to win the county fair's pie contest. Now the reader wonders: will she win? That want pulls the whole story forward.",
            simpler: {
              q: "Who is the main character in The Tale of Peter Rabbit?",
              choices: ["Mr. McGregor", "Peter"],
              answer: 1,
              why: "The story follows Peter, so he is the main character.",
              hints: ["Mr. McGregor is in the story, but we follow Peter's adventure.", ""],
            },
          },
        },
        {
          title: "Every story needs a problem",
          teach:
            "The problem is the trouble the main character must face. Without a problem, nothing happens. 'A rabbit ate lunch and went home' is not much of a story! But Peter Rabbit gets chased by Mr. McGregor and can't find the way out of the garden. Now we're worried, and worry keeps us reading. The problem is usually something that gets in the way of what the character wants.",
          visual: {
            type: "compare",
            left: { title: "No problem", points: ["A rabbit ate lunch.", "He went home.", "The end."] },
            right: { title: "A problem!", points: ["A rabbit sneaks into a garden.", "The farmer chases him.", "He can't find the gate!"] },
          },
          probe: {
            type: "highlight",
            prompt: "Tap the sentence that tells the PROBLEM in this fable.",
            sentences: [
              "A thirsty crow flew over a dry field.",
              "At last he found a pitcher with a little water in it.",
              "But the water was too low for his beak to reach.",
              "He dropped pebbles in, one by one.",
              "The water rose, and the crow drank.",
            ],
            correct: [2],
            hint: "The problem is what gets in the way of what the crow wants. What stopped him from drinking?",
            mistakes: [
              { match: "Tapped 'He dropped pebbles in, one by one.'", coach: "That's how the crow SOLVES the problem. What was the trouble before that?" },
            ],
            seconds: 25,
          },
          think: {
            q: "Which of these is a story problem?",
            choices: ["A girl eats breakfast.", "The sky is blue.", "A boy's kite gets stuck high in a tree."],
            answer: 2,
            why: "A stuck kite is trouble the character has to solve.",
            hints: [
              "Eating breakfast is normal. Nothing gets in the way.",
              "That's a description, not trouble for a character.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A problem in a story is like a wall in a maze. It blocks the way, and the fun is watching the character find a way around it.",
            example:
              "Character: a farmer. Want: to get his pumpkin to the fair. Problem: his wagon wheel breaks on the way. Now we keep reading to see how he fixes it.",
            simpler: {
              q: "What is a story problem?",
              choices: ["trouble the character must face", "the name of the story"],
              answer: 0,
              why: "A problem is the trouble that gets in the character's way.",
              hints: ["", "The name is the title. A problem is the trouble in the story."],
            },
          },
        },
        {
          title: "Beginning, middle and end",
          teach:
            "Stories move in three parts. The beginning introduces the characters, the setting and what the character wants. The middle is where the problem grows, and the character tries to fix it, sometimes more than once. The end shows how the problem is solved. In Peter Rabbit, the beginning is Peter squeezing under the garden gate. The middle is the chase. The end is Peter safe at home, tired, in bed.",
          visual: {
            type: "flip",
            cards: [
              { front: "Beginning", back: "Meet the characters, the setting and what they want." },
              { front: "Middle", back: "The problem grows, and the character tries to fix it." },
              { front: "End", back: "The problem is solved." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Sort these parts of 'The Three Little Pigs' into beginning, middle and end.",
            buckets: ["Beginning", "Middle", "End"],
            items: [
              { text: "Three little pigs leave home to build their own houses.", bucket: 0 },
              { text: "One pig builds with straw, one with sticks and one with bricks.", bucket: 0 },
              { text: "The wolf blows down the straw house.", bucket: 1 },
              { text: "The wolf blows down the stick house.", bucket: 1 },
              { text: "The pigs are safe at last inside the strong brick house.", bucket: 2 },
            ],
            hint: "The beginning sets things up, the middle is where the trouble happens, and the end solves it.",
            mistakes: [
              { match: "Put the safe brick house in the middle", coach: "Being safe at last solves the problem, so it belongs at the end." },
            ],
            seconds: 40,
          },
          think: {
            q: "Where does a story usually show how the problem is solved?",
            choices: ["the beginning", "the middle", "the end"],
            answer: 2,
            why: "The end is where the problem gets solved.",
            hints: [
              "The beginning sets up the characters and what they want.",
              "The middle is where the problem grows and the character keeps trying.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A story is like a bridge across a river. The beginning is getting on, the middle is crossing over the rushing water, and the end is stepping safely onto the other side.",
            example:
              "Beginning: Sam wants to bake Grandpa a birthday cake. Middle: he forgets the sugar, then the oven won't light. End: Mom helps him fix the oven, and Grandpa loves the cake.",
            simpler: {
              q: "Which part of a story comes first?",
              choices: ["the beginning", "the end"],
              answer: 0,
              why: "The beginning comes first and introduces the characters.",
              hints: ["", "The end comes last, after the problem is solved."],
            },
          },
        },
        {
          title: "A strong ending",
          teach:
            "A good ending solves the problem in a way that makes sense. In Aesop's fable, a lion lets a tiny mouse go free. Later, the lion is caught in a hunter's net. The mouse chews through the ropes and sets him free. The ending works because the lion's kindness at the beginning comes back to help him. Many fables also end with a lesson: even the small can help the great.",
          visual: {
            type: "compare",
            left: { title: "Weak ending", points: ["Then I woke up.", "A wizard fixed everything.", "And then it just stopped."] },
            right: { title: "Strong ending", points: ["The character solves the problem.", "It connects to the beginning.", "It may teach a lesson."] },
          },
          probe: {
            type: "sequence",
            prompt: "Put 'The Lion and the Mouse' in order.",
            steps: [
              "A lion catches a tiny mouse.",
              "The mouse begs, and the lion lets him go.",
              "Later, the lion is trapped in a hunter's net.",
              "The mouse chews through the ropes.",
              "The lion is free, thanks to his tiny friend.",
            ],
            hint: "Beginning: the lion and mouse meet. Middle: the lion gets in trouble. End: the problem is solved.",
            mistakes: [
              { match: "Put the ropes before the net", coach: "The mouse can't chew the ropes until the lion is caught in them." },
            ],
            seconds: 40,
          },
          think: {
            q: "Which is the best ending for a story about a girl whose kite is stuck in a tree?",
            choices: [
              "She asks her grandpa for a ladder, and together they rescue the kite.",
              "She goes inside and eats lunch.",
              "Suddenly the story just stops.",
            ],
            answer: 0,
            why: "It solves the kite problem in a way that makes sense.",
            hints: [
              "",
              "Eating lunch doesn't solve the problem. The kite is still stuck!",
              "Stopping suddenly leaves the problem unsolved, and the reader feels cheated.",
            ],
          },
          approaches: {
            analogy:
              "A good ending is like the last piece of a puzzle. It fits exactly into the space the problem left open.",
            example:
              "Problem: the crow can't reach the water. Ending: he drops in pebbles until the water rises, and he drinks. The ending fits the problem perfectly, and the lesson is: a clever idea can beat a hard problem.",
            simpler: {
              q: "What should a good ending do?",
              choices: ["start a new problem", "solve the problem"],
              answer: 1,
              why: "A good ending solves the story's problem.",
              hints: ["A new problem at the very end leaves the reader hanging.", ""],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put The Tale of Peter Rabbit in order.",
        steps: [
          "Peter's mother tells him not to go into Mr. McGregor's garden.",
          "Peter squeezes under the gate and eats vegetables.",
          "Mr. McGregor sees Peter and chases him.",
          "Peter hides in a watering can in the tool shed.",
          "Peter escapes under the gate and runs home.",
        ],
      },
      explain: {
        prompt: "Explain to a friend the parts you need to build a good story.",
        keyPoints: [
          "Characters, especially a main character who wants something.",
          "A setting: where and when the story happens.",
          "A problem that gets in the character's way.",
          "A beginning, a middle where the problem grows, and an end that solves it.",
        ],
      },
      mastery: [
        {
          type: "match",
          prompt: "Match each story part to what it means.",
          pairs: [
            { left: "character", right: "who the story is about" },
            { left: "setting", right: "where and when it happens" },
            { left: "problem", right: "the trouble the character must face" },
            { left: "ending", right: "how the problem gets solved" },
          ],
          hint: "Think of Peter Rabbit: Peter, the garden, the chase and getting home safe.",
          seconds: 30,
        },
        {
          type: "cloze",
          text: "In 'The Fox and the Grapes,' the main character is the {0}. He wants the {1}, but they hang too high. That is the story's {2}.",
          blanks: [{ answers: ["fox"] }, { answers: ["grapes"] }, { answers: ["problem"] }],
          bank: ["fox", "grapes", "problem", "setting", "crow", "apples"],
          hint: "Who is the story about, what does he want, and what do we call the trouble that gets in the way?",
          mistakes: [
            { match: "crow", coach: "The crow is in a different fable. This one is named after its main character." },
            { match: "apples", coach: "Look at the fable's title. What fruit did the fox want?" },
            { match: "setting", coach: "The setting is where the story happens. Grapes hanging too high is the trouble." },
          ],
          seconds: 30,
        },
        {
          type: "sort",
          prompt: "Sort these parts of 'Goldilocks and the Three Bears' into beginning, middle and end.",
          buckets: ["Beginning", "Middle", "End"],
          items: [
            { text: "Three bears go for a walk while their porridge cools.", bucket: 0 },
            { text: "Goldilocks finds the empty house and walks in.", bucket: 0 },
            { text: "She tastes the porridge and breaks a little chair.", bucket: 1 },
            { text: "She falls asleep in Baby Bear's bed.", bucket: 1 },
            { text: "The bears come home, and Goldilocks runs away.", bucket: 2 },
          ],
          hint: "Beginning sets up the story, middle is where the trouble grows, end is how it wraps up.",
          seconds: 40,
        },
        {
          type: "highlight",
          prompt: "Tap the sentence that SOLVES the problem in this story.",
          sentences: [
            "Mia's puppy, Biscuit, ran off during a thunderstorm.",
            "Mia searched the yard, but he was nowhere.",
            "She made posters and walked the street calling his name.",
            "At last she heard a bark under the neighbor's porch, and there was Biscuit, safe and muddy.",
          ],
          correct: [3],
          hint: "The problem is the lost puppy. Which sentence ends the trouble?",
          mistakes: [
            { match: "Tapped the posters sentence", coach: "Making posters is Mia TRYING to solve the problem. Which sentence shows it's solved?" },
          ],
          seconds: 25,
        },
      ],
      check: [
        {
          q: "What is a story's setting?",
          choices: ["who the story is about", "where and when the story happens", "the lesson of the story"],
          answer: 1,
          why: "The setting tells where and when the story takes place.",
        },
        {
          q: "Why does a story need a problem?",
          choices: [
            "So the characters have something to face, and the reader wants to keep reading.",
            "So the story can be shorter.",
            "Because every story needs a wolf.",
          ],
          answer: 0,
          why: "Without a problem, nothing happens. Problems make readers wonder what comes next.",
        },
        {
          q: "In 'The Lion and the Mouse,' how is the lion's problem solved?",
          choices: ["The lion roars until the hunter runs away.", "The hunter lets him go.", "The mouse chews through the ropes of the net."],
          answer: 2,
          why: "The tiny mouse chews the ropes and frees the lion.",
        },
        {
          q: "Which part of a story is where the problem grows and the character keeps trying?",
          choices: ["the title", "the beginning", "the middle", "the end"],
          answer: 2,
          why: "The middle is where the problem grows and the character tries to solve it.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Write a short story (8-12 sentences) about an animal or a kid. First, plan it by answering four questions: Who is it about? What do they want? What gets in the way? How does it end? Then write the story with a clear beginning, middle and end. If you like, end with a lesson, the way Aesop's fables do.",
        rubric: [
          "Has a main character who clearly wants something, and a setting.",
          "Has a clear problem that gets in the character's way.",
          "Has a beginning, a middle where the character tries to solve the problem, and an end that solves it.",
          "Uses complete sentences with capitals and end marks, and at least one sensory detail.",
        ],
      },
    },

    // ------------------------------------------------------------------
    {
      id: "writing-45.opinion",
      title: "Opinion Writing",
      minutes: 30,
      stage: "logic",
      read: `An opinion is what you think or believe about something. "Summer is the best season" is an opinion. A fact is something that can be checked and proven true. "Summer comes after spring" is a fact. Both are useful, but they are different. People can disagree about an opinion, but you can check a fact.

Opinion writing tells the reader what you think and then gives reasons why. Reasons are what turn an opinion into something worth listening to. "Dogs make great pets" is only a claim. "Dogs make great pets because they are loyal, they help you stay active, and they love to play" gives the reader something to think about.

A strong opinion piece has four parts. First, state your opinion clearly in the opening sentence: "Every kid should learn to swim." Second, give reasons. Each reason answers the question "Why?" Third, support each reason with an example or a fact: "Swimming keeps you safe near water. If you ever fell off a dock, you would know how to get back to shore." Fourth, end with a conclusion that says your opinion again in new words.

Linking words connect your opinion to your reasons: because, for example, also, another reason and in conclusion. They help the reader follow your thinking from one step to the next.

Good opinion writers stay polite and fair. They give real reasons instead of shouting, and they never call people names. A wise writer also thinks about what someone who disagrees might say. Aesop's fables work a little like this: each short story makes a point, like "slow and steady wins the race," and the story itself is the reason we believe it.`,
      keyIdeas: [
        "A fact can be checked and proven; an opinion is what someone thinks or believes.",
        "Opinion writing states the opinion clearly, then gives reasons with examples.",
        "Linking words connect the reasons, and a conclusion restates the opinion in new words.",
      ],
      hook: {
        text: "Which is better, summer or winter? You probably answered right away. But could you convince a friend who picked the other one? Saying what you think is easy. Giving good reasons that change someone's mind is the real skill, and today you will learn how.",
      },
      teach: [
        {
          title: "Fact or opinion?",
          teach:
            "A fact can be checked and proven true. 'A spider has eight legs' is a fact. You could count them. An opinion tells what someone thinks or feels. 'Spiders are the creepiest animals' is an opinion. Some people agree and some don't. Opinion words are clues: best, worst, favorite, should, beautiful, boring. When you write an opinion piece, you tell the reader what you believe.",
          visual: {
            type: "compare",
            left: { title: "Fact", points: ["A spider has eight legs.", "Summer comes after spring.", "Water freezes when it gets cold enough."] },
            right: { title: "Opinion", points: ["Spiders are creepy.", "Summer is the best season.", "Ice skating is more fun than sledding."] },
          },
          probe: {
            type: "sort",
            prompt: "Sort each sentence: fact or opinion?",
            buckets: ["Fact", "Opinion"],
            items: [
              { text: "A spider has eight legs.", bucket: 0 },
              { text: "Spiders are creepy.", bucket: 1 },
              { text: "Apples grow on trees.", bucket: 0 },
              { text: "Everyone should eat more apples.", bucket: 1 },
              { text: "Water freezes at 32 degrees Fahrenheit.", bucket: 0 },
              { text: "Winter is the best season.", bucket: 1 },
            ],
            hint: "Ask: could I check this and prove it? Watch for opinion clue words like best, should and creepy.",
            mistakes: [
              { match: "Put 'Everyone should eat more apples.' under fact", coach: "'Should' is a clue word. Someone thinks this, but you can't prove it like counting legs." },
            ],
            seconds: 40,
          },
          think: {
            q: "Which sentence is an opinion?",
            choices: ["The sun is a star.", "Frogs can swim.", "Pizza is the best dinner."],
            answer: 2,
            why: "'Best' is an opinion word. People disagree about the best dinner.",
            hints: [
              "Scientists have checked this. It can be proven, so it's a fact.",
              "You could watch a frog swim and prove it. That's a fact.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A fact is like a ruler: it measures the same for everyone. An opinion is like a favorite color: it can be different for each person.",
            example:
              "'The Mississippi is a long river' can be checked on a map, so it's a fact. 'The Mississippi is the most beautiful river' is what someone feels, so it's an opinion.",
            simpler: {
              q: "Which word is an opinion clue?",
              choices: ["best", "eight"],
              answer: 0,
              why: "'Best' shows what someone thinks.",
              hints: ["", "'Eight' is a number you can count and check."],
            },
          },
        },
        {
          title: "Say what you think",
          teach:
            "Start an opinion piece by saying exactly what you think, in one clear sentence. That sentence is your opinion statement. Weak: 'Maybe dogs are kind of okay, I guess.' Strong: 'Dogs make the best pets.' The reader should know your opinion right away. Don't turn it into a question, and don't hide it in the middle. Put it up front, where everyone can see it.",
          visual: {
            type: "compare",
            left: { title: "Weak", points: ["Maybe dogs are kind of okay, I guess.", "Is reading fun?"] },
            right: { title: "Strong", points: ["Dogs make the best pets.", "Reading before bed is a great habit."] },
          },
          probe: {
            type: "highlight",
            prompt: "Tap the clear, strong opinion statements.",
            sentences: [
              "Every kid should learn to swim.",
              "I guess swimming is maybe okay sometimes.",
              "Reading before bed is a great habit.",
              "Is gardening fun?",
              "Libraries are one of the best places in town.",
            ],
            correct: [0, 2, 4],
            hint: "A strong opinion statement says exactly what the writer thinks. No guessing, and no questions.",
            mistakes: [
              { match: "Tapped 'Is gardening fun?'", coach: "That's a question. An opinion statement tells what you think." },
              { match: "Tapped 'I guess swimming is maybe okay sometimes.'", coach: "'I guess' and 'maybe' make it wobbly. A strong statement is sure." },
            ],
            seconds: 30,
          },
          think: {
            q: "Which is the clearest opinion statement?",
            choices: ["Recess might be kind of good, maybe.", "What do you think about recess?", "Kids should get a long recess every day."],
            answer: 2,
            why: "It says exactly what the writer thinks, clearly and up front.",
            hints: [
              "'Might,' 'kind of' and 'maybe' make the opinion wobbly.",
              "This asks a question instead of stating an opinion.",
              "",
            ],
          },
          approaches: {
            analogy:
              "An opinion statement is like a flag planted on a hilltop. Everyone can see where you stand.",
            example:
              "Wobbly: 'I sort of think maybe cats could be good pets.' Clear: 'Cats make wonderful pets.' Now the reader knows exactly what you'll be arguing.",
            simpler: {
              q: "Which one states an opinion clearly?",
              choices: ["Maybe soccer is fun, I guess.", "Soccer is a great sport."],
              answer: 1,
              why: "It says exactly what the writer thinks, with no maybes.",
              hints: ["'Maybe' and 'I guess' make it unclear.", ""],
            },
          },
        },
        {
          title: "Reasons answer 'Why?'",
          teach:
            "An opinion without reasons is just a claim. Reasons answer the question, 'Why do you think that?' Use the word because to connect them. 'Every kid should learn to swim because it keeps them safe near water.' Then back up the reason with an example: 'If you fell off a dock, you would know how to get back to shore.' A good reason is about the topic, not just 'because I said so.'",
          visual: {
            type: "flip",
            cards: [
              { front: "Opinion", back: "Every kid should learn to swim." },
              { front: "Reason (because...)", back: "...because it keeps them safe near water." },
              { front: "Example", back: "If you fell off a dock, you would know how to get back to shore." },
            ],
          },
          probe: {
            type: "build",
            prompt: "Build an opinion with a reason.",
            tiles: ["Every kid", "should learn", "to ride a bike", "because", "it is great exercise."],
            distractors: ["because I said so.", "maybe"],
            hint: "Start with the opinion, then use 'because' to add a real reason about bikes.",
            mistakes: [
              { match: "Used 'because I said so.'", coach: "That isn't a real reason. Why is riding a bike good for kids?" },
              { match: "Used 'maybe'", coach: "'Maybe' makes the opinion wobbly. State it with confidence." },
            ],
            seconds: 30,
          },
          think: {
            q: "Opinion: 'Dogs make great pets.' Which is the strongest reason?",
            choices: ["because I said so", "because dogs are loyal and love to play", "because my favorite color is green"],
            answer: 1,
            why: "Being loyal and playful are real reasons about dogs as pets.",
            hints: [
              "That's not a reason; it doesn't explain anything about dogs.",
              "",
              "Your favorite color has nothing to do with dogs as pets.",
            ],
          },
          approaches: {
            analogy:
              "Reasons are like the legs on a chair. An opinion with no reasons topples over. The more strong legs, the steadier it stands.",
            example:
              "Opinion: 'Kids should help cook dinner.' Reason: 'because cooking teaches you to follow steps.' Example: 'When you bake muffins, you have to measure and mix in the right order.'",
            simpler: {
              q: "What question does a reason answer?",
              choices: ["Why?", "Where?"],
              answer: 0,
              why: "A reason explains why you think something.",
              hints: ["", "'Where' asks about a place. A reason explains your thinking."],
            },
          },
        },
        {
          title: "Linking words and a strong finish",
          teach:
            "Linking words connect your reasons so the reader can follow your thinking. Use words like because, for example, also, another reason is and in conclusion. 'One reason to read every day is that it teaches new words. Another reason is that books take you to new places.' End with a conclusion that says your opinion again in new words: 'In conclusion, reading every day is a habit worth keeping.'",
          visual: {
            type: "flip",
            cards: [
              { front: "because", back: "Connects an opinion to a reason." },
              { front: "for example", back: "Introduces an example." },
              { front: "also / another reason is", back: "Adds one more reason." },
              { front: "in conclusion", back: "Starts the wrap-up." },
            ],
          },
          probe: {
            type: "cloze",
            text: "'Gardening is a wonderful hobby. One reason is that you grow your own food. {0}, you can grow tomatoes and beans. {1} reason is that gardening gets you outside. {2}, everyone should try planting a garden.'",
            blanks: [
              { answers: ["For example", "For instance"] },
              { answers: ["Another"] },
              { answers: ["In conclusion", "To sum up", "So"] },
            ],
            bank: ["For example", "Another", "In conclusion", "Once upon a time", "Yesterday"],
            hint: "One blank introduces an example, one adds a second reason, and one starts the wrap-up.",
            mistakes: [
              { match: "Once upon a time", coach: "That's how stories begin, not opinion pieces. Which words introduce an example or a wrap-up?" },
              { match: "Yesterday", coach: "'Yesterday' tells when something happened. It doesn't link reasons." },
            ],
            seconds: 35,
          },
          think: {
            q: "Which linking words start a conclusion?",
            choices: ["For example", "In conclusion", "Another reason"],
            answer: 1,
            why: "'In conclusion' tells the reader you're wrapping up.",
            hints: [
              "'For example' introduces an example, not the ending.",
              "",
              "'Another reason' adds a new reason, so you're not finished yet.",
            ],
          },
          approaches: {
            analogy:
              "Linking words are like the signs on a hiking trail. They tell the reader 'here comes an example,' 'here's another reason,' and 'you've reached the end.'",
            example:
              "Without linking words: 'Cats are good pets. They are clean. They are quiet.' With them: 'Cats are good pets because they are clean. Also, they are quiet. In conclusion, a cat is a great choice.'",
            simpler: {
              q: "Which linking word connects an opinion to a reason?",
              choices: ["because", "once"],
              answer: 0,
              why: "'Because' tells the reader a reason is coming.",
              hints: ["", "'Once' is about time, not reasons."],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Opinion: 'Every kid should learn to cook.' Sort each reason.",
        buckets: ["Strong reason", "Weak or off-topic"],
        items: [
          { text: "Cooking teaches you to follow steps carefully.", bucket: 0 },
          { text: "You can make healthy meals for your family.", bucket: 0 },
          { text: "Cooking uses math, like measuring cups and spoons.", bucket: 0 },
          { text: "Because I said so.", bucket: 1 },
          { text: "My cousin has a red bike.", bucket: 1 },
          { text: "Pancakes are round.", bucket: 1 },
        ],
      },
      explain: {
        prompt: "Explain to a friend how to write a strong opinion paragraph.",
        keyPoints: [
          "Start with a clear opinion statement.",
          "Give reasons that answer 'why,' using because.",
          "Support each reason with an example or fact.",
          "Use linking words and end with a conclusion that restates the opinion.",
        ],
      },
      mastery: [
        {
          type: "sequence",
          prompt: "Put this opinion paragraph in order.",
          steps: [
            "Every family should keep a vegetable garden.",
            "One reason is that fresh vegetables taste better.",
            "For example, a tomato picked from the vine is sweet and juicy.",
            "Another reason is that gardening is good exercise.",
            "In conclusion, a garden gives your family both food and fun.",
          ],
          hint: "Opinion first, then a reason with its example, then another reason, then the conclusion.",
          seconds: 40,
        },
        {
          type: "highlight",
          prompt: "Tap the sentence that states the writer's opinion.",
          sentences: [
            "Bees visit many flowers each day.",
            "Bees make honey in their hives.",
            "I think bees are the most important insects in a garden.",
            "Bees carry pollen from plant to plant.",
          ],
          correct: [2],
          hint: "The others are facts you could check. Which one tells what the writer believes?",
          mistakes: [
            { match: "Tapped 'Bees make honey in their hives.'", coach: "That's a fact you could check. Look for clue words like 'I think' or 'most important.'" },
          ],
          seconds: 25,
        },
        {
          type: "build",
          prompt: "Build a conclusion for an opinion piece about swimming.",
          tiles: ["In conclusion,", "every kid", "should learn", "to swim."],
          distractors: ["For example,", "maybe"],
          hint: "A conclusion starts with a wrap-up linking word and says the opinion again with confidence.",
          mistakes: [
            { match: "Used 'For example,'", coach: "'For example' introduces an example, not a conclusion." },
            { match: "Used 'maybe'", coach: "'Maybe' makes the ending wobbly. Finish strong." },
          ],
          seconds: 25,
        },
        {
          type: "cloze",
          text: "'Summer is the best season {0} the days are long and warm. {1}, you can swim, hike and pick berries.'",
          blanks: [
            { answers: ["because", "since"] },
            { answers: ["For example", "For instance", "Also"] },
          ],
          bank: ["because", "For example", "but", "Once upon a time"],
          hint: "The first blank connects the opinion to a reason. The second introduces examples.",
          mistakes: [
            { match: "but", coach: "'But' shows something different is coming. Here a reason is coming." },
            { match: "Once upon a time", coach: "That starts a fairy tale, not an example." },
          ],
          seconds: 25,
        },
      ],
      check: [
        {
          q: "Which sentence is a FACT?",
          choices: ["Cats are the best pets.", "A cat has four legs.", "Cats are boring."],
          answer: 1,
          why: "You could count a cat's legs and prove it.",
        },
        {
          q: "Where should your opinion statement go?",
          choices: ["Hidden in the middle", "Only in the title", "At the beginning, stated clearly"],
          answer: 2,
          why: "The reader should know your opinion right away.",
        },
        {
          q: "Opinion: 'Kids should read every day.' Which is the best reason?",
          choices: ["because reading teaches new words", "because books are made of paper", "because I said so", "because my shoes are blue"],
          answer: 0,
          why: "Learning new words is a real reason that supports reading every day.",
        },
        {
          q: "How should a good opinion piece end?",
          choices: [
            "With a brand-new topic",
            "With a conclusion that says the opinion again in new words",
            "With a question and no answer",
          ],
          answer: 1,
          why: "A conclusion wraps up by restating the opinion in fresh words.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Write an opinion paragraph (6-8 sentences). Pick one topic: Which season is the best? Should every kid learn to cook? Which Aesop fable has the best lesson? Start with a clear opinion statement, give at least two reasons using 'because,' support each with an example, use linking words, and finish with a conclusion.",
        rubric: [
          "Begins with a clear opinion statement, not a question.",
          "Gives at least two real reasons, each supported by an example or fact.",
          "Uses linking words such as because, for example, another reason and in conclusion.",
          "Ends with a conclusion that restates the opinion in new words, and stays polite and fair.",
        ],
      },
    },
  ],
};
