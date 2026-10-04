import type { Course } from "./types";

export const writing: Course = {
  id: "writing",
  title: "Reading & Writing",
  icon: "✍️",
  hue: 200,
  track: "academic",
  subject: "Writing",
  blurb:
    "Read like a detective and write like a craftsman: close reading, strong sentences, solid paragraphs, persuasion, storytelling and great books.",
  teacher: {
    name: "Mr. Lincoln",
    avatar: "🎩",
    inspiredBy: "Abraham Lincoln, who taught himself to read and write by firelight",
    voice:
      "Warm, plain-spoken and precise. Believes clear writing comes from clear thinking and loves a well-chosen word.",
  },
  lessons: [
    {
      id: "writing.close-reading",
      title: "Reading Closely",
      minutes: 30,
      stage: "grammar",
      subject: "Reading",
      read: `Most people read the way a car drives past a field: they see green and keep going. A close reader stops the car, gets out and looks at each stalk. Close reading means slowing down on purpose so you notice what the writer actually did.

Close readers do three things. First, they annotate. That means making small notes as they go: underlining a striking line, circling a word they don't know, writing a question mark where something is confusing. If the book isn't yours, use sticky notes or a notebook. Second, they ask questions. Why did the character do that? What does this word mean here? What will happen next? Third, they hunt for the main idea, the one big point the whole passage is making, and the evidence, the exact details that prove it.

Let's practice on a short fable from Aesop, told here in plain words. A hare laughed at a tortoise for being slow, so the tortoise challenged him to a race. The hare dashed far ahead, then lay down for a nap, sure he had time to spare. The tortoise plodded on without stopping. When the hare woke, he ran as fast as he could, but the tortoise had already crossed the finish line.

A close reader might underline "sure he had time to spare" and write in the margin: pride. Next to "plodded on without stopping," she might write: steady. Then she asks, what is this story really about? Not racing. The main idea is that steady effort beats talent that gets lazy. The evidence: the hare's nap, which shows overconfidence, and the tortoise never stopping, which shows persistence.

Notice that the main idea is a full sentence, not just a topic. "Racing" is a topic. "Steady effort beats careless talent" is an idea. Good evidence is specific, something you can point to on the page. When you can name the idea and put your finger on the proof, you have truly read.`,
      keyIdeas: [
        "Annotate as you read: underline, circle, and write questions in the margin.",
        "The main idea is a full sentence that states the big point, not just a topic.",
        "Evidence is a specific detail from the text that you can point to.",
      ],
      check: [
        {
          q: "What does it mean to annotate a text?",
          choices: [
            "Read it as fast as possible",
            "Make small notes, marks and questions while reading",
            "Memorize the first and last sentences",
            "Copy the whole passage by hand",
          ],
          answer: 1,
          why: "Annotating means marking up the text with notes, underlines and questions as you go.",
        },
        {
          q: "Which of these is a main idea rather than a topic?",
          choices: [
            "Steady effort beats careless talent.",
            "Racing",
            "Animals",
          ],
          answer: 0,
          why: "A main idea is a complete statement about the topic, not just a word naming it.",
        },
        {
          q: "In the fable, which detail is evidence that the hare was overconfident?",
          choices: [
            "The tortoise was slow.",
            "The race had a finish line.",
            "The tortoise kept going.",
            "The hare took a nap during the race.",
          ],
          answer: 3,
          why: "Stopping to nap in the middle of a race shows the hare thought he could not lose.",
        },
        {
          q: "What should you do if the book you are reading is borrowed?",
          choices: [
            "Skip annotating entirely",
            "Write in pen very lightly",
            "Use sticky notes or a notebook",
          ],
          answer: 2,
          why: "Sticky notes or a notebook let you annotate without marking a book that isn't yours.",
        },
        {
          q: "Why do close readers ask questions while reading?",
          choices: [
            "To slow down and notice what the writer is doing",
            "To make the reading take longer",
            "Because the author left mistakes",
            "To avoid finding the main idea",
          ],
          answer: 0,
          why: "Questions push you to think about choices, meanings and causes in the text.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Think of a book you are reading right now (or finished recently). Pick one chapter or scene. In one sentence, state its main idea. Then give two pieces of evidence from the text, either short quotations or specific details, and explain in a sentence each how they prove your main idea.",
        rubric: [
          "States the main idea as a complete sentence, not just a topic.",
          "Gives two specific pieces of evidence from the book (quotes or precise details).",
          "Explains how each piece of evidence supports the main idea.",
          "Names the book and the chapter or scene, and is written in clear, complete sentences.",
        ],
      },
    },
    {
      id: "writing.great-sentences",
      title: "Great Sentences",
      minutes: 30,
      stage: "grammar",
      read: `Every sentence has two working parts: a subject, which is who or what the sentence is about, and a verb, which tells what the subject does or is. "The dog barked." Dog is the subject; barked is the verb. Everything else in a sentence is decoration hung on that frame. Great writers make the frame strong first.

Start with strong verbs. Weak verbs like "is," "went," "got" and "made" do very little work. Compare "The boy went across the yard" with "The boy sprinted across the yard," or "crept," or "stomped." One verb changes the whole picture. When you find yourself adding an adverb, as in "walked slowly," ask whether a single sharper verb, like "trudged," could do the job alone.

Next, use concrete nouns. A concrete noun names something you can see, hear, touch, taste or smell. "Food" is vague; "a cold slice of pepperoni pizza" is concrete. "Stuff in my room" tells the reader nothing; "comic books, a broken kite and three odd socks" paints a scene. Readers remember pictures, not categories.

Then vary your sentences. If every sentence is the same length, your writing drones like a ticking clock. Mix long sentences that carry the reader along with short ones. Short ones punch. You can also vary how sentences begin: start one with the subject, the next with a time word like "Later," and another with an action, like "Grabbing his coat, he ran outside."

Finally, cut extra words. Phrases like "in order to," "the fact that," "very" and "really" often add nothing. "Due to the fact that it was raining" becomes "Because it rained." Abraham Lincoln's most famous speech, at Gettysburg, lasted only about two minutes, yet people still study it. Fewer words, chosen well, hit harder.

When you revise, read each sentence aloud and ask: Is the verb doing real work? Can the reader picture the nouns? Can anything go?`,
      keyIdeas: [
        "Build every sentence on a clear subject and a strong, specific verb.",
        "Concrete nouns create pictures; vague nouns create fog.",
        "Vary sentence length and openings, and cut words that do no work.",
      ],
      check: [
        {
          q: "In \"The hawk circled above the field,\" what is the verb?",
          choices: ["hawk", "circled", "above", "field"],
          answer: 1,
          why: "\"Circled\" tells what the subject, the hawk, does.",
        },
        {
          q: "Which sentence uses the strongest verb?",
          choices: [
            "She went into the room.",
            "She was in the room quickly.",
            "She burst into the room.",
          ],
          answer: 2,
          why: "\"Burst\" shows exactly how she entered, without needing extra words.",
        },
        {
          q: "Which is the most concrete noun phrase?",
          choices: [
            "some things",
            "a rusty red wheelbarrow",
            "various items",
            "stuff outside",
          ],
          answer: 1,
          why: "You can picture a rusty red wheelbarrow; the others are vague.",
        },
        {
          q: "What is the best revision of \"Due to the fact that it was late, we went home\"?",
          choices: [
            "Because it was late, we went home.",
            "Due to the fact of lateness, we went home.",
            "It was really very late, so we went home.",
            "Owing to the fact that it was late, we went home.",
          ],
          answer: 0,
          why: "\"Because\" replaces five words and the meaning stays the same.",
        },
        {
          q: "Why should writers vary sentence length?",
          choices: [
            "Long sentences are always wrong.",
            "Teachers require it.",
            "It keeps writing lively instead of monotonous.",
            "Short sentences are always better.",
          ],
          answer: 2,
          why: "A mix of long and short sentences creates rhythm and keeps the reader awake.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Revise these 5 weak sentences. Use strong verbs, concrete nouns, and cut extra words. You may add details to make them vivid.\n1. The dog went across the yard very fast.\n2. There was some food on the table.\n3. Due to the fact that it was cold, we got our stuff and went inside.\n4. The man was really mad and said things.\n5. It was a nice day and the weather was good.\nWrite each original number with your new sentence, then add one line saying which change you are proudest of and why.",
        rubric: [
          "Revises all five sentences, each clearly improved over the original.",
          "Replaces weak verbs (went, was, got, said) with strong, specific verbs.",
          "Replaces vague words (food, stuff, things, nice) with concrete nouns and details, and cuts wordy phrases like \"due to the fact that\" and \"really.\"",
          "Revised sentences are grammatically correct, and the final line explains one change with a reason.",
        ],
      },
    },
    {
      id: "writing.paragraph",
      title: "The Paragraph",
      minutes: 30,
      stage: "logic",
      read: `A paragraph is a team of sentences that work together on one job. If a sentence is a single brick, a paragraph is a small wall: every brick sits on the others and holds its share of the weight. A strong paragraph has three parts.

The topic sentence comes first and tells the reader what the paragraph will prove or explain. It is a promise. "Owning a dog teaches responsibility" promises that the rest of the paragraph will show how. A good topic sentence is neither too broad ("Animals are interesting") nor too narrow ("My dog weighs forty pounds"). It should be big enough to need support but small enough to cover in a handful of sentences.

Supporting details come next. These are the reasons, examples, facts and small stories that keep the promise. For the dog paragraph, you might explain that a dog must be fed twice a day no matter what, that it needs walks even in bad weather, and that a sick dog depends on you to notice. Every detail must connect to the topic sentence. If a sentence wanders off, say, to how cute puppies look in sweaters, cut it, even if you love it.

The concluding sentence wraps things up. It does not simply repeat the topic sentence word for word. Instead, it restates the point in fresh words or shows why it matters: "Caring for a dog every single day turns a kid into someone others can count on."

Transitions are the mortar between the bricks. Words like "first," "also," "for example," "however," "because of this" and "finally" show how one idea connects to the next. Without them, a paragraph reads like a list of unrelated facts. With them, the reader follows your thinking step by step.

Here is a quick test. Cover everything but the topic sentence and ask what the paragraph promises. Then read each other sentence and ask, does this help keep that promise? If every answer is yes, your wall will stand.`,
      keyIdeas: [
        "A topic sentence makes a clear promise about what the paragraph will show.",
        "Every supporting detail must connect to the topic sentence.",
        "Transitions and a fresh concluding sentence tie the paragraph together.",
      ],
      check: [
        {
          q: "What is the job of a topic sentence?",
          choices: [
            "To tell the reader what the paragraph will prove or explain",
            "To list every detail in the paragraph",
            "To end the paragraph",
            "To ask the reader a question they cannot answer",
          ],
          answer: 0,
          why: "The topic sentence is a promise that the rest of the paragraph keeps.",
        },
        {
          q: "Which is the best topic sentence for a short paragraph?",
          choices: [
            "Sports exist.",
            "My bike is blue.",
            "Learning to ride a bike takes patience.",
            "There are many things in the world.",
          ],
          answer: 2,
          why: "It is focused enough to cover in a paragraph but needs support to prove.",
        },
        {
          q: "In a paragraph about why owning a dog teaches responsibility, which sentence should be cut?",
          choices: [
            "Dogs must be fed every day.",
            "Puppies look adorable in sweaters.",
            "Dogs need walks even when it rains.",
          ],
          answer: 1,
          why: "Cute sweaters have nothing to do with responsibility, so the sentence wanders off topic.",
        },
        {
          q: "Which word is a transition that shows contrast?",
          choices: ["also", "first", "for example", "however"],
          answer: 3,
          why: "\"However\" signals that the next idea pushes against the one before it.",
        },
        {
          q: "What makes a good concluding sentence?",
          choices: [
            "Copying the topic sentence exactly",
            "Introducing a brand-new topic",
            "Listing all the details again",
            "Restating the point in fresh words or showing why it matters",
          ],
          answer: 3,
          why: "A strong conclusion wraps up the idea without simply repeating it.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Write one paragraph (6 to 9 sentences) on a topic of your choice, such as a skill you have learned, a favorite place, or why a certain hobby is worth trying. Start with a clear topic sentence, give at least three supporting details, use at least three transition words, and finish with a concluding sentence that does not just repeat the first one.",
        rubric: [
          "Opens with a clear, focused topic sentence that makes a promise.",
          "Includes at least three specific supporting details that all connect to the topic sentence.",
          "Uses at least three transitions to connect ideas smoothly.",
          "Ends with a concluding sentence that restates the point in fresh words, with correct spelling and punctuation throughout.",
        ],
      },
    },
    {
      id: "writing.persuasive",
      title: "Persuasive Writing",
      minutes: 35,
      stage: "logic",
      read: `Persuasive writing tries to change someone's mind or move them to act. It is not the same as arguing loudly. Shouting rarely convinces anyone. What convinces people is a clear claim, solid evidence, sound reasoning, and a fair answer to the other side.

The claim is the position you are defending, stated in one sentence: "Every kid should learn to cook." A claim must be something reasonable people could disagree about. "Food is necessary" is not a claim; nobody argues with it.

Evidence is the support: facts, examples, numbers, expert knowledge or experience. You might point out that cooking uses fractions when you double a recipe, or that knowing a few simple meals saves money compared with buying ready-made food.

Reasoning is the bridge between evidence and claim. Many writers skip it, and their arguments collapse. Do not just drop a fact and walk away. Explain why it matters: "Because cooking uses real measurements, it makes math practical, and kids who see math as useful are more likely to stick with it."

Answering the other side is called a counterargument. Imagine the smartest person who disagrees with you. What would they say? Perhaps, "Kids are too busy, and kitchens are dangerous." Say it fairly, then respond: "Kitchens do have hot stoves and sharp knives, but that is exactly why kids should learn safe habits early, with an adult nearby." Answering an objection shows you have thought hard, and readers trust a writer who is fair.

Abraham Lincoln, before he was President, was a frontier lawyer known for this kind of clarity. He was famous for explaining a case so simply that any juror could follow it, and he often stated the other side's best point himself before showing why his own was stronger. He said that as a boy he could not rest when he heard something he did not understand until he had put it into plain language. That habit made him a powerful persuader. Clear thinking, then clear words.`,
      keyIdeas: [
        "A claim is a one-sentence position that reasonable people could disagree with.",
        "Evidence supports the claim, and reasoning explains why the evidence matters.",
        "Answering the other side fairly makes your argument more trustworthy.",
      ],
      check: [
        {
          q: "Which of these is a real claim for a persuasive paragraph?",
          choices: [
            "Water is wet.",
            "Every kid should learn to cook.",
            "Some people eat breakfast.",
          ],
          answer: 1,
          why: "Reasonable people could disagree about it, so it needs to be argued.",
        },
        {
          q: "What does reasoning do in an argument?",
          choices: [
            "It explains how the evidence supports the claim.",
            "It repeats the claim louder.",
            "It replaces the need for evidence.",
            "It changes the topic.",
          ],
          answer: 0,
          why: "Reasoning is the bridge that connects a fact to the point you are making.",
        },
        {
          q: "What is a counterargument?",
          choices: [
            "A second claim that has nothing to do with the first",
            "A list of your best evidence",
            "An insult to people who disagree",
            "The strongest point from the other side, answered fairly",
          ],
          answer: 3,
          why: "A counterargument states the opposing view and then responds to it.",
        },
        {
          q: "Why does answering the other side make writing more persuasive?",
          choices: [
            "It makes the paragraph longer.",
            "It shows the writer has thought carefully and is fair.",
            "It confuses the reader.",
            "It proves the other side is right.",
          ],
          answer: 1,
          why: "Readers trust a writer who takes objections seriously.",
        },
        {
          q: "As a lawyer, what was Lincoln known for?",
          choices: [
            "Long, complicated speeches full of rare words",
            "Refusing to discuss the other side's case",
            "Explaining cases so plainly that any juror could follow",
            "Winning by speaking the loudest",
          ],
          answer: 2,
          why: "Lincoln's strength was clear, plain explanation that ordinary people understood.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Write a persuasive paragraph (7 to 10 sentences). You may use \"Every kid should learn to cook\" or choose your own claim, such as \"Every family should have a game night\" or \"Kids should learn to swim before age ten.\" Include your claim, at least two pieces of evidence, reasoning that explains each piece, and one counterargument that you answer fairly.",
        rubric: [
          "States a clear, debatable claim in one sentence near the start.",
          "Supports the claim with at least two specific pieces of evidence (facts, examples or experiences).",
          "Explains the reasoning that connects each piece of evidence to the claim.",
          "Presents a fair counterargument and responds to it, ending with a strong closing sentence.",
        ],
      },
    },
    {
      id: "writing.storytelling",
      title: "Telling a Story",
      minutes: 35,
      stage: "rhetoric",
      read: `Every good story, from an ancient myth to the tale of how you broke your arm, follows a shape called the narrative arc. Picture a hill. You climb up, reach the top, and come down the other side.

The setup is the bottom of the hill. It introduces who, where and when. Keep it short; readers want to get moving. "The summer I turned eleven, my grandfather decided I was old enough to help him fix the roof."

The conflict starts the climb. Something goes wrong or someone wants something they cannot easily get. Without conflict there is no story, only a description. Maybe a storm rolls in while you are on the ladder, or you are terrified of heights and have not told anyone.

The climax is the top of the hill, the moment of greatest tension when things must turn one way or the other. You freeze on the ladder as the first raindrops hit, and your grandfather climbs up beside you.

The resolution brings us down the other side. The problem is settled, and often the main character has changed or learned something. You make it down safely, and the next week you climb back up on your own.

Two tools make a story come alive. The first is showing instead of telling. Telling says, "I was scared." Showing says, "My fingers locked around the rung, and my knees would not bend." Showing lets readers feel the fear themselves instead of just being informed about it. Use the senses: what did it sound like, smell like, feel like?

The second tool is dialogue, the words characters say out loud. A few lines of dialogue can reveal personality faster than a paragraph of explanation. Put each speaker's words in quotation marks, and start a new paragraph whenever the speaker changes. "Don't look down," Grandpa said. "Look at me." That short line tells us he is calm, kind and in charge.

True stories from your own life count. In fact, they are often the best ones, because you remember the details.`,
      keyIdeas: [
        "The narrative arc runs from setup to conflict to climax to resolution.",
        "Showing with sensory details lets readers feel what telling only reports.",
        "Dialogue reveals character quickly; use quotation marks and a new paragraph for each speaker.",
      ],
      check: [
        {
          q: "What part of the narrative arc is the moment of greatest tension?",
          choices: ["Setup", "Conflict", "Climax", "Resolution"],
          answer: 2,
          why: "The climax is the top of the hill, where the story turns.",
        },
        {
          q: "Which sentence shows rather than tells?",
          choices: [
            "I was very nervous.",
            "My hands were slick with sweat, and my voice came out as a squeak.",
            "I felt nervousness.",
            "It was a nervous time for me.",
          ],
          answer: 1,
          why: "It gives physical details that let the reader sense the nervousness.",
        },
        {
          q: "Why does a story need conflict?",
          choices: [
            "Without a problem or desire, nothing happens and there is no story.",
            "Conflict makes stories shorter.",
            "Every story must include a fight.",
          ],
          answer: 0,
          why: "Conflict creates the tension that drives a story forward.",
        },
        {
          q: "What is the correct way to write dialogue between two people?",
          choices: [
            "Put all of it in one long paragraph with no punctuation",
            "Use capital letters for whatever is spoken",
            "Only use dialogue at the very end",
            "Use quotation marks and start a new paragraph each time the speaker changes",
          ],
          answer: 3,
          why: "Quotation marks and new paragraphs make it clear who is speaking.",
        },
        {
          q: "What usually happens in the resolution?",
          choices: [
            "A brand-new problem begins.",
            "The setting is introduced.",
            "The problem is settled and the character may have changed.",
            "The tension reaches its highest point.",
          ],
          answer: 2,
          why: "The resolution brings the story down the hill and shows how things ended.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Write a one-page true story (about 300 to 450 words) from your own life: a time you tried something new, got lost, made a mistake, or surprised yourself. Follow the narrative arc (setup, conflict, climax, resolution), include at least three showing details that use the senses, and include at least two lines of dialogue.",
        rubric: [
          "Follows a clear narrative arc with a setup, a conflict, a climax and a resolution.",
          "Shows rather than tells, using at least three specific sensory details.",
          "Includes at least two lines of correctly punctuated dialogue, with a new paragraph for each speaker.",
          "Tells a true, focused story of about one page in clear sentences, ending with a resolution that shows what changed or was learned.",
        ],
      },
    },
    {
      id: "writing.great-books",
      title: "Great Books",
      minutes: 30,
      stage: "rhetoric",
      subject: "Literature",
      read: `Thousands of books are published every year, and most are forgotten within a decade. A few are still read a hundred or more years later. We call those classics. Why do they last?

Classics last because they are about things that never go out of style: courage, friendship, loyalty, growing up, facing danger and figuring out who you are. The clothes and the technology change, but people do not change much inside. A reader today can still feel a knot in the stomach when a character is trapped or betrayed. Classics also tend to be well crafted, with vivid characters and sentences worth rereading.

Here are some classics that readers your age often love, all old enough to be free to read online. Treasure Island by Robert Louis Stevenson follows young Jim Hawkins on a voyage with pirates and the unforgettable Long John Silver. Robinson Crusoe by Daniel Defoe tells of a shipwrecked man who builds a life alone on an island. The Call of the Wild by Jack London follows Buck, a dog stolen from a comfortable home and taken to the harsh Yukon. Little Women by Louisa May Alcott follows four sisters growing up in hard times. Around the World in Eighty Days by Jules Verne is a race against the clock. The Adventures of Tom Sawyer by Mark Twain is full of mischief, adventure and a buried treasure.

When you finish a book, writing a review helps you think about it. A good review has four parts. First, a short summary of the beginning that does not give away the ending. Second, your opinion: did you like it, and how much? Third, your reasons with specific examples: a character you admired, a scene that stuck with you, a line you loved. Fourth, a recommendation: who would enjoy this book?

The most important word in a review is "because." "I liked it" tells us little. "I liked it because Buck changes from a pampered pet to a survivor, and I couldn't stop reading to see what he would become" tells us everything.`,
      keyIdeas: [
        "Classics last because they explore timeless human experiences and are well crafted.",
        "Many great classics are in the public domain and free to read.",
        "A strong review has a spoiler-free summary, an opinion, specific reasons, and a recommendation.",
      ],
      check: [
        {
          q: "According to the lesson, why do classics last?",
          choices: [
            "They are always the longest books.",
            "They explore timeless experiences and are well crafted.",
            "They are required by law.",
            "They have no difficult words.",
          ],
          answer: 1,
          why: "Themes like courage and friendship stay meaningful across generations.",
        },
        {
          q: "Which book follows a dog named Buck in the Yukon?",
          choices: [
            "Treasure Island",
            "Little Women",
            "The Call of the Wild",
            "Robinson Crusoe",
          ],
          answer: 2,
          why: "Jack London's The Call of the Wild tells Buck's story.",
        },
        {
          q: "Who wrote Treasure Island?",
          choices: [
            "Robert Louis Stevenson",
            "Mark Twain",
            "Jules Verne",
            "Louisa May Alcott",
          ],
          answer: 0,
          why: "Robert Louis Stevenson created Jim Hawkins and Long John Silver.",
        },
        {
          q: "What should the summary in a book review avoid?",
          choices: [
            "Naming the main character",
            "Describing the setting",
            "Giving away the ending",
          ],
          answer: 2,
          why: "A review should help others decide to read the book without spoiling it.",
        },
        {
          q: "Which review sentence is strongest?",
          choices: [
            "It was good.",
            "I liked it a lot.",
            "Everyone should read it.",
            "I loved it because Jim's courage grows as he outwits the pirates.",
          ],
          answer: 3,
          why: "It gives an opinion and a specific reason with \"because.\"",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Write a review (about 200 to 300 words) of a book you have finished. Include the title and author, a short summary of the beginning that does not spoil the ending, your opinion, at least two specific reasons with examples from the book, and a recommendation saying who would enjoy it.",
        rubric: [
          "Names the title and author and gives a brief summary that does not spoil the ending.",
          "States a clear opinion of the book.",
          "Supports the opinion with at least two specific reasons and examples from the book, using \"because\" or similar reasoning.",
          "Ends with a recommendation of who would enjoy the book, written in organized, clear paragraphs.",
        ],
      },
    },
  ],
};
