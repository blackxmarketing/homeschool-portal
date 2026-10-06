import type { Lesson } from "../types";
import { k5Course } from "./base";

/**
 * soc-5: Grade 5 social studies, U.S. history from the colonies to the
 * Constitution. Taught by Ranger Clark. Standards: src/content/standards/soc-5.ts.
 */

// 1. The thirteen colonies
const colonies: Lesson = {
  id: "soc-5.colonies",
  title: "The Thirteen Colonies",
  minutes: 30,
  stage: "grammar",
  standards: ["SS.5.1", "SS.5.2", "SS.5.3", "D2.Geo.2.3-5", "D2.Geo.6.3-5", "D2.Eco.4.3-5", "D2.Civ.3.3-5"],
  read: [
    "Between 1607 and 1732, settlers from England built thirteen colonies along the Atlantic coast of North America. A colony is a settlement ruled by a faraway country. The first lasting English colony was Jamestown, Virginia, founded in 1607. The last of the thirteen was Georgia, founded in 1732.",
    "Historians group the colonies into three regions. The New England Colonies were Massachusetts, New Hampshire, Connecticut and Rhode Island. The Middle Colonies were New York, New Jersey, Pennsylvania and Delaware. The Southern Colonies were Maryland, Virginia, North Carolina, South Carolina and Georgia.",
    "Geography shaped how each region made a living. New England had rocky soil, long cold winters, thick forests and a coast full of fish. Colonists there fished, hunted whales, cut lumber and built ships. The Middle Colonies had rich soil and a milder climate. Farmers grew so much wheat and other grain that the region was called the breadbasket colonies, and busy ports like Philadelphia and New York shipped it away. The Southern Colonies had a warm climate and a long growing season. Large farms called plantations grew tobacco, rice and indigo to sell overseas. Much of that hard work was forced on enslaved Africans, who were given no pay and no freedom.",
    "The land the colonists settled was already home to many Native American nations. As the colonies grew, those nations often lost their lands.",
    "The colonists also learned to govern themselves. In 1619, Virginia began the House of Burgesses, the first elected assembly in the colonies. In 1620, the Pilgrims sailed to Plymouth on the Mayflower. Before landing, the men aboard signed the Mayflower Compact, promising to make and obey \"just and equal laws\" for the good of the colony. In New England towns, citizens gathered at town meetings to talk over problems and vote on local laws. These habits of self-government mattered a great deal when the colonies later decided to rule themselves.",
  ].join("\n\n"),
  keyIdeas: [
    "The thirteen colonies formed three regions: New England, the Middle Colonies and the Southern Colonies.",
    "Geography shaped each region's work: fishing and shipbuilding in New England, grain farming in the Middle Colonies, and plantations in the South.",
    "Colonists practiced self-government through the House of Burgesses, the Mayflower Compact and town meetings.",
  ],
  hook: {
    text: "Picture yourself stepping off a wooden ship in 1620 after more than two months at sea. There are no houses, no stores and no roads. Winter is coming fast. What would you do first, and who would make the rules?",
  },
  teach: [
    {
      title: "Three Regions, Thirteen Colonies",
      teach:
        "Grab your map, explorer! Between 1607 and 1732, settlers from England built thirteen colonies along the Atlantic coast. A colony is a settlement ruled by a faraway country. The first lasting one was Jamestown, Virginia, in 1607. The last was Georgia, in 1732. Historians sort the colonies into three regions. In the north were the four New England Colonies: Massachusetts, New Hampshire, Connecticut and Rhode Island. In the middle were the four Middle Colonies: New York, New Jersey, Pennsylvania and Delaware. In the south were the five Southern Colonies: Maryland, Virginia, North Carolina, South Carolina and Georgia. Four plus four plus five makes thirteen.",
      visual: {
        type: "hotspots",
        title: "The thirteen colonies by region",
        center: "13 Colonies",
        spots: [
          { label: "New England", icon: "🐟", detail: "Massachusetts, New Hampshire, Connecticut and Rhode Island. The northern region, with cold winters and rocky soil." },
          { label: "Middle Colonies", icon: "🌾", detail: "New York, New Jersey, Pennsylvania and Delaware. Rich soil, a milder climate and busy port cities." },
          { label: "Southern Colonies", icon: "🌱", detail: "Maryland, Virginia, North Carolina, South Carolina and Georgia. A warm climate and a long growing season." },
          { label: "Jamestown, 1607", icon: "⚓", detail: "In Virginia: the first lasting English colony in North America." },
          { label: "Georgia, 1732", icon: "🏁", detail: "The last of the thirteen colonies to be founded." },
        ],
      },
      probe: {
        type: "sort",
        prompt: "Sort each colony into its region.",
        buckets: ["New England", "Middle Colonies", "Southern Colonies"],
        items: [
          { text: "Massachusetts", bucket: 0 },
          { text: "Connecticut", bucket: 0 },
          { text: "Rhode Island", bucket: 0 },
          { text: "New Hampshire", bucket: 0 },
          { text: "New York", bucket: 1 },
          { text: "Pennsylvania", bucket: 1 },
          { text: "New Jersey", bucket: 1 },
          { text: "Delaware", bucket: 1 },
          { text: "Virginia", bucket: 2 },
          { text: "Georgia", bucket: 2 },
          { text: "Maryland", bucket: 2 },
          { text: "North Carolina", bucket: 2 },
          { text: "South Carolina", bucket: 2 },
        ],
        hint: "Remember four, four, five: four New England colonies in the north, four Middle Colonies, and five Southern Colonies.",
        mistakes: [
          { match: "New York in New England", coach: "New York is a neighbor of New England, but it belongs to the Middle Colonies with New Jersey, Pennsylvania and Delaware." },
          { match: "Maryland in Middle Colonies", coach: "Maryland sits just south of Pennsylvania and is counted with the Southern Colonies." },
          { match: "Delaware in Southern Colonies", coach: "Delaware is small and easy to miss. It is one of the four Middle Colonies." },
        ],
        seconds: 75,
      },
      think: {
        q: "Which region was Pennsylvania in?",
        choices: ["New England", "The Middle Colonies", "The Southern Colonies"],
        answer: 1,
        why: "Pennsylvania was one of the four Middle Colonies, with New York, New Jersey and Delaware.",
        hints: [
          "New England was the four northern colonies, starting with Massachusetts. Pennsylvania is farther south.",
          "",
          "The Southern Colonies began with Maryland, just below Pennsylvania. Pennsylvania itself is in the middle.",
        ],
      },
      approaches: {
        analogy:
          "Think of the coast like a bookshelf with three shelves. The top shelf holds four books (New England), the middle shelf holds four books (the Middle Colonies), and the bottom shelf holds five (the Southern Colonies).",
        example:
          "Start at the top of the map. Massachusetts is in New England. Move down to New York: that's the Middle Colonies. Keep going past Delaware into Maryland and you've reached the Southern Colonies.",
        simpler: {
          q: "How many regions were the thirteen colonies grouped into?",
          choices: ["Two", "Three", "Thirteen"],
          answer: 1,
          why: "There were three regions: New England, the Middle Colonies and the Southern Colonies.",
          hints: ["Count again: north, middle and south makes more than two.", "", "Thirteen is the number of colonies, not the number of regions."],
        },
      },
    },
    {
      title: "Geography Shapes How People Work",
      teach:
        "The land and climate decided how each region earned a living. New England had rocky soil and long, cold winters, so farming was hard. But it had thick forests and a coast full of fish. Colonists fished, hunted whales, cut lumber and built ships. The Middle Colonies had rich soil and milder weather. Farmers grew so much wheat and other grain that people called them the breadbasket colonies. Ports like Philadelphia and New York shipped that grain away. The Southern Colonies had a warm climate and a long growing season. Big farms called plantations grew tobacco, rice and indigo, a plant used to make blue dye. Much of that work was forced on enslaved Africans, who got no pay and no freedom.",
      visual: {
        type: "flip",
        cards: [
          { front: "New England", back: "Rocky soil, cold winters, forests and fish. Work: fishing, whaling, lumber and shipbuilding." },
          { front: "Middle Colonies", back: "Rich soil and a milder climate. Work: wheat and grain farms, so they were called the breadbasket colonies." },
          { front: "Southern Colonies", back: "Warm climate and a long growing season. Work: plantations growing tobacco, rice and indigo." },
          { front: "Plantation", back: "A very large farm that grows one main crop to sell. In the colonies, much of the work was forced on enslaved people." },
          { front: "Indigo", back: "A plant used to make blue dye for cloth. It grew well in South Carolina." },
        ],
      },
      probe: {
        type: "cloze",
        text: "New England's rocky soil pushed many colonists to the sea, where they caught {0} and built {1}. The Middle Colonies grew so much {2} that they were called the breadbasket colonies. In the warm South, large farms called {3} grew tobacco and rice.",
        blanks: [{ answers: ["fish"] }, { answers: ["ships"] }, { answers: ["wheat", "grain"] }, { answers: ["plantations"] }],
        bank: ["fish", "ships", "wheat", "plantations", "gold", "oranges"],
        hint: "Match each region to its land: rocky coast means the sea, rich soil means grain, warm weather means big farms.",
        mistakes: [
          { match: "gold", coach: "The English colonists hoped to find gold, but they didn't. They made their living from farming, fishing and trade." },
          { match: "oranges", coach: "Oranges need a hotter climate than the Middle Colonies. Think of the crop that fills a breadbasket." },
        ],
        seconds: 45,
      },
      think: {
        q: "Why did so many New Englanders fish and build ships instead of running big farms?",
        choices: ["The king did not allow farming there", "Rocky soil and cold winters made farming hard, but forests and the sea gave them other work", "They had too much warm weather", "They had no trees"],
        answer: 1,
        why: "Poor soil and a short growing season made big farms hard, while forests gave wood for ships and the ocean was full of fish.",
        hints: [
          "There was no rule against farming. Many New Englanders had small family farms. Look at the land itself.",
          "",
          "New England had long, cold winters, not too much warm weather.",
          "New England had thick forests, and that wood is what they used to build ships.",
        ],
      },
      approaches: {
        analogy:
          "It's like a lemonade stand: you sell what you can make with what's around you. If your yard has lemon trees, you sell lemonade. New England had trees and fish, so it sold ships and fish.",
        example:
          "A family in Pennsylvania plants wheat in rich soil, harvests it, and sells it to a merchant in Philadelphia, who ships it to other colonies. That's the breadbasket at work.",
        simpler: {
          q: "Which region had a warm climate and a long growing season?",
          choices: ["New England", "The Southern Colonies"],
          answer: 1,
          why: "The Southern Colonies were the warmest, with the longest growing season.",
          hints: ["New England was the farthest north, with long, cold winters.", ""],
        },
      },
    },
    {
      title: "Learning to Govern Themselves",
      teach:
        "The king was across an ocean, so colonists learned to run many things themselves. In 1619, Virginia began the House of Burgesses, the first elected assembly in the colonies. Voters chose men to help make the colony's laws. In 1620, the Pilgrims sailed to Plymouth on the Mayflower. Before they landed, the men aboard signed the Mayflower Compact. They promised to make and obey \"just and equal laws\" for the good of everyone. In New England towns, citizens met at town meetings to talk over problems, like fixing a road or paying a teacher, and then they voted. These habits of self-government grew strong over more than a hundred years.",
      visual: {
        type: "timeline",
        events: [
          { year: 1607, label: "Jamestown founded", detail: "The first lasting English colony, in Virginia." },
          { year: 1619, label: "House of Burgesses", detail: "Virginia's elected assembly, the first in the colonies, meets to make laws." },
          { year: 1620, label: "Mayflower Compact", detail: "The Pilgrims promise to make and obey fair laws together before landing at Plymouth." },
          { year: 1682, label: "Pennsylvania founded", detail: "William Penn starts a colony that welcomes people of many faiths." },
          { year: 1732, label: "Georgia founded", detail: "The last of the thirteen colonies." },
        ],
      },
      probe: {
        type: "match",
        prompt: "Match each piece of colonial self-government to what it was.",
        pairs: [
          { left: "House of Burgesses", right: "Virginia's elected assembly, the first in the colonies" },
          { left: "Mayflower Compact", right: "The Pilgrims' promise to make and obey fair laws" },
          { left: "Town meeting", right: "Citizens gathering to talk over town problems and vote" },
          { left: "Jamestown", right: "The first lasting English colony" },
        ],
        hint: "Burgesses were elected lawmakers, a compact is a promise, and a meeting is where people gather.",
        mistakes: [
          { match: "Mayflower Compact with town meeting", coach: "The Mayflower Compact was a written promise signed on a ship. Town meetings came later, as people gathered in their towns." },
        ],
        seconds: 45,
      },
      think: {
        q: "What did the men who signed the Mayflower Compact promise?",
        choices: ["To make and obey fair laws together", "To go back to England", "To find gold", "To never have a leader"],
        answer: 0,
        why: "They agreed to make and obey \"just and equal laws\" for the good of the colony.",
        hints: [
          "",
          "The Pilgrims came to stay. The Compact was about how they would live in their new home.",
          "The Compact was about laws and fairness, not treasure.",
          "They did choose leaders. The Compact was about everyone agreeing to follow fair laws.",
        ],
      },
      approaches: {
        analogy:
          "The Mayflower Compact is like a club writing its rules on the first day: everyone signs, everyone agrees to follow them, and the rules apply to all members equally.",
        example:
          "In a New England town meeting, a farmer stands up and says the bridge over the creek is broken. People talk it over, then vote to pay a carpenter to fix it. The citizens solved their own problem.",
        simpler: {
          q: "In a town meeting, who decided on local laws?",
          choices: ["Only the king", "The town's citizens, by voting"],
          answer: 1,
          why: "At town meetings, citizens talked things over and voted.",
          hints: ["The king was across the ocean, too far away to fix a town's road.", ""],
        },
      },
    },
  ],
  activity: {
    type: "sort",
    prompt: "Sort each way of making a living into the region where it was most common.",
    buckets: ["New England", "Middle Colonies", "Southern Colonies"],
    items: [
      { text: "Fishing for cod", bucket: 0 },
      { text: "Building ships", bucket: 0 },
      { text: "Hunting whales", bucket: 0 },
      { text: "Growing fields of wheat", bucket: 1 },
      { text: "Shipping grain from Philadelphia", bucket: 1 },
      { text: "Tobacco plantations", bucket: 2 },
      { text: "Growing rice and indigo", bucket: 2 },
    ],
  },
  explain: {
    prompt: "Explain to a friend how geography shaped the way people made a living in each of the three colonial regions.",
    keyPoints: [
      "New England had rocky soil and cold winters, so people fished and built ships",
      "The Middle Colonies had rich soil and grew wheat and grain",
      "The Southern Colonies had a warm climate and plantations growing tobacco and rice",
      "The land and climate decided the work",
    ],
  },
  mastery: [
    {
      type: "place",
      prompt: "Put these events on the timeline.",
      min: 1600,
      max: 1750,
      step: 1,
      tolerance: 3,
      items: [
        { label: "Jamestown founded", value: 1607 },
        { label: "Mayflower Compact signed", value: 1620 },
        { label: "Georgia founded", value: 1732 },
      ],
      hint: "Jamestown came first, the Mayflower Compact soon after, and Georgia more than a hundred years later.",
      seconds: 40,
    },
    {
      type: "highlight",
      prompt: "Tap every sentence that shows colonists governing themselves.",
      sentences: [
        "Virginia voters elected men to the House of Burgesses to make laws.",
        "A Boston sailor caught cod off the coast.",
        "Pilgrims signed a promise to obey fair laws they made together.",
        "Townspeople met and voted to hire a schoolteacher.",
        "A ship carried tobacco to England.",
      ],
      correct: [0, 2, 3],
      hint: "Self-government means people making their own rules and choices: electing, promising, voting.",
      seconds: 40,
    },
    {
      type: "number",
      prompt: "How many Southern Colonies were there?",
      answer: 5,
      hint: "Count them: Maryland, Virginia, North Carolina, South Carolina and Georgia.",
      mistakes: [{ match: "4", coach: "New England and the Middle Colonies had four each. The South had one more." }],
      seconds: 20,
    },
    {
      type: "cloze",
      text: "The Middle Colonies were called the {0} colonies because they grew so much grain.",
      blanks: [{ answers: ["breadbasket", "bread basket"] }],
      hint: "Grain is used to make bread. What do you carry bread in?",
      seconds: 25,
    },
  ],
  check: [
    {
      q: "Which colony was the first lasting English colony?",
      choices: ["Georgia", "Plymouth", "Jamestown, Virginia"],
      answer: 2,
      why: "Jamestown, Virginia, was founded in 1607, before Plymouth (1620) and Georgia (1732).",
    },
    {
      q: "Which region was known as the breadbasket colonies?",
      choices: ["The Middle Colonies", "New England", "The Southern Colonies"],
      answer: 0,
      why: "The Middle Colonies had rich soil and grew lots of wheat and grain.",
    },
    {
      q: "What was the House of Burgesses?",
      choices: ["A ship that carried Pilgrims", "Virginia's elected assembly that made laws", "A plantation in Georgia", "A fishing village"],
      answer: 1,
      why: "Begun in 1619, the House of Burgesses was the first elected assembly in the colonies.",
    },
    {
      q: "Why did New Englanders build so many ships?",
      choices: ["They had thick forests for wood and lived on the coast", "Ships grew in their fields", "The king paid them to stay home", "They had no ocean nearby"],
      answer: 0,
      why: "Forests gave plenty of wood, and the coast gave them harbors and fish.",
    },
  ],
  task: {
    kind: "project",
    prompt: "Draw a map of the thirteen colonies along the Atlantic coast. Color each region a different color, label every colony, and draw one picture of how people made a living in each region.",
    rubric: [
      "All thirteen colonies are labeled",
      "The three regions are colored differently and named",
      "Each region has a correct picture of its work (fish or ships, wheat, tobacco or rice)",
      "The map has a title and a compass rose",
    ],
  },
};

