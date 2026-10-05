import type { Course } from "./types";
import { writing } from "./writing";

/**
 * Rhetoric & Composition: grades 9-12. Same teacher as the grades 6-8 course;
 * lessons written for this grade band. See types.ts for the lesson format.
 */
export const writingHs: Course = {
  ...writing,
  id: "writing-hs",
  band: "strategist",
  title: "Rhetoric & Composition",
  blurb: "High school writing: rhetoric, argument, literary analysis, research and style.",
  lessons: [
    // ------------------------------------------------------------------
    // 1. Rhetoric: ethos, pathos and logos
    // ------------------------------------------------------------------
    {
      id: "writing-hs.rhetoric",
      title: "Rhetoric: Ethos, Pathos and Logos",
      minutes: 35,
      stage: "rhetoric",
      subject: "Speaking",
      read: `Twenty-three centuries ago, Aristotle defined rhetoric as the ability to see, in any situation, the available means of persuasion. He was not collecting tricks. He wanted to know why some speeches move people to wise action while others fall flat, and he concluded that every persuasive appeal works through one of three channels.

Ethos is the character of the speaker. We believe people we trust: people who know the subject, who mean us well and who have shown good judgment. A speaker builds ethos by being accurate, fair and honest, especially about bad news.

Pathos is the state of mind of the audience. Aristotle noticed that we judge differently when we are grieving, angry, hopeful or afraid. A good speaker does not manufacture feelings out of nothing. He helps the audience feel what the facts deserve.

Logos is the reasoning in the words themselves: evidence, examples and logical steps from premises to a conclusion. Logos is what remains when you write the speech down and test it line by line.

The great speeches of history braid all three. In 431 BC, after the first year of war with Sparta, Pericles honored the Athenian dead. In the version recorded by the historian Thucydides, he spends most of the speech praising the city's laws and way of life, giving grieving families a reason to believe the sacrifice had meaning. In 1863 at Gettysburg, Abraham Lincoln spoke for about two minutes, after Edward Everett's two-hour oration, and tied the soldiers' deaths to the nation's founding promise. In June 1940, after the evacuation from Dunkirk, Winston Churchill told Parliament the hard truth: "Wars are not won by evacuations." Only then did he promise that Britain would fight on the beaches and never surrender. His honesty about the disaster made his defiance believable.

When you analyze a speech, ask three questions. Why should I trust this speaker? What does this speech make me feel, and is that feeling deserved? What is the actual argument? When you write, use all three, and use them honestly. Rhetoric without truth is manipulation; truth without rhetoric often goes unheard.`,
      keyIdeas: [
        "Aristotle named three means of persuasion: ethos (the speaker's character), pathos (the audience's emotions) and logos (the reasoning).",
        "Ethos is earned by knowledge, goodwill and honesty, especially honesty about bad news.",
        "Pathos is legitimate when it helps people feel what the facts deserve; logos is the argument that survives on paper.",
        "Great speeches, from Pericles to Lincoln to Churchill, braid all three appeals together.",
      ],
      hook: {
        text: "On November 19, 1863, Edward Everett, the most celebrated orator in America, spoke at Gettysburg for about two hours. Then Abraham Lincoln stood and spoke for about two minutes. The next day Everett wrote to Lincoln that he wished he had come as near to the central idea of the occasion in two hours as Lincoln had in two minutes. What did Lincoln's few words do that two hours could not?",
        visual: {
          type: "compare",
          left: { title: "Edward Everett", points: ["About two hours", "Detailed history of the battle", "Admired, then mostly forgotten"] },
          right: { title: "Abraham Lincoln", points: ["About two minutes", "The meaning of the sacrifice", "Memorized by generations"] },
        },
      },
      teach: [
        {
          title: "Aristotle's three appeals",
          teach:
            "Aristotle taught that a speaker can persuade in three ways. The first lies in the character of the speaker, which the Greeks called ethos: we believe people who seem knowledgeable, honest and well-meaning. The second lies in the audience's state of mind, called pathos: people judge differently when they are moved by grief, hope, anger or pride. The third lies in the speech itself, called logos: the evidence and reasoning that would still hold up if you printed the speech and checked every line. Notice that each appeal points somewhere different. Ethos points at the speaker, pathos at the listener and logos at the message. A complete persuader controls all three. A speech with only logos can be correct and still forgotten. A speech with only pathos can stir a crowd and lead it badly astray.",
          visual: {
            type: "flip",
            cards: [
              { front: "Ethos", back: "Persuasion through the speaker's character: knowledge, honesty and goodwill." },
              { front: "Pathos", back: "Persuasion through the audience's emotions: grief, hope, pride, fear." },
              { front: "Logos", back: "Persuasion through the message's reasoning: evidence and logical steps." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Sort each line by the appeal it leans on most.",
            buckets: ["Ethos (speaker)", "Pathos (audience)", "Logos (reasoning)"],
            items: [
              { text: "I have commanded ships at sea for thirty years, and I tell you this harbor is unsafe.", bucket: 0 },
              { text: "Picture the families standing on the dock, waiting for sailors who will never come home.", bucket: 1 },
              { text: "Four ships have run aground here in two years, all on the same uncharted sandbar.", bucket: 2 },
              { text: "I will not pretend the cost is small; I opposed this plan myself until I saw the evidence.", bucket: 0 },
              { text: "If the sandbar has wrecked four ships, and nothing has changed, it will wreck a fifth.", bucket: 2 },
              { text: "Think of the children who will grow up without fathers if we do nothing.", bucket: 1 },
            ],
            hint: "Ask where each line points: at the speaker's own credibility, at the listener's feelings, or at facts and logic.",
            mistakes: [
              { match: "Put the thirty-years line under logos", coach: "Thirty years at sea is a fact about the speaker. It asks you to trust him, so it is ethos." },
              { match: "Put the four-ships line under pathos", coach: "Wrecks can be sad, but this line gives a count and a cause. That is evidence, so it is logos." },
            ],
            seconds: 50,
          },
          think: {
            q: "A speaker says, 'I have studied this bridge for ten years as its chief engineer.' Which appeal is this?",
            choices: ["Pathos", "Logos", "Ethos"],
            answer: 2,
            why: "It tells the audience why to trust the speaker, which is ethos.",
            hints: [
              "No emotion is being stirred. The line is about who is speaking.",
              "It doesn't give evidence about the bridge itself, only about the speaker's experience.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Think of a three-legged stool. Ethos, pathos and logos are the legs. Take one away and the stool may stand for a moment, but it tips over as soon as someone leans on it.",
            example:
              "A doctor urging you to stop smoking: 'I have treated lung disease for twenty years' (ethos). 'I want you at your granddaughter's wedding' (pathos). 'Smokers are many times more likely to get lung cancer' (logos).",
            simpler: {
              q: "Logos persuades mainly through...",
              choices: ["Evidence and reasoning", "The speaker's reputation"],
              answer: 0,
              why: "Logos is the logic of the message itself.",
              hints: ["", "Reputation belongs to the speaker. That is ethos, not logos."],
            },
          },
        },
        {
          title: "Ethos: earning the right to be heard",
          teach:
            "Aristotle said audiences trust a speaker who shows practical wisdom, good character and goodwill toward them. Ethos is not a title or a loud voice; it is earned inside the speech. One powerful way to earn it is honesty about bad news. On June 4, 1940, Winston Churchill reported on the rescue of the British army from Dunkirk. A lesser speaker would have called it a victory. Churchill warned, 'We must be very careful not to assign to this deliverance the attributes of a victory. Wars are not won by evacuations.' Because he refused to flatter his listeners, they believed him when he promised to fight on. Lincoln built ethos through humility: 'The world will little note, nor long remember what we say here.' Ethos dies quickly when a speaker exaggerates, insults opponents or gets facts wrong.",
          visual: {
            type: "compare",
            left: { title: "Builds ethos", points: ["Admits hard truths", "Shows real knowledge", "Treats opponents fairly", "Puts the audience's good first"] },
            right: { title: "Destroys ethos", points: ["Spins every disaster", "Bluffs about facts", "Mocks people who disagree", "Serves only himself"] },
          },
          probe: {
            type: "highlight",
            prompt: "A captain addresses her crew after a storm. Tap every sentence that builds her ethos.",
            sentences: [
              "I made the call to sail early, and that call was wrong.",
              "We lost two days and most of our fresh water.",
              "Anyone who doubts me is a coward.",
              "I have crossed this sea eleven times, and I know the route home.",
              "Trust me, nothing bad happened at all.",
            ],
            correct: [0, 3],
            hint: "Ethos grows when a speaker shows honesty, knowledge or goodwill. It shrinks with insults and spin.",
            mistakes: [
              { match: "Tapped 'Trust me, nothing bad happened at all.'", coach: "The crew knows they lost water and time. Denying it destroys trust instead of building it." },
              { match: "Tapped the coward sentence", coach: "Insulting listeners attacks goodwill, one of Aristotle's three parts of ethos." },
              { match: "Tapped 'We lost two days and most of our fresh water.'", coach: "That is a plain fact about the situation. It is honest, but it is evidence about the voyage, not about her." },
            ],
            seconds: 40,
          },
          think: {
            q: "Why did Churchill's line 'Wars are not won by evacuations' strengthen his ethos?",
            choices: [
              "It made the audience feel proud of the evacuation.",
              "It showed he would tell them hard truths, so his later promises were believable.",
              "It proved the war was already won.",
              "It gave exact numbers about the soldiers rescued.",
            ],
            answer: 1,
            why: "A speaker who admits bad news earns trust that makes his hopeful words credible.",
            hints: [
              "The line does the opposite: it warns against too much pride in the rescue.",
              "",
              "He said nearly the opposite: the evacuation was not a victory.",
              "This line gives no numbers. Ethos is about why we trust the speaker.",
            ],
          },
          approaches: {
            analogy:
              "Ethos is like a bank account of trust. Every honest admission is a deposit. Every exaggeration is a withdrawal. A speaker can only ask for big sacrifices when the account is full.",
            example:
              "A coach after a loss: 'I picked the wrong lineup tonight. That is on me.' Next week, when the coach says, 'This plan will work,' the players listen, because they know the coach doesn't spin.",
            simpler: {
              q: "Which builds a speaker's ethos?",
              choices: ["Admitting a mistake honestly", "Pretending a failure was a success"],
              answer: 0,
              why: "Honesty about mistakes makes listeners trust the speaker more.",
              hints: ["", "Listeners can usually tell when they are being spun, and they stop trusting the speaker."],
            },
          },
        },
        {
          title: "Pathos: feeling what the facts deserve",
          teach:
            "Pathos appeals to emotion, and emotion is not the enemy of reason. Aristotle observed that people decide differently when they are calm or angry, hopeful or afraid, so a speaker must care what the audience feels. The question is whether the feeling fits the facts. Pericles, honoring Athens' war dead in 431 BC, did not simply weep with the families. He praised the city the soldiers died for, so grief became pride and resolve. Lincoln at Gettysburg used concrete words and repetition: 'we can not dedicate, we can not consecrate, we can not hallow this ground. The brave men, living and dead, who struggled here, have consecrated it.' Honest pathos uses vivid, true images and shared values. Manipulative pathos stirs fear or anger out of proportion to the facts, hoping the audience will stop thinking.",
          visual: {
            type: "sort",
            prompt: "Honest pathos or manipulation?",
            buckets: ["Honest pathos", "Manipulation"],
            items: [
              { text: "Describing real families who lost homes in the flood", bucket: 0 },
              { text: "Inventing a frightening rumor to rush a decision", bucket: 1 },
              { text: "Recalling the courage of soldiers who actually fought", bucket: 0 },
              { text: "Shouting so the crowd is too angry to ask questions", bucket: 1 },
            ],
          },
          probe: {
            type: "cloze",
            text: "Honest pathos helps an audience feel what the {0} deserve. Manipulative pathos stirs {1} out of proportion to the truth, hoping listeners will stop {2}.",
            blanks: [{ answers: ["facts", "truth"] }, { answers: ["fear", "anger", "fear or anger", "emotion", "emotions"] }, { answers: ["thinking", "reasoning"] }],
            bank: ["facts", "fear", "thinking", "rumors", "listening", "logic"],
            hint: "Honest emotion fits reality. Manipulation inflates a feeling so people quit using their minds.",
            mistakes: [
              { match: "rumors", coach: "Rumors are a tool of manipulation. Honest pathos matches what is actually true." },
              { match: "listening", coach: "A manipulator wants people to keep listening. What does he hope they stop doing?" },
              { match: "logic", coach: "Logic is logos. The first blank is about what the feeling should match: the real situation." },
            ],
            seconds: 40,
          },
          think: {
            q: "How did Pericles use pathos in his funeral oration?",
            choices: [
              "He listed the exact number of ships Athens owned.",
              "He reminded the audience of his own military rank.",
              "He refused to mention the dead at all.",
              "He turned the families' grief into pride by praising the city the soldiers died for.",
            ],
            answer: 3,
            why: "He shaped the audience's emotion, moving it from grief toward pride and resolve.",
            hints: [
              "Numbers and facts are logos, not pathos.",
              "Pointing to his own rank would be ethos.",
              "The speech was given to honor the dead, so this cannot be right.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Pathos is like music in a film. The right music makes you feel the true weight of a scene. Dramatic music over a boring scene feels fake, and you notice you are being pushed.",
            example:
              "Two appeals for a food drive. Honest: 'Last winter, forty families in our town relied on this pantry.' Manipulative: 'If you don't give, children will starve tonight and it will be your fault.' The first is true and moving; the second inflates fear and guilt.",
            simpler: {
              q: "Pathos appeals to the audience's...",
              choices: ["Emotions", "Spelling"],
              answer: 0,
              why: "Pathos works on how the audience feels.",
              hints: ["", "Spelling has nothing to do with persuasion. Think about feelings."],
            },
          },
        },
        {
          title: "Logos: the argument underneath",
          teach:
            "Logos is the reasoning that survives on paper. Strip away the speaker and the music of the words, and ask: what are the premises, and does the conclusion follow? Lincoln's Gettysburg Address is short, but its logic is tight. First premise: the nation was 'conceived in Liberty, and dedicated to the proposition that all men are created equal.' Second: the war is testing 'whether that nation, or any nation so conceived and so dedicated, can long endure.' Third: soldiers gave their lives so that it might live. Conclusion: the living must dedicate themselves to the unfinished work, so that 'government of the people, by the people, for the people, shall not perish from the earth.' Churchill's Dunkirk report also leaned on logos, giving numbers and plain reasons. Good logos uses accurate evidence and steps that a careful listener could check.",
          visual: {
            type: "sequence",
            prompt: "The logic of the Gettysburg Address, in order",
            steps: [
              "The nation was founded on liberty and equality.",
              "The war tests whether such a nation can endure.",
              "Soldiers died here so that the nation might live.",
              "So the living must finish the work they began.",
            ],
          },
          probe: {
            type: "build",
            prompt: "Build a logical argument for a town council, in order: premise, premise, conclusion.",
            tiles: [
              "The old bridge has failed three safety inspections in a row.",
              "A bridge that keeps failing inspections becomes more likely to collapse.",
              "Therefore the town should repair the bridge before winter.",
            ],
            distractors: ["The mayor's speech was very moving.", "Everyone in town loves the river."],
            hint: "Logos moves from checkable facts to a general principle to a conclusion that follows from both.",
            mistakes: [
              { match: "Used 'The mayor's speech was very moving.'", coach: "Being moved is pathos. Logos needs facts and reasons that hold up on paper." },
              { match: "Used 'Everyone in town loves the river.'", coach: "Feelings about the river do not prove the bridge is unsafe." },
              { match: "Put the conclusion first", coach: "A conclusion is earned. Lay down the premises, then draw it." },
            ],
            seconds: 45,
          },
          think: {
            q: "Which question best tests a speech's logos?",
            choices: [
              "Does the conclusion follow from accurate premises?",
              "Did the speaker sound confident?",
              "Did the audience cheer loudly?",
            ],
            answer: 0,
            why: "Logos is judged by whether the reasoning holds up when written down and checked.",
            hints: [
              "",
              "Confidence is a matter of delivery and ethos, not logic.",
              "Cheering shows emotion. A crowd can cheer a bad argument.",
            ],
          },
          approaches: {
            analogy:
              "Logos is like the frame of a house. Paint and furniture (pathos and style) make it pleasant, but if the frame is weak, the house falls when the wind blows.",
            example:
              "All metals expand when heated. The railroad track is metal. So the track will expand on a hot day, which is why engineers leave small gaps between rails. Each step follows from the one before.",
            simpler: {
              q: "In an argument, the conclusion should...",
              choices: ["Follow from the premises", "Come out of nowhere"],
              answer: 0,
              why: "A sound conclusion is supported by the steps before it.",
              hints: ["", "A conclusion with no support is just an assertion."],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "From a speech urging a town to build a seawall. Sort each line by its main appeal.",
        buckets: ["Ethos", "Pathos", "Logos"],
        items: [
          { text: "As your harbor engineer for twenty years, I have measured every tide.", bucket: 0 },
          { text: "I will be honest: the wall will cost more than I first estimated.", bucket: 0 },
          { text: "Remember the night the water reached the schoolhouse steps.", bucket: 1 },
          { text: "Our grandparents built this town with their hands; let us protect it.", bucket: 1 },
          { text: "Storm surges have risen higher in each of the last three decades.", bucket: 2 },
          { text: "A wall costs less than rebuilding the waterfront after one major flood.", bucket: 2 },
        ],
      },
      explain: {
        prompt: "Explain Aristotle's three appeals and show how one great speech uses at least two of them.",
        keyPoints: [
          "Ethos is the speaker's character and credibility.",
          "Pathos is the emotion of the audience.",
          "Logos is the evidence and reasoning of the message.",
          "Names a real speech (Pericles, Lincoln or Churchill) and points to a specific appeal in it.",
          "Persuasion should be honest: feelings and claims should match the facts.",
        ],
      },
      mastery: [
        {
          type: "match",
          prompt: "Match each line to the appeal it uses most.",
          pairs: [
            { left: "Ethos", right: "'Wars are not won by evacuations.' (honesty that earns trust)" },
            { left: "Pathos", right: "'The brave men, living and dead, who struggled here, have consecrated it.'" },
            { left: "Logos", right: "If the nation was dedicated to a proposition, the war tests whether it can endure." },
          ],
          hint: "Who is it about: the speaker, the listener's feelings, or the logic of the message?",
          mistakes: [
            { match: "Swapped ethos and logos", coach: "Churchill's line is powerful because it shows his honesty, which builds trust. The 'if... then' line is pure reasoning." },
          ],
          seconds: 40,
        },
        {
          type: "place",
          prompt: "Place each speech on the timeline (BC years are negative).",
          min: -500,
          max: 2000,
          step: 1,
          tolerance: 30,
          items: [
            { label: "Pericles' Funeral Oration", value: -431 },
            { label: "Patrick Henry: 'Give me liberty'", value: 1775 },
            { label: "Lincoln's Gettysburg Address", value: 1863 },
            { label: "Churchill after Dunkirk", value: 1940 },
          ],
          hint: "Pericles spoke in ancient Athens, during the war with Sparta. The other three span the American founding, the Civil War and the Second World War.",
          mistakes: [
            { match: "Pericles placed after 0", coach: "Pericles lived in ancient Greece, more than four centuries before the year 1." },
          ],
          seconds: 45,
        },
        {
          type: "highlight",
          prompt: "A student's speech for a library fundraiser. Tap the two sentences that use logos.",
          sentences: [
            "I have volunteered at this library every Saturday for four years.",
            "Last year the library lent 52,000 books with only three full-time staff.",
            "Imagine a child who discovers her favorite book on these shelves.",
            "Each staff member already serves thousands of readers, so a fourth would shorten waits for everyone.",
            "Please, do it for the children.",
          ],
          correct: [1, 3],
          hint: "Logos gives evidence and reasoning a listener could check. Ignore lines about the speaker or about feelings.",
          mistakes: [
            { match: "Tapped the volunteering sentence", coach: "That is about the speaker's experience, so it builds ethos." },
            { match: "Tapped the favorite-book sentence", coach: "That is a vivid image meant to stir feeling: pathos." },
          ],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "Aristotle defined rhetoric as seeing the available means of {0}. Trust in the speaker is {1}; the audience's emotion is {2}; the reasoning of the message is {3}.",
          blanks: [{ answers: ["persuasion"] }, { answers: ["ethos"] }, { answers: ["pathos"] }, { answers: ["logos"] }],
          bank: ["persuasion", "ethos", "pathos", "logos", "argument", "kairos"],
          hint: "Ethos points at the speaker, pathos at the listener, logos at the message.",
          mistakes: [
            { match: "kairos", coach: "Kairos means the right moment. The three appeals are ethos, pathos and logos." },
            { match: "argument", coach: "Close, but Aristotle's phrase is 'the available means of persuasion.'" },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "Which appeal is based on the character and credibility of the speaker?",
          choices: ["Logos", "Ethos", "Pathos"],
          answer: 1,
          why: "Ethos is persuasion through the speaker's knowledge, honesty and goodwill.",
        },
        {
          q: "What made Churchill's Dunkirk speech of June 1940 so believable?",
          choices: [
            "He claimed the evacuation was a great victory.",
            "He avoided mentioning the army at all.",
            "He was honest that 'wars are not won by evacuations' before promising to fight on.",
            "He spoke for more than two hours.",
          ],
          answer: 2,
          why: "His honesty about the disaster built the ethos that made his defiance credible.",
        },
        {
          q: "When is an emotional appeal (pathos) honest?",
          choices: [
            "When the feeling fits the facts of the situation",
            "When it makes the audience as afraid as possible",
            "When it replaces all evidence",
          ],
          answer: 0,
          why: "Honest pathos helps people feel what the facts actually deserve.",
        },
        {
          q: "Who recorded the version of Pericles' Funeral Oration that we read today?",
          choices: ["Homer", "Aristotle", "Plato", "Thucydides"],
          answer: 3,
          why: "The historian Thucydides included the speech in his history of the war between Athens and Sparta.",
        },
        {
          q: "About how long did Lincoln speak at Gettysburg?",
          choices: ["About two hours", "About two minutes", "About twenty minutes"],
          answer: 1,
          why: "Lincoln spoke for about two minutes, after Edward Everett's two-hour oration.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Read the Gettysburg Address (about 270 words) or Churchill's speech of June 4, 1940 (the 'We shall fight on the beaches' speech). Write a rhetorical analysis of 400 to 600 words. In your introduction, explain the occasion and the audience. Then show, with at least three short quotations, how the speaker uses ethos, pathos and logos. End by judging which appeal does the most work and why.",
        rubric: [
          "Explains the historical occasion and the audience accurately.",
          "Identifies ethos, pathos and logos, each with a specific quotation from the speech.",
          "Explains how each quotation works, not just which appeal it is.",
          "Ends with a clear, reasoned judgment about which appeal is strongest.",
          "Clear, well-organized prose with quotations introduced and punctuated correctly.",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 2. The argumentative essay
    // ------------------------------------------------------------------
    {
      id: "writing-hs.argument",
      title: "The Argumentative Essay",
      minutes: 40,
      stage: "logic",
      subject: "Writing",
      read: `An argumentative essay is a case built for a skeptical reader. Its purpose is not to win a shouting match but to lead a thoughtful person, step by step, to a conclusion. It has five working parts: a thesis, evidence, reasoning, a counterargument and a rebuttal.

The thesis is the essay's central claim, usually stated in one or two sentences near the end of the introduction. A good thesis is arguable, specific and limited. "Reading is important" is too vague to argue. "Every high school student should memorize and recite one great speech or poem each year, because recitation trains memory, deepens understanding and builds confidence in public speaking" takes a position and maps the essay to come.

Evidence is what you bring to support the thesis: facts, statistics, examples, the testimony of experts and quotations from primary texts. Strong evidence is relevant to the claim, sufficient in amount and credible in source. One cousin's experience is an anecdote, not proof.

Reasoning explains why the evidence supports the claim. The philosopher Stephen Toulmin called this link the warrant: the general principle that connects data to a claim. If your evidence is that students who practice recalling material remember it better, your warrant is that schools should use methods that make learning last. Many weak essays pile up evidence and never state the warrant, leaving the reader to guess.

The counterargument is the strongest objection a fair-minded opponent would raise. State it accurately, even generously. Arguing against a weakened version of your opponent's view is the fallacy called a straw man, and careful readers spot it at once.

The rebuttal is your answer. You may concede part of the objection and then show why your thesis still stands, or you may show that the objection rests on a mistaken fact or a faulty assumption. Phrases such as "Granted," "It is true that" and "Even so" signal an honest concession.

A strong essay arranges these parts in a clear order: an introduction that ends with the thesis, body paragraphs that each make one point with evidence and reasoning, a paragraph that faces the best objection, and a conclusion that shows why the question matters.`,
      keyIdeas: [
        "A thesis is an arguable, specific claim that maps the essay.",
        "Evidence must be relevant, sufficient and credible; reasoning (the warrant) explains why it supports the claim.",
        "A fair counterargument states the opponent's best point, not a straw man.",
        "A rebuttal concedes what is true and shows why the thesis still stands.",
      ],
      hook: {
        text: "In a courtroom, a lawyer who simply says 'My client is innocent!' over and over will lose. The jury needs a clear theory of the case, evidence, an explanation of what the evidence means, and an answer to the other side's strongest point. An argumentative essay is a trial on paper, and your reader is the jury.",
        visual: {
          type: "hotspots",
          title: "An argument is a trial on paper",
          center: "The reader is the jury",
          spots: [
            { label: "Thesis", icon: "🎯", detail: "Your theory of the case: the one claim you will prove." },
            { label: "Evidence", icon: "🔍", detail: "The exhibits: facts, examples, expert testimony, quotations." },
            { label: "Reasoning", icon: "🌉", detail: "The closing argument: why the exhibits prove the claim." },
            { label: "Counterargument", icon: "⚖️", detail: "The other side's strongest point, stated fairly." },
            { label: "Rebuttal", icon: "🛡️", detail: "Your answer, conceding what is true and showing why you still win." },
          ],
        },
      },
      teach: [
        {
          title: "A thesis worth arguing",
          teach:
            "The thesis is the single claim your whole essay exists to prove. It must pass three tests. First, it is arguable: a thoughtful person could disagree. 'The Odyssey is an old poem' fails, because no one disputes it. Second, it is specific: it names exactly what you claim. 'Reading is good' is too vague to prove or disprove. Third, it is limited: you can actually defend it in the space you have. A strong thesis often previews the reasons: 'Every high school student should memorize one great speech or poem each year, because recitation trains memory, deepens understanding and builds confidence.' That sentence tells the reader where you stand and how the essay will be organized. Write your thesis early, then revise it at the end so it matches what you actually proved.",
          visual: {
            type: "compare",
            left: { title: "Weak thesis", points: ["The Odyssey is an old poem.", "Reading is good.", "There are pros and cons to homework."] },
            right: { title: "Strong thesis", points: ["Odysseus succeeds through cunning more than strength.", "Students should memorize one great poem a year, because...", "Homework should be limited to practice of skills taught that day."] },
          },
          probe: {
            type: "highlight",
            prompt: "Tap every sentence that would work as a strong thesis for an argumentative essay.",
            sentences: [
              "Shakespeare wrote many plays.",
              "Teenagers should learn to cook at least five complete meals before graduating, because it builds independence, saves money and improves health.",
              "Some people like history and some people don't.",
              "Latin should be offered in high schools, because it strengthens English vocabulary and opens the classics in their original words.",
              "This essay will talk about sports.",
            ],
            correct: [1, 3],
            hint: "Test each one: could a fair person disagree, is it specific, and does it take a position?",
            mistakes: [
              { match: "Tapped 'Shakespeare wrote many plays.'", coach: "That is a fact no one disputes. A thesis must be arguable." },
              { match: "Tapped the sports sentence", coach: "Announcing a topic is not a claim. What position would you defend?" },
              { match: "Tapped the 'some people' sentence", coach: "That sits on the fence. A thesis takes a side." },
            ],
            seconds: 45,
          },
          think: {
            q: "Which is the strongest thesis?",
            choices: [
              "Benjamin Franklin was an interesting person.",
              "This essay is about Benjamin Franklin.",
              "Franklin's habit of rewriting essays from memory, described in his Autobiography, is still the best way to learn to write.",
            ],
            answer: 2,
            why: "It is arguable, specific and limited, and it tells the reader exactly what will be proved.",
            hints: [
              "'Interesting' is vague and hard to disagree with. What exactly would you prove?",
              "That announces a topic, not a claim.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A thesis is like a destination entered into a map. If you type 'somewhere nice,' the map can't route you. Type an exact address, and every turn of the essay has a purpose.",
            example:
              "Vague: 'Exercise is important.' Arguable and specific: 'High schools should offer a daily physical education period, because regular exercise improves concentration in later classes.' The second can be proved or disproved with evidence.",
            simpler: {
              q: "A thesis must be something a reasonable person could...",
              choices: ["Disagree with", "Never question"],
              answer: 0,
              why: "If no one could disagree, there is nothing to argue.",
              hints: ["", "Statements no one questions are facts, not arguments."],
            },
          },
        },
        {
          title: "Evidence: relevant, sufficient, credible",
          teach:
            "Evidence is the material that supports your thesis. It comes in several forms: facts and statistics, concrete examples, testimony from experts, and quotations from primary texts. Judge each piece by three standards. Is it relevant, actually bearing on your claim rather than on a nearby topic? Is it sufficient, enough to support a general conclusion? A single story about your cousin is an anecdote, and one example cannot prove a rule. Is it credible, coming from a source that knows the subject and has no reason to mislead? For the recitation thesis, credible evidence might include research by cognitive scientists showing that practicing recall strengthens long-term memory, often called the testing effect. Weak evidence includes popularity ('everyone agrees'), vague claims ('studies show') with no source, and examples that do not match the claim.",
          visual: {
            type: "flip",
            cards: [
              { front: "Relevant", back: "Does it bear directly on the claim, not just the general topic?" },
              { front: "Sufficient", back: "Is there enough of it to support a general conclusion?" },
              { front: "Credible", back: "Does it come from a source that knows the subject and has no reason to mislead?" },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Thesis: students should memorize and recite one great speech or poem each year. Sort each item.",
            buckets: ["Strong evidence", "Weak evidence"],
            items: [
              { text: "Memory researchers have found that practicing recall makes learning last longer than rereading.", bucket: 0 },
              { text: "My cousin memorized a poem once and liked it.", bucket: 1 },
              { text: "Studies show it's great.", bucket: 1 },
              { text: "Students who recite before a class practice the same skill needed for interviews and presentations.", bucket: 0 },
              { text: "Poetry has existed for thousands of years.", bucket: 1 },
            ],
            hint: "Check each item: is it relevant, is it more than one anecdote, and could a reader verify where it came from?",
            mistakes: [
              { match: "Put 'Studies show it's great.' under strong", coach: "Which studies? Vague appeals with no source can't be checked, so they aren't credible." },
              { match: "Put the cousin under strong", coach: "One person's experience is an anecdote. It can't prove a claim about all students." },
              { match: "Put 'Poetry has existed for thousands of years.' under strong", coach: "True, but irrelevant. Age doesn't show that memorizing poems helps students." },
            ],
            seconds: 45,
          },
          think: {
            q: "Why is 'My cousin memorized a poem and loved it' weak evidence for a claim about all students?",
            choices: [
              "It is a single anecdote, not sufficient to support a general claim.",
              "It is written in the first person.",
              "Poems can't be used as evidence.",
              "It is too long.",
            ],
            answer: 0,
            why: "One example can't support a general rule; the evidence is insufficient.",
            hints: [
              "",
              "First person isn't the problem. The problem is how much one example can prove.",
              "Poems are often used as evidence in essays. The issue is the amount of support.",
              "Length isn't the issue. Think about whether one case can prove a rule.",
            ],
          },
          approaches: {
            analogy:
              "Evidence is like witnesses in a trial. One witness with a grudge, who wasn't there, persuades no one. Several credible witnesses who saw the event directly are hard to dismiss.",
            example:
              "Claim: 'The town needs a traffic light at Main and Oak.' Weak: 'It feels dangerous.' Strong: 'Police records show eleven accidents at that corner in two years, more than any other intersection in town.'",
            simpler: {
              q: "Which is more credible evidence about a medicine?",
              choices: ["A large medical study", "An online comment from a stranger"],
              answer: 0,
              why: "A careful study by experts is far more credible than an anonymous comment.",
              hints: ["", "Anyone can post a comment. You can't check what the stranger knows."],
            },
          },
        },
        {
          title: "Reasoning: state the warrant",
          teach:
            "Evidence never speaks for itself. Reasoning explains why it supports your claim. In 1958 the philosopher Stephen Toulmin described arguments as having three core parts: the claim, the data (your evidence) and the warrant, the general principle that connects them. Suppose your claim is that the school should start a recitation program, and your data is that practicing recall makes learning last. The warrant is: schools should use methods that make learning last. Once you state the warrant, a reader can judge it, and so can you. Many weak arguments hide a warrant that collapses when spoken aloud. 'Students complain about memorizing, so schools should drop it' rests on the warrant 'anything students complain about should be dropped,' which few would accept. Good writers make the warrant explicit, often with 'because,' 'this matters since' or 'which means.'",
          visual: {
            type: "sequence",
            prompt: "Toulmin's chain, from bottom to top",
            steps: [
              "Data: practicing recall makes learning last longer.",
              "Warrant: schools should use methods that make learning last.",
              "Claim: the school should start a recitation program.",
            ],
          },
          probe: {
            type: "build",
            prompt: "Build a Toulmin argument in order: data, then warrant, then claim.",
            tiles: [
              "Data: cooking a meal requires planning, measuring and following steps in order.",
              "Warrant: skills that train planning and careful sequence are worth teaching.",
              "Claim: teenagers should learn to cook several complete meals.",
            ],
            distractors: ["Warrant: everyone likes food.", "Claim: cooking is old."],
            hint: "The warrant is the general principle that makes the data count as support for the claim.",
            mistakes: [
              { match: "Used 'Warrant: everyone likes food.'", coach: "Liking food doesn't connect planning skills to the claim. A warrant must link this data to this claim." },
              { match: "Used 'Claim: cooking is old.'", coach: "That isn't arguable and doesn't follow from the data." },
            ],
            seconds: 45,
          },
          think: {
            q: "Claim: 'The library should stay open later.' Data: 'Most students finish sports practice at 6 p.m., when the library closes.' What is the warrant?",
            choices: [
              "The library has many books.",
              "Sports are popular.",
              "Libraries should be open when the students they serve are able to use them.",
              "Practice ends at 6 p.m.",
            ],
            answer: 2,
            why: "It's the general principle that makes the closing time matter.",
            hints: [
              "True but beside the point. The warrant links the timing to the claim.",
              "Popularity of sports doesn't explain why the library should change its hours.",
              "",
              "That is the data itself. The warrant is the principle behind it.",
            ],
          },
          approaches: {
            analogy:
              "The warrant is like the rule of a game. 'He crossed the line' only means 'touchdown' because of the rule that crossing the line with the ball scores. State the rule, and everyone can see why the play counts.",
            example:
              "Claim: 'You should bring an umbrella.' Data: 'The forecast says 90 percent chance of rain.' Warrant: 'When rain is very likely, it is wise to prepare for it.' Without the warrant the data is only a weather report.",
            simpler: {
              q: "In Toulmin's model, the evidence is called the...",
              choices: ["Data", "Thesis statement"],
              answer: 0,
              why: "Toulmin called the evidence 'data' and the connecting principle the 'warrant.'",
              hints: ["", "The thesis is the claim. The evidence has a different name in Toulmin's model."],
            },
          },
        },
        {
          title: "Counterargument and rebuttal",
          teach:
            "A strong essay faces the best objection a thoughtful opponent would raise. First, state the counterargument fairly, even generously: 'Critics argue that class time is limited and memorization crowds out deeper analysis.' Never attack a weaker version than your opponent actually holds. That fallacy is called a straw man, and it tells readers you are afraid of the real objection. Second, write the rebuttal. Often you begin with a concession, admitting what is true: 'Granted, class time is precious.' Then you answer: 'Yet reciting a speech requires understanding every line, so memorization and analysis work together rather than compete.' A rebuttal can also show that the objection rests on a false fact or a weak warrant. Lincoln, trained as a courtroom lawyer, was known for stating the other side's case so fairly that his answer to it carried extra weight.",
          visual: {
            type: "compare",
            left: { title: "Straw man", points: ["'Critics just hate poetry.'", "Attacks a weak version", "Readers stop trusting you"] },
            right: { title: "Fair counterargument", points: ["'Critics worry class time is limited.'", "States the real concern", "Readers trust your rebuttal"] },
          },
          probe: {
            type: "cloze",
            text: "Thesis: teenagers should learn to cook. {0}, cooking takes time that busy students may not have. {1}, a simple meal takes less than thirty minutes, about the time spent waiting for delivery.",
            blanks: [{ answers: ["Granted", "Admittedly", "True"] }, { answers: ["Yet", "However", "But", "Still"] }],
            bank: ["Granted", "Yet", "Obviously", "Therefore", "Because"],
            hint: "First concede what is true about the objection, then turn to your answer.",
            mistakes: [
              { match: "Obviously", coach: "'Obviously' dismisses the objection instead of conceding it fairly." },
              { match: "Therefore", coach: "'Therefore' signals a conclusion. You need a word that turns against the objection." },
              { match: "Because", coach: "'Because' gives a reason. The rebuttal needs a turning word like 'yet' or 'however.'" },
            ],
            seconds: 40,
          },
          think: {
            q: "Thesis: 'Students should memorize a poem each year.' Which is a straw man?",
            choices: [
              "Critics argue class time is limited.",
              "Some teachers worry memorization crowds out analysis.",
              "Opponents just want students to be ignorant.",
              "Some students have real anxiety about speaking in public.",
            ],
            answer: 2,
            why: "It replaces a real concern with an insulting, weaker version no opponent actually holds.",
            hints: [
              "That is a fair statement of a real concern.",
              "That is a serious, fairly stated objection.",
              "",
              "That's a real concern that deserves an answer, not a distortion.",
            ],
          },
          approaches: {
            analogy:
              "A rebuttal against a straw man is like a boxer who brags about knocking out a scarecrow. Nobody is impressed. Beat the strongest opponent and people pay attention.",
            example:
              "Objection: 'Uniforms cost families money.' Concession: 'It's true that uniforms are an expense.' Rebuttal: 'Yet families who must otherwise buy a full wardrobe of school clothes often spend less with a few uniform sets.'",
            simpler: {
              q: "A concession means you...",
              choices: ["Admit what is true about the other side", "Give up your whole argument"],
              answer: 0,
              why: "Conceding a point honestly strengthens your rebuttal; it doesn't abandon your thesis.",
              hints: ["", "You keep your thesis. You only admit the part of the objection that is true."],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the parts of an argumentative essay in their usual order.",
        steps: [
          "Introduction that ends with a clear thesis",
          "First body paragraph: a reason, evidence and reasoning",
          "Second body paragraph: another reason, evidence and reasoning",
          "Counterargument stated fairly",
          "Rebuttal: concede, then answer",
          "Conclusion: why the question matters",
        ],
      },
      explain: {
        prompt: "Explain how to build an argumentative essay that would persuade a skeptical, intelligent reader.",
        keyPoints: [
          "Start with an arguable, specific thesis.",
          "Support it with relevant, sufficient, credible evidence.",
          "State the reasoning or warrant that links evidence to the claim.",
          "Present the strongest counterargument fairly, not a straw man.",
          "Rebut it, conceding what is true and showing why the thesis stands.",
        ],
      },
      mastery: [
        {
          type: "match",
          prompt: "Thesis: towns should plant more trees along their streets. Match each part to its sentence.",
          pairs: [
            { left: "Thesis", right: "Towns should plant trees along every residential street." },
            { left: "Evidence", right: "Shaded pavement can be many degrees cooler than unshaded pavement on a summer afternoon." },
            { left: "Warrant", right: "Towns should invest in things that make streets safer and more comfortable for residents." },
            { left: "Counterargument", right: "Critics point out that tree roots can crack sidewalks." },
            { left: "Rebuttal", right: "Granted, but choosing the right species and planting strips prevents most damage." },
          ],
          hint: "Each sentence has one job: claim, proof, connecting principle, objection or answer.",
          mistakes: [
            { match: "Swapped evidence and warrant", coach: "Evidence is the specific, checkable fact (the cooler pavement). The warrant is the general principle." },
          ],
          seconds: 60,
        },
        {
          type: "highlight",
          prompt: "Tap the sentence that commits the straw-man fallacy.",
          sentences: [
            "Some parents worry that a longer school day would tire younger students.",
            "Others note that a longer day costs more to staff.",
            "Opponents of a longer day simply don't care about education.",
            "Granted, a longer day has real costs.",
          ],
          correct: [2],
          hint: "A straw man swaps a real concern for a weak or insulting version.",
          mistakes: [
            { match: "Tapped the 'tire younger students' sentence", coach: "That fairly states a real worry. It's a proper counterargument." },
          ],
          seconds: 30,
        },
        {
          type: "build",
          prompt: "Build a rebuttal paragraph in order: objection, concession, answer, return to the thesis.",
          tiles: [
            "Critics argue that memorizing poems wastes class time.",
            "It is true that class time is limited.",
            "Yet reciting a poem well requires understanding every line of it.",
            "So recitation deepens analysis rather than replacing it.",
          ],
          distractors: ["Critics simply hate poetry."],
          hint: "State the objection fairly, admit what is true, answer it, then tie back to your thesis.",
          mistakes: [
            { match: "Used 'Critics simply hate poetry.'", coach: "That is a straw man. State the real objection." },
          ],
          seconds: 45,
        },
        {
          type: "cloze",
          text: "In Toulmin's model, the {0} is the claim's support, and the {1} is the general principle connecting it to the claim. Attacking a weakened version of an opponent's view is a {2}.",
          blanks: [{ answers: ["data", "evidence"] }, { answers: ["warrant"] }, { answers: ["straw man", "strawman"] }],
          bank: ["data", "warrant", "straw man", "thesis", "rebuttal", "anecdote"],
          hint: "Data supports, the warrant connects, and the straw man distorts.",
          mistakes: [
            { match: "rebuttal", coach: "The rebuttal is your answer to an objection. The connecting principle has another name." },
            { match: "anecdote", coach: "An anecdote is a single story used as evidence. The fallacy of distorting an opponent is the straw man." },
          ],
          seconds: 40,
        },
      ],
      check: [
        {
          q: "Which is the best thesis for an argumentative essay?",
          choices: [
            "This essay is about libraries.",
            "Libraries have books.",
            "Public libraries should stay open until 9 p.m. on school nights, because students need quiet places to study.",
          ],
          answer: 2,
          why: "It is arguable, specific and limited, and it previews the reason.",
        },
        {
          q: "In Stephen Toulmin's model, what is the warrant?",
          choices: [
            "The general principle connecting evidence to claim",
            "The evidence itself",
            "The title of the essay",
            "The final sentence of the conclusion",
          ],
          answer: 0,
          why: "The warrant is the often-unstated link that explains why the data supports the claim.",
        },
        {
          q: "What is a straw man?",
          choices: [
            "A concession to the other side",
            "A very strong piece of evidence",
            "A summary of your own thesis",
            "Arguing against a weaker version of an opponent's view than the one they hold",
          ],
          answer: 3,
          why: "A straw man distorts the opposing view so it is easier to knock down.",
        },
        {
          q: "Which phrase signals an honest concession?",
          choices: ["Obviously,", "Granted,", "Everyone knows"],
          answer: 1,
          why: "'Granted' admits what is true in the objection before you answer it.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Write a five-paragraph argumentative essay (500 to 750 words) on one of these questions: Should every high school student memorize and recite one great speech or poem each year? Should teenagers learn to cook several complete meals before graduating? Should high schools offer Latin? Include an arguable thesis, two body paragraphs with evidence and clearly stated reasoning, a paragraph that presents the strongest counterargument fairly and rebuts it, and a conclusion.",
        rubric: [
          "States an arguable, specific thesis at the end of the introduction.",
          "Supports each body paragraph with relevant, credible evidence.",
          "Makes the reasoning (warrant) explicit, not left for the reader to guess.",
          "Presents the strongest counterargument fairly, without a straw man, and rebuts it.",
          "Uses clear transitions and ends with a conclusion that shows why the question matters.",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 3. Literary analysis: theme, symbol and character
    // ------------------------------------------------------------------
    {
      id: "writing-hs.literary-analysis",
      title: "Literary Analysis: Theme, Symbol and Character",
      minutes: 40,
      stage: "logic",
      subject: "Literature",
      read: `Literary analysis asks not just what happens in a story but how the story makes its meaning. A summary says that Macbeth murders the king. An analysis asks why Shakespeare keeps returning to the image of blood on Macbeth's hands, and what that image teaches about guilt.

Start with theme. A topic is a word or phrase: ambition, greed, home. A theme is a complete statement about life that the work develops: "Ambition that refuses every moral limit destroys the person who holds it." Themes are rarely announced. You infer them from what characters choose and what those choices cost.

Next, watch for symbols: concrete objects that carry abstract meaning. In A Christmas Carol, Jacob Marley's ghost drags a heavy chain and tells Scrooge, "I wear the chain I forged in life. I made it link by link, and yard by yard." The chain is made of cash-boxes and ledgers. It is Marley's greed made visible, and a warning about the chain Scrooge is forging now. In Homer's Odyssey, only Odysseus can string his great bow; the suitors who have taken over his house all fail. The bow becomes a sign of his identity and his rightful place as king.

Then study character. Authors reveal character directly, by telling us, or indirectly, through speech, thoughts, actions and the reactions of others. Dickens tells us directly that Scrooge is "secret, and self-contained, and solitary as an oyster." Twain shows us Tom Sawyer indirectly: assigned to whitewash a fence, Tom pretends it is a rare privilege until his friends pay him for a turn. We never need to be told Tom is clever. A dynamic character, like Scrooge, changes; a static character stays the same, and the contrast between them often points to the theme.

Finally, write the analysis. Each paragraph needs a claim about the text, a short quotation woven into your own sentence, and commentary that explains how specific words create meaning. The commentary is the heart of the paragraph. If you only retell the plot, the reader learns nothing new. If you explain why Lady Macbeth's confident "A little water clears us of this deed" returns, acts later, as "What, will these hands ne'er be clean?", you have shown how Shakespeare built his theme.`,
      keyIdeas: [
        "A theme is a full-sentence claim about life, not a one-word topic.",
        "A symbol is a concrete thing that carries an abstract meaning, like Marley's chain or Odysseus' bow.",
        "Character is revealed directly (the narrator tells) or indirectly (speech, thoughts, actions, others' reactions).",
        "An analysis paragraph moves from claim to embedded quotation to commentary; summary is not analysis.",
      ],
      hook: {
        text: "Right after the murder of King Duncan, Lady Macbeth tells her husband, 'A little water clears us of this deed.' Several acts later, walking in her sleep, she rubs her hands and asks, 'What, will these hands ne'er be clean?' Shakespeare never stops to explain guilt. He lets one image, blood on the hands, return and grow. Learning to notice that is the beginning of literary analysis.",
        visual: {
          type: "compare",
          left: { title: "Act 2: just after the murder", points: ["'A little water clears us of this deed.'", "Confident", "Guilt seems easy to wash off"] },
          right: { title: "Act 5: sleepwalking", points: ["'What, will these hands ne'er be clean?'", "Haunted", "Guilt cannot be washed off"] },
        },
      },
      teach: [
        {
          title: "Topic versus theme",
          teach:
            "A topic is what a work is about, in a word or phrase: ambition, greed, homecoming. A theme is what the work says about that topic, and it must be a complete sentence. Macbeth's topic is ambition. Its theme might be: 'Ambition that refuses every moral limit destroys the person who holds it.' The Odyssey's topic is homecoming; one theme is that endurance and cunning carry a person home when strength alone would fail. Themes are inferred, not announced. You find them by asking what characters want, what they choose and what their choices cost. A good theme statement avoids clichés such as 'crime doesn't pay' and avoids commands such as 'Don't be greedy.' It names an insight about human life that the whole work supports, and that you could defend with evidence from several places in the text.",
          visual: {
            type: "flip",
            cards: [
              { front: "Topic: ambition (Macbeth)", back: "Theme: ambition that refuses every moral limit destroys the person who holds it." },
              { front: "Topic: greed (A Christmas Carol)", back: "Theme: a person who lives only for money imprisons himself, but it is never too late to change." },
              { front: "Topic: homecoming (The Odyssey)", back: "Theme: endurance and cunning carry a person home when strength alone would fail." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Sort each item: is it only a topic, or a theme statement?",
            buckets: ["Topic", "Theme statement"],
            items: [
              { text: "Ambition", bucket: 0 },
              { text: "A person who lives only for money cuts himself off from the joys that make life worth living.", bucket: 1 },
              { text: "Loyalty and homecoming", bucket: 0 },
              { text: "Guilt cannot be washed away as easily as the guilty hope.", bucket: 1 },
              { text: "Greed", bucket: 0 },
            ],
            hint: "A theme is a complete sentence that says something about life. A topic is just a word or phrase.",
            mistakes: [
              { match: "Put 'Loyalty and homecoming' under theme", coach: "That names subjects but makes no statement about them. A theme says something about loyalty." },
            ],
            seconds: 35,
          },
          think: {
            q: "Which is a theme statement for A Christmas Carol?",
            choices: [
              "Greed",
              "Christmas in London",
              "Don't be greedy.",
              "A life spent hoarding money isolates a person, but generosity can restore him even late in life.",
            ],
            answer: 3,
            why: "It's a complete, defensible statement about life that the whole story supports.",
            hints: [
              "That is a topic, one word. A theme says something about it.",
              "That is the setting, not an insight about life.",
              "That's a command. A theme is an observation about life, not an order to the reader.",
              "",
            ],
          },
          approaches: {
            analogy:
              "A topic is like the name of a river. A theme is a sentence about where the river goes and what it does to the land along the way.",
            example:
              "Topic: courage. Weak theme: 'Be brave.' Strong theme: 'True courage often means doing the right thing when no one will ever know you did it.' The strong version could be argued with evidence from a story.",
            simpler: {
              q: "Is 'jealousy' a topic or a theme?",
              choices: ["A topic", "A theme"],
              answer: 0,
              why: "It's a single word naming a subject. A theme would say something about jealousy.",
              hints: ["", "A theme must be a full sentence that makes a point."],
            },
          },
        },
        {
          title: "Symbols: things that carry meaning",
          teach:
            "A symbol is a concrete object, image or action that stands for something larger than itself. Authors signal symbols through repetition, emphasis and placement at key moments. In Macbeth, blood first appears as the literal blood of the murdered king, then grows into the stain of guilt. Macbeth asks whether 'all great Neptune's ocean' could wash his hand clean, and answers that his hand would rather turn the green seas red. In A Christmas Carol, Marley's chain is forged from cash-boxes, keys, padlocks and ledgers: his lifetime of greed made into a weight he cannot put down. In the Odyssey, Penelope announces a contest: whoever can string Odysseus' great bow and shoot an arrow through twelve axes may marry her. Every suitor fails. The disguised Odysseus strings it with ease, and the bow becomes a sign of who he truly is.",
          visual: {
            type: "hotspots",
            title: "Three famous symbols",
            center: "Concrete thing → abstract idea",
            spots: [
              { label: "Blood (Macbeth)", icon: "🩸", detail: "Begins as real blood, becomes the guilt that no water can wash away." },
              { label: "The chain (A Christmas Carol)", icon: "⛓️", detail: "Made of cash-boxes and ledgers: Marley's greed made into a burden he carries forever." },
              { label: "The bow (The Odyssey)", icon: "🏹", detail: "Only Odysseus can string it: a sign of his true identity and rightful place as king." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each symbol to the idea it carries.",
            pairs: [
              { left: "Blood on Macbeth's hands", right: "Guilt that cannot be washed away" },
              { left: "Marley's chain of cash-boxes", right: "A lifetime of greed that becomes a burden" },
              { left: "Odysseus' bow", right: "True identity and rightful authority" },
              { left: "The Mississippi River in Huckleberry Finn", right: "Freedom away from the rules of town" },
            ],
            hint: "Ask what each object does in the story and who can or cannot escape it.",
            mistakes: [
              { match: "Swapped the chain and the blood", coach: "The chain is made of money boxes and ledgers, so it points to greed. The blood points to guilt after the murder." },
            ],
            seconds: 45,
          },
          think: {
            q: "Why is Marley's chain made of cash-boxes, padlocks and ledgers?",
            choices: [
              "Dickens wanted a realistic description of a jail.",
              "The objects show that the chain is Marley's own greed, which he must now carry.",
              "Ghosts in English folklore always carry money.",
            ],
            answer: 1,
            why: "The specific objects tie the burden to the way Marley lived: for money alone.",
            hints: [
              "Marley isn't in a jail. Ask what the objects have in common.",
              "",
              "Dickens chose these objects on purpose. What do they have in common with Marley's life?",
            ],
          },
          approaches: {
            analogy:
              "A symbol works like a country's flag. The cloth is just cloth, but because of what it stands for, people salute it. In a story, an object gains meaning the same way, through repetition and what it is attached to.",
            example:
              "In Huckleberry Finn, life on the raft is peaceful and free, while every stop on shore brings trouble or danger. Because Twain repeats that contrast, the river comes to stand for freedom and the shore for society's rules.",
            simpler: {
              q: "A symbol is...",
              choices: ["A concrete thing that stands for a bigger idea", "A word that rhymes"],
              answer: 0,
              why: "Symbols are concrete objects or images that carry abstract meaning.",
              hints: ["", "Rhyme is a sound device. Symbols are about meaning."],
            },
          },
        },
        {
          title: "Character: direct and indirect",
          teach:
            "Authors reveal character in two ways. Direct characterization is when the narrator simply tells us. Dickens calls Scrooge 'a squeezing, wrenching, grasping, scraping, clutching, covetous, old sinner,' 'solitary as an oyster.' Indirect characterization shows us through speech, thoughts, effects on others, actions and looks. Twain never tells us Tom Sawyer is clever. He shows Tom, ordered to whitewash a fence, pretending the job is a rare privilege until the other boys trade him their treasures for a turn. Twain then adds that Tom had discovered that to make someone want a thing, 'it is only necessary to make the thing difficult to attain.' Notice too whether a character changes. A dynamic character, like Scrooge, is transformed by events; a static character stays the same. Indirect evidence is usually stronger in an essay, because you must interpret it, and interpretation is analysis.",
          visual: {
            type: "flip",
            cards: [
              { front: "Speech", back: "What the character says and how." },
              { front: "Thoughts", back: "What the character privately thinks or feels." },
              { front: "Effect on others", back: "How other characters react to him or her." },
              { front: "Actions", back: "What the character does, especially under pressure." },
              { front: "Looks", back: "Appearance, dress and manner." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Sort each example: direct or indirect characterization?",
            buckets: ["Direct (narrator tells)", "Indirect (we infer)"],
            items: [
              { text: "Scrooge was 'solitary as an oyster.'", bucket: 0 },
              { text: "Tom convinces his friends to pay him for a turn at whitewashing.", bucket: 1 },
              { text: "Even blind men's dogs pulled their owners away when they saw Scrooge coming.", bucket: 1 },
              { text: "Scrooge was 'a tight-fisted hand at the grindstone.'", bucket: 0 },
              { text: "Odysseus has himself tied to the mast so he can hear the Sirens without steering toward them.", bucket: 1 },
            ],
            hint: "Direct: the narrator names the trait. Indirect: you work out the trait from what someone does or how others react.",
            mistakes: [
              { match: "Put the blind men's dogs under direct", coach: "Dickens shows other creatures avoiding Scrooge and leaves you to infer what he's like. That's the 'effect on others' kind of indirect characterization." },
            ],
            seconds: 45,
          },
          think: {
            q: "Odysseus has his crew tie him to the mast so he can hear the Sirens without wrecking the ship. What does this action reveal?",
            choices: [
              "He is cruel to his crew.",
              "He has no curiosity.",
              "He is curious but plans carefully to master temptation.",
              "He is afraid of the sea.",
            ],
            answer: 2,
            why: "He wants to hear the song, yet he arranges in advance to resist it: curiosity governed by foresight.",
            hints: [
              "He actually protects his crew by plugging their ears with wax.",
              "The opposite: he wants to hear the song no one survives.",
              "",
              "He sails on boldly. The point is how he controls temptation.",
            ],
          },
          approaches: {
            analogy:
              "Direct characterization is a friend telling you, 'She's generous.' Indirect is watching her quietly pay for a stranger's groceries. The second convinces you more, because you saw it yourself.",
            example:
              "Direct: 'Scrooge was cold.' Indirect: 'He kept his clerk's fire so small that it looked like one coal.' From the tiny fire, the reader infers both stinginess and a lack of care for others.",
            simpler: {
              q: "If the narrator says 'Tom was clever,' that is...",
              choices: ["Direct characterization", "Indirect characterization"],
              answer: 0,
              why: "The narrator names the trait outright.",
              hints: ["", "Indirect means you infer the trait from actions or speech. Here it's stated outright."],
            },
          },
        },
        {
          title: "The analysis paragraph",
          teach:
            "A strong analysis paragraph has three moves. First, a claim: an arguable point about how the text works, not a fact about the plot. Second, evidence: a short quotation woven into your own sentence, not dropped in alone. Third, commentary: two or three sentences explaining how specific words create meaning and how that meaning connects to the theme. For example: 'Shakespeare shows that guilt cannot be escaped. Just after the murder, Lady Macbeth insists that \"a little water clears us of this deed,\" but in Act 5 she asks, \"What, will these hands ne'er be clean?\" The word \"little\" exposes her early confidence, while the later question shows that no amount of water will help. The image of hands that will not come clean turns guilt into something physical and permanent.' Summary retells events. Analysis explains how and why the author made them mean something.",
          visual: {
            type: "sequence",
            prompt: "The three moves of an analysis paragraph",
            steps: [
              "Claim: an arguable point about how the text works",
              "Evidence: a short quotation woven into your sentence",
              "Commentary: how the specific words create meaning",
              "Link: how that meaning supports the theme",
            ],
          },
          probe: {
            type: "highlight",
            prompt: "From a student paragraph on A Christmas Carol. Tap every sentence of real analysis (commentary), not summary.",
            sentences: [
              "Marley's ghost visits Scrooge on Christmas Eve.",
              "The ghost is wrapped in a long chain.",
              "Because the chain is made of cash-boxes and ledgers, Dickens shows that Marley's burden is the greed he chose in life.",
              "Then three more spirits come.",
              "The words 'link by link' suggest that greed is built slowly, through many small choices, so Scrooge can still stop forging his own chain.",
            ],
            correct: [2, 4],
            hint: "Summary tells what happens. Commentary explains how specific details or words create meaning.",
            mistakes: [
              { match: "Tapped 'The ghost is wrapped in a long chain.'", coach: "That reports a detail from the plot. Commentary explains what the detail means." },
              { match: "Tapped 'Then three more spirits come.'", coach: "That's plot summary. Look for sentences that explain why or how." },
            ],
            seconds: 45,
          },
          think: {
            q: "Which sentence is commentary rather than summary?",
            choices: [
              "Tom Sawyer is told to whitewash a fence.",
              "Tom's friends give him an apple, a kite and other treasures.",
              "Tom finishes the fence by the afternoon.",
              "By pretending the chore is a privilege, Tom reveals a shrewd grasp of how desire works, which makes him a small-scale businessman.",
            ],
            answer: 3,
            why: "It interprets the action and explains what it reveals about Tom.",
            hints: [
              "That's the setup of the scene, summary.",
              "That retells what happens. What does it show about Tom?",
              "Still plot. Commentary explains meaning.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Summary is a tour guide saying, 'This is a cathedral.' Analysis is the guide explaining why the arches point upward and what the builders meant by it.",
            example:
              "Summary: 'Scrooge is visited by three spirits.' Analysis: 'Dickens sends three spirits, past, present and future, so that Scrooge must face the whole span of his life before he can change it.'",
            simpler: {
              q: "Commentary in an analysis paragraph explains...",
              choices: ["How the words create meaning", "What happens next in the plot"],
              answer: 0,
              why: "Commentary interprets; it doesn't just retell.",
              hints: ["", "Retelling the plot is summary, not commentary."],
            },
          },
        },
      ],
      activity: {
        type: "sort",
        prompt: "Sort each sentence about Macbeth: summary or analysis?",
        buckets: ["Summary", "Analysis"],
        items: [
          { text: "Macbeth kills King Duncan.", bucket: 0 },
          { text: "Lady Macbeth walks in her sleep in Act 5.", bucket: 0 },
          { text: "Shakespeare turns blood into a symbol of guilt that grows as the play goes on.", bucket: 1 },
          { text: "Macbeth becomes king.", bucket: 0 },
          { text: "The word 'little' in 'a little water' exposes how badly Lady Macbeth underestimates her guilt.", bucket: 1 },
          { text: "By contrasting her confidence in Act 2 with her despair in Act 5, Shakespeare shows that guilt cannot be escaped.", bucket: 1 },
        ],
      },
      explain: {
        prompt: "Explain how to analyze a piece of literature and write about it, using one example from a classic.",
        keyPoints: [
          "A theme is a complete statement about life, not a one-word topic.",
          "Symbols are concrete things that carry larger meaning.",
          "Character is revealed directly or indirectly.",
          "An analysis paragraph has a claim, an embedded quotation and commentary.",
          "Uses a specific example from Homer, Shakespeare, Twain or Dickens.",
        ],
      },
      mastery: [
        {
          type: "place",
          prompt: "Place each classic on the timeline by when it was first published or performed.",
          min: 1550,
          max: 1950,
          step: 1,
          tolerance: 8,
          items: [
            { label: "Shakespeare's Macbeth", value: 1606 },
            { label: "Dickens' A Christmas Carol", value: 1843 },
            { label: "Twain's The Adventures of Tom Sawyer", value: 1876 },
          ],
          hint: "Shakespeare wrote in the early 1600s. Dickens and Twain both wrote in the 1800s, Dickens first.",
          mistakes: [
            { match: "Macbeth placed in the 1800s", coach: "Shakespeare died in 1616. Macbeth was first performed in the early 1600s." },
          ],
          seconds: 40,
        },
        {
          type: "build",
          prompt: "Build an analysis paragraph about the Odyssey in order: claim, evidence, commentary, link to theme.",
          tiles: [
            "Homer uses the contest of the bow to reveal Odysseus' true identity.",
            "Every suitor fails to string the great bow, but the disguised beggar strings it with ease.",
            "The bow answers what no disguise can hide: only the true king has the strength and skill it demands.",
            "In this way the poem suggests that a rightful place is proved by deeds, not claimed by words.",
          ],
          distractors: ["The Odyssey is a very long poem."],
          hint: "Make a point, prove it with a detail, explain the detail, then connect it to a larger meaning.",
          mistakes: [
            { match: "Used 'The Odyssey is a very long poem.'", coach: "True, but it isn't part of this analysis. Every sentence should serve the claim." },
          ],
          seconds: 50,
        },
        {
          type: "highlight",
          prompt: "Tap the sentence that uses indirect characterization.",
          sentences: [
            "Scrooge was a covetous old sinner.",
            "Scrooge was solitary as an oyster.",
            "When Scrooge walked down the street, nobody ever stopped him to say, 'How are you?'",
          ],
          correct: [2],
          hint: "Indirect characterization shows a trait through actions or others' reactions, leaving you to infer it.",
          mistakes: [
            { match: "Tapped 'Scrooge was solitary as an oyster.'", coach: "The narrator states the trait outright with a simile. That is direct." },
          ],
          seconds: 30,
        },
        {
          type: "cloze",
          text: "A {0} is a full-sentence claim about life. A {1} is a concrete thing that carries a larger idea. A character who changes is {2}.",
          blanks: [{ answers: ["theme"] }, { answers: ["symbol"] }, { answers: ["dynamic"] }],
          bank: ["theme", "symbol", "dynamic", "topic", "static", "setting"],
          hint: "Topic is one word; its statement is the theme. A changing character is the opposite of static.",
          mistakes: [
            { match: "topic", coach: "A topic is just a word or phrase. The full-sentence statement is the theme." },
            { match: "static", coach: "A static character stays the same. A changing one, like Scrooge, is dynamic." },
          ],
          seconds: 35,
        },
      ],
      check: [
        {
          q: "Which is a theme rather than a topic?",
          choices: [
            "Ambition",
            "Ambition that refuses every moral limit destroys the person who holds it.",
            "Scotland in the Middle Ages",
          ],
          answer: 1,
          why: "A theme is a complete statement about life; the others are a topic and a setting.",
        },
        {
          q: "What is Marley's chain made of?",
          choices: [
            "Iron bars from a prison",
            "Roses and thorns",
            "Gold coins only",
            "Cash-boxes, keys, padlocks, ledgers and purses",
          ],
          answer: 3,
          why: "Dickens builds the chain from the tools of Marley's money-making, so it symbolizes his greed.",
        },
        {
          q: "Tom Sawyer gets his friends to pay him to whitewash the fence. This is an example of...",
          choices: ["Indirect characterization", "Direct characterization", "A theme statement"],
          answer: 0,
          why: "We infer Tom's cleverness from what he does; the narrator doesn't simply name it.",
        },
        {
          q: "What is the most important part of an analysis paragraph?",
          choices: [
            "Retelling the whole plot",
            "Using the longest quotation possible",
            "Commentary that explains how the words create meaning",
            "Listing the author's other books",
          ],
          answer: 2,
          why: "Commentary is where analysis happens; summary and long quotations don't explain anything.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Read A Christmas Carol (Stave One and Stave Five) or Act 2, Scene 2 and Act 5, Scene 1 of Macbeth. Write a literary analysis essay of 500 to 750 words that argues for one theme and shows how the author develops it through at least one symbol and the change (or lack of change) in a main character. Use at least three short, embedded quotations, each followed by commentary.",
        rubric: [
          "States a clear, arguable thesis naming a theme as a full sentence.",
          "Analyzes at least one symbol and explains how it carries the theme.",
          "Analyzes character using direct or indirect evidence, including whether the character changes.",
          "Embeds at least three short quotations, each followed by real commentary rather than summary.",
          "Organized paragraphs with topic sentences and a conclusion that shows why the theme matters.",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 4. Research and sources
    // ------------------------------------------------------------------
    {
      id: "writing-hs.research",
      title: "Research and Sources",
      minutes: 40,
      stage: "logic",
      subject: "Writing",
      read: `Research writing means building an argument on evidence that other people can check. That requires three skills: finding sources, judging them and citing them honestly.

Sources come in layers. A primary source was created at the time by someone who was there: a letter, a diary, a photograph, a speech, a law, a scientific paper reporting an original experiment. A secondary source interprets primary sources from a distance: a biography, a history book, a scholarly article about a novel. A tertiary source, such as an encyclopedia or textbook, summarizes secondary sources. Tertiary sources are good starting points for background, but a serious paper rests on primary and secondary sources.

Primary sources are close to events, but they are not automatically correct. On December 17, 1903, after the first powered flights at Kitty Hawk, the Wright brothers sent a telegram home. The telegram reported the longest flight as 57 seconds, but it actually lasted 59. A careful researcher compares sources rather than trusting any single one.

To judge a source, ask four questions. Who wrote it, and what do they know? When was it written, and is it still current? What evidence does it give, and does it cite its own sources? Why was it written: to inform, to sell or to persuade? Then read laterally: before trusting an unfamiliar website, leave it and see what other reliable sources say about it.

When you use a source, you may quote it exactly, paraphrase it fully in your own words and sentence structure, or summarize its main point briefly. All three require a citation. Presenting another person's words or ideas as your own is plagiarism, and it is a form of lying.

Many high school and college writers use MLA style. In the text, a short parenthetical citation names the author and page: (McCullough 104). At the end, a Works Cited page lists every source alphabetically by the author's last name. A book entry follows the pattern Author. Title. Publisher, Year. For example: McCullough, David. The Wright Brothers. Simon and Schuster, 2015. The title of a book is set in italics. Citation is not busywork. It lets your reader retrace your steps and judge your evidence for themselves.`,
      keyIdeas: [
        "Primary sources come from the time and the people involved; secondary sources interpret them; tertiary sources summarize.",
        "Judge a source by author, date, evidence and purpose, and read laterally to check it.",
        "Quotations, paraphrases and summaries all need citations; passing off others' work as your own is plagiarism.",
        "MLA uses short in-text citations (Author page) and an alphabetical Works Cited list.",
      ],
      hook: {
        text: "On December 17, 1903, Orville and Wilbur Wright flew the first powered airplane at Kitty Hawk, North Carolina. That evening they telegraphed their father that the longest flight lasted 57 seconds. It actually lasted 59. Even a source written by the people who were there, on the very day, can contain an error. So how does a researcher decide what to believe?",
        visual: {
          type: "compare",
          left: { title: "The telegram said", points: ["Four flights", "Longest: 57 seconds", "Sent the same day"] },
          right: { title: "The record shows", points: ["Four flights", "Longest: 59 seconds", "Confirmed by other evidence"] },
        },
      },
      teach: [
        {
          title: "Primary, secondary, tertiary",
          teach:
            "Historians sort sources by their distance from events. A primary source was made at the time by a participant or witness: Lincoln's handwritten draft of the Gettysburg Address, the Wright brothers' telegram, a soldier's diary, a photograph, a ship's log, a scientist's report of her own experiment. A secondary source analyzes primary sources afterward: David McCullough's biography The Wright Brothers, or a scholar's article on Lincoln's speeches. A tertiary source, such as an encyclopedia entry or a textbook chapter, condenses secondary sources into an overview. The categories depend on your question. A 1950 newspaper review of a novel is a secondary source about the novel but a primary source if you are studying how readers in 1950 reacted. Start with tertiary sources to get oriented, then build your argument on primary evidence and the best secondary scholarship.",
          visual: {
            type: "hotspots",
            title: "Three layers of sources",
            center: "Distance from the event",
            spots: [
              { label: "Primary", icon: "📜", detail: "Made at the time by people involved: letters, diaries, speeches, photographs, original data." },
              { label: "Secondary", icon: "📘", detail: "Interprets primary sources later: biographies, histories, scholarly articles." },
              { label: "Tertiary", icon: "📚", detail: "Summarizes secondary sources: encyclopedias, textbooks, reference guides." },
            ],
          },
          probe: {
            type: "sort",
            prompt: "Your research question: what happened at Kitty Hawk in 1903? Sort each source.",
            buckets: ["Primary", "Secondary", "Tertiary"],
            items: [
              { text: "The Wright brothers' telegram of December 17, 1903", bucket: 0 },
              { text: "A photograph of the first flight taken that morning", bucket: 0 },
              { text: "David McCullough's 2015 biography The Wright Brothers", bucket: 1 },
              { text: "A historian's journal article on early aviation", bucket: 1 },
              { text: "An encyclopedia entry on the history of flight", bucket: 2 },
            ],
            hint: "Was it made at the time by people involved, written later from those sources, or a summary of summaries?",
            mistakes: [
              { match: "Put the biography under primary", coach: "McCullough wrote it more than a century later from letters and diaries. It interprets primary sources, so it's secondary." },
              { match: "Put the encyclopedia under secondary", coach: "An encyclopedia summarizes what historians have written. That makes it tertiary." },
            ],
            seconds: 45,
          },
          think: {
            q: "You are studying the Gettysburg Address. Which is a primary source?",
            choices: [
              "A textbook chapter on the Civil War",
              "A modern biography of Lincoln",
              "A handwritten copy of the speech in Lincoln's own hand",
              "An encyclopedia article on Gettysburg",
            ],
            answer: 2,
            why: "It was created at the time by the person who gave the speech.",
            hints: [
              "A textbook summarizes. That's tertiary.",
              "A modern biography interprets the past from a distance. That's secondary.",
              "",
              "Encyclopedias are tertiary summaries.",
            ],
          },
          approaches: {
            analogy:
              "Think of a soccer game. A primary source is a player's own account or the game film. A secondary source is a sportswriter's analysis the next day. A tertiary source is the league's season summary.",
            example:
              "Topic: the Lewis and Clark expedition. Primary: the journals the explorers kept on the trail. Secondary: a historian's book that analyzes those journals. Tertiary: an encyclopedia's two-paragraph summary.",
            simpler: {
              q: "A diary written during a war, by a soldier who fought in it, is a...",
              choices: ["Primary source", "Tertiary source"],
              answer: 0,
              why: "It was made at the time by someone who was there.",
              hints: ["", "Tertiary sources are summaries like encyclopedias. A soldier's diary is firsthand."],
            },
          },
        },
        {
          title: "Judging a source",
          teach:
            "Not every source deserves your trust. Ask four questions. Author: who wrote this, and what do they know? A historian of aviation knows more about the Wrights than an anonymous blogger. Date: when was it written? For a scientific question, a source from 1980 may be outdated; for a historical one, an eyewitness account may be valuable precisely because it is old. Evidence: does it cite primary sources, data or other scholars, so you can check its claims? Purpose: was it written to inform, or to sell a product or win an argument? A source with a motive may still be accurate, but read it with extra care. Finally, read laterally. Professional fact-checkers do not stay on an unfamiliar website studying its design. They open new tabs and see what reliable sources say about the site and its claims. Corroboration, agreement among independent sources, is the strongest test.",
          visual: {
            type: "flip",
            cards: [
              { front: "Author", back: "Who wrote it, and what qualifies them?" },
              { front: "Date", back: "When was it written, and does that matter for my question?" },
              { front: "Evidence", back: "Does it cite sources I can check?" },
              { front: "Purpose", back: "Is it trying to inform, sell or persuade?" },
              { front: "Read laterally", back: "Leave the page and see what other reliable sources say." },
            ],
          },
          probe: {
            type: "highlight",
            prompt: "You find a web page about a 'miracle study method.' Tap every red flag.",
            sentences: [
              "No author is named anywhere on the page.",
              "It says 'scientists agree' but links to no study.",
              "A large button says 'Buy the course now for $299!'",
              "It was last updated this year.",
              "It quotes a named professor and links to her published paper.",
            ],
            correct: [0, 1, 2],
            hint: "Check author, evidence and purpose. Which details make the page harder to trust?",
            mistakes: [
              { match: "Tapped 'It was last updated this year.'", coach: "A recent date is usually a good sign, not a red flag." },
              { match: "Tapped the named professor sentence", coach: "A named expert with a linked paper is something you can check. That's a point in the page's favor." },
            ],
            seconds: 40,
          },
          think: {
            q: "What does it mean to 'read laterally'?",
            choices: [
              "Read the page slowly from left to right",
              "Leave the source and check what other reliable sources say about it",
              "Only read the first paragraph",
            ],
            answer: 1,
            why: "Fact-checkers open other sources to verify an unfamiliar one rather than judging it by its own look.",
            hints: [
              "Every page is read left to right. Lateral reading means moving across sources.",
              "",
              "Skimming one paragraph doesn't tell you if the source is reliable.",
            ],
          },
          approaches: {
            analogy:
              "Judging a source is like checking a stranger's job reference. You don't just ask the stranger if he's honest. You call people who know him.",
            example:
              "A site claims a vitamin cures colds. Author: unnamed. Evidence: none linked. Purpose: it sells the vitamin. Lateral reading: medical research summaries say the evidence is weak. Verdict: don't use it as evidence.",
            simpler: {
              q: "A page that sells the product it praises has a...",
              choices: ["Possible bias in its purpose", "Guarantee of accuracy"],
              answer: 0,
              why: "When a source profits from your belief, read it with extra care.",
              hints: ["", "Selling something gives a source a reason to exaggerate."],
            },
          },
        },
        {
          title: "Quote, paraphrase, summarize",
          teach:
            "There are three honest ways to use a source. A quotation copies the exact words inside quotation marks. Use it when the wording itself matters, as with Lincoln's 'government of the people, by the people, for the people.' A paraphrase restates a specific passage fully in your own words and your own sentence structure. Changing a few words while keeping the original sentence shape is not paraphrase; it is called patchwriting and counts as plagiarism. A summary condenses the main idea of a longer passage, or a whole work, into a sentence or two. All three need a citation, because the idea still belongs to the source even when the words are yours. Plagiarism, presenting another person's words or ideas as your own, is a form of dishonesty. It also robs you of the real work of writing, which is thinking.",
          visual: {
            type: "compare",
            left: { title: "Patchwriting (plagiarism)", points: ["Original: 'The brothers tested their designs in a homemade wind tunnel.'", "Patch: 'The brothers checked their designs in a homemade wind tunnel.'", "Same shape, a word swapped"] },
            right: { title: "True paraphrase", points: ["Original: 'The brothers tested their designs in a homemade wind tunnel.'", "Paraphrase: 'Using a wind tunnel they built themselves, the Wrights measured how each wing shape performed.'", "New wording, new structure, still cited"] },
          },
          probe: {
            type: "match",
            prompt: "Original: 'The Wrights succeeded because they solved the problem of control before they added an engine.' Match each use to its name.",
            pairs: [
              { left: "Quotation", right: "As one historian notes, the Wrights 'solved the problem of control before they added an engine.'" },
              { left: "Paraphrase", right: "Before installing a motor, the brothers first figured out how a pilot could steer and balance the craft." },
              { left: "Summary", right: "The Wrights' success came from mastering control first." },
              { left: "Patchwriting", right: "The Wrights won because they fixed the problem of control before they put in an engine." },
            ],
            hint: "Exact words in quotation marks, fully reworded, briefly condensed, or the same sentence with a few words swapped?",
            mistakes: [
              { match: "Swapped paraphrase and patchwriting", coach: "Patchwriting keeps the original sentence shape and swaps a few words. A true paraphrase rebuilds the sentence." },
            ],
            seconds: 50,
          },
          think: {
            q: "Which uses of a source need a citation?",
            choices: [
              "Only direct quotations",
              "Only paraphrases",
              "None, if you change enough words",
              "Quotations, paraphrases and summaries",
            ],
            answer: 3,
            why: "The idea belongs to the source no matter whose words express it.",
            hints: [
              "Paraphrases and summaries still use someone else's ideas.",
              "Quotations and summaries need citations too.",
              "Changing words doesn't change whose idea it is.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Citing is like crediting the player who made the assist. You still scored the goal, but you name who set it up, because that's the honest record of the play.",
            example:
              "Original: 'Lincoln revised his speeches carefully.' Summary in your essay: 'Lincoln was a meticulous reviser (Wilson 15).' The idea came from Wilson, so even your own words get the citation.",
            simpler: {
              q: "Putting a writer's exact words in your essay requires...",
              choices: ["Quotation marks and a citation", "Nothing extra"],
              answer: 0,
              why: "Exact words must be marked as quotation and credited.",
              hints: ["", "Using someone's exact words without credit is plagiarism."],
            },
          },
        },
        {
          title: "MLA basics",
          teach:
            "MLA style, from the Modern Language Association, is the most common citation system in high school English. It has two linked parts. In your sentence, a short parenthetical citation gives the author's last name and the page number, with no comma. If a fact came from page 66, you write: 'The brothers built their own wind tunnel (McCullough 66).' The period goes after the parentheses. If you name the author in your sentence, give only the page: 'McCullough notes that... (66).' At the end of the paper, a Works Cited page lists every source alphabetically by the author's last name. A book entry follows this pattern: Last name, First name. Title of Book. Publisher, Year. For example: McCullough, David. The Wright Brothers. Simon and Schuster, 2015. The book's title is italicized. Each in-text citation must point to exactly one entry on the Works Cited page, so a reader can find your evidence.",
          visual: {
            type: "sequence",
            prompt: "The order of an MLA book entry",
            steps: [
              "Author's last name, first name.",
              "Title of the book (in italics).",
              "Publisher,",
              "Year of publication.",
            ],
          },
          probe: {
            type: "build",
            prompt: "Build the MLA Works Cited entry for Twain's novel, in order.",
            tiles: ["Twain, Mark.", "The Adventures of Tom Sawyer.", "American Publishing Company,", "1876."],
            distractors: ["Mark Twain.", "page 15"],
            hint: "Author (last name first), title, publisher, year.",
            mistakes: [
              { match: "Used 'Mark Twain.'", coach: "MLA puts the last name first: Twain, Mark." },
              { match: "Used 'page 15'", coach: "Page numbers go in the in-text citation, not in a Works Cited book entry." },
            ],
            seconds: 40,
          },
          think: {
            q: "Which is a correct MLA in-text citation for page 104 of McCullough's book?",
            choices: ["(McCullough 104)", "(David McCullough, page 104)", "(104, McCullough, 2015)"],
            answer: 0,
            why: "MLA in-text citations give the author's last name and the page, with no comma or 'page.'",
            hints: [
              "",
              "MLA uses only the last name and no word 'page.'",
              "The author comes first, and MLA in-text citations don't include the year.",
            ],
          },
          approaches: {
            analogy:
              "An in-text citation is like a library call number on a book's spine. It's short, and it points you to the full record in the catalog, which is the Works Cited page.",
            example:
              "Sentence: 'Dickens wrote A Christmas Carol in about six weeks (Smith 42).' Works Cited: 'Smith, Jane. Dickens at Work. Example Press, 2010.' The name Smith links the two, and 42 tells the reader which page.",
            simpler: {
              q: "In MLA, the Works Cited page is ordered by...",
              choices: ["The author's last name", "The order you used the sources"],
              answer: 0,
              why: "Works Cited entries are alphabetical by the author's last name.",
              hints: ["", "MLA lists sources alphabetically so readers can find them quickly."],
            },
          },
        },
      ],
      activity: {
        type: "sequence",
        prompt: "Put the steps of an honest research process in order.",
        steps: [
          "Ask a focused research question",
          "Read a tertiary source for background",
          "Find primary and secondary sources",
          "Judge each source: author, date, evidence, purpose",
          "Take notes, marking quotations and recording page numbers",
          "Write, citing every quotation, paraphrase and summary",
          "Build the Works Cited page",
        ],
      },
      explain: {
        prompt: "Explain how a careful researcher finds, judges and cites sources.",
        keyPoints: [
          "Primary sources come from the time; secondary sources interpret; tertiary sources summarize.",
          "Judge a source by its author, date, evidence and purpose.",
          "Check unfamiliar sources by reading laterally and comparing sources.",
          "Quotations, paraphrases and summaries all need citations.",
          "MLA uses (Author page) in the text and a Works Cited list at the end.",
        ],
      },
      mastery: [
        {
          type: "sort",
          prompt: "Your question: how did Londoners react to A Christmas Carol in 1843? Sort each source.",
          buckets: ["Primary", "Secondary", "Tertiary"],
          items: [
            { text: "A London magazine review of the book published in 1843", bucket: 0 },
            { text: "A letter Dickens wrote to a friend about the book's sales", bucket: 0 },
            { text: "A modern scholar's book on Dickens and Victorian readers", bucket: 1 },
            { text: "An encyclopedia entry on Charles Dickens", bucket: 2 },
          ],
          hint: "For this question, anything written by readers or by Dickens in the 1840s is primary.",
          mistakes: [
            { match: "Put the 1843 review under secondary", coach: "For a question about how readers reacted in 1843, an 1843 review is firsthand evidence of that reaction." },
          ],
          seconds: 40,
        },
        {
          type: "cloze",
          text: "In MLA, an in-text citation looks like ({0} 66). The full list at the end of the paper is called Works {1}, and it is ordered {2} by last name.",
          blanks: [{ answers: ["McCullough"] }, { answers: ["Cited"] }, { answers: ["alphabetically"] }],
          bank: ["McCullough", "Cited", "alphabetically", "David", "Consulted", "chronologically"],
          hint: "MLA in-text citations use the last name. The final list has a two-word name and an A-to-Z order.",
          mistakes: [
            { match: "David", coach: "MLA in-text citations use the author's last name." },
            { match: "Consulted", coach: "MLA's list is called Works Cited." },
            { match: "chronologically", coach: "Works Cited is alphabetical, so readers can find a name quickly." },
          ],
          seconds: 35,
        },
        {
          type: "highlight",
          prompt: "Tap the two practices that count as plagiarism.",
          sentences: [
            "Quoting a historian's sentence in quotation marks with a citation",
            "Swapping a few words in a source's sentence and leaving out the citation",
            "Summarizing a book's argument in your own words with a citation",
            "Copying a paragraph from a website into your essay as if you wrote it",
          ],
          correct: [1, 3],
          hint: "Plagiarism is presenting someone else's words or ideas as your own.",
          mistakes: [
            { match: "Tapped the cited summary", coach: "A summary in your own words with a citation is honest use of a source." },
          ],
          seconds: 35,
        },
        {
          type: "number",
          prompt: "The Wright brothers' telegram said the longest flight lasted 57 seconds. It actually lasted 59. By how many seconds was the telegram off?",
          answer: 2,
          unit: "seconds",
          hint: "Subtract the telegram's number from the true one.",
          mistakes: [{ match: "59", coach: "That's the true length. The question asks for the size of the error." }],
          seconds: 20,
        },
      ],
      check: [
        {
          q: "Which is a secondary source on the Wright brothers?",
          choices: [
            "Their telegram from Kitty Hawk",
            "A photograph of the first flight",
            "Orville's diary from 1903",
            "A historian's biography written in 2015",
          ],
          answer: 3,
          why: "A later biography interprets primary sources from a distance.",
        },
        {
          q: "What does 'reading laterally' mean?",
          choices: [
            "Reading only the headlines",
            "Checking what other reliable sources say about an unfamiliar source",
            "Reading the source twice",
          ],
          answer: 1,
          why: "Fact-checkers leave a source to see how other trusted sources describe it.",
        },
        {
          q: "Which uses of a source need a citation?",
          choices: [
            "Quotations, paraphrases and summaries",
            "Only quotations",
            "Only ideas you disagree with",
          ],
          answer: 0,
          why: "Whenever you use someone else's words or ideas, you credit them.",
        },
        {
          q: "Which is a correct MLA Works Cited entry for a book?",
          choices: [
            "The Wright Brothers by David McCullough (2015)",
            "2015. McCullough. The Wright Brothers.",
            "McCullough, David. The Wright Brothers. Simon and Schuster, 2015.",
          ],
          answer: 2,
          why: "MLA lists Author (last, first). Title. Publisher, Year.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Choose a historical event (for example, the first flight at Kitty Hawk, the Gettysburg Address or the Lewis and Clark expedition). Find at least one primary source and two secondary sources. Write a 400 to 600 word research report that answers a focused question about the event, uses at least one quotation, one paraphrase and one summary, and ends with an MLA Works Cited page.",
        rubric: [
          "Asks and answers a focused research question.",
          "Uses at least one primary source and two credible secondary sources, and explains why they are trustworthy.",
          "Includes a correctly punctuated quotation, a true paraphrase and a summary, each cited (Author page).",
          "Ends with an alphabetical MLA Works Cited page with correctly formatted entries.",
          "Clear organization and honest use of sources, with no patchwriting.",
        ],
      },
    },

    // ------------------------------------------------------------------
    // 5. Style: clarity and concision
    // ------------------------------------------------------------------
    {
      id: "writing-hs.style",
      title: "Style: Clarity and Concision",
      minutes: 35,
      stage: "rhetoric",
      subject: "Writing",
      read: `In 1656 the French mathematician Blaise Pascal apologized at the end of a long letter: he had made it longer than usual, he wrote, only because he had not had time to make it shorter. Every good writer knows the feeling. A first draft pours out words; revision is the slow work of cutting until every word earns its place.

In 1946 George Orwell, author of Animal Farm, published an essay called "Politics and the English Language," in which he argued that muddy writing leads to muddy thinking, and the reverse. He offered six rules. Do not use a figure of speech you are used to seeing in print. Never use a long word where a short one will do. If it is possible to cut a word out, cut it. Never use the passive voice where you can use the active. Avoid foreign phrases, scientific words and jargon when an everyday English word exists. And break any of these rules sooner than write something outright barbarous.

The active voice puts the doer first: "Lincoln wrote the speech." The passive voice hides or delays the doer: "The speech was written by Lincoln," or simply "The speech was written." Passive sentences are not grammatical errors, and sometimes the doer truly does not matter. But passive voice can also be a way to dodge responsibility. "Mistakes were made" admits a fault without saying who made it.

Clutter is any word that adds length without adding meaning. "Due to the fact that" means "because." "At this point in time" means "now." "In order to" usually means "to." Redundant pairs such as "end result," "past history" and "free gift" say the same thing twice. Throat-clearing openers like "It is important to note that" delay the point. William Strunk Jr., in The Elements of Style, put it in three words: "Omit needless words."

Concision does not mean every sentence must be short. It means no word is wasted. The King James Bible's Ecclesiastes says, "the race is not to the swift, nor the battle to the strong." Orwell showed how the same idea would sound in modern bureaucratic prose, swollen with phrases like "objective considerations of contemporary phenomena." The original is concrete, rhythmic and unforgettable; the rewrite is none of those things. Write like the original.`,
      keyIdeas: [
        "Orwell's rules: fresh images, short words, cut what you can, prefer active voice, avoid jargon, and break a rule rather than write something awful.",
        "Active voice names the doer first; passive voice can hide responsibility.",
        "Clutter is words that add length without meaning; 'Omit needless words.'",
        "Concise writing is concrete and exact, not necessarily short.",
      ],
      hook: {
        text: "In 1656 Blaise Pascal ended a long letter with an apology: he had made it longer than usual, he said, only because he had not had time to make it shorter. Why would a shorter letter take more time to write? Because cutting is harder than adding. Every word you remove forces you to decide what you really mean.",
        visual: {
          type: "compare",
          left: { title: "Before revision", points: ["Due to the fact that it was raining at that point in time, the game was postponed by the officials."] },
          right: { title: "After revision", points: ["Because it was raining, the officials postponed the game."] },
        },
      },
      teach: [
        {
          title: "Orwell's six rules",
          teach:
            "In his 1946 essay 'Politics and the English Language,' George Orwell argued that vague, padded writing makes it easy to think lazily, and even to hide the truth. He gave six rules. One: never use a figure of speech you are used to seeing in print, because stale images like 'a level playing field' no longer make readers see anything. Two: never use a long word where a short one will do; write 'use,' not 'utilize.' Three: if you can cut a word, cut it. Four: never use the passive where you can use the active. Five: avoid foreign phrases, scientific words and jargon when an everyday English word exists. Six: break any of these rules sooner than say anything outright barbarous. That last rule matters. The rules serve clear thinking; they are not a cage.",
          visual: {
            type: "flip",
            cards: [
              { front: "Rule 1: stale images", back: "Avoid figures of speech you're used to seeing in print, like 'at the end of the day.'" },
              { front: "Rule 2: short words", back: "Use, not utilize. Help, not facilitate." },
              { front: "Rule 3: cut", back: "If a word can go, it goes." },
              { front: "Rule 4: active voice", back: "'The committee approved the plan,' not 'The plan was approved.'" },
              { front: "Rule 5: plain English", back: "Skip jargon and foreign phrases when an everyday word works." },
              { front: "Rule 6: judgment", back: "Break any rule rather than write something awful." },
            ],
          },
          probe: {
            type: "match",
            prompt: "Match each revision to the Orwell rule it follows.",
            pairs: [
              { left: "'utilize' becomes 'use'", right: "Never use a long word where a short one will do." },
              { left: "'The ball was kicked by Sam' becomes 'Sam kicked the ball'", right: "Prefer the active voice." },
              { left: "'at the end of the day' is deleted", right: "Avoid figures of speech you're used to seeing in print." },
              { left: "'the very first beginning' becomes 'the beginning'", right: "If it is possible to cut a word out, cut it." },
            ],
            hint: "Ask what changed: word length, voice, a tired image or extra words.",
            mistakes: [
              { match: "Swapped the cliché and the cutting rules", coach: "'At the end of the day' is a stale image, so it falls under rule one. 'Very first' is padding, so it falls under cutting." },
            ],
            seconds: 45,
          },
          think: {
            q: "Which revision best follows Orwell's second rule?",
            choices: [
              "'Commence' becomes 'begin'",
              "'Begin' becomes 'commence'",
              "'Begin' becomes 'initiate the process of beginning'",
            ],
            answer: 0,
            why: "Rule two says never use a long word where a short one will do.",
            hints: [
              "",
              "That swaps a short word for a longer, stiffer one, the opposite of the rule.",
              "That adds jargon and extra words. Orwell would cut it.",
            ],
          },
          approaches: {
            analogy:
              "Orwell's rules are like a carpenter's rules: measure twice, cut once. They are habits that prevent common mistakes, and a master knows when the situation calls for an exception.",
            example:
              "Before: 'At the end of the day, we need to utilize our resources in order to facilitate growth.' After: 'We need to use what we have to grow.' A stale image, two long words and two padding words are gone.",
            simpler: {
              q: "Which is shorter and plainer?",
              choices: ["Help", "Facilitate"],
              answer: 0,
              why: "'Help' is the short, everyday word Orwell would choose.",
              hints: ["", "'Facilitate' is the longer, stiffer word."],
            },
          },
        },
        {
          title: "Active and passive voice",
          teach:
            "In the active voice, the subject does the action: 'Churchill gave the speech.' In the passive voice, the subject receives the action: 'The speech was given by Churchill.' You can spot the passive by its form: some version of 'to be' (is, was, were, been) plus a past participle (given, made, written), often followed by 'by' and the doer. Active sentences are usually shorter, more direct and easier to follow, because they put the actor first, the way we see events happen. Passive voice also lets a writer leave the actor out entirely. 'Mistakes were made' admits a fault without saying who made it. That is why Orwell distrusted it. The passive is not wrong. It fits when the actor is unknown or unimportant: 'The tomb was built around 2500 BC.' But when you know who acted, say so.",
          visual: {
            type: "compare",
            left: { title: "Passive", points: ["The speech was given by Churchill.", "Mistakes were made.", "The window was broken."] },
            right: { title: "Active", points: ["Churchill gave the speech.", "I made mistakes.", "Tom broke the window."] },
          },
          probe: {
            type: "highlight",
            prompt: "Tap every sentence written in the passive voice.",
            sentences: [
              "Lincoln revised the speech on the train.",
              "The letter was written by Pascal in 1656.",
              "Mistakes were made.",
              "Odysseus strung the bow with ease.",
              "The fence was whitewashed by Tom's friends.",
            ],
            correct: [1, 2, 4],
            hint: "Look for a form of 'to be' (was, were) plus a past participle (written, made, whitewashed).",
            mistakes: [
              { match: "Missed 'Mistakes were made.'", coach: "'Were made' is a form of 'to be' plus a past participle. It's passive, and it hides who made the mistakes." },
              { match: "Tapped 'Lincoln revised the speech on the train.'", coach: "Lincoln (the doer) comes first and does the action. That's active." },
            ],
            seconds: 40,
          },
          think: {
            q: "Which sentence is in the active voice?",
            choices: [
              "The bridge was designed by a team of engineers.",
              "The results were announced.",
              "The bow was strung by Odysseus.",
              "A team of engineers designed the bridge.",
            ],
            answer: 3,
            why: "The doer (the engineers) comes first and performs the action.",
            hints: [
              "'Was designed by' is passive: the bridge receives the action.",
              "'Were announced' is passive, and it doesn't even say who announced them.",
              "'Was strung by' is passive. Try putting Odysseus first.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Active voice is like a sports announcer: 'Smith shoots, scores!' Passive voice is like reading the box score the next day: 'A goal was scored.' You learn what happened but lose the player.",
            example:
              "Passive: 'The decision to cancel the trip was made.' Who decided? Active: 'The principal canceled the trip.' Now the reader knows who acted, and the sentence is four words shorter.",
            simpler: {
              q: "In 'The cake was eaten by the dog,' who did the eating?",
              choices: ["The dog", "The cake"],
              answer: 0,
              why: "The dog is the doer, even though it comes last in the passive sentence.",
              hints: ["", "The cake didn't eat anything. It received the action."],
            },
          },
        },
        {
          title: "Cutting clutter",
          teach:
            "Clutter is any word that adds length without adding meaning, and it creeps into every first draft. Watch for four kinds. Wordy phrases: 'due to the fact that' means 'because,' 'at this point in time' means 'now,' 'in the event that' means 'if.' Redundancies: 'end result,' 'past history,' 'free gift' and 'completely finished' each say the same thing twice. Throat-clearing: openers like 'It is important to note that' or 'I think that' delay the real point. Empty intensifiers: 'very,' 'really' and 'extremely' usually weaken the word they prop up; 'very tired' is weaker than 'exhausted.' In The Elements of Style, William Strunk Jr. told his students, 'Omit needless words.' He added that this does not require every sentence to be short, only that every word tell. Cutting is not about saving space. It is about respecting the reader's attention.",
          visual: {
            type: "sort",
            prompt: "What kind of clutter is it?",
            buckets: ["Wordy phrase", "Redundancy", "Throat-clearing"],
            items: [
              { text: "due to the fact that", bucket: 0 },
              { text: "end result", bucket: 1 },
              { text: "It is important to note that", bucket: 2 },
              { text: "at this point in time", bucket: 0 },
              { text: "free gift", bucket: 1 },
            ],
          },
          probe: {
            type: "cloze",
            text: "Cut the clutter. 'Due to the fact that' becomes {0}. 'At this point in time' becomes {1}. 'In the event that' becomes {2}.",
            blanks: [{ answers: ["because", "since"] }, { answers: ["now"] }, { answers: ["if"] }],
            hint: "Each wordy phrase has a one-word replacement that means the same thing.",
            mistakes: [
              { match: "then", coach: "'At this point in time' means the present moment. Which one word means that?" },
              { match: "when", coach: "'In the event that' sets a condition, which is a job for a two-letter word." },
            ],
            seconds: 35,
          },
          think: {
            q: "Which is the best revision of 'It is important to note that the end result was very good'?",
            choices: [
              "It is important to note that the result was good.",
              "The end result was really very good.",
              "Note that the end result was good.",
              "The result was excellent.",
            ],
            answer: 3,
            why: "It cuts the throat-clearing, the redundancy and the weak intensifier.",
            hints: [
              "The throat-clearing opener is still there.",
              "That adds clutter instead of cutting it.",
              "Better, but 'end result' is still redundant.",
              "",
            ],
          },
          approaches: {
            analogy:
              "Cutting clutter is like pruning a rosebush. You remove the extra stems not because they're ugly but because they steal strength from the flowers.",
            example:
              "Draft: 'In my opinion, I think that the past history of Rome is very interesting.' Revision: 'Rome's history fascinates me.' 'In my opinion' and 'I think' repeat each other, 'past history' is redundant, and 'very interesting' becomes one exact word.",
            simpler: {
              q: "What is the one-word version of 'in order to'?",
              choices: ["To", "Whereby"],
              answer: 0,
              why: "'In order to' almost always means just 'to.'",
              hints: ["", "'Whereby' is longer and stiffer. Look for the shortest word that keeps the meaning."],
            },
          },
        },
        {
          title: "Concrete and exact",
          teach:
            "The final test of style is whether readers can see what you mean. Concrete words name things the senses can find: 'bread,' 'river,' 'sword.' Abstract words name ideas: 'success,' 'phenomena,' 'factors.' Abstract words are sometimes necessary, but piles of them blur meaning. The King James Bible's Ecclesiastes says, 'the race is not to the swift, nor the battle to the strong.' Orwell rewrote that idea in imitation of modern official prose, beginning with 'Objective considerations of contemporary phenomena compel the conclusion.' The original uses a race and a battle, things you can picture. The rewrite uses vague abstractions you cannot picture at all. When you revise, find each abstract phrase and ask, 'What exactly do I mean?' Then name the thing. Also vary sentence length: a short sentence after several long ones lands with force. Read your draft aloud. Your ear will catch what your eye forgives.",
          visual: {
            type: "compare",
            left: { title: "Abstract and vague", points: ["Objective considerations of contemporary phenomena", "Various factors impacted the outcome", "Inclement weather conditions"] },
            right: { title: "Concrete and exact", points: ["The race is not to the swift", "The bridge washed out", "Sleet"] },
          },
          probe: {
            type: "build",
            prompt: "Build the clearest, most concrete sentence. Leave out the clutter.",
            tiles: ["The flood", "washed out", "the only bridge", "into town."],
            distractors: ["Various water-related factors", "had an impact on", "infrastructure"],
            hint: "Name the actual thing, use a strong active verb, and skip abstract padding.",
            mistakes: [
              { match: "Used 'Various water-related factors'", coach: "That is vague. What exactly happened? Name the flood." },
              { match: "Used 'had an impact on'", coach: "That's a weak, abstract verb. 'Washed out' shows what happened." },
            ],
            seconds: 40,
          },
          think: {
            q: "Which sentence is the most concrete?",
            choices: [
              "Various factors negatively impacted the harvest.",
              "Adverse conditions affected outcomes.",
              "A late frost killed half the apple blossoms.",
            ],
            answer: 2,
            why: "It names exactly what happened, to what, and how much, so the reader can picture it.",
            hints: [
              "Which factors? 'Negatively impacted' is vague and abstract.",
              "Every word is abstract. Can you picture anything?",
              "",
            ],
          },
          approaches: {
            analogy:
              "Abstract writing is like a blurry photograph: you can tell something is there but not what. Concrete words bring the picture into focus.",
            example:
              "Abstract: 'The student experienced difficulties with time management.' Concrete: 'Sam started his essay at 11 p.m. the night before it was due.' The second shows the problem instead of naming a category.",
            simpler: {
              q: "Which word is more concrete?",
              choices: ["Hammer", "Equipment"],
              answer: 0,
              why: "You can picture a hammer; 'equipment' is a vague category.",
              hints: ["", "'Equipment' could mean a thousand things. Which one can you picture?"],
            },
          },
        },
      ],
      activity: {
        type: "highlight",
        prompt: "From a student's draft. Tap every sentence that needs revision for clutter or passive voice.",
        sentences: [
          "Lincoln revised his address carefully.",
          "Due to the fact that the ceremony was long, the crowd was tired by the time he spoke.",
          "The speech was delivered by Lincoln in about two minutes.",
          "Its final sentence names the purpose of the war.",
          "It is important to note that the end result was a very famous speech.",
        ],
        correct: [1, 2, 4],
      },
      explain: {
        prompt: "Explain how to revise a draft so it is clear and concise.",
        keyPoints: [
          "Cut clutter: wordy phrases, redundancy and throat-clearing.",
          "Prefer the active voice so the doer is named first.",
          "Choose short, plain, concrete words over long or abstract ones.",
          "Orwell's rules serve clarity and can be broken when they would make writing worse.",
          "Read the draft aloud to hear what to cut.",
        ],
      },
      mastery: [
        {
          type: "highlight",
          prompt: "Tap the sentences in the passive voice.",
          sentences: [
            "The treaty was signed in 1783.",
            "Pascal apologized for the long letter.",
            "The ball was dropped by the shortstop.",
            "Strunk taught a writing course at Cornell.",
          ],
          correct: [0, 2],
          hint: "Passive sentences use a form of 'to be' plus a past participle, and the doer comes after 'by' or disappears.",
          mistakes: [
            { match: "Tapped the Strunk sentence", coach: "Strunk is the doer and comes first. That sentence is active." },
          ],
          seconds: 30,
        },
        {
          type: "number",
          prompt: "Revise 'It is important to note that the meeting was postponed by the committee' to 'The committee postponed the meeting.' How many words long is the revision?",
          answer: 5,
          unit: "words",
          hint: "Count every word in 'The committee postponed the meeting.'",
          mistakes: [{ match: "13", coach: "That's the length of the original. Count the revision." }],
          seconds: 20,
        },
        {
          type: "match",
          prompt: "Match each cluttered phrase to its concise replacement.",
          pairs: [
            { left: "due to the fact that", right: "because" },
            { left: "at this point in time", right: "now" },
            { left: "in the event that", right: "if" },
            { left: "the end result", right: "the result" },
          ],
          hint: "Each replacement keeps the meaning and drops the padding.",
          mistakes: [
            { match: "Swapped 'now' and 'if'", coach: "'At this point in time' names a moment, so it's 'now.' 'In the event that' sets a condition, so it's 'if.'" },
          ],
          seconds: 35,
        },
        {
          type: "build",
          prompt: "Rewrite in the active voice: 'The bridge was finished by the workers in May.' Build it.",
          tiles: ["The workers", "finished", "the bridge", "in May."],
          distractors: ["was finished", "by the workers"],
          hint: "Active voice puts the doer first, then a strong verb, then what was acted on.",
          mistakes: [
            { match: "Used 'was finished'", coach: "'Was finished' is the passive form. Use the plain verb 'finished.'" },
          ],
          seconds: 30,
        },
      ],
      check: [
        {
          q: "Which revision follows Orwell's rule to prefer the active voice?",
          choices: [
            "The vote was taken by the council.",
            "A vote was taken.",
            "The council voted.",
          ],
          answer: 2,
          why: "The doer comes first and does the action.",
        },
        {
          q: "What does 'Omit needless words' mean, according to Strunk?",
          choices: [
            "Every sentence must be very short.",
            "Every word should do work; cut the ones that don't.",
            "Never use adjectives.",
            "Use as few sentences as possible.",
          ],
          answer: 1,
          why: "Strunk said sentences need not be short, only that every word should tell.",
        },
        {
          q: "Which is a redundancy?",
          choices: ["Free gift", "Steel bridge", "Old letter"],
          answer: 0,
          why: "A gift is already free, so 'free gift' says the same thing twice.",
        },
        {
          q: "Why did Pascal say his letter was long?",
          choices: [
            "He had too many ideas to share.",
            "His reader asked for a long letter.",
            "He wanted to show off his vocabulary.",
            "He had not had time to make it shorter.",
          ],
          answer: 3,
          why: "Pascal recognized that cutting takes more work than writing at length.",
        },
      ],
      task: {
        kind: "write",
        prompt:
          "Take an essay you wrote earlier this year (or the argumentative essay from this course). Revise one full page for clarity and concision. Cut at least 20 percent of the words, change every unnecessary passive sentence to active, replace clutter and stale images, and swap abstract phrases for concrete ones. Submit the revised version along with a short note listing five specific changes and the rule each one follows.",
        rubric: [
          "The revision is at least 20 percent shorter without losing any important idea.",
          "Unnecessary passive sentences are rewritten in the active voice.",
          "Wordy phrases, redundancies, throat-clearing and stale images are removed.",
          "Abstract phrases are replaced with concrete, exact words.",
          "The note explains five specific changes and names the rule each one follows.",
        ],
      },
    },
  ],
};
