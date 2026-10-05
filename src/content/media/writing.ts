import type { CourseMedia } from "./types";

/** Slides (real photos, emoji pictures, big facts) and videos for the writing lessons, keyed by lesson id. */
export const writingMedia: CourseMedia = {
  "writing.close-reading": {
    hook: {
      show: [
        { caption: "Same page, same words. So why do two readers get such different things?", emoji: "👦📖👧" },
        { at: "It was about a race", caption: "Kid #1 tells you what happened. That's only the surface.", emoji: "🐢🏁🐇" },
        { at: "here is the line that proves it", caption: "Kid #2 names the idea AND points to the proof.", big: "Idea + Proof" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "A pencil is a close reader's most important tool.", emoji: "✏️📖" },
          { at: "you annotate", caption: "Readers have scribbled in margins for centuries. These notes are called marginalia.", photo: "Marginalia" },
          { at: "Circle a word you don't know", caption: "A quick code: underline, circle, question mark, margin note.", emoji: "〰️⭕❓📝" },
          { at: "use sticky notes", caption: "Borrowed book? Sticky notes leave clues without leaving marks.", emoji: "🗒️📚" },
          { at: "your thinking made visible", caption: "Your marks are a map back to the best parts.", big: "Thinking made visible" },
        ],
      },
      {
        show: [
          { caption: "Reading is a conversation: the book talks, you talk back.", emoji: "📖💬🤔" },
          { at: "Questions keep your brain switched on", caption: "Questions flip your brain from 'off' to 'on.'", emoji: "💡❓" },
          { at: "the hare lies down for a nap", caption: "Hares are fast. So why nap in the middle of a race? Worth asking!", photo: "European hare" },
          { at: "the hare is overconfident", caption: "One good question led straight to the big idea.", big: "Why? → Overconfident" },
        ],
      },
      {
        show: [
          { caption: "A topic is just a label, like the tab on a folder.", emoji: "📁🏷️" },
          { at: "A main idea is a full sentence", caption: "A main idea makes a point you could explain or prove.", big: "Topic: racing\nMain idea: steady effort wins" },
          { at: "label on a folder", caption: "Folder label = topic. A point to prove = main idea.", emoji: "📂➡️💡" },
          { at: "Racing is just the vehicle", caption: "Aesop's fables use simple animal stories to carry big lessons.", photo: "The Tortoise and the Hare" },
        ],
      },
      {
        show: [
          { caption: "Detectives use fingerprints as proof. Readers use exact details.", photo: "Fingerprint" },
          { at: "Weak evidence is vague", caption: "Vague: 'kind of lazy.' Specific: 'lay down for a nap.'", big: "Vague ❌  Specific ✅" },
          { at: "a short quotation or a precise detail", caption: "Quote the exact words, inside quotation marks.", emoji: "☝️📖" },
          { at: "Main idea plus evidence plus a short explanation", caption: "The three pieces of truly understanding a text.", big: "Idea + Evidence + Explanation" },
        ],
      },
    ],
  },

  "writing.great-sentences": {
    hook: {
      show: [
        { caption: "One plain sentence: nothing wrong with it, nothing special.", big: "The boy went across the yard." },
        { at: "crept across the yard", caption: "Change one verb and suddenly something is going on.", big: "The boy crept across the yard." },
        { at: "turned a shrug into a mystery", caption: "Who is he hiding from? One word made you wonder.", emoji: "🤷➡️🕵️" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Every sentence is built on a frame: a subject and a verb.", big: "Subject + Verb" },
          { at: "The hawk circled", caption: "Hawk = who. Circled = what it does.", photo: "Red-tailed hawk" },
          { at: "decoration hung on that frame", caption: "Extra words hang on the frame like ornaments on a tree.", big: "The hawk circled above the quiet field." },
          { at: "what is the subject doing", caption: "Two quick questions find the frame every time.", emoji: "🔍❓" },
        ],
      },
      {
        show: [
          { caption: "Weak verbs just say something happened. Strong verbs show how.", emoji: "💪🏃" },
          { at: "She burst into the room", caption: "Burst, tiptoed, stumbled: three verbs, three different scenes.", big: "burst · tiptoed · stumbled" },
          { at: "walked slowly", caption: "An adverb propping up a weak verb is a warning sign.", big: "walked slowly → trudged" },
          { at: "Try one sharper verb instead", caption: "Peter Roget made the thesaurus, a treasure chest of sharper words.", photo: "Peter Mark Roget" },
          { at: "hunt for your weakest verbs first", caption: "When you revise, go verb-hunting first.", emoji: "🔎✏️" },
        ],
      },
      {
        show: [
          { caption: "Concrete nouns name things your five senses can find.", emoji: "👀👂✋👅👃" },
          { at: "There was food on the table", caption: "'Food' is a category. Readers can't picture a category.", emoji: "❓🍽️" },
          { at: "A bowl of steaming chili", caption: "Now you can almost smell it.", photo: "Chili con carne" },
          { at: "a broken kite and three odd socks", caption: "Specific things tell us about the person, too.", emoji: "📚🪁🧦" },
          { at: "Readers remember pictures", caption: "Ask 'What exactly?' and write the answer.", big: "What exactly?" },
        ],
      },
      {
        show: [
          { caption: "Same-length sentences tick along like a clock: tick, tick, tick.", emoji: "⏰😴" },
          { at: "Short ones punch", caption: "Long sentences flow. Short ones punch.", big: "Short ones punch." },
          { at: "Due to the fact that it was raining", caption: "Trimming cut five words and lost nothing.", big: "Because it rained, we went inside." },
          { at: "Lincoln's Gettysburg Address", caption: "The crowd at Gettysburg, 1863. Lincoln's speech: only about 270 words.", photo: "Gettysburg Address" },
        ],
      },
    ],
  },

  "writing.paragraph": {
    hook: {
      show: [
        { caption: "A heap of bricks: all the parts, none of the strength.", emoji: "🧱🧱🧱" },
        { at: "how they fit together", caption: "Fit them together in order, and they hold each other up.", photo: "File:Red brick wall texture.JPG" },
        { at: "A paragraph is the same", caption: "This old mark, the pilcrow, once marked a new paragraph.", big: "¶" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "A paragraph is a team of sentences with one job.", emoji: "🤝📄" },
          { at: "Owning a dog teaches responsibility", caption: "A topic sentence promises what the paragraph will prove.", photo: "Golden Retriever" },
          { at: "Too broad", caption: "Too broad: that would take a whole book!", big: "Animals are interesting." },
          { at: "Too narrow", caption: "Too narrow: just a fact, nothing left to prove.", big: "My dog weighs forty pounds." },
          { at: "Just right", caption: "Not too big, not too small. Just right!", emoji: "🐻🥣✅" },
        ],
      },
      {
        show: [
          { caption: "Supporting details are the proof that keeps the promise.", emoji: "🧾✅" },
          { at: "fed twice a day", caption: "Feeding, walking, caring: every detail points back to the promise.", photo: "Dog walking" },
          { at: "Puppies look adorable in sweaters", caption: "Cute? Yes. On topic? No. Cut it!", emoji: "🐶🧶✂️" },
          { at: "Does this help prove my first sentence", caption: "Ask this about every sentence you write.", big: "Does it prove my point?" },
        ],
      },
      {
        show: [
          { caption: "Mortar is the glue between bricks. Transitions glue ideas.", photo: "Mortar (masonry)" },
          { at: "reads like a grocery list", caption: "No transitions? Choppy, like reading a list.", emoji: "📝🛒" },
          { at: "Most importantly", caption: "Now the ideas connect and build to the big one.", big: "First… Also… Most importantly…" },
          { at: "Different transitions do different jobs", caption: "Order, add, example, contrast, result: pick the right tool.", big: "next · also · for example · however" },
        ],
      },
      {
        show: [
          { caption: "The last sentence wraps the paragraph up like a bow.", emoji: "🎁🎀" },
          { at: "that feels like an echo", caption: "Repeating the first sentence word for word is just an echo.", emoji: "🔁🗣️" },
          { at: "turns a kid into someone others can count on", caption: "Same point, fresh words, and it shows why it matters.", big: "…someone others can count on." },
          { at: "Cats are nice too", caption: "A brand-new topic at the end? Save it for another paragraph.", photo: "Cat" },
        ],
      },
    ],
  },

  "writing.persuasive": {
    hook: {
      show: [
        { caption: "Whining ten times? Rarely works.", emoji: "😩🛏️⏰" },
        { at: "A calm reason", caption: "A reason, some proof, and an answer to the worry.", big: "Reason + Proof + Answer" },
        { at: "it works on paper too", caption: "Long ago, Aristotle wrote a whole book about persuasion.", photo: "Aristotle" },
      ],
      watch: { youtube: "3klMM9BkW5o", title: "How to use rhetoric to get what you want - Camille A. Langston", channel: "TED-Ed" },
    },
    teach: [
      {
        show: [
          { caption: "A claim is your position, stated in one clear sentence.", big: "Every kid should learn to cook." },
          { at: "Food is necessary", caption: "Nobody disagrees with a fact, so it's not a claim.", emoji: "🍎🤷" },
          { at: "Pizza is the best food", caption: "Mostly taste. Taste is hard to prove.", emoji: "🍕❓" },
          { at: "weekly game night", caption: "Clear, specific, arguable: a strong claim.", photo: "Chess" },
          { at: "I disagree", caption: "The test: could someone reasonably disagree?", big: "\"I disagree.\"" },
        ],
      },
      {
        show: [
          { caption: "Evidence: facts, examples, numbers, experts, experience.", emoji: "📊📚🧪" },
          { at: "cooking is good", caption: "Repeating your claim isn't proof. It's going in circles.", emoji: "🔄" },
          { at: "Doubling a cookie recipe", caption: "Double 3/4 cup and you get 1 1/2 cups. Real math!", photo: "Measuring cup" },
          { at: "A pot of homemade soup", caption: "Specific evidence a reader can check or picture.", photo: "Soup" },
        ],
      },
      {
        show: [
          { caption: "Reasoning is the bridge from your evidence to your claim.", photo: "Golden Gate Bridge" },
          { at: "their arguments collapse", caption: "No bridge? The reader is left on the other side asking 'so what?'", emoji: "🌉💥" },
          { at: "because cooking makes math practical", caption: "Reasoning connects the dots out loud.", big: "Claim → Evidence → Reasoning" },
          { at: "'because,' 'this shows,'", caption: "Bridge words that signal reasoning is coming.", big: "because · this shows · which means · so" },
        ],
      },
      {
        show: [
          { caption: "A counterargument is the other side's best point.", emoji: "⚖️" },
          { at: "Kitchens are dangerous", caption: "Hot stoves and sharp knives: a fair worry to answer.", emoji: "🔥🔪" },
          { at: "Weak writers ignore objections", caption: "Don't mock. Answer fairly, then show why you're right.", big: "State it fairly. Then respond." },
          { at: "Lincoln, as a lawyer", caption: "As a lawyer, Lincoln stated the other side's best point first.", photo: "Abraham Lincoln" },
        ],
      },
    ],
  },

  "writing.storytelling": {
    hook: {
      show: [
        { caption: "This just tells you a feeling.", big: "I was scared." },
        { at: "My fingers locked around the ladder rung", caption: "This one puts you right on the ladder.", emoji: "🪜😰" },
        { at: "made your stomach drop", caption: "Great storytellers make you feel it, not just hear it.", big: "Feel it, don't just hear it" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "A story's shape is like a hill: up, peak, and down.", emoji: "⛰️" },
          { at: "The setup is the bottom", caption: "Setup: who, where, when. Keep it quick!", emoji: "🧍🗺️🕰️" },
          { at: "The climax is the top of the hill", caption: "The climax: the biggest, most exciting moment at the very top.", emoji: "📈⛰️🎢" },
          { at: "A strong story climbs, peaks and lands", caption: "Setup → Conflict → Climax → Resolution.", big: "Climb · Peak · Land" },
        ],
      },
      {
        show: [
          { caption: "Without conflict, it's just a list of what happened.", emoji: "🏖️☀️😴" },
          { at: "Conflict doesn't have to be a fight", caption: "Conflict can be a want, a fear, a problem or a choice.", emoji: "🎯😱🧭🤔" },
          { at: "a riptide pulled me away from shore", caption: "Beach signs warn swimmers about rip currents. Now we need to know!", photo: "Rip current" },
          { at: "Now the reader needs to know what happens", caption: "Conflict pulls the reader forward.", big: "What happens next?!" },
        ],
      },
      {
        show: [
          { caption: "Telling names a feeling. Showing lets you feel it.", big: "Show, don't just tell" },
          { at: "My hands were slick with sweat", caption: "Sweaty hands and a squeaky voice: we feel the nerves.", emoji: "😰🎤" },
          { at: "warm bread and cinnamon", caption: "Can you almost smell it? That's showing.", photo: "Cinnamon roll" },
          { at: "He slammed the door", caption: "Rattling plates show anger without naming it.", emoji: "🚪💥🍽️" },
          { at: "at the big moments, show", caption: "Tell to move along. Show when it matters most.", big: "Big moment? Show it." },
        ],
      },
      {
        show: [
          { caption: "Dialogue lets characters reveal themselves by talking.", emoji: "🗣️💬" },
          { at: "Don't look down", caption: "Calm, kind and in charge, all in six words.", big: "\"Don't look down. Look at me.\"" },
          { at: "inside quotation marks", caption: "Quotation marks hug the exact words a character says.", big: "“ … ”" },
          { at: "keep the comma or period inside", caption: "Commas and periods go INSIDE the closing quotation mark.", big: "\"Look at me,\" Grandpa said." },
          { at: "start a new paragraph every time the speaker changes", caption: "New speaker, new paragraph. The reader never gets lost.", emoji: "↩️👤👤" },
        ],
      },
    ],
  },

  "writing.great-books": {
    hook: {
      show: [
        { caption: "Thousands of books are published every year.", photo: "Library of Trinity College Dublin" },
        { at: "Most books are forgotten", caption: "Most vanish within ten years.", emoji: "📚💨" },
        { at: "a hundred and fifty", caption: "A few are still thrilling readers after 150 years.", big: "150+ years" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "A classic is a book people keep reading for generations.", photo: "Library of Congress" },
          { at: "courage, friendship, loyalty", caption: "Big feelings never go out of style.", emoji: "🦁🤝🛡️" },
          { at: "people don't change much inside", caption: "Clothes and phones change. Hearts don't.", emoji: "📱➡️❤️" },
          { at: "well crafted", caption: "Mark Twain's books are still read, and quoted, today.", photo: "Mark Twain" },
        ],
      },
      {
        show: [
          { caption: "Treasure Island grew out of a pirate map Stevenson drew for fun.", photo: "File:Treasure-island-map.jpg" },
          { at: "Robinson Crusoe by Daniel Defoe", caption: "Written in 1719, it's one of the first English novels.", photo: "Robinson Crusoe" },
          { at: "The Call of the Wild by Jack London", caption: "Jack London went to the Yukon himself during the Gold Rush.", photo: "Jack London" },
          { at: "Little Women by Louisa May Alcott", caption: "Louisa May Alcott based the March sisters on her own family.", photo: "Louisa May Alcott" },
          { at: "Around the World in Eighty Days", caption: "Jules Verne also dreamed up submarines and trips to the Moon.", photo: "Jules Verne" },
        ],
      },
      {
        show: [
          { caption: "A review helps you think about a book after the last page.", emoji: "📖✍️⭐" },
          { at: "does not give away the ending", caption: "No spoilers! Let the next reader find out for themselves.", emoji: "🤫🚫" },
          { at: "your opinion", caption: "The four parts, always in this order.", big: "Summary → Opinion → Reasons → Recommend" },
          { at: "who would enjoy this book", caption: "Finish by telling who should read it next.", emoji: "👉📚😊" },
        ],
      },
      {
        show: [
          { caption: "The most powerful word in a review.", big: "because" },
          { at: "I liked it.", caption: "Empty: it tells the reader almost nothing.", emoji: "🤷" },
          { at: "Buck changes from a pampered pet", caption: "Buck, the dog in The Call of the Wild, became a survivor.", photo: "The Call of the Wild" },
          { at: "ask yourself, 'Why?'", caption: "After every opinion, ask why and give an example.", big: "Why? → Because…" },
        ],
      },
    ],
  },

  "writing.grammar": {
    hook: {
      show: [
        { caption: "Lewis Carroll filled a famous poem with made-up words.", photo: "Lewis Carroll" },
        { at: "Nobody knows what a tove", caption: "What is a tove? Nobody knows!", emoji: "🤔❓" },
        { at: "slithy describes it", caption: "Yet you can tell: tove is a thing, slithy describes, gyre is an action.", big: "thing · describer · action" },
        { at: "the parts of speech", caption: "Your brain already knows the parts of speech.", emoji: "🧠✨" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Every word in a sentence has a job.", emoji: "👷📝" },
          { at: "English has eight", caption: "Eight parts of speech, but five do most of the work.", big: "8 → 5" },
          { at: "A noun names", caption: "Nouns name things: sailor, harbor, rope, even courage.", emoji: "⚓⛵🪢" },
          { at: "A verb shows an action", caption: "Verbs show action or tell what something is.", big: "climbed · is" },
          { at: "backbone of the sentence", caption: "Noun + verb = the backbone of every sentence.", emoji: "🦴" },
        ],
      },
      {
        show: [
          { caption: "Describers add detail to the frame.", emoji: "🎨🖌️" },
          { at: "An adjective describes a noun", caption: "Adjectives describe nouns: which one, what kind, how many?", big: "the OLD sailor" },
          { at: "An adverb usually describes a verb", caption: "Adverbs answer how, when, where or how much.", big: "climbed QUICKLY" },
          { at: "Many adverbs end in -ly", caption: "Many end in -ly, but soon, never and very are adverbs too.", big: "-ly? Often. Always? No." },
          { at: "Here is a quick test", caption: "Point to the word being described. A noun means adjective.", emoji: "👉🔍" },
        ],
      },
      {
        show: [
          { caption: "Conjunctions are the connectors.", emoji: "🔗" },
          { at: "you get FANBOYS", caption: "FANBOYS: for, and, nor, but, or, yet, so.", big: "F·A·N·B·O·Y·S" },
          { at: "salt and pepper", caption: "'And' adds one thing to another.", photo: "Salt and pepper shakers" },
          { at: "Or offers a choice", caption: "'Or' offers a choice. 'So' shows a result.", emoji: "☕❓🍫" },
          { at: "put a comma before it", caption: "Joining two full sentences? Put a comma before the conjunction.", big: "The wind died, so the ship drifted." },
        ],
      },
      {
        show: [
          { caption: "The most important rule of all.", big: "The job decides" },
          { at: "We went for a run", caption: "'Went for a run': here run names a thing, so it's a noun.", photo: "Running" },
          { at: "We run every morning", caption: "'We run': here run is the action, so it's a verb.", emoji: "🏃🌅" },
          { at: "Fast works the same way", caption: "'Fast boat' is an adjective. 'Swam fast' is an adverb.", big: "fast boat · swam fast" },
          { at: "what the word is doing right now", caption: "Always ask: what is this word doing right now?", emoji: "🔍❓" },
        ],
      },
    ],
  },

  "writing.research-report": {
    hook: {
      show: [
        { caption: "In 1899 Wilbur Wright wrote to the Smithsonian for papers on flight.", photo: "Smithsonian Institution Building" },
        { at: "ran a bicycle shop", caption: "Two brothers who built and fixed bicycles in Dayton, Ohio.", emoji: "🚲🔧" },
        { at: "Four years later", caption: "Four years later, they flew.", emoji: "✈️🎉" },
        { at: "That is research", caption: "Questions, reading, testing and notes: that's research.", big: "Research" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Every report begins with a question.", emoji: "❓📄" },
          { at: "'Airplanes' is only a topic", caption: "'Airplanes' is a topic, not a question.", emoji: "✈️🏷️" },
          { at: "one fact answers it", caption: "One fact answers it, so there's nothing left to research.", big: "1903. Done." },
          { at: "How did the Wright brothers teach themselves", caption: "Orville Wright. How did he and Wilbur teach themselves to fly?", photo: "Wright brothers" },
          { at: "how or why", caption: "Strong questions often start with how or why.", big: "How? Why?" },
        ],
      },
      {
        show: [
          { caption: "Sources are the raw material of research.", emoji: "📚🔎" },
          { at: "A primary source comes from the time", caption: "A primary source: this photo was taken as the Flyer lifted off in 1903.", photo: "Wright Flyer" },
          { at: "A secondary source is written later", caption: "Secondary sources are written later: biographies, encyclopedias.", emoji: "📖🗂️" },
          { at: "Who wrote it?", caption: "Question every source.", big: "Who? What do they know? When?" },
          { at: "at least two sources", caption: "Check important facts in at least two sources.", big: "✓ ✓" },
        ],
      },
      {
        show: [
          { caption: "Good notes: short, accurate, in your own words.", emoji: "🗒️✏️" },
          { at: "Dec 17, 1903", caption: "A whole sentence shrinks to a few key facts.", big: "Dec 17, 1903 · Orville · 12 sec" },
          { at: "write the source next to it", caption: "Write the source beside every note.", emoji: "📌📚" },
          { at: "Plagiarism is a kind of stealing", caption: "Passing off someone's words as yours is stealing.", big: "Plagiarism = stealing" },
          { at: "inside quotation marks", caption: "Want the exact words? Use quotation marks and give credit.", big: "“ … ”" },
        ],
      },
      {
        show: [
          { caption: "Turn a pile of notes into a report.", emoji: "🗂️➡️📄" },
          { at: "sort your notes into groups", caption: "Each group of notes becomes one body paragraph.", emoji: "🧺🧺🧺" },
          { at: "called your thesis", caption: "Your thesis answers the question in one sentence.", big: "Thesis" },
          { at: "The body paragraphs prove", caption: "Body paragraphs prove it with facts. This memorial marks the first flight.", photo: "Wright Brothers National Memorial" },
          { at: "list your sources at the end", caption: "List your sources so readers can check your work.", emoji: "📚✅" },
        ],
      },
    ],
  },

  "writing.poetry": {
    hook: {
      show: [
        { caption: "A midnight ride, told in a poem people still memorize.", emoji: "🐎🌙🏮" },
        { at: "Henry Wadsworth Longfellow", caption: "Henry Wadsworth Longfellow, one of America's best-loved poets.", photo: "Henry Wadsworth Longfellow" },
        { at: "Why do poems stick", caption: "Why do poems stick in our memory?", emoji: "🧠📌" },
        { at: "The secret is music", caption: "Beat, rhyme and pictures working together.", big: "Beat + Rhyme + Pictures" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Words have syllables, and some get a stronger push.", big: "GAR-den" },
          { at: "Rhythm is the pattern", caption: "Rhythm is the pattern of strong and weak syllables.", emoji: "🥁" },
          { at: "Robert Frost wrote", caption: "Robert Frost, poet of New England woods and farms.", photo: "Robert Frost" },
          { at: "whose WOODS these ARE", caption: "Eight syllables, four strong beats.", big: "da-DUM da-DUM da-DUM da-DUM" },
          { at: "galloping rhythm", caption: "Longfellow's rhythm gallops like Revere's horse.", emoji: "🐎💨" },
        ],
      },
      {
        show: [
          { caption: "Rhyme: matching ending sounds.", big: "know · snow" },
          { at: "called a rhyme scheme", caption: "Each new ending sound gets the next letter.", big: "A, B, C…" },
          { at: "Robert Louis Stevenson's poem", caption: "Robert Louis Stevenson wrote A Child's Garden of Verses.", photo: "Robert Louis Stevenson" },
          { at: "The scheme is AABB", caption: "me, see, head, bed", big: "AABB" },
          { at: "it's AABA", caption: "know, though, here, snow", big: "AABA" },
        ],
      },
      {
        show: [
          { caption: "Imagery paints with all five senses.", emoji: "👀👂✋👃👅" },
          { at: "Weak poetry tells", caption: "Telling says 'It was quiet.' Showing lets you hear the quiet.", big: "Tell ❌  Show ✅" },
          { at: "easy wind and downy flake", caption: "You can almost hear the snow falling.", emoji: "🌬️❄️" },
          { at: "The Village Blacksmith", caption: "Longfellow's blacksmith: a mighty man with large and sinewy hands.", photo: "Blacksmith" },
          { at: "which sense each line reaches", caption: "Ask: which sense does this line reach?", emoji: "🤔👂" },
        ],
      },
      {
        show: [
          { caption: "Figurative language: surprising comparisons.", emoji: "🔀" },
          { at: "A simile makes the comparison", caption: "Similes compare with like or as.", big: "like · as" },
          { at: "has a face like the clock", caption: "'The moon has a face like the clock in the hall.'", photo: "Moon" },
          { at: "A metaphor is bolder", caption: "A metaphor says one thing IS another.", big: "Her early leaf's a flower." },
          { at: "I like apples", caption: "'I like apples' compares nothing, so it's not a simile!", emoji: "🍎🚫" },
        ],
      },
    ],
  },

  "writing.letters-speeches": {
    hook: {
      show: [
        { caption: "Grace Bedell, shown here grown up, wrote to Lincoln when she was eleven.", photo: "Grace Bedell" },
        { at: "grow a beard", caption: "Her advice: grow a beard!", emoji: "🧔✉️" },
        { at: "wearing a full beard", caption: "A few months later, Lincoln wore a full beard.", photo: "Abraham Lincoln" },
        { at: "One short, polite letter", caption: "One clear, polite letter made history.", big: "Purpose + Polite" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Two questions come before any letter or speech.", emoji: "❓❓" },
          { at: "what is my purpose", caption: "Purpose: the job your words must do.", big: "Purpose" },
          { at: "who is my audience", caption: "Audience: who will read or hear your words.", big: "Audience" },
          { at: "A thank-you note to your grandmother", caption: "Warm and chatty for Grandma.", emoji: "👵💌" },
          { at: "tour the fossil lab", caption: "Polite, clear and brief for a museum director.", photo: "Fossil" },
        ],
      },
      {
        show: [
          { caption: "Letters follow a pattern readers expect.", emoji: "✉️" },
          { at: "The heading comes first", caption: "Heading: the date at the top.", big: "March 12" },
          { at: "Next is the greeting", caption: "Greeting: a comma for friends, a colon for formal letters.", big: "Dear Aunt Ruth,\nDear Mr. Hayes:" },
          { at: "Then comes the body", caption: "Body: get to your purpose in the first sentence or two.", photo: "Letter (message)" },
          { at: "Last is your signature", caption: "Closing, then signature: goodbye and your name.", big: "Love,\nSam" },
        ],
      },
      {
        show: [
          { caption: "Tone is the attitude your words carry.", emoji: "🎭" },
          { at: "A friendly letter to a cousin", caption: "Friendly: jokes, contractions, exclamation points!", emoji: "🎣😄" },
          { at: "A formal letter to a business", caption: "Formal: complete, polite sentences and no slang.", photo: "Fountain pen" },
          { at: "Formal doesn't mean stiff", caption: "Formal means respectful and clear, not stiff.", big: "Respectful + Clear" },
          { at: "Grace Bedell's letter", caption: "Bold but polite: Grace's letter got an answer.", emoji: "✉️✅" },
        ],
      },
      {
        show: [
          { caption: "A speech is a letter delivered with your voice.", emoji: "🎤" },
          { at: "Open with a hook", caption: "Hook, purpose, two or three points, strong ending.", big: "Hook → Points → Ending" },
          { at: "Edward Everett spoke", caption: "Edward Everett, the main speaker, talked for about two hours.", photo: "Edward Everett" },
          { at: "about two minutes", caption: "Lincoln spoke for about two minutes.", big: "2 hours vs. 2 minutes" },
          { at: "the rule of three", caption: "The crowd at Gettysburg, 1863. Lincoln ended with a rule of three.", photo: "Gettysburg Address" },
        ],
      },
    ],
  },
};