// 2. Causes of the Revolution
const road: Lesson = {
  id: "soc-5.road",
  title: "The Road to Revolution",
  minutes: 35,
  stage: "logic",
  standards: ["SS.5.4", "SS.5.5", "SS.5.6", "SS.5.16", "D2.His.14.3-5", "D2.Eco.10.3-5", "D2.His.1.3-5"],
  read: [
    "From 1754 to 1763, Britain and France fought the French and Indian War over land in North America. Many Native American nations fought too, most of them on the side of France. Britain won and took control of a huge area, but the war left Britain deeply in debt. British leaders decided the colonists should help pay for the war and for the soldiers who still guarded the frontier. In 1763, the king also told colonists not to settle west of the Appalachian Mountains.",
    "In 1765, Parliament, Britain's lawmaking body, passed the Stamp Act. It taxed newspapers, legal papers and even playing cards. The colonists were furious. They had no representatives in Parliament, so they had no say in these taxes. Their cry became \"No taxation without representation!\" Colonists boycotted, which means they refused to buy British goods. Parliament ended the Stamp Act in 1766, but soon passed new taxes on goods like glass, paint, paper and tea.",
    "Anger grew, especially in Boston. In 1770, British soldiers fired into a crowd, killing five colonists. People called it the Boston Massacre. Then, on December 16, 1773, colonists protesting the tax on tea climbed aboard three ships in Boston Harbor and dumped 342 chests of tea into the water. This was the Boston Tea Party. Britain struck back by closing Boston Harbor and taking away much of Massachusetts' self-government. Colonists called these laws the Intolerable Acts. In 1774, leaders from twelve colonies met as the First Continental Congress to plan what to do.",
    "On the night of April 18, 1775, British soldiers marched out of Boston to seize the colonists' weapons in Concord. Riders like Paul Revere and William Dawes galloped ahead to warn that the soldiers were coming. At dawn on April 19, colonial militia called minutemen faced the British at Lexington. Shots rang out. Later that day, at Concord's North Bridge, the minutemen pushed the British back, and the soldiers were fired on all the way to Boston. The American Revolution had begun.",
  ].join("\n\n"),
  keyIdeas: [
    "The French and Indian War left Britain in debt, so Parliament taxed the colonies.",
    "Colonists protested \"no taxation without representation\" because they had no say in Parliament.",
    "Protests like the Boston Tea Party led Britain to punish Massachusetts, and fighting began at Lexington and Concord in 1775.",
  ],
  hook: {
    text: "On a cold December night in 1773, a crowd gathered by Boston Harbor. Men climbed onto three ships and broke open hundreds of wooden chests. Splash! Tea poured into the dark water. Why would anyone throw away a fortune in tea? Let's follow the trail of clues.",
  },
  teach: [
    {
      title: "A War and a Debt",
      teach:
        "Our trail starts with a war. From 1754 to 1763, Britain and France fought over land in North America. Americans call it the French and Indian War, because France and many Native American nations fought on the same side. Britain won and gained a huge area of land. But wars cost money, and Britain was now deeply in debt. British leaders thought, \"We protected the colonists, so they should help pay.\" Parliament, Britain's lawmaking body, began passing new taxes on the colonies. In 1763, the king also ordered colonists not to settle west of the Appalachian Mountains. Many colonists who wanted that land were angry.",
      visual: {
        type: "timeline",
        events: [
          { year: 1754, label: "War begins", detail: "Britain and France start fighting over land in North America." },
          { year: 1763, label: "War ends", detail: "Britain wins, but is deeply in debt. The king forbids settling west of the Appalachians." },
          { year: 1765, label: "Stamp Act", detail: "Parliament taxes printed papers in the colonies to help pay its debt." },
        ],
      },
      probe: {
        type: "cloze",
        text: "Britain fought France in the French and Indian {0}. Britain won, but the fighting left it deeply in {1}. To help pay, Parliament passed new {2} on the colonies.",
        blanks: [{ answers: ["war"] }, { answers: ["debt"] }, { answers: ["taxes", "tax"] }],
        bank: ["war", "debt", "taxes", "treasure", "games"],
        hint: "Follow the money: a war costs money, and owing money is called debt. How do governments collect money from people?",
        mistakes: [{ match: "treasure", coach: "Britain didn't end up with treasure. It owed money after paying for the war." }],
        seconds: 35,
      },
      think: {
        q: "Why did Parliament start taxing the colonies after 1763?",
        choices: ["To pay off debt from the French and Indian War", "To punish the colonies for the Tea Party", "Because the colonies asked for taxes", "To pay for the Declaration of Independence"],
        answer: 0,
        why: "The war left Britain deeply in debt, and leaders believed the colonists should help pay.",
        hints: [
          "",
          "The Tea Party came ten years later, in 1773. The taxes came first.",
          "The colonists did not ask for taxes. They protested them!",
          "The Declaration came in 1776, long after the first taxes.",
        ],
      },
      approaches: {
        analogy:
          "Imagine your older brother borrows money to build a fence around the whole family's yard. Then he says, \"The fence protects you too, so you have to help pay me back.\" That's how Britain saw the colonies after the war.",
        example:
          "Britain spent huge sums on soldiers, ships and supplies to win the war. Afterward, it still kept soldiers in America. Parliament's answer was the Stamp Act of 1765, a tax the colonists had to pay on printed papers.",
        simpler: {
          q: "Which country won the French and Indian War?",
          choices: ["France", "Britain"],
          answer: 1,
          why: "Britain won and gained land, but ended up in debt.",
          hints: ["France lost the war and gave up most of its land in North America.", ""],
        },
      },
    },
    {
      title: "No Taxation Without Representation",
      teach:
        "In 1765, Parliament passed the Stamp Act. Colonists had to buy a stamp for newspapers, legal papers and even playing cards. The colonists were not against all taxes. They were angry about who chose them. The colonies had no representatives in Parliament, so nobody spoke for them when the taxes were decided. Their cry became \"No taxation without representation!\" They boycotted, which means they refused to buy British goods, and British merchants lost money. In 1766, Parliament ended the Stamp Act. But new taxes on glass, paint, paper and tea soon followed. In 1770, British soldiers fired into an angry crowd in Boston, killing five colonists. People called it the Boston Massacre.",
      visual: {
        type: "flip",
        cards: [
          { front: "Parliament", back: "Britain's lawmaking body. The colonies had no members in it." },
          { front: "Stamp Act (1765)", back: "A tax on newspapers, legal papers and even playing cards." },
          { front: "Representation", back: "Having someone you chose speak and vote for you where laws are made." },
          { front: "Boycott", back: "Refusing to buy something as a protest. Colonists boycotted British goods." },
          { front: "Boston Massacre (1770)", back: "British soldiers fired into a crowd in Boston, killing five colonists." },
        ],
      },
      probe: {
        type: "build",
        prompt: "Build the colonists' famous protest slogan.",
        tiles: ["No", "taxation", "without", "representation!"],
        distractors: ["with", "kings", "freedom"],
        hint: "The colonists were angry about being taxed when they had no one speaking for them. Start with \"No.\"",
        mistakes: [{ match: "with", coach: "The problem was that they were taxed WITHOUT anyone representing them." }],
        seconds: 30,
      },
      think: {
        q: "What did \"no taxation without representation\" mean?",
        choices: ["Colonists should never pay any taxes", "Colonists should not be taxed by a Parliament where they had no representatives", "Only the king could make taxes", "Taxes should only be paid in tea"],
        answer: 1,
        why: "The colonists' complaint was about having no say, not about taxes themselves.",
        hints: [
          "The colonists paid taxes to their own colonial assemblies. Their complaint was about who chose the taxes.",
          "",
          "The colonists wanted MORE say, not to give all the power to the king.",
          "Tea was one of the things taxed, not a way to pay taxes.",
        ],
      },
      approaches: {
        analogy:
          "Imagine your class votes on how to spend the class money, but you aren't allowed to vote, and you still have to chip in. You'd say, \"Hey, I should get a say!\" That's representation.",
        example:
          "A Boston printer had to pay for a stamp on every newspaper he sold. Nobody he had voted for was in Parliament. So he joined a boycott, refused to buy British goods, and printed articles against the tax.",
        simpler: {
          q: "What is a boycott?",
          choices: ["Refusing to buy something as a protest", "A kind of British soldier", "A tax on tea"],
          answer: 0,
          why: "In a boycott, people stop buying goods to show they disagree.",
          hints: ["", "British soldiers were called redcoats, not boycotts.", "The tea tax was a law. A boycott is what people do to protest."],
        },
      },
    },
    {
      title: "Tea in the Harbor",
      teach:
        "Now back to our mystery. In 1773, Parliament passed the Tea Act. It let one British company sell tea cheaply in the colonies, but the tea still carried a tax. Many colonists saw it as a trick to make them accept Parliament's right to tax them. On December 16, 1773, protesters climbed aboard three ships in Boston Harbor. They dumped 342 chests of tea into the water. This was the Boston Tea Party. Britain struck back hard. It closed Boston Harbor and took away much of Massachusetts' self-government. Colonists called these laws the Intolerable Acts. In 1774, leaders from twelve colonies met in Philadelphia as the First Continental Congress to plan what to do.",
      visual: {
        type: "hotspots",
        title: "Boston, 1773 to 1774",
        center: "Boston Harbor",
        spots: [
          { label: "Tea Act", icon: "🫖", detail: "1773: cheap British tea, but still taxed. Colonists refused to accept it." },
          { label: "Tea Party", icon: "📦", detail: "December 16, 1773: protesters dumped 342 chests of tea into the harbor." },
          { label: "Harbor closed", icon: "⛔", detail: "Britain shut Boston Harbor until the tea was paid for." },
          { label: "Intolerable Acts", icon: "😠", detail: "1774: the colonists' name for the punishing laws Britain passed." },
          { label: "First Continental Congress", icon: "🏛️", detail: "1774: leaders from twelve colonies met in Philadelphia to plan a response." },
        ],
      },
      probe: {
        type: "sequence",
        prompt: "Put these events in the order they happened.",
        steps: [
          "Parliament passes the Tea Act",
          "Protesters dump tea into Boston Harbor",
          "Britain closes Boston Harbor",
          "The First Continental Congress meets in Philadelphia",
        ],
        hint: "Think cause and effect: a law, a protest against it, a punishment for the protest, then leaders meeting to respond.",
        seconds: 40,
      },
      think: {
        q: "What did Britain do after the Boston Tea Party?",
        choices: ["Lowered all taxes", "Closed Boston Harbor and punished Massachusetts", "Gave the colonies seats in Parliament", "Sent more tea for free"],
        answer: 1,
        why: "Britain passed the Intolerable Acts, closing the harbor and limiting Massachusetts' self-government.",
        hints: [
          "Britain wanted to show it was in charge, so it did not give in.",
          "",
          "The colonists wanted seats in Parliament, but Britain never gave them.",
          "Britain wanted the destroyed tea paid for, not more tea given away.",
        ],
      },
      approaches: {
        analogy:
          "It's like a chain of dominoes: the tax tips the protest, the protest tips the punishment, and the punishment tips the colonies into working together.",
        example:
          "With Boston Harbor closed, ships could not bring in food or carry out goods, and many Bostonians lost their work. Other colonies sent food to help, and their leaders gathered at the First Continental Congress.",
        simpler: {
          q: "What did the protesters throw into Boston Harbor?",
          choices: ["Tea", "Gold coins", "Cannons"],
          answer: 0,
          why: "They dumped 342 chests of tea to protest the tax on it.",
          hints: ["", "No gold went into the harbor. Think of the drink that was taxed.", "Cannons were for battles. This protest was about a taxed drink."],
        },
      },
    },
    {
      title: "The Shot Heard Round the World",
      teach:
        "By 1775, Massachusetts colonists were storing weapons and training militia called minutemen, who could be ready in a minute. On the night of April 18, British soldiers marched out of Boston to seize the weapons stored in Concord. Riders like Paul Revere and William Dawes galloped through the dark to warn that the soldiers were coming. At dawn on April 19, about seventy minutemen faced the British on the green at Lexington. A shot rang out, and soon eight colonists lay dead. Later that day, at Concord's North Bridge, the minutemen pushed the British back. Years later, the poet Ralph Waldo Emerson called it \"the shot heard round the world.\" The Revolution had begun.",
      visual: {
        type: "timeline",
        events: [
          { year: 1773, label: "Boston Tea Party", detail: "Protesters dump tea into Boston Harbor." },
          { year: 1774, label: "Intolerable Acts", detail: "Britain punishes Massachusetts. The First Continental Congress meets." },
          { year: 1775, label: "Lexington and Concord", detail: "April 19: the first battles of the American Revolution." },
        ],
      },
      probe: {
        type: "cloze",
        text: "On April 19, 1775, colonial militia called {0} faced British soldiers at Lexington and then at {1}, where they pushed the British back. Riders such as Paul {2} had warned them the soldiers were coming.",
        blanks: [{ answers: ["minutemen", "minute men", "militia"] }, { answers: ["Concord"] }, { answers: ["Revere"] }],
        hint: "The militia were ready in a minute. The British were marching toward the town where the weapons were stored. The rider's last name rhymes with \"severe.\"",
        mistakes: [
          { match: "Boston", coach: "The British marched OUT of Boston toward the town where the weapons were stored." },
          { match: "redcoats", coach: "Redcoats was a nickname for the British soldiers. The colonists' militia had a different name." },
        ],
        seconds: 45,
      },
      think: {
        q: "Why did British soldiers march to Concord?",
        choices: ["To hold a town meeting", "To seize the colonists' stored weapons", "To deliver tea", "To sign a peace treaty"],
        answer: 1,
        why: "They wanted to take the weapons and gunpowder the colonists had stored there.",
        hints: [
          "Town meetings were for townspeople, not for soldiers on a night march.",
          "",
          "The soldiers were on a military mission, not making deliveries.",
          "Peace was a long way off. This march started the fighting.",
        ],
      },
      approaches: {
        analogy:
          "Imagine someone heading to your house at night to take your tools. Neighbors ride ahead shouting a warning, and everyone grabs what they have to stop them. That's what happened on the road to Concord.",
        example:
          "Paul Revere rode from Charlestown toward Lexington, warning families along the way. By dawn, minutemen were waiting on Lexington's green. By evening, the British were retreating to Boston under fire from militia behind walls and trees.",
        simpler: {
          q: "In what year did the fighting begin at Lexington and Concord?",
          choices: ["1765", "1775", "1787"],
          answer: 1,
          why: "The battles of Lexington and Concord were on April 19, 1775.",
          hints: ["1765 was the year of the Stamp Act, ten years earlier.", "", "1787 was the year the Constitution was written, after the war."],
        },
      },
    },
  ],
  activity: {
    type: "sequence",
    prompt: "Put the road to revolution in order, from first to last.",
    steps: [
      "The French and Indian War ends and Britain is in debt",
      "Parliament passes the Stamp Act",
      "British soldiers fire on a crowd in the Boston Massacre",
      "Colonists dump tea into Boston Harbor",
      "Britain passes the Intolerable Acts",
      "Minutemen fight at Lexington and Concord",
    ],
  },
  explain: {
    prompt: "Explain how a war between Britain and France ended up starting a war between Britain and its own colonies.",
    keyPoints: [
      "The French and Indian War left Britain in debt",
      "Parliament taxed the colonies, like the Stamp Act",
      "Colonists had no representation in Parliament",
      "Protests like the Boston Tea Party led Britain to punish Boston",
      "Fighting began at Lexington and Concord in 1775",
    ],
  },
  mastery: [
    {
      type: "match",
      prompt: "Match each cause to its effect.",
      pairs: [
        { left: "The French and Indian War", right: "Britain was left deeply in debt" },
        { left: "The Stamp Act", right: "Colonists boycotted British goods" },
        { left: "The Boston Tea Party", right: "Britain closed Boston Harbor" },
        { left: "The British march to Concord", right: "Minutemen fought the first battles of the Revolution" },
      ],
      hint: "For each event, ask: what happened next because of it?",
      seconds: 45,
    },
    {
      type: "place",
      prompt: "Put these events on the timeline.",
      min: 1750,
      max: 1780,
      step: 1,
      tolerance: 1,
      items: [
        { label: "French and Indian War ends", value: 1763 },
        { label: "Stamp Act", value: 1765 },
        { label: "Boston Tea Party", value: 1773 },
        { label: "Lexington and Concord", value: 1775 },
      ],
      hint: "The war ended in 1763, the Stamp Act came two years later, and the fighting began two years after the Tea Party.",
      seconds: 45,
    },
    {
      type: "highlight",
      prompt: "Tap every sentence that gives a reason colonists were angry at Britain.",
      sentences: [
        "Parliament taxed them even though they had no representatives there.",
        "Britain won the French and Indian War.",
        "The king forbade settling west of the Appalachian Mountains.",
        "Britain closed Boston Harbor and took away self-government in Massachusetts.",
        "Tea was a popular drink in the colonies.",
      ],
      correct: [0, 2, 3],
      hint: "Look for things Britain did TO the colonists that took away money, land or say.",
      seconds: 40,
    },
    {
      type: "number",
      prompt: "How many chests of tea were dumped into Boston Harbor in the Boston Tea Party?",
      answer: 342,
      tolerance: 0,
      hint: "It was more than three hundred, but less than three hundred fifty.",
      seconds: 20,
    },
  ],
  check: [
    {
      q: "What war left Britain deeply in debt?",
      choices: ["The Revolutionary War", "The French and Indian War", "The Civil War"],
      answer: 1,
      why: "The French and Indian War (1754 to 1763) cost Britain huge sums of money.",
    },
    {
      q: "Why did colonists object to the Stamp Act?",
      choices: ["Stamps were too ugly", "They had no representatives in Parliament, which made the tax", "They wanted to pay more taxes", "The tax was only on tea"],
      answer: 1,
      why: "\"No taxation without representation\": they had no say in Parliament.",
    },
    {
      q: "What was the Boston Tea Party?",
      choices: ["A celebration for the king", "A protest where colonists dumped taxed tea into Boston Harbor", "A battle with cannons", "A meeting of Parliament"],
      answer: 1,
      why: "On December 16, 1773, protesters dumped 342 chests of tea into the harbor.",
    },
    {
      q: "Where did the first battles of the American Revolution happen?",
      choices: ["Yorktown and Saratoga", "Philadelphia and New York", "Lexington and Concord"],
      answer: 2,
      why: "The fighting began at Lexington and Concord, Massachusetts, on April 19, 1775.",
    },
  ],
  task: {
    kind: "project",
    prompt: "Make a \"Road to Revolution\" comic strip with at least five boxes: the French and Indian War debt, the Stamp Act, the Boston Tea Party, the Intolerable Acts, and Lexington and Concord. Give each box a year and a caption that shows how one event caused the next.",
    rubric: [
      "Has at least five boxes in the right order",
      "Each box has the correct year",
      "Captions show cause and effect (because of this, that happened)",
      "Explains \"no taxation without representation\" somewhere in the strip",
    ],
  },
};

