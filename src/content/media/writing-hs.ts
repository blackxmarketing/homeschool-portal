import type { CourseMedia } from "./types";

/** Slides and videos for the writing-hs lessons, keyed by lesson id. */
export const writingHsMedia: CourseMedia = {
  "writing-hs.rhetoric": {
    hook: {
      show: [
        { caption: "Gettysburg, Pennsylvania: one ceremony, two very different speeches.", big: "Nov. 19, 1863" },
        { at: "spoke at Gettysburg for about two hours", caption: "Edward Everett, the most famous orator of his day, spoke first.", photo: "Edward Everett" },
        { at: "spoke for about two minutes", caption: "Then Lincoln spoke for about two minutes.", big: "2 hours vs. 2 minutes" },
        { at: "What did Lincoln's few words do", caption: "Why do some words move people, and others fade?", emoji: "🤔📜" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Aristotle studied why some speeches persuade and others fall flat.", photo: "Aristotle" },
          { at: "which the Greeks called ethos", caption: "Ethos: we trust a speaker who is knowledgeable, honest and well-meaning.", emoji: "🧑‍🏫🤝" },
          { at: "called pathos", caption: "Pathos: what the audience feels shapes what it decides.", emoji: "😢😊😠" },
          { at: "called logos", caption: "Logos: the reasoning that holds up when you check every line.", emoji: "🧠📏" },
          { at: "A complete persuader controls all three", caption: "Speaker, listener, message: a great speech uses all three.", big: "Ethos + Pathos + Logos" },
        ],
      },
      {
        show: [
          { caption: "Ethos answers one question: why should we trust you?", emoji: "🤝❓" },
          { at: "honesty about bad news", caption: "Admitting hard truths is one of the surest ways to earn trust.", emoji: "📰😬" },
          { at: "On June 4, 1940", caption: "Winston Churchill reported to Parliament after Dunkirk.", photo: "Winston Churchill" },
          { at: "Wars are not won by evacuations", caption: "He refused to call a rescue a victory, so people believed him.", big: "\"Wars are not won by evacuations.\"" },
          { at: "Lincoln built ethos through humility", caption: "Lincoln claimed the world would not remember his words. It did.", emoji: "🎩🙇" },
        ],
      },
      {
        show: [
          { caption: "Emotion is not the enemy of reason, if it fits the facts.", emoji: "❤️🧠" },
          { at: "Pericles, honoring Athens' war dead", caption: "Pericles speaking in Athens, as a 19th-century painter imagined it.", photo: "Pericles' Funeral Oration" },
          { at: "we can not dedicate", caption: "Lincoln's repetition builds feeling, step by step.", big: "dedicate · consecrate · hallow" },
          { at: "Honest pathos uses vivid, true images", caption: "Honest pathos: true images and shared values.", emoji: "🖼️✅" },
          { at: "Manipulative pathos", caption: "Manipulation inflates fear or anger so people stop thinking.", emoji: "😱⚠️" },
        ],
      },
      {
        show: [
          { caption: "Logos: strip away the voice and test the argument on paper.", emoji: "📄🔍" },
          { at: "Lincoln's Gettysburg Address is short", caption: "The crowd at Gettysburg. About 270 words, every step of logic there.", photo: "Gettysburg Address" },
          { at: "First premise", caption: "Premise: the nation was founded on liberty and equality.", big: "Premise → Premise → Conclusion" },
          { at: "Conclusion: the living must dedicate", caption: "The conclusion follows: the living must finish the work.", big: "So: finish the work" },
          { at: "accurate evidence and steps", caption: "Good logos: true facts, steps a careful listener could check.", emoji: "✅🧩" },
        ],
      },
    ],
  },

  "writing-hs.argument": {
    hook: {
      show: [
        { caption: "Repeating 'My client is innocent!' wins no trials.", emoji: "⚖️🏛️" },
        { at: "The jury needs", caption: "A jury needs a theory, evidence, reasons and an answer to the other side.", emoji: "👥📋" },
        { at: "trial on paper", caption: "Your reader is the jury. Make your case.", big: "Essay = a trial on paper" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "The thesis: the one claim your whole essay exists to prove.", emoji: "🎯" },
          { at: "First, it is arguable", caption: "Test 1: could a thoughtful person disagree?", big: "Arguable" },
          { at: "Second, it is specific", caption: "Test 2: does it say exactly what you claim?", big: "Specific" },
          { at: "Third, it is limited", caption: "Test 3: can you defend it in the space you have?", big: "Limited" },
          { at: "previews the reasons", caption: "A strong thesis is a map of the essay to come.", emoji: "🗺️📜" },
        ],
      },
      {
        show: [
          { caption: "Evidence: facts, examples, expert testimony, quotations.", emoji: "🔍📊" },
          { at: "Is it relevant", caption: "Does it bear on the claim, or just the topic?", big: "Relevant?" },
          { at: "Is it sufficient", caption: "One story about your cousin can't prove a rule.", big: "Sufficient?" },
          { at: "Is it credible", caption: "Does the source know the subject, with no reason to mislead?", big: "Credible?" },
          { at: "the testing effect", caption: "Practicing recall makes learning last: the testing effect.", emoji: "🧠🔁" },
        ],
      },
      {
        show: [
          { caption: "Evidence never speaks for itself. Reasoning is the bridge.", emoji: "🌉" },
          { at: "Stephen Toulmin described arguments", caption: "Philosopher Stephen Toulmin mapped how arguments really work.", big: "Toulmin, 1958" },
          { at: "The warrant is", caption: "The warrant is the principle that links data to claim.", big: "Data → Warrant → Claim" },
          { at: "anything students complain about", caption: "Say a hidden warrant out loud, and a weak one collapses.", emoji: "🙄❌" },
          { at: "Good writers make the warrant explicit", caption: "Signal words: because, this matters since, which means.", big: "because · which means" },
        ],
      },
      {
        show: [
          { caption: "Face the best objection a thoughtful opponent would raise.", emoji: "⚖️" },
          { at: "called a straw man", caption: "A straw man is easy to knock down because it isn't the real opponent.", photo: "Scarecrow" },
          { at: "Granted, class time is precious", caption: "Concede what's true, then turn.", big: "Granted... Yet..." },
          { at: "Lincoln, trained as a courtroom lawyer", caption: "Lincoln stated the other side's case fairly, then answered it.", emoji: "🎩⚖️" },
        ],
      },
    ],
  },

  "writing-hs.literary-analysis": {
    hook: {
      show: [
        { caption: "Shakespeare's Macbeth: one image returns again and again.", emoji: "🩸✋" },
        { at: "A little water clears us of this deed", caption: "Act 2: Lady Macbeth is confident guilt will wash away.", big: "\"A little water clears us of this deed.\"" },
        { at: "will these hands ne'er be clean", caption: "Act 5: she can't stop scrubbing.", big: "\"What, will these hands ne'er be clean?\"" },
        { at: "Learning to notice that", caption: "Noticing patterns like this is literary analysis.", emoji: "🔎📖" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "A topic is a word. A theme is a sentence about life.", big: "Topic ≠ Theme" },
          { at: "Macbeth's topic is ambition", caption: "Shakespeare wrote Macbeth around 1606.", photo: "William Shakespeare" },
          { at: "The Odyssey's topic is homecoming", caption: "Odysseus' long voyage home: endurance and cunning.", emoji: "⛵🏠" },
          { at: "Themes are inferred", caption: "Find themes in what characters want, choose and pay.", emoji: "🕵️" },
          { at: "avoids clichés", caption: "Skip clichés and commands. Name a real insight.", big: "Not: \"Crime doesn't pay.\"" },
        ],
      },
      {
        show: [
          { caption: "A symbol: a concrete thing that carries a bigger idea.", emoji: "🔑➡️💡" },
          { at: "In Macbeth, blood", caption: "Blood begins as real blood and becomes guilt.", emoji: "🩸🌊" },
          { at: "Marley's chain", caption: "Marley's chain: cash-boxes, padlocks and ledgers.", photo: "Jacob Marley" },
          { at: "Penelope announces a contest", caption: "String the bow, shoot through twelve axes.", emoji: "🏹🪓" },
          { at: "a sign of who he truly is", caption: "Only the true king can string it.", big: "Bow = identity" },
        ],
      },
      {
        show: [
          { caption: "Two ways to reveal character: tell it or show it.", emoji: "🗣️👀" },
          { at: "Dickens calls Scrooge", caption: "Direct: Charles Dickens tells us exactly what Scrooge is like.", photo: "Charles Dickens" },
          { at: "Twain never tells us", caption: "Indirect: Tom's fence trick shows his cleverness.", photo: "The Adventures of Tom Sawyer" },
          { at: "A dynamic character", caption: "Dynamic characters change. Static ones stay the same.", emoji: "🐛➡️🦋" },
          { at: "Indirect evidence is usually stronger", caption: "Showing invites interpretation, and interpretation is analysis.", big: "Show > Tell" },
        ],
      },
      {
        show: [
          { caption: "Three moves build every analysis paragraph.", big: "Claim → Evidence → Commentary" },
          { at: "First, a claim", caption: "Claim: an arguable point about how the text works.", emoji: "🎯" },
          { at: "Third, commentary", caption: "Commentary: how the exact words create meaning.", emoji: "💬🧠" },
          { at: "For example", caption: "The model paragraph analyzes two lines from Macbeth.", emoji: "🩸📖" },
          { at: "Summary retells events", caption: "Summary retells. Analysis explains how and why.", big: "Summary ≠ Analysis" },
        ],
      },
    ],
  },

  "writing-hs.research": {
    hook: {
      show: [
        { caption: "Kitty Hawk, North Carolina, December 17, 1903.", photo: "Wright Flyer" },
        { at: "telegraphed their father", caption: "That evening the brothers telegraphed home.", emoji: "📨" },
        { at: "It actually lasted 59", caption: "Even an eyewitness source on the same day had an error.", big: "57 vs. 59 seconds" },
        { at: "how does a researcher decide", caption: "So how do you decide what to believe?", emoji: "🤔🔍" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "Sources come in layers, by distance from the event.", emoji: "📜📘📚" },
          { at: "A primary source was made at the time", caption: "Orville Wright. Letters and diaries by the Wrights are primary sources.", photo: "Wright brothers" },
          { at: "A secondary source analyzes", caption: "Secondary: a later book or article that interprets primary sources.", emoji: "📘🔍" },
          { at: "A tertiary source", caption: "Tertiary: an encyclopedia or textbook that summarizes.", emoji: "📚" },
          { at: "The categories depend on your question", caption: "The same document can be primary for one question, secondary for another.", big: "It depends on the question" },
        ],
      },
      {
        show: [
          { caption: "Not every source deserves your trust. Investigate.", emoji: "🕵️" },
          { at: "Author: who wrote this", caption: "Four questions for every source.", big: "Author · Date · Evidence · Purpose" },
          { at: "Purpose: was it written", caption: "Is it selling something or trying to win an argument?", emoji: "💰❓" },
          { at: "read laterally", caption: "Fact-checkers open new tabs to check an unfamiliar source.", emoji: "🗂️↔️" },
          { at: "Corroboration", caption: "Independent sources that agree are the strongest test.", big: "Corroboration" },
        ],
      },
      {
        show: [
          { caption: "Three honest ways to use a source.", big: "Quote · Paraphrase · Summarize" },
          { at: "government of the people", caption: "Quote when the exact wording matters, as with Lincoln.", photo: "Abraham Lincoln" },
          { at: "A paraphrase restates", caption: "Paraphrase: new words AND new sentence structure.", emoji: "🔄" },
          { at: "patchwriting", caption: "Swapping a few words is patchwriting, and it counts as plagiarism.", emoji: "🧩⚠️" },
          { at: "A summary condenses", caption: "Summary: the main idea, condensed. Still cited.", emoji: "🗜️" },
        ],
      },
      {
        show: [
          { caption: "MLA style: two linked parts.", emoji: "📑" },
          { at: "(McCullough 66)", caption: "In the sentence: author's last name and page, no comma.", big: "(McCullough 66)" },
          { at: "Works Cited page", caption: "At the end: every source, A to Z by last name.", emoji: "🔤📚" },
          { at: "McCullough, David", caption: "Historian David McCullough wrote The Wright Brothers (2015).", photo: "David McCullough" },
          { at: "exactly one entry", caption: "Each citation points to one Works Cited entry.", big: "Citation → Works Cited" },
        ],
      },
    ],
  },

  "writing-hs.style": {
    hook: {
      show: [
        { caption: "Blaise Pascal: mathematician, scientist and master of French prose.", photo: "Blaise Pascal" },
        { at: "longer than usual", caption: "A long letter, and an honest apology.", emoji: "📜📜📜" },
        { at: "cutting is harder than adding", caption: "Adding words is easy. Cutting takes thought.", emoji: "✂️" },
        { at: "decide what you really mean", caption: "Every cut forces a decision about meaning.", big: "Cut → Clarify" },
      ],
    },
    teach: [
      {
        show: [
          { caption: "George Orwell wrote six rules for clear writing in 1946.", photo: "George Orwell" },
          { at: "One: never use a figure", caption: "Stale images no longer make readers see anything.", big: "1. No stale images" },
          { at: "write 'use,' not 'utilize.'", caption: "Short words are usually clearer.", big: "use, not utilize" },
          { at: "Four: never use the passive", caption: "Active voice names who did what.", emoji: "👉🏃" },
          { at: "Six: break any of these rules", caption: "The rules serve clear thinking. They are not a cage.", big: "Rule 6: use judgment" },
        ],
      },
      {
        show: [
          { caption: "Active voice: the doer comes first.", big: "Churchill gave the speech." },
          { at: "The speech was given by Churchill", caption: "Passive voice: the doer comes last, after 'by.'", big: "The speech was given by Churchill." },
          { at: "Mistakes were made", caption: "Passive voice can hide who is responsible.", emoji: "🙈" },
          { at: "The tomb was built around 2500 BC", caption: "Passive fits when the doer is unknown or unimportant.", photo: "Great Pyramid of Giza" },
          { at: "say so", caption: "When you know who acted, say so.", emoji: "🗣️✅" },
        ],
      },
      {
        show: [
          { caption: "Clutter: words that add length without meaning.", emoji: "🗑️📝" },
          { at: "Wordy phrases", caption: "Five words where one will do.", big: "due to the fact that → because" },
          { at: "Redundancies", caption: "'Free gift': every gift is already free.", emoji: "🎁🎁" },
          { at: "Omit needless words", caption: "William Strunk Jr., The Elements of Style: 'Omit needless words.'", big: "Omit needless words." },
          { at: "respecting the reader's attention", caption: "Cutting respects the reader's time.", emoji: "🙏👀" },
        ],
      },
      {
        show: [
          { caption: "Can your reader see what you mean?", emoji: "👁️" },
          { at: "Concrete words name things", caption: "Concrete: things the senses can find.", emoji: "🍞🌊⚔️" },
          { at: "the race is not to the swift", caption: "Ecclesiastes uses a race and a battle: things you can picture.", big: "\"The race is not to the swift\"" },
          { at: "Objective considerations", caption: "Orwell's parody: you can't picture any of it.", big: "\"Objective considerations of contemporary phenomena\"" },
          { at: "Read your draft aloud", caption: "Your ear catches what your eye forgives.", emoji: "🗣️📄" },
        ],
      },
    ],
  },
};
