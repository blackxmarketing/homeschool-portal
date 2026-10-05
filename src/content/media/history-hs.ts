import type { CourseMedia } from "./types";

/** Slides and videos for the history-hs lessons, keyed by lesson id. */
export const historyHsMedia: CourseMedia = {
  "history-hs.republics": {
    hook: {
      show: [
        { big: "458 BC", caption: "Rome, almost 2,500 years ago, faces an emergency." },
        { at: "named Cincinnatus", emoji: "🌾🐂", caption: "Cincinnatus, the farmer called from his plow to save Rome." },
        { at: "about sixteen days", big: "16 days", caption: "He could have kept power for six months. He gave it back after about sixteen days." },
        { at: "Why would anyone", emoji: "👑➡️🌾", caption: "Why would anyone hand back total power?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "594 BC", caption: "Solon's reforms free Athenians who had been enslaved for debt." },
          { at: "In 508 BC Cleisthenes", emoji: "🏛️🗳️", caption: "Cleisthenes gives the citizen Assembly power to make the laws." },
          { at: "Pericles says", photo: "Pericles", caption: "A marble bust of Pericles, the statesman who led Athens in its golden age." },
          { at: "direct democracy asked a lot", emoji: "⚖️🚣🛡️", caption: "Juries, the fleet, the army: citizens did it all themselves." },
          { at: "Self-government required", big: "Self-government", caption: "Free government needs citizens who can govern themselves." },
        ],
      },
      {
        show: [
          { emoji: "👑🚫", caption: "By Roman tradition, Rome expels its last king in 509 BC." },
          { at: "res publica", big: "Res Publica", caption: "\"The public thing\": government as every citizen's business." },
          { at: "Two consuls", emoji: "🦅🦅", caption: "Two consuls, one year each, and each could block the other." },
          { at: "The Senate", photo: "Roman Senate", caption: "A modern painting imagines a debate in the Roman Senate." },
          { at: "Polybius, who lived", big: "One + Few + Many", caption: "Polybius: Rome mixed monarchy, aristocracy and democracy." },
        ],
      },
      {
        show: [
          { emoji: "📜🤝", caption: "Rome's constitution was more than written laws." },
          { at: "mos maiorum", big: "Mos Maiorum", caption: "The custom of the ancestors: unwritten rules of honor." },
          { at: "In 458 BC", emoji: "⏳🌾", caption: "Cincinnatus saved Rome, then went home to his plow." },
          { at: "Cicero", photo: "Cicero", caption: "A Roman bust of Cicero, the great orator of the late Republic." },
          { at: "George Washington", emoji: "🇺🇸🎖️", caption: "Americans called Washington a new Cincinnatus when he gave up command." },
        ],
      },
      {
        show: [
          { big: "Nearly 500 years", caption: "The Roman Republic lasted almost five centuries." },
          { at: "In 133 BC", emoji: "⚠️🏛️", caption: "133 BC: violence enters Roman politics." },
          { at: "Around 107 BC", emoji: "🪖💰", caption: "Soldiers start to look to their general, not Rome, for pay and land." },
          { at: "crossed the Rubicon", photo: "File:Fiume Rubicone con ponte consolare - Savignano sul Rubicone (FC).JPG", caption: "The Rubicon today: a small river where a civil war began in 49 BC." },
          { at: "the name Augustus", photo: "File:Augustus Bevilacqua Glyptothek Munich 317.jpg", caption: "A bust of Augustus. The Republic's offices remained, but one man ruled." },
        ],
      },
    ],
  },

  "history-hs.magna-carta": {
    hook: {
      show: [
        { big: "1215", caption: "England, more than 800 years ago." },
        { at: "King John", photo: "John, King of England", caption: "King John's tomb effigy. He ruled England from 1199 to 1216." },
        { at: "even a king must obey the law", emoji: "👑⚖️", caption: "Even a king must obey the law." },
        { at: "What happened at Runnymede", photo: "Runnymede", caption: "Runnymede: a quiet meadow beside the River Thames." },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "👑💰", caption: "King John: energetic, but a harsh tax collector." },
          { at: "losing Normandy", big: "1204", caption: "John loses Normandy to the French king." },
          { at: "Battle of Bouvines", big: "1214", caption: "At Bouvines, John's allies are crushed." },
          { at: "later known as Magna Carta", photo: "Magna Carta", caption: "One of the surviving copies of Magna Carta." },
          { at: "twenty-five barons", big: "25", caption: "Twenty-five barons could act if the king broke his word." },
        ],
      },
      {
        show: [
          { big: "63 clauses", caption: "Most of the charter dealt with the problems of 1215." },
          { at: "Clause 39", big: "Clause 39", caption: "No punishment except by lawful judgment of peers or the law of the land." },
          { at: "Clause 40", emoji: "⚖️🚫💰", caption: "Justice would not be sold, denied or delayed." },
          { at: "Pope Innocent III", photo: "Pope Innocent III", caption: "Pope Innocent III declared the charter void within weeks." },
          { at: "The 1225 version", big: "1225", caption: "The reissued charter became part of English law." },
        ],
      },
      {
        show: [
          { photo: "Henry II of England", caption: "Henry II, John's father, spread royal justice across England." },
          { at: "Assize of Clarendon", big: "1166", caption: "Local men under oath report serious crimes to the king's judges." },
          { at: "juries came to decide", emoji: "👥⚖️", caption: "In time, juries decided the facts of a case." },
          { at: "is called a precedent", emoji: "📚➡️⚖️", caption: "Precedent: later judges follow earlier decisions." },
          { at: "because law makes the king", big: "Law makes the king", caption: "Bracton, around 1250: the king is under the law." },
        ],
      },
      {
        show: [
          { big: "1354", caption: "\"The law of the land\" becomes \"due process of the law.\"" },
          { at: "Sir Edward Coke", photo: "Edward Coke", caption: "Sir Edward Coke used Magna Carta to challenge King Charles I." },
          { at: "Habeas Corpus Act", big: "1679", caption: "Jailers must show a judge a lawful reason for holding a prisoner." },
          { at: "William Blackstone", photo: "William Blackstone", caption: "William Blackstone, whose Commentaries American colonists studied." },
          { at: "the Fifth Amendment", big: "5th Amendment", caption: "No one deprived of life, liberty or property without due process of law." },
        ],
      },
    ],
  },

  "history-hs.constitution": {
    hook: {
      show: [
        { photo: "Independence Hall", caption: "Independence Hall in Philadelphia, where the Constitution was written." },
        { at: "fifty-five delegates", big: "55", caption: "Fifty-five delegates, sworn to secrecy." },
        { at: "an entirely new plan", photo: "Constitution of the United States", caption: "The first page of the Constitution: We the People." },
        { at: "grabbing all the power", emoji: "⚖️🏛️⚖️", caption: "How do you keep anyone from grabbing all the power?" },
      ],
    },
    teach: [
      {
        show: [
          { big: "1781", caption: "The Articles of Confederation take effect." },
          { at: "could not tax", emoji: "💸🚫", caption: "Congress could ask the states for money, but could not tax." },
          { at: "all thirteen states", big: "13 of 13", caption: "Every change to the Articles needed every state to agree." },
          { at: "Daniel Shays", emoji: "🌾🚪", caption: "Shays' Rebellion: indebted farmers close the courts." },
          { at: "chose George Washington", photo: "George Washington", caption: "George Washington presided over the Convention." },
        ],
      },
      {
        show: [
          { big: "Virginia Plan", caption: "Three branches, and seats in Congress by population." },
          { at: "William Paterson", big: "New Jersey Plan", caption: "One house, with one equal vote for each state." },
          { at: "Roger Sherman", photo: "Roger Sherman", caption: "Roger Sherman of Connecticut helped find the middle path." },
          { at: "16 July 1787", big: "The Great Compromise", caption: "House by population; two senators for every state." },
          { at: "thirty-nine delegates signed", photo: "Scene at the Signing of the Constitution of the United States", caption: "A 1940 painting of the signing on 17 September 1787." },
        ],
      },
      {
        show: [
          { photo: "Montesquieu", caption: "Montesquieu, the French writer who taught separation of powers." },
          { at: "the very definition of tyranny", big: "Federalist No. 47", caption: "All power in the same hands: the very definition of tyranny." },
          { at: "If men were angels", emoji: "😇🏛️", caption: "If men were angels, no government would be necessary." },
          { at: "Ambition must be made", big: "Ambition vs. Ambition", caption: "Each branch gets the tools to resist the others." },
          { at: "Marbury v. Madison", big: "1803", caption: "Courts can strike down laws that conflict with the Constitution." },
        ],
      },
      {
        show: [
          { big: "9 of 13", caption: "Nine state conventions had to say yes." },
          { at: "Patrick Henry", photo: "Patrick Henry", caption: "Patrick Henry, a leading Anti-Federalist from Virginia." },
          { at: "85 essays", photo: "The Federalist Papers", caption: "The Federalist: 85 essays signed Publius." },
          { at: "Federalist No. 10", emoji: "🧩🧩🧩", caption: "In a large republic, many factions keep one another in check." },
          { at: "New Hampshire became the ninth", big: "21 June 1788", caption: "New Hampshire ratifies, and the Constitution takes effect." },
        ],
      },
    ],
  },

  "history-hs.civil-war": {
    hook: {
      show: [
        { big: "19 November 1863", caption: "A new soldiers' cemetery in Gettysburg, Pennsylvania." },
        { at: "Abraham Lincoln", photo: "Abraham Lincoln", caption: "Abraham Lincoln, sixteenth President of the United States." },
        { at: "fewer than three hundred words", big: "About 272 words", caption: "About two minutes long." },
        { at: "carved in stone", photo: "Lincoln Memorial", caption: "The Lincoln Memorial, where the Gettysburg Address is carved in stone." },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🗺️⚖️", caption: "Would slavery spread into the western territories?" },
          { at: "Kansas-Nebraska Act", big: "1854", caption: "Settlers may vote on slavery, and fighting breaks out in Kansas." },
          { at: "Dred Scott decision", photo: "Dred Scott", caption: "Dred Scott, who went to court to win his freedom." },
          { at: "A house divided", big: "A House Divided", caption: "Lincoln, June 1858: the nation cannot stay half slave and half free." },
          { at: "Fort Sumter", photo: "Fort Sumter", caption: "Fort Sumter in Charleston Harbor, where the war began in April 1861." },
        ],
      },
      {
        show: [
          { emoji: "🇺🇸🔗", caption: "Lincoln's first goal: restore the Union." },
          { at: "Horace Greeley", big: "Save the Union", caption: "Lincoln to Horace Greeley, August 1862." },
          { at: "at Antietam", big: "17 September 1862", caption: "Antietam: the bloodiest single day in American history." },
          { at: "Emancipation Proclamation declared", photo: "File:Emancipation proclamation.jpg", caption: "An 1864 painting of Lincoln reading the Proclamation to his Cabinet." },
          { at: "Black men could enlist", emoji: "🎖️🇺🇸", caption: "Black men could now serve in the Union Army and Navy." },
        ],
      },
      {
        show: [
          { big: "1-3 July 1863", caption: "Gettysburg: the largest battle of the war." },
          { at: "Vicksburg surrendered", emoji: "🏰🏳️", caption: "4 July 1863: Vicksburg surrenders to General Grant." },
          { at: "Edward Everett", big: "2 hours vs. 2 minutes", caption: "Everett spoke for two hours. Lincoln spoke for about two minutes." },
          { at: "Four score and seven", photo: "Gettysburg Address", caption: "Lincoln's short speech became one of the most famous in history." },
          { at: "new birth of freedom", big: "A New Birth of Freedom", caption: "Government of the people, by the people, for the people." },
        ],
      },
      {
        show: [
          { photo: "Frederick Douglass", caption: "Frederick Douglass escaped slavery and became a great speaker and writer." },
          { at: "about 180,000", big: "180,000", caption: "About 180,000 Black soldiers served in the Union Army." },
          { at: "Thirteenth Amendment", big: "13th Amendment", caption: "Slavery abolished throughout the United States." },
          { at: "With malice toward none", emoji: "🕊️🤝", caption: "With malice toward none, with charity for all." },
          { at: "Appomattox Court House", photo: "File:McLean house 1865 April.jpg", caption: "The McLean House at Appomattox, where Lee surrendered on 9 April 1865." },
        ],
      },
    ],
  },

  "history-hs.industrial": {
    hook: {
      show: [
        { emoji: "🐎💨", caption: "In 1800, the fastest way over land was a galloping horse." },
        { at: "about a week", big: "About a week", caption: "By 1869: New York to San Francisco by train." },
        { at: "telegraph message", emoji: "📡⚡", caption: "Telegraph messages crossed the continent in minutes." },
        { at: "What happened in between", big: "The Industrial Revolution", caption: "What changed the world so fast?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "💪🌬️💧", caption: "For thousands of years: muscles, wind and falling water." },
          { at: "In 1712 Thomas Newcomen", big: "1712", caption: "Newcomen's engine pumps water out of flooded mines." },
          { at: "James Watt", photo: "James Watt", caption: "James Watt, the Scottish instrument maker who improved the steam engine." },
          { at: "patented his separate condenser", emoji: "♨️➡️❄️", caption: "Cool the steam somewhere else, and keep the cylinder hot." },
          { at: "drive factory machines", photo: "Watt steam engine", caption: "A Watt-style steam engine with a big flywheel to drive machines." },
        ],
      },
      {
        show: [
          { emoji: "🧵🏠", caption: "Cloth was once spun by hand at home." },
          { at: "spinning jenny", photo: "Spinning jenny", caption: "A spinning jenny let one worker spin many threads at once." },
          { at: "at Cromford", photo: "Cromford Mill", caption: "Cromford Mill, Arkwright's water-powered cotton mill, opened in 1771." },
          { at: "pin factory", big: "48,000 pins", caption: "Ten workers, each doing one step, in a single day." },
          { at: "Factory Act of 1833", big: "1833", caption: "Britain bans children under nine from most textile mills." },
        ],
      },
      {
        show: [
          { emoji: "♨️🛤️", caption: "Put a steam engine on wheels and you have a locomotive." },
          { at: "the Rocket", photo: "Stephenson's Rocket", caption: "The Rocket, winner of the Rainhill Trials in 1829." },
          { at: "10 May 1869", photo: "First transcontinental railroad", caption: "Two railroads meet at Promontory Summit, Utah, on 10 May 1869." },
          { at: "standard time zones", emoji: "🕐🕑🕒🕓", caption: "1883: railroads adopt standard time zones." },
          { at: "What hath God wrought", big: "1844", caption: "Morse's telegraph: news in minutes instead of weeks." },
        ],
      },
      {
        show: [
          { emoji: "💡💼", caption: "An invention needs a business to reach people." },
          { at: "Andrew Carnegie", photo: "Andrew Carnegie", caption: "Andrew Carnegie, the Scottish immigrant who built a steel business." },
          { at: "public libraries", emoji: "📚🏛️", caption: "Carnegie paid for thousands of public libraries." },
          { at: "Thomas Edison", photo: "Thomas Edison", caption: "Thomas Edison ran an invention laboratory at Menlo Park." },
          { at: "Pearl Street power station", big: "1882", caption: "Pearl Street Station sells electricity in New York." },
        ],
      },
    ],
  },
};