// 3. The Declaration of Independence
const declaration: Lesson = {
  id: "soc-5.declaration",
  title: "The Declaration of Independence",
  minutes: 30,
  stage: "logic",
  standards: ["SS.5.7", "SS.5.8", "SS.5.16", "D2.Civ.8.3-5", "D2.His.3.3-5", "D2.His.9.3-5", "D2.His.4.3-5"],
  read: [
    "After the fighting began at Lexington and Concord, leaders from the colonies met again in Philadelphia in May 1775. This was the Second Continental Congress. It chose George Washington to lead a new Continental Army. At first, many colonists still hoped to make peace with King George III. But the fighting went on, and in January 1776 a writer named Thomas Paine published a booklet called Common Sense. It argued that it made no sense for a small island to rule a whole continent. Many thousands of colonists read it, and more of them began to want independence.",
    "Not everyone agreed. Patriots wanted independence, while Loyalists wanted to stay loyal to the king. Families and neighbors sometimes found themselves on different sides.",
    "In June 1776, Congress chose five men to write a declaration of independence: Thomas Jefferson, John Adams, Benjamin Franklin, Roger Sherman and Robert Livingston. The others asked Jefferson, a 33-year-old lawyer from Virginia, to write the first draft. On July 2, Congress voted for independence. On July 4, 1776, it approved the final wording of the Declaration. That is why Americans celebrate the Fourth of July.",
    "The Declaration's most famous lines say: \"We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.\" Unalienable means these rights cannot be taken away. The Declaration also says governments get their \"just powers from the consent of the governed,\" which means a government's power should come from the people. When a government destroys people's rights, the people may change it. The Declaration then listed many complaints against the king and declared the colonies free and independent states.",
    "When it was written, the promise that all men are created equal was not yet true for everyone. Many people were enslaved. In the years that followed, Americans who worked to end slavery pointed back to these very words.",
  ].join("\n\n"),
  keyIdeas: [
    "The Second Continental Congress declared independence, and the Declaration was approved on July 4, 1776.",
    "Thomas Jefferson wrote the first draft, working with a committee of five.",
    "Its main ideas: all people have unalienable rights to life, liberty and the pursuit of happiness, and government gets its power from the consent of the governed.",
  ],
  hook: {
    text: "Imagine writing a letter to the most powerful king in the world. The letter says, \"You are no longer our king.\" Everyone who signs it could be arrested for treason. Starting in the summer of 1776, fifty-six men signed such a letter anyway.",
  },
  teach: [
    {
      title: "Deciding to Break Away",
      teach:
        "After Lexington and Concord, leaders from the colonies met in Philadelphia in May 1775. This was the Second Continental Congress. It chose George Washington to command a new Continental Army. At first, many colonists still hoped to make peace with King George III. But the fighting went on. In January 1776, Thomas Paine published a booklet called Common Sense. He argued that it made no sense for a small island to rule a whole continent. Many thousands of colonists read it. Still, not everyone agreed. Patriots wanted independence. Loyalists wanted to stay loyal to the king. By June 1776, Congress was ready to decide.",
      visual: {
        type: "compare",
        left: { title: "Patriots", points: ["Wanted independence from Britain", "Said Parliament had no right to tax them", "Supported the Continental Army"] },
        right: { title: "Loyalists", points: ["Wanted to stay loyal to King George III", "Feared war with the world's strongest empire", "Some left for Canada or Britain after the war"] },
      },
      probe: {
        type: "sort",
        prompt: "Who would most likely say each thing: a Patriot or a Loyalist?",
        buckets: ["Patriot", "Loyalist"],
        items: [
          { text: "\"We should be free and independent states!\"", bucket: 0 },
          { text: "\"Common Sense is right. An island shouldn't rule a continent.\"", bucket: 0 },
          { text: "\"I'll join General Washington's army.\"", bucket: 0 },
          { text: "\"King George is still our rightful king.\"", bucket: 1 },
          { text: "\"Fighting the British army is foolish and dangerous.\"", bucket: 1 },
        ],
        hint: "Patriots wanted to break away from Britain. Loyalists wanted to stay with the king.",
        seconds: 35,
      },
      think: {
        q: "What did Thomas Paine's Common Sense argue?",
        choices: ["The colonies should pay more taxes", "It made no sense for a small island to rule a whole continent", "Washington should be king", "The war should be fought in Britain"],
        answer: 1,
        why: "Paine argued that the colonies should govern themselves instead of being ruled from across the ocean.",
        hints: [
          "Paine wrote against British rule, not in favor of more taxes.",
          "",
          "Paine was against kings ruling America. He didn't want a new one.",
          "Common Sense was about who should govern America, not where to fight.",
        ],
      },
      approaches: {
        analogy:
          "Common Sense was like a friend saying out loud what you'd been thinking for a while. Once someone says it clearly, lots of people start nodding along.",
        example:
          "A farmer in Pennsylvania reads Common Sense by candlelight, then reads it aloud to his neighbors at the tavern. A few weeks later, half the room is saying the colonies should be independent.",
        simpler: {
          q: "Who was chosen to command the Continental Army?",
          choices: ["George Washington", "King George III", "Thomas Paine"],
          answer: 0,
          why: "The Second Continental Congress chose George Washington in 1775.",
          hints: ["", "King George III was the British king the colonists were fighting.", "Thomas Paine was a writer, not a general."],
        },
      },
    },
    {
      title: "Jefferson Writes the Declaration",
      teach:
        "In June 1776, Congress picked five men to write a declaration of independence: Thomas Jefferson, John Adams, Benjamin Franklin, Roger Sherman and Robert Livingston. The others asked Jefferson to write the first draft. He was a 33-year-old lawyer from Virginia and a gifted writer. Working in a rented room in Philadelphia, he wrote it in less than three weeks. Adams and Franklin suggested some changes, and then Congress edited it further. On July 2, Congress voted for independence. On July 4, 1776, it approved the final wording of the Declaration. John Hancock, the president of Congress, signed his name in large letters. In all, fifty-six men signed.",
      visual: {
        type: "flip",
        cards: [
          { front: "Thomas Jefferson", back: "A 33-year-old Virginia lawyer who wrote the first draft of the Declaration." },
          { front: "Committee of Five", back: "Jefferson, John Adams, Benjamin Franklin, Roger Sherman and Robert Livingston." },
          { front: "July 2, 1776", back: "Congress votes for independence." },
          { front: "July 4, 1776", back: "Congress approves the final wording of the Declaration. We celebrate this day." },
          { front: "John Hancock", back: "President of Congress. His large signature is the most famous on the Declaration." },
        ],
      },
      probe: {
        type: "cloze",
        text: "The first draft of the Declaration was written by Thomas {0}. Congress approved its final wording on July {1}, 1776.",
        blanks: [{ answers: ["Jefferson"] }, { answers: ["4", "4th", "fourth"] }],
        hint: "He later became the third president. And the date is the holiday with fireworks!",
        mistakes: [
          { match: "Franklin", coach: "Benjamin Franklin was on the committee and suggested edits, but the young Virginian wrote the draft." },
          { match: "2", coach: "July 2 is when Congress voted for independence. The final wording was approved two days later." },
        ],
        seconds: 30,
      },
      think: {
        q: "What happened on July 4, 1776?",
        choices: ["The Revolutionary War ended", "Congress approved the final wording of the Declaration of Independence", "The Constitution was signed", "The Boston Tea Party"],
        answer: 1,
        why: "That's the day Congress adopted the Declaration, so it became Independence Day.",
        hints: [
          "The war went on for years after 1776. It ended in 1783.",
          "",
          "The Constitution came later, in 1787.",
          "The Boston Tea Party was in December 1773.",
        ],
      },
      approaches: {
        analogy:
          "Writing the Declaration was like a group project: one strong writer does the first draft, teammates suggest changes, and then the whole class edits and votes on it.",
        example:
          "Jefferson wrote a draft, Franklin and Adams marked a few edits, Congress debated it and cut some parts, then voted. The final version was approved on July 4, 1776.",
        simpler: {
          q: "How many men were on the committee to write the Declaration?",
          choices: ["Five", "Fifty-six"],
          answer: 0,
          why: "A committee of five was chosen; Jefferson wrote the first draft.",
          hints: ["", "Fifty-six is the number who signed it, not the number on the writing committee."],
        },
      },
    },
    {
      title: "The Big Ideas",
      teach:
        "Listen to its most famous lines: \"We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.\" Self-evident means plain to see. Unalienable means these rights cannot be taken away, because they don't come from a king. Next comes a big idea about government: it gets its \"just powers from the consent of the governed.\" Consent means permission. A government's power should come from the people. And when a government destroys people's rights, the people may change it. Then the Declaration listed complaints against the king. In 1776, many people were still enslaved; later, people working to end slavery pointed to these very words.",
      visual: {
        type: "hotspots",
        title: "Main ideas of the Declaration",
        center: "Declaration",
        spots: [
          { label: "Equality", icon: "⚖️", detail: "\"All men are created equal.\" Every person has the same basic rights." },
          { label: "Unalienable rights", icon: "🛡️", detail: "Life, liberty and the pursuit of happiness: rights no government can take away." },
          { label: "Consent", icon: "✋", detail: "Government gets its \"just powers from the consent of the governed\": from the people." },
          { label: "Right to change", icon: "🔄", detail: "When a government destroys people's rights, the people may change it." },
          { label: "Complaints", icon: "📜", detail: "A long list of wrongs the colonists said King George III had done." },
        ],
      },
      probe: {
        type: "build",
        prompt: "Build the three unalienable rights named in the Declaration, in order.",
        tiles: ["Life,", "Liberty", "and the pursuit of Happiness"],
        distractors: ["Wealth,", "Power", "and a crown"],
        hint: "The first is staying alive, the second is being free, and the third is chasing a good life.",
        seconds: 30,
      },
      think: {
        q: "What does \"consent of the governed\" mean?",
        choices: ["The king decides everything", "A government's power comes from the people it governs", "Only soldiers can vote", "Laws can never change"],
        answer: 1,
        why: "Consent means permission, so the government's power comes from the people agreeing to it.",
        hints: [
          "That's exactly what the Declaration was arguing against.",
          "",
          "\"The governed\" means all the people a government rules, not only soldiers.",
          "The Declaration says people may even change their government, so laws can change too.",
        ],
      },
      approaches: {
        analogy:
          "Think of a team captain chosen by the players. The captain leads only because the team agreed. If the captain starts treating teammates unfairly, the team can pick a new one. That's consent of the governed.",
        example:
          "\"Unalienable\" rights can't be taken away. A king could take your land or your money, but the Declaration says no ruler can rightfully take away your life, your liberty or your pursuit of happiness.",
        simpler: {
          q: "What does \"unalienable\" mean?",
          choices: ["Cannot be taken away", "From another planet", "Very expensive"],
          answer: 0,
          why: "Unalienable rights belong to you and cannot rightfully be taken away.",
          hints: ["", "It sounds like \"alien,\" but it has nothing to do with space.", "Rights don't cost money. Think about whether someone can take them."],
        },
      },
    },
  ],
  activity: {
    type: "highlight",
    prompt: "Tap every sentence that is a main idea of the Declaration of Independence.",
    sentences: [
      "All men are created equal.",
      "People have unalienable rights to life, liberty and the pursuit of happiness.",
      "The king should choose all the colonies' leaders.",
      "Government gets its power from the consent of the governed.",
      "Colonists should buy more British tea.",
      "When a government destroys people's rights, the people may change it.",
    ],
    correct: [0, 1, 3, 5],
  },
  explain: {
    prompt: "In your own words, explain the main ideas of the Declaration of Independence and why the colonists wrote it.",
    keyPoints: [
      "All people are created equal",
      "People have rights to life, liberty and the pursuit of happiness that can't be taken away",
      "Government's power comes from the consent of the people",
      "The colonists were declaring independence from King George III",
      "Jefferson wrote it and Congress approved it on July 4, 1776",
    ],
  },
  mastery: [
    {
      type: "match",
      prompt: "Match each word from the Declaration to its meaning.",
      pairs: [
        { left: "Unalienable", right: "Cannot be taken away" },
        { left: "Self-evident", right: "Plain to see" },
        { left: "Consent", right: "Permission" },
        { left: "Independence", right: "Freedom from another country's rule" },
      ],
      hint: "Self-evident: the truth shows itself. Consent: saying yes. Unalienable: nobody can take it.",
      seconds: 40,
    },
    {
      type: "place",
      prompt: "Put these events on the timeline.",
      min: 1770,
      max: 1780,
      step: 1,
      tolerance: 0,
      items: [
        { label: "Lexington and Concord", value: 1775 },
        { label: "Common Sense published", value: 1776 },
        { label: "Boston Tea Party", value: 1773 },
      ],
      hint: "The Tea Party came first, the fighting began two years later, and Common Sense came out the year of the Declaration.",
      seconds: 40,
    },
    {
      type: "sort",
      prompt: "Who was who? Sort each person.",
      buckets: ["Helped write the Declaration", "Did not help write it"],
      items: [
        { text: "Thomas Jefferson", bucket: 0 },
        { text: "John Adams", bucket: 0 },
        { text: "Benjamin Franklin", bucket: 0 },
        { text: "King George III", bucket: 1 },
        { text: "Paul Revere", bucket: 1 },
      ],
      hint: "The committee of five included Jefferson, Adams and Franklin. The king was the one it was written to!",
      seconds: 30,
    },
    {
      type: "cloze",
      text: "The Declaration says people have unalienable rights to life, {0} and the pursuit of {1}.",
      blanks: [{ answers: ["liberty", "freedom"] }, { answers: ["happiness"] }],
      bank: ["liberty", "happiness", "money", "power"],
      hint: "Life, ______ and the pursuit of ______. Being free, and chasing a good life.",
      seconds: 25,
    },
  ],
  check: [
    {
      q: "Who wrote the first draft of the Declaration of Independence?",
      choices: ["George Washington", "Paul Revere", "King George III", "Thomas Jefferson"],
      answer: 3,
      why: "Thomas Jefferson, a young lawyer from Virginia, wrote the first draft.",
    },
    {
      q: "Which three rights does the Declaration name as unalienable?",
      choices: ["Life, liberty and the pursuit of happiness", "Money, land and power", "Speech, tea and stamps"],
      answer: 0,
      why: "\"Life, Liberty and the pursuit of Happiness.\"",
    },
    {
      q: "Where does the Declaration say a government's just powers come from?",
      choices: ["The king", "The army", "The consent of the governed"],
      answer: 2,
      why: "Governments get their just powers \"from the consent of the governed\": the people.",
    },
    {
      q: "Who were the Loyalists?",
      choices: ["Colonists who wanted independence", "Colonists who stayed loyal to the king", "French soldiers", "Members of Parliament"],
      answer: 1,
      why: "Loyalists wanted to stay loyal to King George III; Patriots wanted independence.",
    },
  ],
  task: {
    kind: "speak",
    prompt: "Practice reading the famous sentence from the Declaration aloud (\"We hold these truths to be self-evident...\") until you can say it smoothly. Then read it to your family and explain in your own words what it means.",
    rubric: [
      "Reads the sentence clearly and with expression",
      "Explains that all people are created equal",
      "Explains that unalienable rights cannot be taken away",
      "Names the three rights: life, liberty and the pursuit of happiness",
    ],
  },
};

