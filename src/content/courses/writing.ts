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
      hook: {
        text: "Two kids read the same page. One says, 'It was about a race.' The other says, 'It was about how pride makes you lazy, and here is the line that proves it.' Today you learn how to be the second kid.",
        visual: {
          type: "compare",
          left: { title: "Skimming", points: ["Eyes move fast", "Sees the topic only", "Remembers little", "Says 'it was fine'"] },
          right: { title: "Close reading", points: ["Slows down on purpose", "Finds the big idea", "Points to proof", "Asks good questions"] },
        },
      },
      teach: [
        {
          title: "Slow down and mark it up",
          teach:
            "Close reading starts with a pencil. As you read, you annotate: you leave small tracks showing what you noticed. Underline a line that strikes you. Circle a word you don't know. Put a question mark where you get confused. Write a one-word note in the margin, like 'pride' or 'scary.' A weak reader finishes a page with nothing to show. A strong reader finishes with a page full of clues. If the book is borrowed, use sticky notes or a notebook instead. Those marks are your thinking made visible, and they make it easy to find things again later.",
          visual: {
            type: "flip",
            cards: [
              { front: "Underline", back: "A line that seems important or striking" },
              { front: "Circle", back: "A word you don't know or want to remember" },
              { front: "Question mark", back: "A spot that confuses you or makes you wonder" },
              { front: "Margin note", back: "One or two words naming what you noticed, like 'pride'" },
            ],
          },
          think: {
            q: "You hit a word you don't know, 'plodded.' What should a close reader do?",
            choices: [
              "Skip it and keep reading fast",
              "Circle it and figure it out from the sentence or look it up",
              "Stop reading the story",
              "Underline the whole page",
            ],
            answer: 1,
            why: "Circling marks the word so you can figure it out from context or a dictionary, instead of letting the meaning slip by.",
            hints: [
              "Skipping feels faster, but an unknown word can hide the meaning of the whole sentence.",
              "",
              "One hard word is no reason to quit. Mark it and work it out.",
              "If everything is underlined, nothing stands out. Marks only help when they are choosy.",
            ],
          },
          approaches: {
            analogy:
              "Annotating is like dropping breadcrumbs on a hike. Later, when you need to find your way back to the good part, the trail is already marked.",
            example:
              "Without annotation: you finish the fable and remember 'a race.' With annotation: you underlined 'sure he had time to spare' and wrote 'pride' beside it, so when someone asks what the hare's problem was, you can point right to it.",
            simpler: {
              q: "Which mark would you use for a word you don't know?",
              choices: ["Circle it", "Erase it", "Ignore it"],
              answer: 0,
              why: "A circle flags a word to figure out.",
              hints: ["", "Erasing removes the word you need to learn.", "Ignoring it means you might miss the meaning."],
            },
          },
        },
        {
          title: "Ask questions as you go",
          teach:
            "Close readers talk back to the text. They ask: Why did the character do that? What does this word mean here? What will happen next? Questions keep your brain switched on. A weak reading habit is to let the words wash over you. A strong habit is to stop after a key moment and ask why. For example, when the hare lies down for a nap in the middle of a race, a close reader thinks, 'Why would anyone nap during a race?' That question leads straight to the answer: the hare is overconfident. Good questions are the doors that open up the meaning.",
          visual: {
            type: "highlight",
            prompt: "Tap the sentence that should make a close reader ask 'Why would he do that?'",
            sentences: [
              "A hare laughed at a tortoise for being slow.",
              "The tortoise challenged him to a race.",
              "The hare dashed far ahead, then lay down for a nap.",
              "The tortoise plodded on without stopping.",
            ],
            correct: [2],
          },
          think: {
            q: "Which question would help you understand the fable most?",
            choices: [
              "How many pages is this story?",
              "What color was the tortoise?",
              "Why would the hare nap in the middle of a race?",
            ],
            answer: 2,
            why: "This question points at the character's choice, which reveals his overconfidence and the story's lesson.",
            hints: [
              "Page counts don't tell you anything about meaning. Ask about choices and causes.",
              "Small facts like color rarely unlock the big idea. Ask about what characters do and why.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Reading with questions is like being a detective at a crime scene. A detective doesn't just look around; she asks, 'Why is this window open?' The questions lead to the answer.",
            example:
              "A reader notices the tortoise 'plodded on without stopping' and asks, 'Why does the writer say without stopping?' The answer: to contrast him with the napping hare. One question uncovers the whole lesson.",
            simpler: {
              q: "Which of these is a 'why' question about a character?",
              choices: ["Why did the hare stop to sleep?", "The hare was fast.", "The end."],
              answer: 0,
              why: "It asks for the reason behind a character's choice.",
              hints: ["", "That is a statement, not a question.", "That isn't a question at all."],
            },
          },
        },
        {
          title: "Topic versus main idea",
          teach:
            "A topic is a word or two naming what the passage is about: 'racing,' 'dogs,' 'friendship.' A main idea is a full sentence that says what the writer wants you to understand about that topic. Weak: 'The fable is about racing.' Strong: 'Steady effort beats talent that gets lazy.' Here is a test: if your answer could be the label on a folder, it is a topic. If it makes a point someone could explain or prove, it is a main idea. The fable is not really about racing at all. Racing is just the vehicle that carries the idea.",
          visual: {
            type: "compare",
            left: { title: "Topic", points: ["One word or phrase", "Racing", "Friendship", "Like a folder label"] },
            right: { title: "Main idea", points: ["A full sentence", "Steady effort beats lazy talent.", "Real friends tell you the truth.", "Makes a point you can prove"] },
          },
          think: {
            q: "Which is a main idea, not just a topic?",
            choices: [
              "Hard work",
              "Patience usually wins over speed.",
              "Tortoises and hares",
              "Animals in races",
            ],
            answer: 1,
            why: "It is a complete statement that makes a point you could support with evidence.",
            hints: [
              "'Hard work' names a subject, but it doesn't say anything about it. Turn it into a sentence with a point.",
              "",
              "That names who is in the story, not what the story teaches.",
              "This is still a label. Ask: what is the writer saying about animals in races?",
            ],
          },
          approaches: {
            analogy:
              "A topic is like saying your trip was 'about the beach.' A main idea is saying 'The beach taught me to always pack sunscreen.' One names the place; the other tells what you learned.",
            example:
              "Topic: 'a lost dog.' Turn it into a main idea by asking 'What about it?' Answer: 'A lost dog shows how much a family depends on each other.' Now it is a full sentence with a point.",
            simpler: {
              q: "Is 'Friendship' a topic or a main idea?",
              choices: ["A topic", "A main idea"],
              answer: 0,
              why: "It is just one word naming a subject, so it is a topic.",
              hints: ["", "A main idea needs to be a full sentence that says something about the subject."],
            },
          },
        },
        {
          title: "Put your finger on the proof",
          teach:
            "A main idea is only a guess until you prove it with evidence: exact details from the text that you can point to. Weak evidence is vague: 'The hare was kind of lazy.' Strong evidence is specific: 'The hare lay down for a nap in the middle of the race.' Good evidence comes straight from the page, either as a short quotation or a precise detail. After you give it, explain how it proves your idea. The nap shows overconfidence. The tortoise never stopping shows persistence. Main idea plus evidence plus a short explanation is what truly understanding a text looks like.",
          visual: {
            type: "highlight",
            prompt: "Main idea: steady effort beats careless talent. Tap the sentences that are evidence for it.",
            sentences: [
              "The hare dashed far ahead, then lay down for a nap.",
              "The tortoise plodded on without stopping.",
              "Hares have long ears.",
              "The race took place in the countryside.",
            ],
            correct: [0, 1],
          },
          think: {
            q: "Which is the strongest evidence that the tortoise was persistent?",
            choices: [
              "The tortoise was an animal.",
              "The tortoise seemed nice.",
              "The story was short.",
              "The tortoise plodded on without stopping.",
            ],
            answer: 3,
            why: "It is a specific detail from the text that directly shows the tortoise kept going.",
            hints: [
              "True, but it doesn't show anything about persistence. Evidence must prove your point.",
              "'Seemed nice' is your feeling, not a detail you can point to in the text.",
              "The length of the story says nothing about the tortoise's character.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Evidence is like showing your receipt at a store. Saying 'I paid for it' isn't enough; you hold up the receipt. In reading, you hold up the exact line.",
            example:
              "Claim: the hare was overconfident. Weak proof: 'He acted like that.' Strong proof: 'He lay down for a nap, sure he had time to spare.' Explanation: only someone certain of winning would sleep mid-race.",
            simpler: {
              q: "Which is specific evidence you can point to in a text?",
              choices: ["I think it was good.", "The hare lay down for a nap.", "Stories are fun."],
              answer: 1,
              why: "It is an exact event from the story.",
              hints: ["That is an opinion, not something from the text.", "", "That is a general statement, not a detail from the story."],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each one: is it just a topic, or a full main idea?",
        buckets: ["Topic", "Main idea"],
        items: [
          { text: "Racing", bucket: 0 },
          { text: "Steady effort beats careless talent.", bucket: 1 },
          { text: "Friendship", bucket: 0 },
          { text: "True friends stick with you when things go wrong.", bucket: 1 },
          { text: "Pirates", bucket: 0 },
          { text: "Greed can make people betray their friends.", bucket: 1 },
          { text: "Growing up", bucket: 0 },
          { text: "Mistakes teach us more than easy wins do.", bucket: 1 },
        ],
      },
      explain: {
        prompt: "In your own words, explain how a close reader figures out what a story really means.",
        keyPoints: [
          "Slow down and annotate: underline, circle and write questions or notes.",
          "State the main idea as a full sentence, not just a topic.",
          "Back it up with specific evidence you can point to in the text.",
        ],
      },
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
      hook: {
        text: "'The boy went across the yard.' Now try 'The boy crept across the yard.' Same boy, same yard, but one word turned a shrug into a mystery. Today you learn which words do the heavy lifting.",
        visual: {
          type: "compare",
          left: { title: "Flat", points: ["The boy went across the yard.", "There was food on the table."] },
          right: { title: "Alive", points: ["The boy crept across the yard.", "A cold slice of pizza sat on the table."] },
        },
      },
      teach: [
        {
          title: "Subject and verb: the frame",
          teach:
            "Every sentence has two working parts. The subject is who or what the sentence is about. The verb tells what the subject does or is. In 'The hawk circled,' hawk is the subject and circled is the verb. Everything else, like 'above the quiet field,' is decoration hung on that frame. To find the verb, ask: what is the subject doing? To find the subject, ask: who or what is doing it? Great writers make sure the frame is strong before they add anything else, because a sentence with a fuzzy subject or a lazy verb wobbles no matter how much you decorate it.",
          visual: {
            type: "flip",
            cards: [
              { front: "Subject", back: "Who or what the sentence is about: The hawk..." },
              { front: "Verb", back: "What the subject does or is: ...circled." },
              { front: "Decoration", back: "Extra words that add detail: ...above the quiet field." },
            ],
          },
          think: {
            q: "In 'My little sister giggled at the puppy,' what is the subject?",
            choices: ["giggled", "puppy", "sister", "little"],
            answer: 2,
            why: "The sentence is about the sister; she is the one doing the giggling.",
            hints: [
              "'Giggled' is the action, which makes it the verb. Ask who did the giggling.",
              "The puppy is being giggled at, but it isn't doing the action.",
              "",
              "'Little' describes the subject, but it isn't the subject itself. Which noun does it describe?",
            ],
          },
          approaches: {
            analogy:
              "A sentence is like a house. The subject and verb are the walls and roof. Adjectives and extra phrases are the paint and curtains. Paint can't save a house with no walls.",
            example:
              "Sentence: 'After lunch, the tired horse drank from the creek.' Ask what is happening: drank, so that is the verb. Ask who drank: the horse, so that is the subject. 'After lunch,' 'tired' and 'from the creek' are decoration.",
            simpler: {
              q: "In 'Dogs bark,' which word is the verb?",
              choices: ["Dogs", "bark"],
              answer: 1,
              why: "'Bark' is the action the dogs do.",
              hints: ["'Dogs' is who does the action, so it's the subject.", ""],
            },
          },
        },
        {
          title: "Strong verbs do the work",
          teach:
            "Weak verbs like is, went, got and made do almost nothing. They tell the reader that something happened but not how. Strong verbs paint the how. Weak: 'She went into the room.' Strong: 'She burst into the room,' or 'tiptoed,' or 'stumbled.' Each verb gives a different picture. A good warning sign is an adverb leaning on a weak verb, like 'walked slowly' or 'said loudly.' Try one sharper verb instead: 'trudged,' 'shouted.' You'll use fewer words and get a clearer picture. When you revise, hunt for your weakest verbs first.",
          visual: {
            type: "highlight",
            prompt: "Tap the sentences that use a strong, specific verb.",
            sentences: [
              "The cat went off the fence.",
              "The cat sprang off the fence.",
              "The wind howled through the trees.",
              "The wind was really strong in the trees.",
              "He gulped his milk.",
            ],
            correct: [1, 2, 4],
          },
          think: {
            q: "What is the best replacement for 'walked slowly and tiredly'?",
            choices: ["trudged", "went", "walked very slowly", "moved"],
            answer: 0,
            why: "'Trudged' means walked slowly and wearily, so one strong verb does the work of three words.",
            hints: [
              "",
              "'Went' is even weaker than 'walked.' It doesn't show how at all.",
              "This adds more words instead of choosing a sharper verb.",
              "'Moved' is vague. You can't picture how the person moved.",
            ],
          },
          approaches: {
            analogy:
              "Weak verbs are like a blurry photo; strong verbs are a sharp one. 'Went' is a blur. 'Sprinted' is a picture you could frame.",
            example:
              "Weak: 'The dog got the ball and went back.' Strong: 'The dog snatched the ball and bounded back.' Two verbs changed, and suddenly you can see the dog's energy.",
            simpler: {
              q: "Which verb shows more: 'ran' or 'dashed'?",
              choices: ["ran", "dashed"],
              answer: 1,
              why: "'Dashed' tells you the running was quick and sudden.",
              hints: ["'Ran' is fine, but it doesn't show speed or urgency the way a sharper verb does.", ""],
            },
          },
        },
        {
          title: "Concrete nouns make pictures",
          teach:
            "A concrete noun names something you can see, hear, touch, taste or smell. Vague nouns name categories: food, stuff, things, items. Readers can't picture a category. Weak: 'There was food on the table.' Strong: 'A bowl of steaming chili sat on the table.' Weak: 'My room has stuff in it.' Strong: 'My room has comic books, a broken kite and three odd socks.' The second version tells us about the person, too. When you spot a vague noun, ask, 'What exactly?' and write the answer instead. Readers remember pictures, not categories.",
          visual: {
            type: "compare",
            left: { title: "Vague", points: ["food", "some things", "an animal", "stuff outside"] },
            right: { title: "Concrete", points: ["a cold slice of pepperoni pizza", "a rusty key and a marble", "a muddy beagle", "a tipped-over red wheelbarrow"] },
          },
          think: {
            q: "Which phrase is the most concrete?",
            choices: ["various items", "some stuff", "a cracked blue mug", "a thing"],
            answer: 2,
            why: "You can picture a cracked blue mug exactly; the others are categories.",
            hints: [
              "'Various items' could mean anything. Can you picture it?",
              "'Stuff' is one of the vaguest words in English. Ask, 'What exactly?'",
              "",
              "'A thing' gives the reader nothing to see.",
            ],
          },
          approaches: {
            analogy:
              "A vague noun is like a closed box labeled 'things.' A concrete noun opens the box so the reader can see what's inside.",
            example:
              "Vague: 'We ate food at the game.' Ask 'What exactly?' Answer: hot dogs with mustard and a bag of salty peanuts. New sentence: 'At the game we ate mustardy hot dogs and cracked salty peanuts.'",
            simpler: {
              q: "Which can you picture: 'a tool' or 'a red hammer'?",
              choices: ["a tool", "a red hammer"],
              answer: 1,
              why: "A red hammer is a specific thing you can see.",
              hints: ["'A tool' could be a saw, a wrench or a hammer. It's a category.", ""],
            },
          },
        },
        {
          title: "Vary it and trim it",
          teach:
            "If every sentence is the same length, writing drones like a ticking clock. Mix long sentences that carry the reader along with short ones. Short ones punch. Vary how sentences begin, too: with the subject, with a time word like 'Later,' or with an action like 'Grabbing his coat, he ran outside.' Then trim. Phrases like 'in order to,' 'the fact that,' 'very' and 'really' often add nothing. Weak: 'Due to the fact that it was raining, we went inside.' Strong: 'Because it rained, we went inside.' Lincoln's Gettysburg Address took about two minutes. Fewer words, chosen well, hit harder.",
          visual: {
            type: "compare",
            left: { title: "Wordy", points: ["due to the fact that", "in order to", "really very tired", "at this point in time"] },
            right: { title: "Trimmed", points: ["because", "to", "exhausted", "now"] },
          },
          think: {
            q: "Which is the best revision of 'In order to win the game, we really needed to practice'?",
            choices: [
              "In order to really win the game, we needed practice.",
              "To win the game, we needed to practice.",
              "We really, really needed to practice in order to win.",
            ],
            answer: 1,
            why: "It cuts 'in order' and 'really' and keeps the full meaning.",
            hints: [
              "This keeps both wordy pieces, 'in order to' and 'really,' and just moves them around.",
              "",
              "This makes it longer. Trimming means removing words that do no work.",
            ],
          },
          approaches: {
            analogy:
              "Trimming writing is like pruning a bush. Cutting the dead twigs doesn't hurt the plant; it lets the healthy branches show.",
            example:
              "Before: 'It was a very, very hot day and the fact is that we were really thirsty.' After: 'The day blazed. We were parched.' Fewer words, a short punchy rhythm, and stronger pictures.",
            simpler: {
              q: "Which word can usually be cut from 'It was really cold'?",
              choices: ["cold", "really", "was"],
              answer: 1,
              why: "'Really' adds little; 'It was cold' or 'It was freezing' is stronger.",
              hints: ["'Cold' carries the meaning, so it must stay.", "", "Without 'was' the sentence breaks."],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each phrase: vague or concrete?",
        buckets: ["Vague", "Concrete"],
        items: [
          { text: "some food", bucket: 0 },
          { text: "a warm cinnamon roll", bucket: 1 },
          { text: "stuff in my bag", bucket: 0 },
          { text: "a dented water bottle", bucket: 1 },
          { text: "a nice thing", bucket: 0 },
          { text: "a squeaky wooden swing", bucket: 1 },
          { text: "various animals", bucket: 0 },
          { text: "three barking beagles", bucket: 1 },
        ],
      },
      explain: {
        prompt: "Explain to a younger kid how to turn a boring sentence into a great one.",
        keyPoints: [
          "Use a strong, specific verb instead of a weak one like went or was.",
          "Use concrete nouns the reader can picture.",
          "Cut extra words and mix short and long sentences.",
        ],
      },
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
      hook: {
        text: "A pile of bricks and a brick wall use the same bricks. The difference is how they fit together. A paragraph is the same: the right sentences, in the right order, holding each other up.",
        visual: {
          type: "sequence",
          prompt: "The parts of a paragraph, in order",
          steps: ["Topic sentence: the promise", "Supporting details: keeping the promise", "Transitions: the mortar between ideas", "Concluding sentence: the wrap-up"],
        },
      },
      teach: [
        {
          title: "The topic sentence is a promise",
          teach:
            "A paragraph is a team of sentences working on one job, and the topic sentence announces that job. It usually comes first and tells the reader what the paragraph will prove or explain. 'Owning a dog teaches responsibility' promises that the rest of the paragraph will show how. A good topic sentence is the right size. Too broad: 'Animals are interesting.' That would take a whole book. Too narrow: 'My dog weighs forty pounds.' That's just a fact, with nothing left to prove. Just right: big enough to need support, small enough to cover in a handful of sentences.",
          visual: {
            type: "highlight",
            prompt: "Tap the topic sentence of this paragraph.",
            sentences: [
              "Learning to ride a bike takes patience.",
              "First, you wobble and tip over again and again.",
              "Next, you learn to keep pedaling even when you feel unsteady.",
              "Finally, one day your balance just clicks.",
            ],
            correct: [0],
          },
          think: {
            q: "Which topic sentence is the right size for one paragraph?",
            choices: [
              "The world is full of sports.",
              "Practicing free throws every day made me a better basketball player.",
              "My basketball is orange.",
              "Things happen.",
            ],
            answer: 1,
            why: "It is focused on one point and needs a few sentences of support to prove it.",
            hints: [
              "This is too broad. You'd need a whole book to cover every sport.",
              "",
              "This is too narrow. It's a single fact with nothing left to explain.",
              "This is so vague it doesn't promise anything at all.",
            ],
          },
          approaches: {
            analogy:
              "A topic sentence is like the title on a movie poster. It tells you what you're about to watch, so you know what to expect.",
            example:
              "Too broad: 'Food is good.' Too narrow: 'I ate toast at 7:15.' Just right: 'Making breakfast for my family taught me to plan ahead.' Now the paragraph has a clear promise to keep.",
            simpler: {
              q: "Where does a topic sentence usually go?",
              choices: ["At the start of the paragraph", "Hidden in the middle", "Only in the title"],
              answer: 0,
              why: "Putting it first tells the reader right away what the paragraph is about.",
              hints: ["", "Hiding the main point makes the reader hunt for it.", "The topic sentence is part of the paragraph itself."],
            },
          },
        },
        {
          title: "Details that keep the promise",
          teach:
            "Supporting details are the reasons, examples, facts and small stories that keep the topic sentence's promise. For 'Owning a dog teaches responsibility,' you might write that a dog must be fed twice a day no matter what, that it needs walks even in the rain, and that a sick dog depends on you to notice. Every detail must connect back to the topic sentence. If one wanders off, like 'Puppies look adorable in sweaters,' cut it, even if you love it. A quick test: read each sentence and ask, 'Does this help prove my first sentence?' If not, it goes.",
          visual: {
            type: "highlight",
            prompt: "Topic: owning a dog teaches responsibility. Tap the sentence that wanders off topic.",
            sentences: [
              "A dog must be fed twice a day, no matter what.",
              "It needs a walk even when it is pouring rain.",
              "Puppies look adorable in little sweaters.",
              "A sick dog depends on you to notice something is wrong.",
            ],
            correct: [2],
          },
          think: {
            q: "Topic sentence: 'Gardening teaches patience.' Which detail supports it?",
            choices: [
              "Tomatoes are red.",
              "My neighbor has a big yard.",
              "Some people don't like vegetables.",
              "Seeds can take weeks to sprout, so you have to keep watering and wait.",
            ],
            answer: 3,
            why: "Waiting weeks while still caring for the seeds shows exactly how gardening builds patience.",
            hints: [
              "True, but it says nothing about patience.",
              "This is about a yard, not about learning patience.",
              "This drifts to a different topic, liking vegetables.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Supporting details are like the legs of a table. Each one has to hold up the tabletop, which is your topic sentence. A leg off to the side holds up nothing.",
            example:
              "Topic: 'Saturday chores make our weekend better.' Details that fit: 'We finish by lunch, so the afternoon is free.' 'A clean kitchen means pancakes on Sunday.' Detail to cut: 'My cousin lives in Ohio.'",
            simpler: {
              q: "Does every detail in a paragraph need to connect to the topic sentence?",
              choices: ["Yes", "No, any interesting fact is fine"],
              answer: 0,
              why: "Details exist to support the topic sentence; off-topic ones distract the reader.",
              hints: ["", "Interesting facts that don't connect make the paragraph wander and confuse the reader."],
            },
          },
        },
        {
          title: "Transitions are the mortar",
          teach:
            "Transitions are words that show how one idea connects to the next. Without them, a paragraph reads like a grocery list. Weak: 'Dogs need food. Dogs need walks. Dogs get sick.' Strong: 'First, dogs need food every day. Also, they need walks. Most importantly, when they get sick, they depend on you.' Different transitions do different jobs. 'First,' 'next' and 'finally' show order. 'Also' and 'in addition' add another point. 'For example' introduces proof. 'However' shows a contrast. 'Because of this' shows a result. Pick the one that matches what your next sentence is doing.",
          visual: {
            type: "flip",
            cards: [
              { front: "First, next, finally", back: "Show order or steps" },
              { front: "Also, in addition", back: "Add another point" },
              { front: "For example", back: "Introduce proof or an illustration" },
              { front: "However", back: "Show a contrast or a turn" },
              { front: "Because of this", back: "Show a result" },
            ],
          },
          think: {
            q: "'Our team practiced hard. ___, we lost the first game.' Which transition fits?",
            choices: ["For example", "However", "Also", "First"],
            answer: 1,
            why: "The second idea is the opposite of what you'd expect, so you need a contrast word.",
            hints: [
              "'For example' introduces proof, but losing isn't an example of practicing hard.",
              "",
              "'Also' adds a similar point, but losing pushes against practicing hard.",
              "'First' shows order, but this sentence is about a surprising contrast.",
            ],
          },
          approaches: {
            analogy:
              "Transitions are like turn signals on a car. They tell the reader which way your thinking is about to go before you turn.",
            example:
              "Without: 'I wanted a bike. I saved my allowance. I bought one.' With: 'I wanted a bike, so I saved my allowance for months. Finally, I bought one.' Now the reader feels the cause and the time passing.",
            simpler: {
              q: "Which transition shows order?",
              choices: ["However", "Next"],
              answer: 1,
              why: "'Next' tells the reader this step comes after the last one.",
              hints: ["'However' shows contrast, not order.", ""],
            },
          },
        },
        {
          title: "A conclusion that lands",
          teach:
            "The concluding sentence wraps up the paragraph. It should not just copy the topic sentence word for word; that feels like an echo. Instead, restate the point in fresh words or show why it matters. Weak: 'Owning a dog teaches responsibility.' (The same as the start.) Strong: 'Caring for a dog every single day turns a kid into someone others can count on.' It also shouldn't introduce a brand-new topic, like 'Cats are nice too.' A good conclusion makes the reader feel the paragraph is finished and the promise was kept.",
          visual: {
            type: "compare",
            left: { title: "Weak ending", points: ["Copies the topic sentence exactly", "Starts a new topic", "Lists every detail again"] },
            right: { title: "Strong ending", points: ["Says the point in fresh words", "Shows why it matters", "Feels finished"] },
          },
          think: {
            q: "Topic sentence: 'Learning to ride a bike takes patience.' Which is the best concluding sentence?",
            choices: [
              "Learning to ride a bike takes patience.",
              "Scooters are also fun.",
              "Every fall on the way was worth it on the day I finally rode down the block alone.",
            ],
            answer: 2,
            why: "It restates the idea of patience in fresh words and shows why it mattered.",
            hints: [
              "This copies the topic sentence exactly, so it feels like an echo instead of an ending.",
              "This starts a new topic just as the paragraph should be wrapping up.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A concluding sentence is like the last bite of a meal that makes you think, 'That was good.' It isn't a second appetizer, and it isn't a whole new dish.",
            example:
              "Topic: 'Reading before bed helps me sleep.' Weak ending: 'Reading before bed helps me sleep.' Strong ending: 'A few quiet chapters are the best way I know to switch off my busy brain.'",
            simpler: {
              q: "Should a concluding sentence introduce a brand-new topic?",
              choices: ["Yes", "No"],
              answer: 1,
              why: "The conclusion wraps up the current idea; a new topic would leave the reader hanging.",
              hints: ["A new topic at the end confuses readers. The conclusion should close, not open.", ""],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Unscramble this paragraph into the right order.",
        steps: [
          "Learning to cook a simple meal builds real confidence.",
          "First, you learn to follow a recipe step by step.",
          "Next, you discover how to fix small mistakes, like adding water to a sauce that is too thick.",
          "Finally, you set a hot plate of food in front of people who are happy to eat it.",
          "By the time the dishes are clean, you know you can take care of yourself and others.",
        ],
      },
      explain: {
        prompt: "Explain the parts of a strong paragraph and what each one does.",
        keyPoints: [
          "A topic sentence makes a clear promise.",
          "Supporting details all connect to and prove the topic sentence.",
          "Transitions connect ideas, and a concluding sentence wraps up in fresh words.",
        ],
      },
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
      hook: {
        text: "Want a later bedtime? Whining 'Pleeease!' ten times rarely works. A calm reason, a piece of proof and an answer to your parent's worry might. That is persuasion, and it works on paper too.",
        visual: {
          type: "compare",
          left: { title: "Arguing loudly", points: ["Repeats the same demand", "No proof", "Ignores the other side", "Makes people dig in"] },
          right: { title: "Persuading", points: ["Clear claim", "Solid evidence", "Explains why it matters", "Answers objections fairly"] },
        },
      },
      teach: [
        {
          title: "Start with a real claim",
          teach:
            "The claim is the position you're defending, stated in one sentence: 'Every kid should learn to cook.' A real claim must be something reasonable people could disagree about. 'Food is necessary' is not a claim, because nobody argues with it. That's just a fact. 'Pizza is the best food' is closer, but it's mostly taste, and taste is hard to prove. Strong claims are clear, specific and arguable: 'Every family should have a weekly game night.' 'Kids should learn to swim before age ten.' If no one would ever say 'I disagree,' you don't have a claim yet.",
          visual: {
            type: "sort",
            prompt: "Is it an arguable claim or just a fact?",
            buckets: ["Arguable claim", "Just a fact"],
            items: [
              { text: "Every kid should learn to cook.", bucket: 0 },
              { text: "Water freezes when it gets cold enough.", bucket: 1 },
              { text: "Families should have a weekly game night.", bucket: 0 },
              { text: "Some people eat breakfast.", bucket: 1 },
            ],
          },
          think: {
            q: "Which is a real claim for a persuasive paragraph?",
            choices: [
              "Dogs have four legs.",
              "The library has books.",
              "Kids should learn to swim before age ten.",
            ],
            answer: 2,
            why: "Reasonable people could disagree about it, so it needs reasons and evidence.",
            hints: [
              "Nobody disagrees with this. It's a fact, so there's nothing to argue.",
              "This is simply true. A claim needs to be something someone could push back on.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A claim is like the flag you plant at the top of a hill. You're saying, 'This is where I stand.' If everyone's already standing there, there's no hill to climb.",
            example:
              "Fact: 'Bikes have two wheels.' Turn it into a claim by taking a side: 'Kids should bike to nearby places instead of being driven.' Now someone could disagree, so you have something to argue.",
            simpler: {
              q: "Could someone reasonably disagree with 'Every kid should learn to cook'?",
              choices: ["Yes", "No"],
              answer: 0,
              why: "Some people might think kids are too busy or kitchens are too risky, so it's arguable.",
              hints: ["", "Think about a busy parent who worries about hot stoves. They might disagree."],
            },
          },
        },
        {
          title: "Bring evidence",
          teach:
            "Evidence is the support for your claim: facts, examples, numbers, expert knowledge or your own experience. Weak support is just repeating the claim: 'Kids should cook because cooking is good.' That proves nothing. Strong evidence is specific: 'Doubling a cookie recipe means doubling 3/4 cup of flour, which is real fraction practice.' Or: 'A pot of homemade soup costs less than buying ready-made meals for the same number of people.' Good evidence is something a reader can check or picture. The more specific it is, the harder it is to wave away.",
          visual: {
            type: "highlight",
            prompt: "Claim: every kid should learn to cook. Tap the sentences that give real evidence.",
            sentences: [
              "Cooking is just good.",
              "Doubling a recipe means doubling fractions like 3/4 cup.",
              "Homemade meals usually cost less than ready-made food.",
              "Everyone knows this is true.",
            ],
            correct: [1, 2],
          },
          think: {
            q: "Claim: 'Kids should get regular exercise.' Which is the strongest evidence?",
            choices: [
              "Exercise is good because it is good.",
              "Running and playing make your heart and lungs stronger.",
              "Everyone says so.",
              "I just think it's right.",
            ],
            answer: 1,
            why: "It gives a specific, checkable fact about how exercise helps the body.",
            hints: [
              "This repeats the claim in a circle. It doesn't add any proof.",
              "",
              "'Everyone says so' isn't proof. Point to a fact or example.",
              "Your opinion is the claim, not the evidence. What fact backs it up?",
            ],
          },
          approaches: {
            analogy:
              "Evidence is like the ingredients in a cake. You can say 'I made a cake,' but without flour and eggs, there's nothing there.",
            example:
              "Claim: 'Game night is good for families.' Weak: 'It's fun.' Strong: 'At our game night, my little brother and I have to take turns and lose without sulking, which we practice every week.'",
            simpler: {
              q: "Which is evidence: an example or just repeating your claim?",
              choices: ["Repeating the claim", "A specific example"],
              answer: 1,
              why: "A specific example supports the claim; repeating it adds nothing.",
              hints: ["Saying the same thing again doesn't prove it.", ""],
            },
          },
        },
        {
          title: "Build the reasoning bridge",
          teach:
            "Reasoning explains why your evidence proves your claim. Many writers skip this, and their arguments collapse. They drop a fact and walk away, leaving the reader to guess. Weak: 'Kids should cook. Recipes use fractions.' The reader wonders, so what? Strong: 'Kids should cook. Recipes use fractions, and because cooking makes math practical, kids who cook see why math matters.' Reasoning often starts with words like 'because,' 'this shows,' 'which means' or 'so.' Think of it as connecting the dots out loud so the reader doesn't have to.",
          visual: {
            type: "compare",
            left: { title: "Fact dropped", points: ["Kids should cook.", "Recipes use fractions.", "(Reader: so what?)"] },
            right: { title: "Fact explained", points: ["Kids should cook.", "Recipes use fractions.", "This makes math practical, so kids see why it matters."] },
          },
          think: {
            q: "Evidence: 'Swimming lessons teach kids what to do if they fall into water.' Which sentence is the reasoning?",
            choices: [
              "Pools are blue.",
              "Swimming is a sport.",
              "Lots of kids like summer.",
              "This means a child who knows how to swim is much safer near lakes and pools.",
            ],
            answer: 3,
            why: "It explains why the evidence supports learning to swim: it makes kids safer.",
            hints: [
              "This is a random fact. Reasoning connects the evidence to the claim.",
              "True, but it doesn't explain why the evidence matters.",
              "This changes the subject instead of connecting the dots.",
              "",
            ],
          },
          approaches: {
            analogy:
              "If the claim is one side of a river and the evidence is the other, reasoning is the bridge. Without it, the reader can see both sides but can't get across.",
            example:
              "Claim: 'Kids should read every day.' Evidence: 'Readers meet thousands of new words.' Reasoning: 'Because they know more words, they understand harder books and write more clearly.'",
            simpler: {
              q: "Which word often starts reasoning?",
              choices: ["because", "once upon a time"],
              answer: 0,
              why: "'Because' signals that you're explaining why something is true.",
              hints: ["", "That starts a fairy tale, not an explanation."],
            },
          },
        },
        {
          title: "Answer the other side",
          teach:
            "A counterargument is the strongest point from someone who disagrees with you. Imagine the smartest person on the other side. What would they say? 'Kitchens are dangerous, and kids are busy.' State it fairly, without mocking, then respond: 'Kitchens do have hot stoves and sharp knives, but that's exactly why kids should learn safe habits early, with an adult nearby.' Weak writers ignore objections or insult people who disagree. Strong writers face them. Lincoln, as a lawyer, often stated the other side's best point himself before showing why his was stronger. Readers trust a writer who is fair.",
          visual: {
            type: "sequence",
            prompt: "How to handle a counterargument, in order",
            steps: [
              "Imagine the smartest person who disagrees",
              "State their best point fairly",
              "Admit what is true about it",
              "Explain why your claim still holds",
            ],
          },
          think: {
            q: "Claim: 'Every family should have a game night.' Which is the best way to handle an objection?",
            choices: [
              "People who don't like games are boring.",
              "Some families are busy, but even one hour a week can fit, and it's time everyone looks forward to.",
              "Ignore any objections completely.",
            ],
            answer: 1,
            why: "It states a real objection fairly and then answers it with a reason.",
            hints: [
              "Insulting people makes readers trust you less, not more.",
              "",
              "Ignoring objections makes it look like you haven't thought them through.",
            ],
          },
          approaches: {
            analogy:
              "Answering a counterargument is like a chess player thinking about the opponent's next move. If you plan for it, it can't surprise you.",
            example:
              "Claim: 'Kids should walk to school when it's close.' Objection: 'Bad weather.' Response: 'Rainy days are real, but a raincoat and boots handle most of them, and on stormy days a ride is fine.'",
            simpler: {
              q: "A counterargument is a point from...",
              choices: ["Someone who agrees with you", "Someone who disagrees with you"],
              answer: 1,
              why: "It's the other side's view, which you then answer.",
              hints: ["People who agree are on your side. 'Counter' means against.", ""],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Claim: every kid should learn to cook. Sort each sentence by its job.",
        buckets: ["Claim", "Evidence", "Reasoning", "Counterargument"],
        items: [
          { text: "Every kid should learn to cook.", bucket: 0 },
          { text: "Doubling a recipe means working with fractions like 3/4 cup.", bucket: 1 },
          { text: "Homemade meals usually cost less than ready-made food.", bucket: 1 },
          { text: "This makes math practical, so kids see why it matters.", bucket: 2 },
          { text: "Because they can feed themselves, kids become more independent.", bucket: 2 },
          { text: "Some say kitchens are too dangerous for kids.", bucket: 3 },
          { text: "Others argue kids are too busy to cook.", bucket: 3 },
        ],
      },
      explain: {
        prompt: "Explain how to write a persuasive paragraph that actually changes someone's mind.",
        keyPoints: [
          "State a clear claim that people could disagree with.",
          "Support it with specific evidence.",
          "Explain the reasoning that connects evidence to claim.",
          "Answer the other side fairly.",
        ],
      },
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
      hook: {
        text: "'I was scared.' Or: 'My fingers locked around the ladder rung, and my knees would not bend.' Which one made your stomach drop? Great storytellers know the difference, and today you will too.",
        visual: {
          type: "compare",
          left: { title: "Telling", points: ["I was scared.", "It was cold.", "He was angry."] },
          right: { title: "Showing", points: ["My knees would not bend.", "Frost crunched under my boots.", "He slammed the door so hard the plates rattled."] },
        },
      },
      teach: [
        {
          title: "The shape of a story",
          teach:
            "Every good story follows a shape called the narrative arc. Picture a hill. The setup is the bottom: who, where and when. Keep it short; readers want to get moving. The conflict starts the climb: something goes wrong, or someone wants something they can't easily get. The climax is the top of the hill, the moment of greatest tension, when things must turn one way or the other. The resolution brings you down the other side: the problem is settled, and often the main character has changed. A weak story wanders flat. A strong story climbs, peaks and lands.",
          visual: {
            type: "sequence",
            prompt: "Put the parts of the narrative arc in order.",
            steps: [
              "Setup: the summer I turned eleven, Grandpa asked me to help fix the roof.",
              "Conflict: I was terrified of heights and hadn't told anyone.",
              "Climax: rain started falling, and I froze halfway up the ladder.",
              "Resolution: Grandpa talked me down, and a week later I climbed up alone.",
            ],
          },
          think: {
            q: "Which part of the arc is the moment of greatest tension?",
            choices: ["Setup", "Climax", "Resolution", "Conflict"],
            answer: 1,
            why: "The climax is the top of the hill, where the story has to turn one way or the other.",
            hints: [
              "The setup is the calm beginning, before trouble starts.",
              "",
              "The resolution is after the tension, when things settle down.",
              "The conflict starts the tension, but it keeps building until the very top.",
            ],
          },
          approaches: {
            analogy:
              "A story is like a roller coaster. The slow ride to the start is the setup, the clanking climb is the conflict, the top before the drop is the climax, and the glide back to the station is the resolution.",
            example:
              "Setup: a girl moves to a new town. Conflict: she sits alone at lunch. Climax: she works up the nerve to join a table. Resolution: by spring, she's the one inviting new kids to sit down.",
            simpler: {
              q: "Which part of a story introduces who, where and when?",
              choices: ["Setup", "Climax"],
              answer: 0,
              why: "The setup sets the scene before the trouble begins.",
              hints: ["", "The climax is the tense high point, not the beginning."],
            },
          },
        },
        {
          title: "No conflict, no story",
          teach:
            "Without conflict, you don't have a story, only a description. 'I went to the beach. It was sunny. I swam. I went home.' Nothing goes wrong and nobody wants anything, so nothing pulls the reader forward. Conflict doesn't have to be a fight. It can be a want (you want to make the team), a fear (you're scared of the deep end), a problem (you're lost) or a choice (tell the truth or hide the broken vase). Add one: 'I went to the beach, but a riptide pulled me away from shore.' Now the reader needs to know what happens.",
          visual: {
            type: "sort",
            prompt: "Does it have conflict, or is it just description?",
            buckets: ["Has conflict", "Just description"],
            items: [
              { text: "I wanted to make the team, but I'd never played before.", bucket: 0 },
              { text: "The park had green grass and a bench.", bucket: 1 },
              { text: "I broke Mom's vase and heard her car pull in.", bucket: 0 },
              { text: "We ate dinner and watched the sunset.", bucket: 1 },
            ],
          },
          think: {
            q: "Which opening has a conflict that pulls the reader in?",
            choices: [
              "We went to the store and bought milk.",
              "My room is painted blue.",
              "The morning of the spelling bee, I woke up with no voice.",
              "It was a regular Tuesday.",
            ],
            answer: 2,
            why: "A problem appears right away, so the reader wants to know how it turns out.",
            hints: [
              "Nothing goes wrong here. It's an errand, not a story yet.",
              "This is description. Nobody wants anything and nothing is at risk.",
              "",
              "This could start a story, but by itself nothing is wrong yet.",
            ],
          },
          approaches: {
            analogy:
              "Conflict is the engine of a story. A car can be beautiful, but without an engine it just sits in the driveway.",
            example:
              "No conflict: 'I baked a cake for Dad's birthday.' With conflict: 'I baked a cake for Dad's birthday, but I pulled it out of the oven twenty minutes before the party and it was still soup in the middle.'",
            simpler: {
              q: "Does a story conflict have to be a fight?",
              choices: ["Yes, always", "No, it can be a fear, a want or a problem"],
              answer: 1,
              why: "Any want, fear, problem or hard choice can drive a story.",
              hints: ["Many great stories have no fight at all, just a problem someone must solve.", ""],
            },
          },
        },
        {
          title: "Show, don't just tell",
          teach:
            "Telling reports a feeling: 'I was nervous.' Showing gives the details that let the reader feel it: 'My hands were slick with sweat, and my voice came out as a squeak.' Showing uses the senses. What did it look like, sound like, smell like, feel like? Telling: 'The kitchen smelled good.' Showing: 'The kitchen smelled of warm bread and cinnamon.' Telling: 'He was angry.' Showing: 'He slammed the door so hard the plates rattled.' You don't have to show everything; quick telling can move a story along. But at the big moments, show.",
          visual: {
            type: "highlight",
            prompt: "Tap the sentences that show instead of tell.",
            sentences: [
              "I was very nervous.",
              "My hands were slick with sweat, and my voice came out as a squeak.",
              "It was cold outside.",
              "Frost crunched under my boots, and my breath hung in the air.",
              "She was happy.",
            ],
            correct: [1, 3],
          },
          think: {
            q: "Which sentence best shows that a character is tired?",
            choices: [
              "She was really tired.",
              "She felt tiredness.",
              "Her eyelids drooped, and she yawned so wide her jaw clicked.",
            ],
            answer: 2,
            why: "Drooping eyelids and a huge yawn let the reader see the tiredness instead of being told.",
            hints: [
              "'Really' doesn't turn telling into showing. What would we see?",
              "This still names the feeling. Show what tiredness looks like.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Telling is like a friend saying 'The movie was scary.' Showing is like watching the scene yourself. You don't need to be told; you feel it.",
            example:
              "Telling: 'The dog was excited.' Ask: what would I see and hear? Showing: 'The dog spun in circles, tail thumping the wall, and let out a yip every time I touched the leash.'",
            simpler: {
              q: "Which uses a sense, like sound or touch?",
              choices: ["It was loud.", "Thunder cracked so hard the windows rattled."],
              answer: 1,
              why: "It gives the actual sound and its effect, so you can hear it.",
              hints: ["'Loud' names the idea but doesn't let you hear anything specific.", ""],
            },
          },
        },
        {
          title: "Let characters talk",
          teach:
            "Dialogue is the words characters say out loud, and a few lines can reveal personality faster than a paragraph of explaining. Compare: 'Grandpa was calm and kind and in charge.' With: 'Don't look down,' Grandpa said. 'Look at me.' The second shows all three qualities at once. Rules to remember: put the spoken words inside quotation marks, keep the comma or period inside the closing quotation mark, and start a new paragraph every time the speaker changes. That way the reader always knows who's talking, even without 'he said' on every line.",
          visual: {
            type: "flip",
            cards: [
              { front: "Quotation marks", back: "Go around the exact words someone says out loud" },
              { front: "Dialogue tag", back: "Words like 'Grandpa said' that tell who is speaking" },
              { front: "New speaker", back: "Start a new paragraph each time a different person talks" },
              { front: "Punctuation", back: "Commas and periods go inside the closing quotation mark" },
            ],
          },
          think: {
            q: "Two characters are talking back and forth. What should you do each time the speaker changes?",
            choices: [
              "Start a new paragraph",
              "Use all capital letters",
              "Leave out the quotation marks",
              "Put everything in one long paragraph",
            ],
            answer: 0,
            why: "A new paragraph for each speaker makes it clear who is talking.",
            hints: [
              "",
              "Capital letters look like shouting and don't show who is speaking.",
              "Quotation marks are what tell the reader which words are spoken.",
              "One big block makes it hard to tell who said what.",
            ],
          },
          approaches: {
            analogy:
              "Dialogue paragraphs are like a tennis match. Each time the ball crosses the net, it's the other player's turn, and each time the speaker changes, it's a new paragraph.",
            example:
              "Telling: 'My sister was bossy.' Dialogue: 'Not there,' Maya said, snatching the fork from my hand. 'Forks go on the left. Everyone knows that.' Now we hear her bossiness for ourselves.",
            simpler: {
              q: "What goes around the exact words someone says?",
              choices: ["Parentheses", "Quotation marks"],
              answer: 1,
              why: "Quotation marks show the reader which words are spoken aloud.",
              hints: ["Parentheses are for side comments, not speech.", ""],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "Tap every sentence that shows instead of tells.",
        sentences: [
          "I was scared of the ladder.",
          "My fingers locked around the rung, and my knees would not bend.",
          "The first raindrops tapped against my neck like cold fingertips.",
          "Grandpa was nice.",
          "Grandpa climbed up beside me, humming an old song under his breath.",
          "It was a good day in the end.",
        ],
        correct: [1, 2, 4],
      },
      explain: {
        prompt: "Explain what makes a story exciting to read, using what you learned.",
        keyPoints: [
          "It follows the arc: setup, conflict, climax and resolution.",
          "It has a conflict: a want, fear or problem.",
          "It shows with sensory details instead of only telling.",
          "Dialogue reveals characters, with quotation marks and a new paragraph for each speaker.",
        ],
      },
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
      hook: {
        text: "Most books are forgotten within ten years. A few are still gripping readers after a hundred and fifty. What do those books have that the others don't?",
        visual: {
          type: "timeline",
          events: [
            { year: 1719, label: "Robinson Crusoe", detail: "Daniel Defoe's shipwrecked man builds a life alone on an island." },
            { year: 1868, label: "Little Women", detail: "Louisa May Alcott follows four sisters growing up in hard times." },
            { year: 1872, label: "Around the World in Eighty Days", detail: "Jules Verne's race against the clock." },
            { year: 1876, label: "Tom Sawyer", detail: "Mark Twain's tale of mischief, adventure and buried treasure." },
            { year: 1883, label: "Treasure Island", detail: "Robert Louis Stevenson sends Jim Hawkins to sea with pirates." },
            { year: 1903, label: "The Call of the Wild", detail: "Jack London follows Buck, a dog taken to the harsh Yukon." },
          ],
        },
      },
      teach: [
        {
          title: "Why classics last",
          teach:
            "A classic is a book people are still reading long after it was written. Classics last for two big reasons. First, they're about things that never go out of style: courage, friendship, loyalty, growing up, facing danger and figuring out who you are. Clothes and technology change, but people don't change much inside, so a reader today still feels the knot in the stomach when a character is trapped or betrayed. Second, they're well crafted, with vivid characters and sentences worth rereading. A book that's only about a fad fades with the fad. A book about courage never does.",
          visual: {
            type: "sort",
            prompt: "Which themes are timeless, and which go out of style?",
            buckets: ["Timeless", "Fades with time"],
            items: [
              { text: "Courage in danger", bucket: 0 },
              { text: "A popular dance from one summer", bucket: 1 },
              { text: "Loyalty between friends", bucket: 0 },
              { text: "Instructions for an old phone model", bucket: 1 },
            ],
          },
          think: {
            q: "Why can a reader today still enjoy a book written 150 years ago?",
            choices: [
              "Old books use only easy words.",
              "Its themes, like courage and friendship, still matter to people.",
              "Everyone is required to like it.",
              "It has the newest technology in it.",
            ],
            answer: 1,
            why: "People still face fear, friendship and growing up, so those stories still speak to us.",
            hints: [
              "Many classics actually have challenging words. That isn't why they last.",
              "",
              "Being assigned a book doesn't make people love it for generations.",
              "Old books have old technology. What they share with us is feelings, not gadgets.",
            ],
          },
          approaches: {
            analogy:
              "A classic is like a favorite song your grandparents and you both love. The style is old, but the feeling in it still hits.",
            example:
              "In Treasure Island, Jim Hawkins has to decide whether to trust Long John Silver. Nobody you know sails with pirates, but everyone has had to decide whether to trust someone. That's why the book still works.",
            simpler: {
              q: "Which theme is timeless?",
              choices: ["Friendship", "Last year's toy craze"],
              answer: 0,
              why: "People in every age have friends, so stories about friendship last.",
              hints: ["", "A toy craze is fun for a while but fades fast."],
            },
          },
        },
        {
          title: "Meet some classics",
          teach:
            "Here are classics that readers your age often love, all old enough to be free to read online. Treasure Island by Robert Louis Stevenson: young Jim Hawkins sails with pirates and the unforgettable Long John Silver. Robinson Crusoe by Daniel Defoe: a shipwrecked man builds a life alone on an island. The Call of the Wild by Jack London: Buck, a dog stolen from a comfy home, must survive the harsh Yukon. Little Women by Louisa May Alcott: four sisters grow up in hard times. Around the World in Eighty Days by Jules Verne: a race against the clock. Tom Sawyer by Mark Twain: mischief and buried treasure.",
          visual: {
            type: "flip",
            cards: [
              { front: "Treasure Island", back: "Robert Louis Stevenson: Jim Hawkins, pirates and Long John Silver" },
              { front: "Robinson Crusoe", back: "Daniel Defoe: a shipwrecked man alone on an island" },
              { front: "The Call of the Wild", back: "Jack London: Buck the dog survives the Yukon" },
              { front: "Little Women", back: "Louisa May Alcott: four sisters growing up" },
              { front: "Around the World in Eighty Days", back: "Jules Verne: a race against the clock" },
              { front: "The Adventures of Tom Sawyer", back: "Mark Twain: mischief, adventure and buried treasure" },
            ],
          },
          think: {
            q: "If you love survival stories about being alone in the wild, which classic fits best?",
            choices: ["Little Women", "Tom Sawyer", "Around the World in Eighty Days", "Robinson Crusoe"],
            answer: 3,
            why: "Robinson Crusoe is about a shipwrecked man surviving alone on an island.",
            hints: [
              "Little Women is about sisters growing up at home, not surviving in the wild.",
              "Tom Sawyer is full of adventure, but it's set in a busy town, not alone in the wild.",
              "This is a race around the world with a companion, not a lone survival story.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Choosing a classic is like choosing a trail at a park. Each one leads somewhere different: the sea, the snow, a family home. Pick the one that matches the adventure you want.",
            example:
              "A kid who loves dogs and tough adventures might try The Call of the Wild. A kid who loves puzzles and deadlines might try Around the World in Eighty Days. Match the book to what you already enjoy.",
            simpler: {
              q: "Which book has pirates?",
              choices: ["Treasure Island", "Little Women"],
              answer: 0,
              why: "Treasure Island is full of pirates, including Long John Silver.",
              hints: ["", "Little Women is about four sisters, with no pirates at all."],
            },
          },
        },
        {
          title: "The four parts of a review",
          teach:
            "Writing a review helps you think about a book after you finish it. A good review has four parts, in order. First, a short summary of the beginning that does not give away the ending. Spoilers ruin the book for the next reader. Second, your opinion: did you like it, and how much? Third, your reasons with specific examples: a character you admired, a scene that stuck with you, a line you loved. Fourth, a recommendation: who would enjoy this book? Weak reviews jump straight to 'It was good' or retell the whole plot. Strong reviews follow the four steps.",
          visual: {
            type: "sequence",
            prompt: "Put the parts of a book review in order.",
            steps: [
              "Summary: Buck lives a comfortable life until he is stolen and sent north.",
              "Opinion: I loved this book.",
              "Reasons: Buck changes from a pampered pet into a survivor, and every chapter tested him.",
              "Recommendation: anyone who loves animals and tough adventures should read it.",
            ],
          },
          think: {
            q: "What should the summary part of a review avoid?",
            choices: ["Naming the main character", "Giving away the ending", "Describing the setting"],
            answer: 1,
            why: "A spoiler-free summary helps others decide to read without ruining the surprise.",
            hints: [
              "Naming the main character is helpful. Readers need to know who the story is about.",
              "",
              "The setting is useful information and doesn't spoil anything.",
            ],
          },
          approaches: {
            analogy:
              "A book review is like a movie trailer plus a friend's advice. The trailer shows the start without the ending, and the friend says what they thought and who should go see it.",
            example:
              "Summary: 'Jim Hawkins finds a treasure map in a dead pirate's chest.' Opinion: 'This is one of my favorites.' Reason: 'Long John Silver is friendly one minute and dangerous the next, so I never knew who to trust.' Recommendation: 'Great for anyone who likes suspense.'",
            simpler: {
              q: "Which part of a review says who would enjoy the book?",
              choices: ["The summary", "The recommendation"],
              answer: 1,
              why: "The recommendation tells readers who the book is right for.",
              hints: ["The summary describes the beginning of the story, not who should read it.", ""],
            },
          },
        },
        {
          title: "The power of 'because'",
          teach:
            "The most important word in a review is 'because.' It turns an empty opinion into a real one. Weak: 'I liked it.' That tells the reader almost nothing. Strong: 'I liked it because Buck changes from a pampered pet into a survivor, and I couldn't stop reading to see what he would become.' Now the reader knows what the book is like and why it worked for you. After any opinion, ask yourself, 'Why?' and write the answer with a specific example from the book: a character, a scene or a line. One good 'because' is worth ten 'it was goods.'",
          visual: {
            type: "compare",
            left: { title: "Empty opinion", points: ["It was good.", "I liked it a lot.", "It was boring."] },
            right: { title: "Opinion with because", points: ["It was good because every chapter ended on a cliffhanger.", "I liked it because the sisters felt like real people.", "The middle dragged because the same scene repeated."] },
          },
          think: {
            q: "Which review sentence is strongest?",
            choices: [
              "It was good.",
              "Everyone should read it.",
              "I loved it because Jim's courage grows as he outwits the pirates.",
              "I liked it a lot, a lot.",
            ],
            answer: 2,
            why: "It gives an opinion and a specific reason from the book, joined by 'because.'",
            hints: [
              "This is an opinion with no reason. Ask yourself, 'Why was it good?'",
              "A recommendation without a reason doesn't tell readers why they'd enjoy it.",
              "",
              "Repeating 'a lot' adds feeling but no reason. Add a 'because.'",
            ],
          },
          approaches: {
            analogy:
              "An opinion without 'because' is like a door with no handle. The reader can see it, but they can't get in.",
            example:
              "Before: 'Robinson Crusoe was cool.' Ask why. After: 'Robinson Crusoe was cool because he figured out how to make bread, pottery and a shelter with almost nothing, and I kept wondering what I would have built.'",
            simpler: {
              q: "Which sentence gives a reason?",
              choices: ["I liked it.", "I liked it because the ending surprised me."],
              answer: 1,
              why: "The word 'because' introduces a reason for the opinion.",
              hints: ["This states an opinion but doesn't say why.", ""],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each review sentence into its part of the review.",
        buckets: ["Summary", "Opinion", "Reason", "Recommendation"],
        items: [
          { text: "Jim Hawkins finds a treasure map in an old sea chest.", bucket: 0 },
          { text: "Buck is stolen from his comfortable home and sent north.", bucket: 0 },
          { text: "This is one of the best books I have ever read.", bucket: 1 },
          { text: "I enjoyed it, though the middle was slow.", bucket: 1 },
          { text: "Long John Silver kept me guessing because he switches sides so often.", bucket: 2 },
          { text: "The storm scene felt so real I could almost taste the salt spray.", bucket: 2 },
          { text: "Anyone who loves suspense and sea adventures should read it.", bucket: 3 },
          { text: "Readers who like animals and survival stories will enjoy it.", bucket: 3 },
        ],
      },
      explain: {
        prompt: "Explain why some books become classics and how to write a strong book review.",
        keyPoints: [
          "Classics explore timeless experiences like courage and friendship and are well crafted.",
          "A review has a spoiler-free summary, an opinion, reasons and a recommendation.",
          "Opinions need specific reasons, often joined with 'because.'",
        ],
      },
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