// 4. The Revolutionary War and its heroes
const war: Lesson = {
  id: "soc-5.war",
  title: "The Revolutionary War and Its Heroes",
  minutes: 35,
  stage: "grammar",
  standards: ["SS.5.9", "SS.5.10", "SS.5.16", "D2.His.1.3-5", "D2.His.2.3-5", "D2.His.3.3-5", "D2.His.14.3-5"],
  read: [
    "When the Revolutionary War began, Britain had the strongest navy in the world and a large, well-trained army. It also hired German soldiers called Hessians. The Americans had General George Washington and a Continental Army made of farmers, shopkeepers and craftsmen, some only teenagers. They were often short of food, shoes, gunpowder and pay. But they were fighting for their homes and their freedom.",
    "The first years were hard. The British captured New York City in 1776, and Washington's army had to retreat. That December, Thomas Paine wrote, \"These are the times that try men's souls.\" On Christmas night, 1776, Washington led his men across the icy Delaware River. The next morning they surprised the Hessian soldiers at Trenton, New Jersey, and won. The victory gave the Patriots new hope.",
    "In the fall of 1777, Americans won a great victory at Saratoga, New York, where a whole British army surrendered. Saratoga was the turning point of the war. It convinced France to join the Americans in 1778, sending soldiers, ships, money and supplies.",
    "That winter, Washington's army camped at Valley Forge, Pennsylvania. Soldiers had little food, thin clothes and some had no shoes. About two thousand died from disease. Yet they stayed. A Prussian officer, Baron von Steuben, drilled them every day, and they marched out in the spring as a stronger, better-trained army.",
    "In 1781, the Americans and French trapped British General Cornwallis at Yorktown, Virginia. French ships blocked the bay so no British ships could rescue him, while American and French soldiers surrounded the town. On October 19, 1781, Cornwallis surrendered. In the Treaty of Paris of 1783, Britain recognized the United States as an independent nation.",
    "Ordinary people won the war too. Families ran farms and shops while fathers and sons were away, and women made clothing and blankets, cooked and nursed the sick. When the war ended, Washington gave up command of the army and went home to his farm, showing that he served his country, not himself.",
  ].join("\n\n"),
  keyIdeas: [
    "The small Continental Army, led by George Washington, faced the world's strongest army and navy.",
    "Trenton gave hope, Saratoga was the turning point that brought France into the war, and Valley Forge tested the army's courage.",
    "The Americans and French won at Yorktown in 1781, and Britain recognized American independence in 1783.",
    "Ordinary soldiers and their families made great sacrifices to win the war.",
  ],
  hook: {
    text: "It is Christmas night, 1776. Ice chunks float in the dark Delaware River, and sleet stings your face. Your army has lost battle after battle. General Washington whispers the plan: cross the river tonight and surprise the enemy at dawn. Would you get in the boat?",
  },
  teach: [
    {
      title: "An Underdog Army",
      teach:
        "Every good story needs an underdog, and in 1776 that was the Continental Army. Britain had the strongest navy in the world and a large, well-trained army. It even hired German soldiers called Hessians. The Americans had General George Washington and soldiers who were mostly farmers, shopkeepers and craftsmen. Some were only teenagers. They were often short of food, shoes, gunpowder and pay. In 1776, the British captured New York City, and Washington had to retreat. Then, on Christmas night, he led his men across the icy Delaware River. At dawn they surprised the Hessians at Trenton, New Jersey, and won. The Patriots had hope again.",
      visual: {
        type: "compare",
        left: { title: "Britain", points: ["The strongest navy in the world", "A large, trained army plus hired Hessian soldiers", "Plenty of money and supplies", "Fighting far from home, across an ocean"] },
        right: { title: "The Americans", points: ["General George Washington", "Mostly farmers, shopkeepers and craftsmen", "Short of food, shoes and pay", "Fighting at home, for their freedom"] },
      },
      probe: {
        type: "sort",
        prompt: "Sort each fact: was it a strength for Britain or for the Americans?",
        buckets: ["Britain's strength", "Americans' strength"],
        items: [
          { text: "The world's strongest navy", bucket: 0 },
          { text: "Hired Hessian soldiers", bucket: 0 },
          { text: "Plenty of money and supplies", bucket: 0 },
          { text: "Fighting on land they knew well", bucket: 1 },
          { text: "A cause they believed in: their freedom", bucket: 1 },
          { text: "A determined leader, George Washington", bucket: 1 },
        ],
        hint: "Britain's strengths were size, money and training. The Americans' strengths were home ground, a cause and a leader.",
        seconds: 40,
      },
      think: {
        q: "What happened at Trenton in December 1776?",
        choices: ["The British captured Washington", "Washington crossed the Delaware River and surprised the Hessians", "The war ended", "The Declaration was signed"],
        answer: 1,
        why: "After crossing the icy river on Christmas night, Washington's army won a surprise victory at dawn.",
        hints: [
          "Washington was never captured. At Trenton, he was the one who surprised the enemy.",
          "",
          "The war went on until 1783. Trenton was a hopeful early win.",
          "The Declaration was approved in July 1776, months before Trenton.",
        ],
      },
      approaches: {
        analogy:
          "It's like a small-town team playing the champions. The champions have better gear and more players, but the small team knows its home field and wants it more. One surprise win can change everything.",
        example:
          "Washington's men crossed the Delaware in boats on Christmas night, marched nine miles through sleet, and attacked Trenton at dawn. They captured about 900 Hessian soldiers, and many tired Patriots decided to keep fighting.",
        simpler: {
          q: "Who commanded the Continental Army?",
          choices: ["George Washington", "King George III", "Thomas Jefferson"],
          answer: 0,
          why: "George Washington led the Continental Army through the whole war.",
          hints: ["", "King George III was Britain's king, on the other side.", "Jefferson was a writer and leader in Congress, not the army's general."],
        },
      },
    },
    {
      title: "Saratoga and Valley Forge",
      teach:
        "In the fall of 1777, Americans won a great victory at Saratoga, New York. A whole British army, led by General John Burgoyne, surrendered. Saratoga was the turning point of the war. It convinced France, Britain's old enemy, that the Americans could win. In 1778, France joined the war on the American side, sending soldiers, ships, money and supplies. But first came a terrible winter. Washington's army camped at Valley Forge, Pennsylvania. Soldiers had little food and thin clothes, and some had no shoes. About two thousand died from disease. Yet they stayed. A Prussian officer, Baron von Steuben, drilled them every day. In the spring, they marched out as a stronger, better-trained army.",
      visual: {
        type: "timeline",
        events: [
          { year: 1776, label: "Trenton", detail: "Christmas night: Washington crosses the Delaware and wins at dawn." },
          { year: 1777, label: "Saratoga", detail: "A whole British army surrenders. The turning point of the war." },
          { year: 1778, label: "France joins", detail: "France sends soldiers, ships, money and supplies. Valley Forge's hard winter ends." },
        ],
      },
      probe: {
        type: "match",
        prompt: "Match each place to what happened there.",
        pairs: [
          { left: "Trenton", right: "A surprise attack after crossing the icy Delaware River" },
          { left: "Saratoga", right: "A British army surrendered, and France decided to help" },
          { left: "Valley Forge", right: "A hungry, freezing winter camp where the army trained hard" },
        ],
        hint: "Trenton was the Christmas surprise, Saratoga the turning point, and Valley Forge the winter camp.",
        mistakes: [{ match: "Valley Forge with surrender", coach: "No battle was fought at Valley Forge. It was where the army spent a hard winter training." }],
        seconds: 35,
      },
      think: {
        q: "Why is Saratoga called the turning point of the war?",
        choices: ["It was the last battle", "The victory convinced France to join the Americans", "Washington was captured there", "It was where the Declaration was written"],
        answer: 1,
        why: "After Saratoga, France believed the Americans could win and joined the war with ships, soldiers and money.",
        hints: [
          "The war went on for years after Saratoga. The last big battle was at Yorktown.",
          "",
          "Washington was never captured.",
          "The Declaration was written in Philadelphia in 1776.",
        ],
      },
      approaches: {
        analogy:
          "Saratoga was like a big tryout. France had been watching from the bleachers, wondering if the Americans were good enough. After Saratoga, France jumped in and joined the team.",
        example:
          "At Valley Forge, Baron von Steuben trained one small group of soldiers to march and fight together. Those soldiers trained others, and soon the whole army moved as one, which helped them in later battles.",
        simpler: {
          q: "Which country joined the Americans after Saratoga?",
          choices: ["France", "Britain", "Spain only"],
          answer: 0,
          why: "France joined the war in 1778, after the victory at Saratoga.",
          hints: ["", "Britain was the enemy the Americans were fighting.", "Spain did later fight Britain too, but the big ally that joined after Saratoga was France."],
        },
      },
    },
    {
      title: "Victory at Yorktown",
      teach:
        "By 1781, much of the fighting had moved south. British General Charles Cornwallis took his army to Yorktown, Virginia, beside the sea. He expected British ships to bring help. Instead, a French fleet sailed in and blocked the bay. Washington and the French general Rochambeau marched their armies hundreds of miles south and surrounded the town. A young French officer, the Marquis de Lafayette, had already been fighting there for the Americans. Trapped by land and sea, Cornwallis surrendered on October 19, 1781. Small fights went on, but the war was really over. In the Treaty of Paris in 1783, Britain recognized the United States as a free and independent nation.",
      visual: {
        type: "hotspots",
        title: "The trap at Yorktown, 1781",
        center: "Yorktown",
        spots: [
          { label: "Cornwallis", icon: "🎖️", detail: "The British general who camped at Yorktown and waited for ships." },
          { label: "French fleet", icon: "⛵", detail: "French warships blocked the bay so no British ships could rescue him." },
          { label: "Washington and Rochambeau", icon: "🚶", detail: "American and French armies marched south and surrounded the town." },
          { label: "Lafayette", icon: "🇫🇷", detail: "A young French officer who fought for the Americans in Virginia." },
          { label: "Surrender", icon: "🏳️", detail: "October 19, 1781: Cornwallis surrendered his army." },
        ],
      },
      probe: {
        type: "place",
        prompt: "Put these events of the war on the timeline.",
        min: 1774,
        max: 1784,
        step: 1,
        tolerance: 0,
        items: [
          { label: "Victory at Saratoga", value: 1777 },
          { label: "Surrender at Yorktown", value: 1781 },
          { label: "Treaty of Paris", value: 1783 },
        ],
        hint: "Saratoga came the year after Trenton (1776), Yorktown four years after Saratoga, and the treaty two years after Yorktown.",
        seconds: 40,
      },
      think: {
        q: "Why couldn't Cornwallis escape from Yorktown?",
        choices: ["He was trapped by American and French armies on land and the French fleet at sea", "He didn't want to leave", "There was a snowstorm", "Britain told him to stay forever"],
        answer: 0,
        why: "French ships blocked the bay while American and French soldiers surrounded the town.",
        hints: [
          "",
          "Cornwallis was waiting for British ships to rescue him. Something stopped them.",
          "Yorktown was in October in Virginia. The trap was made by armies and ships.",
          "Britain tried to send ships to help, but they were blocked.",
        ],
      },
      approaches: {
        analogy:
          "Picture a game of tag where you back into a corner by a pond, hoping a friend in a boat will pick you up. But the other team blocks the boat and surrounds the corner. There's nowhere left to go.",
        example:
          "Cornwallis had about 8,000 soldiers at Yorktown. French warships kept British ships out of the Chesapeake Bay. American and French troops dug trenches closer and closer. After weeks of siege, Cornwallis gave up on October 19, 1781.",
        simpler: {
          q: "In which state is Yorktown?",
          choices: ["Massachusetts", "New York", "Virginia"],
          answer: 2,
          why: "Yorktown is in Virginia, by the Chesapeake Bay.",
          hints: ["Massachusetts is where the war began, at Lexington and Concord.", "Saratoga is in New York, but Yorktown is farther south.", ""],
        },
      },
    },
    {
      title: "Ordinary Heroes",
      teach:
        "Generals didn't win the war alone. Joseph Plumb Martin joined the army at age fifteen and served for years. He later wrote about marching barefoot and going days without food. Back home, families kept farms and shops running while fathers and sons were away. Women made clothing and blankets, cooked, and nursed the sick and wounded. Martha Washington spent winters with the army, including at Valley Forge, sewing and visiting sick soldiers. And at the war's end, George Washington did something surprising. He gave up command of the army and went home to his farm at Mount Vernon. He could have tried to rule. Instead, he showed that he served his country, not himself.",
      visual: {
        type: "flip",
        cards: [
          { front: "Joseph Plumb Martin", back: "Joined the army at fifteen and later wrote about the hard life of an ordinary soldier." },
          { front: "Families at home", back: "Kept farms and shops running, and made clothing and blankets for the army." },
          { front: "Martha Washington", back: "Spent winters at army camps, including Valley Forge, sewing and caring for sick soldiers." },
          { front: "Washington goes home", back: "In 1783, he gave up command of the army and returned to Mount Vernon instead of seeking power." },
        ],
      },
      probe: {
        type: "highlight",
        prompt: "Tap every sentence that shows courage or sacrifice by ordinary people.",
        sentences: [
          "A fifteen-year-old soldier kept marching even without shoes.",
          "A family ran the farm alone while the father served in the army.",
          "The British navy was the strongest in the world.",
          "Women sewed blankets and nursed wounded soldiers.",
          "Saratoga is in New York.",
        ],
        correct: [0, 1, 3],
        hint: "Look for people giving up comfort, time or safety to help win the war.",
        seconds: 35,
      },
      think: {
        q: "What did George Washington do when the war ended?",
        choices: ["Made himself king", "Gave up command of the army and went home to his farm", "Moved to Britain", "Kept the army for himself"],
        answer: 1,
        why: "Washington returned his power to Congress and went home to Mount Vernon, showing he served the country, not himself.",
        hints: [
          "Washington refused that kind of power. That's why people admired him so much.",
          "",
          "Washington stayed in America. His home was Mount Vernon, in Virginia.",
          "He gave the army's command back to Congress instead.",
        ],
      },
      approaches: {
        analogy:
          "It's like a team captain who leads the team to the championship and then hands the captain's armband back to the coach instead of trying to run the whole league.",
        example:
          "While her husband was away fighting, a farm wife in Connecticut planted and harvested the crops, cared for the children, and sewed shirts for soldiers. Thousands of families like hers kept the country running.",
        simpler: {
          q: "Who kept farms and shops running while soldiers were away?",
          choices: ["British soldiers", "Their families at home"],
          answer: 1,
          why: "Families at home kept farms and shops going during the war.",
          hints: ["British soldiers were the enemy. They weren't running American farms.", ""],
        },
      },
    },
  ],
  activity: {
    type: "sequence",
    prompt: "Put the events of the Revolutionary War in order.",
    steps: [
      "Fighting begins at Lexington and Concord",
      "Washington crosses the Delaware and wins at Trenton",
      "A British army surrenders at Saratoga",
      "The army survives the winter at Valley Forge",
      "Cornwallis surrenders at Yorktown",
      "The Treaty of Paris recognizes American independence",
    ],
  },
  explain: {
    prompt: "Explain how the small Continental Army was able to win the Revolutionary War.",
    keyPoints: [
      "Washington was a determined leader who kept the army together",
      "Victories like Trenton and Saratoga gave hope",
      "France joined after Saratoga with ships, soldiers and money",
      "The army grew stronger after training at Valley Forge",
      "The Americans and French trapped Cornwallis at Yorktown",
    ],
  },
  mastery: [
    {
      type: "sequence",
      prompt: "Put these turning points in order.",
      steps: ["Trenton", "Saratoga", "France joins the war", "Yorktown", "Treaty of Paris"],
      hint: "Trenton was Christmas 1776, Saratoga 1777, France joined in 1778, Yorktown 1781 and the treaty 1783.",
      seconds: 35,
    },
    {
      type: "match",
      prompt: "Match each person to their part in the war.",
      pairs: [
        { left: "George Washington", right: "Commander of the Continental Army" },
        { left: "Charles Cornwallis", right: "British general who surrendered at Yorktown" },
        { left: "Baron von Steuben", right: "Drilled the soldiers at Valley Forge" },
        { left: "Marquis de Lafayette", right: "Young French officer who fought for the Americans" },
        { left: "Thomas Paine", right: "Wrote \"These are the times that try men's souls\"" },
      ],
      hint: "One American general, one British general, one Prussian trainer, one French officer and one writer.",
      seconds: 50,
    },
    {
      type: "number",
      prompt: "In what year did Cornwallis surrender at Yorktown?",
      answer: 1781,
      hint: "It was four years after Saratoga (1777).",
      mistakes: [{ match: "1783", coach: "1783 was the Treaty of Paris. The surrender at Yorktown came two years before." }],
      seconds: 20,
    },
    {
      type: "cloze",
      text: "The winter camp where the army suffered but grew stronger was Valley {0}. The victory that brought France into the war was {1}.",
      blanks: [{ answers: ["Forge"] }, { answers: ["Saratoga"] }],
      bank: ["Forge", "Saratoga", "Yorktown", "Boston"],
      hint: "The winter camp was in Pennsylvania. The turning-point battle was in New York in 1777.",
      seconds: 30,
    },
  ],
  check: [
    {
      q: "Which battle is called the turning point of the Revolutionary War?",
      choices: ["Lexington", "Saratoga", "Trenton", "Bunker Hill"],
      answer: 1,
      why: "The victory at Saratoga in 1777 convinced France to join the Americans.",
    },
    {
      q: "What happened at Valley Forge?",
      choices: ["The last battle of the war", "The Declaration was signed", "The army survived a hard winter and trained to become stronger"],
      answer: 2,
      why: "At Valley Forge, the army suffered through the winter of 1777-1778 and was drilled by Baron von Steuben.",
    },
    {
      q: "How did France help win the Battle of Yorktown?",
      choices: ["French ships blocked the bay so British ships couldn't rescue Cornwallis", "France sent tea", "France paid the British to leave", "France stayed out of the war"],
      answer: 0,
      why: "The French fleet blocked the bay while American and French soldiers surrounded Yorktown.",
    },
    {
      q: "What did the Treaty of Paris of 1783 do?",
      choices: ["Started the war", "Made Washington king", "Taxed the colonies", "Recognized the United States as an independent nation"],
      answer: 3,
      why: "In the treaty, Britain recognized American independence.",
    },
  ],
  task: {
    kind: "write",
    prompt: "Imagine you are a young soldier at Valley Forge in the winter of 1777-1778. Write a letter home to your family describing your days at camp, what is hard, and why you are staying.",
    rubric: [
      "Describes real hardships at Valley Forge (cold, hunger, sickness, little clothing)",
      "Mentions training or Baron von Steuben, or General Washington",
      "Explains why the soldier keeps going",
      "Written as a letter with a greeting and a closing",
    ],
  },
};

// 5. The Constitution
const constitution: Lesson = {
  id: "soc-5.constitution",
  title: "Building the Constitution",
  minutes: 35,
  stage: "logic",
  standards: ["SS.5.11", "SS.5.12", "SS.5.13", "SS.5.16", "D2.Civ.5.3-5", "D2.Civ.4.3-5", "D2.Civ.6.3-5", "D2.His.14.3-5"],
  read: [
    "During the war, the new states agreed to a plan of government called the Articles of Confederation. It was approved by all the states in 1781. Having just escaped a powerful king, Americans were afraid of a strong central government, so they made the national government very weak. Congress could not collect taxes; it could only ask the states for money. There was no president to carry out laws and no national courts. Each state printed its own money, and changing the Articles needed all thirteen states to agree.",
    "Problems piled up. Congress could not pay soldiers or debts. In 1786, farmers in Massachusetts who could not pay their debts rose up in Shays' Rebellion, and the national government could do little about it. Many leaders decided the country needed a better plan.",
    "In May 1787, delegates from twelve states met in Philadelphia, in the same building where the Declaration had been signed. This meeting is called the Constitutional Convention. George Washington was chosen to lead it, and Benjamin Franklin, at 81, was the oldest delegate. James Madison of Virginia came with a plan, spoke often and kept careful notes. He is called the Father of the Constitution.",
    "The delegates argued all summer. Large states wanted more representatives because they had more people. Small states wanted every state to have an equal vote. In the Great Compromise, they agreed on two houses of Congress: in the House of Representatives, states with more people get more members; in the Senate, every state gets two. Delegates also argued over how to count enslaved people, and agreed to count three of every five for representation, a compromise over slavery that the nation would struggle with for many years.",
    "On September 17, 1787, thirty-nine delegates signed the Constitution. It begins with the Preamble: \"We the People of the United States, in Order to form a more perfect Union...\" The Preamble lists the goals of the government. Nine states had to approve the Constitution, and by 1788 they had. In 1789, George Washington became the first president.",
  ].join("\n\n"),
  keyIdeas: [
    "The Articles of Confederation made a national government too weak to tax, enforce laws or settle disputes.",
    "At the Constitutional Convention of 1787, James Madison and other delegates wrote a new plan of government.",
    "The Great Compromise created a Congress with a House based on population and a Senate with two members per state.",
    "The Preamble, beginning \"We the People,\" lists the goals of the government.",
  ],
  hook: {
    text: "Imagine a team with thirteen players, but no coach, no referee and no money for equipment. Every player has to agree before the rules can change. Would that team win many games? After the war, the United States was a lot like that team.",
  },
  teach: [
    {
      title: "A Weak First Try",
      teach:
        "During the war, the states agreed to a plan of government called the Articles of Confederation. All the states approved it by 1781. Americans had just escaped a powerful king, so they were afraid of a strong central government. They made the national government very weak. Congress could not collect taxes; it could only ask the states for money. There was no president to carry out laws and no national courts. Each state printed its own money. To change the Articles, all thirteen states had to agree. Soon there was trouble. In 1786, farmers in Massachusetts who could not pay their debts rose up in Shays' Rebellion, and Congress could do little about it.",
      visual: {
        type: "flip",
        cards: [
          { front: "Articles of Confederation", back: "The first plan of government for the United States, approved by all the states in 1781." },
          { front: "No power to tax", back: "Congress could only ask the states for money, and they often didn't send it." },
          { front: "No president or national courts", back: "No one to carry out the laws, and no courts to settle arguments between states." },
          { front: "Thirteen kinds of money", back: "Each state could print its own money, which made trade confusing." },
          { front: "Shays' Rebellion (1786)", back: "Farmers in debt rose up in Massachusetts, and the national government could do little." },
        ],
      },
      probe: {
        type: "sort",
        prompt: "Sort each statement: was it true under the Articles of Confederation, or not?",
        buckets: ["True under the Articles", "Not true under the Articles"],
        items: [
          { text: "Congress could not collect taxes", bucket: 0 },
          { text: "Each state could print its own money", bucket: 0 },
          { text: "All thirteen states had to agree to change the plan", bucket: 0 },
          { text: "A strong president carried out the laws", bucket: 1 },
          { text: "National courts settled disputes between states", bucket: 1 },
          { text: "Congress could easily pay its soldiers", bucket: 1 },
        ],
        hint: "The Articles made the national government weak on purpose: no power to tax, no president and no national courts.",
        seconds: 45,
      },
      think: {
        q: "Why did Americans make the national government so weak under the Articles?",
        choices: ["They wanted Britain to rule again", "They had just escaped a powerful king and feared a strong central government", "They forgot to finish writing it", "They wanted one state to rule the rest"],
        answer: 1,
        why: "After fighting a king, they worried a strong central government might take away their freedom.",
        hints: [
          "They had just fought a war to be free of Britain, so that wasn't it.",
          "",
          "They wrote the weakness in on purpose. Think about what they had just lived through.",
          "The states wanted to keep their own power, not hand it to one state.",
        ],
      },
      approaches: {
        analogy:
          "It's like a group project where nobody is in charge, nobody can make anyone do their part, and every single person has to agree before you change anything. It's fair, but very little gets done.",
        example:
          "Congress needed money to pay soldiers who had fought in the war. It asked the states, but some sent little or nothing. Congress had no power to make them pay, so many soldiers waited a long time for their pay.",
        simpler: {
          q: "Under the Articles, could Congress collect taxes?",
          choices: ["Yes, easily", "No, it could only ask the states for money"],
          answer: 1,
          why: "Congress had no power to tax. It could only ask.",
          hints: ["That was one of the biggest problems: Congress had no power to make anyone pay.", ""],
        },
      },
    },
    {
      title: "The Summer of 1787",
      teach:
        "In May 1787, delegates from twelve states met in Philadelphia, in the same building where the Declaration had been signed. Rhode Island stayed home. This meeting is called the Constitutional Convention. George Washington was chosen to lead it. Benjamin Franklin, at 81, was the oldest delegate. James Madison of Virginia, only 36, came with a plan for a stronger government, spoke often, and kept careful notes of every day's debates. Because of his work, he is called the Father of the Constitution. The delegates kept their meetings secret so they could argue freely. Instead of fixing the Articles, they decided to write a whole new plan.",
      visual: {
        type: "hotspots",
        title: "The Constitutional Convention, 1787",
        center: "Philadelphia",
        spots: [
          { label: "George Washington", icon: "🪑", detail: "Chosen to lead the convention. His presence gave people trust in it." },
          { label: "James Madison", icon: "📝", detail: "Brought a plan, debated often and took careful notes. The Father of the Constitution." },
          { label: "Benjamin Franklin", icon: "👓", detail: "At 81, the oldest delegate. He urged everyone to compromise." },
          { label: "Twelve states", icon: "🗺️", detail: "Every state but Rhode Island sent delegates." },
          { label: "A secret summer", icon: "🤫", detail: "Meetings were kept secret so delegates could speak freely and change their minds." },
        ],
      },
      probe: {
        type: "match",
        prompt: "Match each delegate to his role at the Convention.",
        pairs: [
          { left: "James Madison", right: "Brought a plan and took careful notes: the Father of the Constitution" },
          { left: "George Washington", right: "Chosen to lead the convention" },
          { left: "Benjamin Franklin", right: "The oldest delegate, at 81" },
        ],
        hint: "The young Virginian took notes, the famous general led the meeting, and the inventor was the oldest.",
        seconds: 30,
      },
      think: {
        q: "Why is James Madison called the Father of the Constitution?",
        choices: ["He was the oldest delegate", "He brought a plan, led the debates and kept careful notes", "He was the first president", "He wrote the Declaration of Independence"],
        answer: 1,
        why: "Madison's plan and hard work shaped the Constitution more than anyone's.",
        hints: [
          "Franklin was the oldest. Madison was only 36.",
          "",
          "Washington was the first president. Madison became the fourth, years later.",
          "Jefferson wrote the Declaration. Madison's big work was the Constitution.",
        ],
      },
      approaches: {
        analogy:
          "Madison was like the student who shows up to the group project with an outline already written. The group changes a lot of it, but his outline shapes the whole final project.",
        example:
          "Each day, Madison sat near the front and wrote down what the speakers said. His notes are the main reason we know today what happened inside the secret convention.",
        simpler: {
          q: "In what city did the Constitutional Convention meet?",
          choices: ["Boston", "Philadelphia", "Yorktown"],
          answer: 1,
          why: "The delegates met in Philadelphia, where the Declaration had been signed.",
          hints: ["Boston was where the Tea Party happened.", "", "Yorktown was where the last big battle of the war was fought."],
        },
      },
    },
    {
      title: "The Great Compromise",
      teach:
        "The delegates argued all summer. A compromise is when each side gives up something to reach an agreement. Large states like Virginia wanted more representatives in Congress, because they had more people. Small states like New Jersey wanted every state to have an equal vote. Roger Sherman of Connecticut helped find a middle path, called the Great Compromise. Congress would have two houses. In the House of Representatives, states with more people get more members. In the Senate, every state gets two senators. A law must pass both houses. Delegates also argued over how to count enslaved people for representation and agreed to count three of every five, a compromise over slavery the nation would struggle with for many years.",
      visual: {
        type: "compare",
        left: { title: "House of Representatives", points: ["Members based on each state's population", "More people means more representatives", "What large states wanted"] },
        right: { title: "Senate", points: ["Two senators from every state", "Every state is equal", "What small states wanted"] },
      },
      probe: {
        type: "cloze",
        text: "In the Great Compromise, the number of members each state has in the House of Representatives depends on its {0}. In the Senate, every state gets {1} senators.",
        blanks: [{ answers: ["population", "people"] }, { answers: ["two", "2"] }],
        bank: ["population", "two", "size", "ten", "wealth"],
        hint: "The House was the large states' idea (more people, more members). The Senate was the small states' idea (every state equal).",
        mistakes: [
          { match: "size", coach: "It's not how big the land is. It's how many people live there." },
          { match: "wealth", coach: "Representation isn't based on money. It's based on how many people live in the state." },
          { match: "ten", coach: "Every state gets the same small number of senators. Today 50 states times that number equals 100 senators." },
        ],
        seconds: 35,
      },
      think: {
        q: "Why was the Great Compromise needed?",
        choices: ["Large states wanted representation by population, and small states wanted equal votes", "Everyone already agreed", "The king demanded it", "They needed to choose a capital city"],
        answer: 0,
        why: "It gave large states the House (by population) and small states the Senate (equal votes).",
        hints: [
          "",
          "If everyone already agreed, there would be nothing to compromise about!",
          "The king had no say after the war. This was an argument between the states.",
          "The capital was decided later. This argument was about votes in Congress.",
        ],
      },
      approaches: {
        analogy:
          "Two friends can't agree on a movie, so one picks the movie and the other picks the snacks. Each gives a little and gets a little. That's a compromise.",
        example:
          "Virginia had many more people than Delaware. In the House, Virginia gets more representatives. In the Senate, Virginia and Delaware each get exactly two. Both states got part of what they wanted.",
        simpler: {
          q: "What is a compromise?",
          choices: ["When each side gives up something to agree", "When one side gets everything", "When people stop talking"],
          answer: 0,
          why: "In a compromise, both sides give a little to reach an agreement.",
          hints: ["", "If one side gets everything, the other side didn't agree. That's not a compromise.", "A compromise needs talking, not silence."],
        },
      },
    },
    {
      title: "We the People",
      teach:
        "On September 17, 1787, thirty-nine delegates signed the Constitution. It begins with a single sentence called the Preamble: \"We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity...\" Notice the first three words. The government's power comes from the people, not a king. The Preamble lists six goals: a stronger union of states, fair laws and courts, peace at home, defense against enemies, the well-being of everyone, and freedom for us and our posterity, which means future generations. Nine states had to approve it, and by 1788 they had.",
      visual: {
        type: "hotspots",
        title: "The six goals of the Preamble",
        center: "We the People",
        spots: [
          { label: "A more perfect Union", icon: "🤝", detail: "Join the states together more strongly than under the Articles." },
          { label: "Establish Justice", icon: "⚖️", detail: "Make fair laws and courts." },
          { label: "Domestic Tranquility", icon: "🕊️", detail: "Keep peace at home." },
          { label: "Common defence", icon: "🛡️", detail: "Protect the country from enemies." },
          { label: "General Welfare", icon: "🌾", detail: "Help everyone live well." },
          { label: "Blessings of Liberty", icon: "🗽", detail: "Keep freedom safe for ourselves and our posterity: future generations." },
        ],
      },
      probe: {
        type: "build",
        prompt: "Build the opening words of the Preamble, in order.",
        tiles: ["We the People", "of the United States,", "in Order to form", "a more perfect Union"],
        distractors: ["We the States", "a stronger King"],
        hint: "It starts with who holds the power: the people.",
        mistakes: [{ match: "We the States", coach: "The Constitution begins with the people, not the states. The government's power comes from the people." }],
        seconds: 30,
      },
      think: {
        q: "What do the words \"We the People\" tell us?",
        choices: ["The government's power comes from the people", "Only the delegates can vote", "The king still rules", "The states are separate countries"],
        answer: 0,
        why: "The Constitution was made by and for the people, so its power comes from them.",
        hints: [
          "",
          "\"We the People\" means all the people of the United States, not only the delegates.",
          "There was no king in the new government. Who does \"We\" mean?",
          "The Preamble says \"a more perfect Union,\" which means the states are joined together.",
        ],
      },
      approaches: {
        analogy:
          "The Preamble is like the mission statement at the top of a club's rule book. Before any rules, it says who made the club and what the club is for.",
        example:
          "\"Provide for the common defence\" means the government keeps an army and navy to protect the whole country. \"Insure domestic Tranquility\" means keeping peace at home, like the trouble during Shays' Rebellion that the Articles couldn't handle.",
        simpler: {
          q: "What are the first three words of the Constitution?",
          choices: ["We the People", "In the beginning", "Life, Liberty, Happiness"],
          answer: 0,
          why: "The Constitution begins \"We the People.\"",
          hints: ["", "Those words aren't in the Constitution. It begins with who holds the power.", "Life, liberty and the pursuit of happiness come from the Declaration, not the Constitution."],
        },
      },
    },
  ],
  activity: {
    type: "sort",
    prompt: "Sort each fact: did it belong to the Articles of Confederation or the Constitution?",
    buckets: ["Articles of Confederation", "Constitution"],
    items: [
      { text: "Congress could not collect taxes", bucket: 0 },
      { text: "No president", bucket: 0 },
      { text: "Every state had one vote in a one-house Congress", bucket: 0 },
      { text: "A president carries out the laws", bucket: 1 },
      { text: "Congress has a House and a Senate", bucket: 1 },
      { text: "National courts settle disputes", bucket: 1 },
      { text: "Begins with \"We the People\"", bucket: 1 },
    ],
  },
  explain: {
    prompt: "Explain why the Articles of Confederation were replaced, and how the Constitution was made.",
    keyPoints: [
      "The Articles made the national government too weak, with no power to tax",
      "Delegates met at the Constitutional Convention in Philadelphia in 1787",
      "James Madison is called the Father of the Constitution",
      "The Great Compromise made a House based on population and a Senate with two per state",
      "The Preamble begins We the People and lists the government's goals",
    ],
  },
  mastery: [
    {
      type: "place",
      prompt: "Put these events on the timeline.",
      min: 1775,
      max: 1795,
      step: 1,
      tolerance: 0,
      items: [
        { label: "Articles of Confederation approved", value: 1781 },
        { label: "Shays' Rebellion begins", value: 1786 },
        { label: "Constitution signed", value: 1787 },
        { label: "Washington becomes first president", value: 1789 },
      ],
      hint: "The Articles were approved the same year as Yorktown. The Constitution was signed the year after Shays' Rebellion began.",
      seconds: 45,
    },
    {
      type: "match",
      prompt: "Match each phrase from the Preamble to its meaning.",
      pairs: [
        { left: "Establish Justice", right: "Make fair laws and courts" },
        { left: "Insure domestic Tranquility", right: "Keep peace at home" },
        { left: "Provide for the common defence", right: "Protect the country from enemies" },
        { left: "Secure the Blessings of Liberty to our Posterity", right: "Keep freedom safe for future generations" },
      ],
      hint: "Domestic means at home, tranquility means peace, defence means protection, and posterity means future generations.",
      seconds: 45,
    },
    {
      type: "number",
      prompt: "How many states had to approve the Constitution before it took effect?",
      answer: 9,
      hint: "It was more than half of the thirteen states, but not all of them.",
      mistakes: [{ match: "13", coach: "Requiring all thirteen was one of the problems with the Articles. The Constitution needed fewer than that." }],
      seconds: 20,
    },
    {
      type: "sequence",
      prompt: "Put these steps in order.",
      steps: [
        "The states approve the Articles of Confederation",
        "Shays' Rebellion shows the government is too weak",
        "Delegates meet at the Constitutional Convention",
        "The Great Compromise is reached",
        "Thirty-nine delegates sign the Constitution",
      ],
      hint: "First the weak plan, then the trouble it caused, then the meeting, the deal, and the signing.",
      seconds: 40,
    },
  ],
  check: [
    {
      q: "What was a big problem with the Articles of Confederation?",
      choices: ["The president had too much power", "Congress could not collect taxes", "There were too many national courts"],
      answer: 1,
      why: "Congress could only ask the states for money; it had no power to tax.",
    },
    {
      q: "Who is called the Father of the Constitution?",
      choices: ["Thomas Jefferson", "Paul Revere", "James Madison", "John Hancock"],
      answer: 2,
      why: "James Madison brought a plan, debated often and kept careful notes at the Convention.",
    },
    {
      q: "What did the Great Compromise create?",
      choices: ["A king and a queen", "A Congress with a House based on population and a Senate with two members per state", "Thirteen separate countries", "A new tax on tea"],
      answer: 1,
      why: "It balanced large and small states with two houses of Congress.",
    },
    {
      q: "What does the Preamble do?",
      choices: ["Lists the goals of the government, beginning \"We the People\"", "Declares war on Britain", "Lists complaints against the king"],
      answer: 0,
      why: "The Preamble introduces the Constitution and lists six goals of the government.",
    },
  ],
  task: {
    kind: "project",
    prompt: "Make a family \"preamble\": write one sentence that starts \"We the [your family name] Family, in order to...\" and lists at least four goals for your home, modeled on the Preamble. Decorate it and post it where everyone can see it.",
    rubric: [
      "Begins with \"We the ... Family\" like the Preamble",
      "Lists at least four goals",
      "At least two goals clearly match goals in the real Preamble (peace at home, fairness, protecting each other, freedom)",
      "Can explain which Preamble goal each family goal matches",
    ],
  },
};

// 6. Three branches, checks and balances, and the Bill of Rights
const branches: Lesson = {
  id: "soc-5.branches",
  title: "Three Branches and the Bill of Rights",
  minutes: 35,
  stage: "rhetoric",
  standards: ["SS.5.14", "SS.5.15", "SS.5.16", "D2.Civ.1.3-5", "D2.Civ.2.3-5", "D2.Civ.8.3-5", "D2.Civ.12.3-5", "D2.His.16.3-5"],
  read: [
    "The writers of the Constitution wanted a government strong enough to work, but not so strong that it could take away people's freedom. So they split its power among three branches. This is called separation of powers.",
    "The legislative branch is Congress, made of the Senate and the House of Representatives. It makes the laws. The executive branch is led by the President. It carries out and enforces the laws, and the President commands the armed forces. The judicial branch is the Supreme Court and the other federal courts. Judges decide what laws mean and whether they follow the Constitution.",
    "Each branch can check, or limit, the others. This is called checks and balances. The President can veto, or reject, a law Congress passes, but Congress can override the veto with a two-thirds vote of both houses. The President chooses Supreme Court judges, but the Senate must approve them. The courts can rule that a law goes against the Constitution. Congress can even remove a President or judge who commits serious crimes. James Madison explained why: \"If men were angels, no government would be necessary.\" Since people are not angels, power needs limits.",
    "Many Americans worried that the Constitution did not clearly protect their rights. So Madison wrote amendments, or changes, and in 1791 the first ten were added. They are called the Bill of Rights. The First Amendment protects freedom of religion, freedom of speech, freedom of the press, the right to gather peacefully, and the right to petition, or ask, the government to fix problems. Other amendments protect the right to keep and bear arms, keep soldiers from being housed in people's homes, protect people from unreasonable searches, and promise a fair and speedy trial by jury. The Tenth Amendment says powers not given to the national government belong to the states or the people.",
    "Rights come with responsibilities. Citizens should obey the laws, pay taxes, serve on juries, stay informed, vote when they are old enough, and respect the rights of others. A free country depends on good citizens.",
  ].join("\n\n"),
  keyIdeas: [
    "The legislative branch (Congress) makes laws, the executive branch (the President) enforces them, and the judicial branch (the courts) decides what they mean.",
    "Checks and balances let each branch limit the others, so no branch becomes too powerful.",
    "The Bill of Rights, the first ten amendments, was added in 1791 to protect freedoms like religion, speech and the press.",
    "Rights come with responsibilities, like obeying laws, serving on juries and voting.",
  ],
  hook: {
    text: "Imagine one person could make all the rules, decide who broke them, and hand out the punishments. Would that be fair? The writers of the Constitution had lived under a king. They built a government where no one could ever hold all the power.",
  },
  teach: [
    {
      title: "Three Branches",
      teach:
        "The Constitution splits the government's power into three branches. This is called separation of powers. Article I of the Constitution sets up the legislative branch, which is Congress. Congress has two parts, the Senate and the House of Representatives, and it makes the laws. Article II sets up the executive branch, led by the President. It carries out and enforces the laws, and the President is commander in chief of the armed forces. Article III sets up the judicial branch: the Supreme Court and the other federal courts. Judges decide what laws mean and whether they follow the Constitution. A trick to remember it: Congress makes the laws, the President carries them out, and the courts explain them.",
      visual: {
        type: "hotspots",
        title: "The three branches of government",
        center: "Constitution",
        spots: [
          { label: "Legislative", icon: "🏛️", detail: "Congress: the Senate (two per state, 100 today) and the House (based on population, 435 today). Makes the laws." },
          { label: "Executive", icon: "🦅", detail: "The President, the Vice President and their departments. Carries out and enforces the laws." },
          { label: "Judicial", icon: "⚖️", detail: "The Supreme Court and other federal courts. Decides what laws mean and if they follow the Constitution." },
          { label: "Separation of powers", icon: "✂️", detail: "Splitting power into three branches so no one person or group holds it all." },
        ],
      },
      probe: {
        type: "sort",
        prompt: "Sort each job into the branch that does it.",
        buckets: ["Legislative (Congress)", "Executive (President)", "Judicial (Courts)"],
        items: [
          { text: "Writes and passes new laws", bucket: 0 },
          { text: "Decides how to spend the nation's money", bucket: 0 },
          { text: "Commands the armed forces", bucket: 1 },
          { text: "Carries out and enforces laws", bucket: 1 },
          { text: "Decides whether a law follows the Constitution", bucket: 2 },
          { text: "Explains what a law means in a court case", bucket: 2 },
        ],
        hint: "Congress makes the laws, the President carries them out, and the courts explain them.",
        seconds: 45,
      },
      think: {
        q: "Which branch makes the laws?",
        choices: ["The executive branch", "The judicial branch", "The legislative branch"],
        answer: 2,
        why: "The legislative branch, Congress, makes the laws.",
        hints: [
          "The executive branch, led by the President, carries out the laws.",
          "The judicial branch, the courts, decides what laws mean.",
          "",
        ],
      },
      approaches: {
        analogy:
          "Think of a baseball game. One group writes the rule book (legislative), the players and coaches play by it and run the game (executive), and the umpire decides what the rules mean when there's an argument (judicial).",
        example:
          "Congress passes a law setting speed limits on national highways. The executive branch enforces it. If someone says the law is unfair under the Constitution, a federal court decides.",
        simpler: {
          q: "What is the legislative branch called?",
          choices: ["Congress", "The Supreme Court", "The Cabinet"],
          answer: 0,
          why: "The legislative branch is Congress: the Senate and the House.",
          hints: ["", "The Supreme Court is the head of the judicial branch.", "The Cabinet helps the President, in the executive branch."],
        },
      },
    },
    {
      title: "Checks and Balances",
      teach:
        "Separate branches aren't enough. Each branch can also check, or limit, the others. This is called checks and balances. The President can veto, or reject, a law Congress passes. But Congress can override the veto with a two-thirds vote of both houses. The President chooses Supreme Court judges, but the Senate must approve them. The courts can rule that a law goes against the Constitution, so it can't be enforced. Congress can even remove a President or judge who commits serious crimes. Why all these checks? James Madison put it simply: \"If men were angels, no government would be necessary.\" People aren't angels, so power needs limits.",
      visual: {
        type: "flip",
        cards: [
          { front: "Veto", back: "The President rejects a law Congress passed." },
          { front: "Override", back: "Congress passes the law anyway with a two-thirds vote of both houses." },
          { front: "Approving judges", back: "The President chooses judges, but the Senate must approve them." },
          { front: "Unconstitutional", back: "When courts rule a law goes against the Constitution, it can't be enforced." },
          { front: "Impeachment", back: "Congress can charge and remove a President or judge for serious crimes." },
        ],
      },
      probe: {
        type: "match",
        prompt: "Match each check to the branch that uses it.",
        pairs: [
          { left: "Veto a law passed by Congress", right: "The President" },
          { left: "Override a veto with a two-thirds vote", right: "Congress" },
          { left: "Rule that a law goes against the Constitution", right: "The courts" },
        ],
        hint: "The President rejects laws, Congress can pass them anyway, and the courts judge if they follow the Constitution.",
        seconds: 30,
      },
      think: {
        q: "What can Congress do if the President vetoes a law?",
        choices: ["Nothing at all", "Override the veto with a two-thirds vote of both houses", "Fire the Supreme Court", "Choose a new President the next day"],
        answer: 1,
        why: "With a two-thirds vote in both the House and the Senate, Congress can override a veto.",
        hints: [
          "That would make the President too powerful. Congress has a check of its own.",
          "",
          "Supreme Court judges serve for life and can't simply be fired.",
          "Presidents are elected by the people. Congress can't pick a new one just because of a veto.",
        ],
      },
      approaches: {
        analogy:
          "Checks and balances work like a three-way game of rock, paper, scissors. Each one can beat another, so no single one can win every time.",
        example:
          "Congress passes a law. The President vetoes it. Two-thirds of the House and two-thirds of the Senate vote for it again, so it becomes law anyway. Later, a court can still decide whether it follows the Constitution.",
        simpler: {
          q: "What does \"veto\" mean?",
          choices: ["To reject a law", "To write a law", "To vote for a judge"],
          answer: 0,
          why: "A veto is the President's power to reject a law Congress passed.",
          hints: ["", "Congress writes the laws. A veto is what the President can do to them.", "Approving judges is the Senate's job. A veto is about laws."],
        },
      },
    },
    {
      title: "The Bill of Rights",
      teach:
        "Many Americans worried that the new Constitution didn't clearly protect their freedoms. Several states approved it only after being promised a list of rights would be added. So James Madison wrote amendments, which are changes to the Constitution. In 1791, the first ten were added. They are called the Bill of Rights. The First Amendment protects five freedoms: religion, speech, the press, gathering peacefully, and petitioning, or asking, the government to fix problems. Other amendments protect the right to keep and bear arms, keep soldiers from being housed in people's homes, and protect people from unreasonable searches. They promise a fair and speedy trial by jury. The Tenth Amendment says powers not given to the national government belong to the states or the people.",
      visual: {
        type: "flip",
        cards: [
          { front: "Amendment", back: "A change or addition to the Constitution." },
          { front: "1st Amendment", back: "Freedom of religion, speech and the press, the right to gather peacefully, and the right to petition the government." },
          { front: "3rd Amendment", back: "Soldiers can't be housed in people's homes in peacetime without permission. The colonists had complained about this!" },
          { front: "4th Amendment", back: "Protection from unreasonable searches of your home and things." },
          { front: "6th Amendment", back: "The right to a speedy, public trial by jury." },
          { front: "10th Amendment", back: "Powers not given to the national government belong to the states or the people." },
        ],
      },
      probe: {
        type: "cloze",
        text: "The First Amendment protects freedom of {0}, freedom of {1}, freedom of the {2}, the right to gather peacefully, and the right to {3} the government.",
        blanks: [{ answers: ["religion", "speech"] }, { answers: ["speech", "religion"] }, { answers: ["press"] }, { answers: ["petition"] }],
        bank: ["religion", "speech", "press", "petition", "taxes", "veto"],
        hint: "Three freedoms are about what you believe, say and print. The last is about asking the government to fix a problem.",
        mistakes: [
          { match: "veto", coach: "A veto is the President's power, not a citizen's freedom." },
          { match: "taxes", coach: "Paying taxes is a responsibility, not one of the First Amendment's freedoms." },
        ],
        seconds: 40,
      },
      think: {
        q: "What is the Bill of Rights?",
        choices: ["The first ten amendments to the Constitution", "A list of taxes", "The Declaration of Independence", "The rules for electing a king"],
        answer: 0,
        why: "Added in 1791, the first ten amendments protect people's rights and freedoms.",
        hints: [
          "",
          "It's a list of rights, not taxes. It protects what the government can't take away.",
          "The Declaration came in 1776. The Bill of Rights was added to the Constitution in 1791.",
          "The United States has no king. The Bill of Rights protects the people's freedoms.",
        ],
      },
      approaches: {
        analogy:
          "The Bill of Rights is like a list of promises attached to a contract. Before people would sign, they wanted it in writing: \"The government can never take away these freedoms.\"",
        example:
          "A newspaper prints an article saying a law is a bad idea. Because of the First Amendment's freedom of the press, the government can't shut the newspaper down for it.",
        simpler: {
          q: "How many amendments are in the Bill of Rights?",
          choices: ["Three", "Ten", "Fifty"],
          answer: 1,
          why: "The Bill of Rights is the first ten amendments.",
          hints: ["Three is the number of branches of government, not amendments.", "", "Fifty is the number of states today."],
        },
      },
    },
    {
      title: "Rights and Responsibilities",
      teach:
        "Rights come with responsibilities. Your right to free speech comes with the responsibility to respect other people's rights too. The right to a trial by jury only works if citizens are willing to serve on juries. Good citizens obey the laws and pay taxes, which pay for things like roads, schools and the armed forces. They stay informed about what their government is doing. When they turn eighteen, they can vote to choose their leaders. They help their neighbors and community. The writers of the Constitution built a strong framework, but they knew it would only last if the people took care of it. A free country depends on good citizens.",
      visual: {
        type: "compare",
        left: { title: "Rights (freedoms you have)", points: ["Freedom of religion", "Freedom of speech and the press", "A fair trial by jury", "Gathering peacefully and petitioning"] },
        right: { title: "Responsibilities (duties you owe)", points: ["Obey the laws", "Pay taxes", "Serve on a jury", "Stay informed and vote at 18", "Respect the rights of others"] },
      },
      probe: {
        type: "sort",
        prompt: "Sort each one: is it a right or a responsibility?",
        buckets: ["Right", "Responsibility"],
        items: [
          { text: "Freedom of speech", bucket: 0 },
          { text: "Freedom of religion", bucket: 0 },
          { text: "A fair and speedy trial", bucket: 0 },
          { text: "Obeying the laws", bucket: 1 },
          { text: "Serving on a jury", bucket: 1 },
          { text: "Respecting other people's rights", bucket: 1 },
          { text: "Paying taxes", bucket: 1 },
        ],
        hint: "A right is a freedom you have. A responsibility is a duty you do for your community and country.",
        seconds: 40,
      },
      think: {
        q: "Why does the right to a trial by jury depend on citizens?",
        choices: ["Citizens have to be willing to serve on juries", "Citizens choose the judges by themselves", "Citizens write the trial rules each day", "Juries are made of soldiers"],
        answer: 0,
        why: "A jury is made of ordinary citizens, so the right only works if citizens serve.",
        hints: [
          "",
          "Judges are chosen by the President and approved by the Senate, not picked by each citizen.",
          "Trial rules come from laws and the Constitution, not new rules each day.",
          "Juries are ordinary citizens from the community, not soldiers.",
        ],
      },
      approaches: {
        analogy:
          "A community garden gives everyone the right to pick vegetables. But if nobody waters, weeds or plants, there's nothing left to pick. Rights are like that garden: they last when people take care of them.",
        example:
          "A grown-up gets a letter asking them to serve on a jury. It takes a few days off work, but they go, listen carefully and help decide the case fairly. Because they served, someone got the fair trial the Sixth Amendment promises.",
        simpler: {
          q: "Which of these is a responsibility of citizens?",
          choices: ["Freedom of speech", "Obeying the laws"],
          answer: 1,
          why: "Obeying the laws is a duty, or responsibility.",
          hints: ["Freedom of speech is a right: a freedom you have.", ""],
        },
      },
    },
  ],
  activity: {
    type: "sort",
    prompt: "Sort each item into the branch it belongs to.",
    buckets: ["Legislative", "Executive", "Judicial"],
    items: [
      { text: "The Senate", bucket: 0 },
      { text: "The House of Representatives", bucket: 0 },
      { text: "Overrides a veto", bucket: 0 },
      { text: "The President", bucket: 1 },
      { text: "Vetoes a law", bucket: 1 },
      { text: "Commander in chief", bucket: 1 },
      { text: "The Supreme Court", bucket: 2 },
      { text: "Rules a law unconstitutional", bucket: 2 },
    ],
  },
  explain: {
    prompt: "Explain how the Constitution keeps any one part of the government from becoming too powerful, and how the Bill of Rights protects the people.",
    keyPoints: [
      "Power is split into three branches: legislative, executive and judicial",
      "Congress makes laws, the President enforces them, and the courts decide what they mean",
      "Checks and balances let each branch limit the others, like the veto",
      "The Bill of Rights is the first ten amendments and protects freedoms like speech and religion",
      "Citizens have responsibilities too",
    ],
  },
  mastery: [
    {
      type: "number",
      prompt: "How many amendments make up the Bill of Rights?",
      answer: 10,
      hint: "Think of the number of fingers on your two hands.",
      mistakes: [{ match: "5", coach: "Five is the number of freedoms in the First Amendment. The Bill of Rights has twice as many amendments." }],
      seconds: 15,
    },
    {
      type: "place",
      prompt: "Put these events on the timeline.",
      min: 1770,
      max: 1800,
      step: 1,
      tolerance: 0,
      items: [
        { label: "Declaration of Independence", value: 1776 },
        { label: "Constitution signed", value: 1787 },
        { label: "Bill of Rights added", value: 1791 },
      ],
      hint: "The Declaration was 1776, the Constitution was signed eleven years later, and the Bill of Rights came four years after that.",
      seconds: 35,
    },
    {
      type: "match",
      prompt: "Match each branch to its main job.",
      pairs: [
        { left: "Legislative", right: "Makes the laws" },
        { left: "Executive", right: "Carries out and enforces the laws" },
        { left: "Judicial", right: "Decides what the laws mean" },
      ],
      hint: "Legislature sounds like \"legislate,\" which means to make laws. Execute means to carry out. Judges judge.",
      seconds: 25,
    },
    {
      type: "highlight",
      prompt: "Tap every sentence that is an example of checks and balances.",
      sentences: [
        "The President vetoes a law that Congress passed.",
        "The Senate votes on whether to approve a Supreme Court judge the President chose.",
        "A citizen reads a newspaper.",
        "A court rules that a law goes against the Constitution.",
        "Congress meets in the Capitol building.",
      ],
      correct: [0, 1, 3],
      hint: "A check is one branch limiting another branch.",
      seconds: 35,
    },
  ],
  check: [
    {
      q: "Which branch carries out and enforces the laws?",
      choices: ["Legislative", "Judicial", "Executive"],
      answer: 2,
      why: "The executive branch, led by the President, carries out the laws.",
    },
    {
      q: "Why does the Constitution have checks and balances?",
      choices: ["So no branch becomes too powerful", "So laws are passed faster", "So the President can rule alone", "So states don't need governments"],
      answer: 0,
      why: "Each branch can limit the others, keeping power balanced.",
    },
    {
      q: "Which freedom is protected by the First Amendment?",
      choices: ["Freedom from paying taxes", "Freedom of speech", "Freedom to skip jury duty"],
      answer: 1,
      why: "The First Amendment protects freedom of religion, speech, the press, assembly and petition.",
    },
    {
      q: "When was the Bill of Rights added to the Constitution?",
      choices: ["1776", "1781", "1787", "1791"],
      answer: 3,
      why: "The first ten amendments were added in 1791.",
    },
  ],
  task: {
    kind: "speak",
    prompt: "Teach a family member about the three branches of government. Draw a simple chart with the three branches, name each one's job, and give one example of a check one branch has on another. Then explain one freedom in the First Amendment and one responsibility that goes with it.",
    rubric: [
      "Names all three branches and their jobs correctly",
      "Gives a correct example of checks and balances (such as a veto and override)",
      "Explains one First Amendment freedom",
      "Names a responsibility of citizens that goes with a right",
    ],
  },
};

export const soc5 = k5Course("soc", 5, [colonies, road, declaration, war, constitution, branches]);
