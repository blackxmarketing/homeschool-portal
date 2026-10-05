import type { CourseMedia } from "./types";

/** Slides (real photos, emoji pictures, big facts) and videos for the leadership lessons, keyed by lesson id. */
export const leadershipMedia: CourseMedia = {
  "leadership.virtues": {
    hook: {
      show: [
        { emoji: "👑🌍", caption: "Picture ruling an empire of about 60 million people" },
        { at: "Marcus Aurelius was", photo: "Marcus Aurelius", caption: "Marcus Aurelius, emperor of Rome, carved in marble" },
        { at: "wrote private reminders", emoji: "📓🕯️✍️", caption: "Late at night, by lamplight, he wrote notes only for himself" },
        { at: "train his own character", big: "Character", caption: "Even an emperor thought character needed daily practice" },
      ],
    },
    teach: [
      {
        show: [
          { photo: "Equestrian Statue of Marcus Aurelius", caption: "This bronze Marcus on horseback has stood in Rome for about 1,800 years" },
          { at: "AD 161 to 180", big: "AD 161-180", caption: "He ruled for 19 years, many of them away at war" },
          { at: "near the Danube River", photo: "Danube", caption: "The Danube (here in Budapest, once a Roman town) was Rome's northern border" },
          { at: "Plato and Cicero", photo: "Cicero", caption: "Cicero, a Roman speaker and thinker Marcus learned from" },
          { at: "wisdom, justice, courage", emoji: "🦉⚖️🦁🧘", caption: "The four hinges: wisdom, justice, courage and self-control" },
        ],
        watch: { youtube: "R9OCA6UFE-0", title: "The philosophy of Stoicism - Massimo Pigliucci", channel: "TED-Ed" },
      },
      {
        show: [
          { emoji: "🦉👀", caption: "Wisdom: seeing clearly and choosing well" },
          { at: "starts today", emoji: "📅✅", caption: "Starting a project early is wisdom you can see on a calendar" },
          { at: "Justice is the virtue", photo: "File:Berner Iustitia.jpg", caption: "Lady Justice in Bern, Switzerland: blindfolded, so she treats everyone the same" },
          { at: "split a pizza evenly", emoji: "🍕⚖️", caption: "Fair slices for everyone: justice at the dinner table" },
          { at: "has an opposite", emoji: "↔️", caption: "Wisdom vs. foolishness, justice vs. unfairness" },
        ],
      },
      {
        show: [
          { big: "Courage", caption: "Not having no fear, but doing right anyway" },
          { at: "A firefighter", photo: "Firefighter", caption: "Firefighters feel fear too, and still go in to help" },
          { at: "admitting a mistake", emoji: "🙋💬", caption: "Quiet courage: saying 'That was my fault'" },
          { at: "That is recklessness", emoji: "🛹🚫", caption: "Showing off isn't brave. It's just risky." },
          { at: "Self-control", emoji: "🎮⏸️🧹", caption: "Temperance: pausing the game when it's chore time" },
        ],
      },
      {
        show: [
          { emoji: "💪🧠", caption: "Character gets stronger with exercise, just like muscles" },
          { at: "Every small choice is a repetition", emoji: "🏋️🔁", caption: "Each good choice is one more rep" },
          { at: "put your phone away", emoji: "📱➡️📥", caption: "Phone away on time today makes tomorrow easier" },
          { at: "small giving-in", emoji: "📉", caption: "Bad habits grow the same way, one rep at a time" },
          { at: "Pick one virtue", big: "1 virtue, 1 step", caption: "Choose one virtue and practice it in one small way" },
        ],
      },
    ],
  },

  "leadership.integrity": {
    hook: {
      show: [
        { emoji: "💵🚪", caption: "A $20 bill on the floor of an empty room" },
        { at: "No cameras", emoji: "🚫📷", caption: "No cameras, no witnesses: only you know" },
        { at: "says more about who you are", emoji: "🪞", caption: "Your private choices show your real self" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Integer = whole", caption: "Integrity and integer share a Latin root meaning whole" },
          { at: "same person at home and at school", emoji: "🏠🏫🧍", caption: "Same person everywhere you go" },
          { at: "Their words match their actions", emoji: "💬🟰🛠️", caption: "What you say equals what you do" },
          { at: "split in two", emoji: "🎭", caption: "Two faces: nice in front, mean behind" },
          { at: "not about being perfect", emoji: "✅🧩", caption: "Whole doesn't mean perfect. It means honest and consistent." },
        ],
      },
      {
        show: [
          { big: "3 ways", caption: "Truth, promises, and the unseen choices" },
          { at: "telling the truth", emoji: "🗣️✅", caption: "1. Tell the truth, even when a lie is easier" },
          { at: "keeping promises", emoji: "🤞📞", caption: "2. Keep promises, even little ones" },
          { at: "doing right when no one is watching", emoji: "🧹👀", caption: "3. Do it right even when nobody checks" },
          { at: "returning extra change", emoji: "🪙↩️🙂", caption: "Extra change from a cashier? Integrity hands it back." },
        ],
      },
      {
        show: [
          { photo: "George Washington", caption: "George Washington, painted by Gilbert Stuart in the 1790s" },
          { at: "That story is a legend", emoji: "🍒🪓❓", caption: "A great story, but no proof it ever happened" },
          { at: "Mason Locke Weems", photo: "Mason Locke Weems", caption: "Parson Weems, the writer who added the cherry tree tale" },
          { at: "110 Rules of Civility", big: "110 rules", caption: "Teen George copied all 110 rules by hand" },
          { at: "how do we know this is true", emoji: "🔍📜", caption: "Good thinkers check the evidence" },
        ],
      },
      {
        show: [
          { emoji: "🤝", caption: "Trust is how people decide if they can rely on you" },
          { at: "Picture trust as a brick wall", emoji: "🧱🧱🧱", caption: "Every kept promise adds one brick" },
          { at: "a single lie", emoji: "💥🧱", caption: "One lie can knock out many bricks at once" },
          { at: "gave up command", photo: "General George Washington Resigning His Commission", caption: "Washington handing back his army command, December 1783" },
          { at: "home to his farm", photo: "Mount Vernon", caption: "Mount Vernon, Washington's Virginia farm home" },
        ],
      },
    ],
  },

  "leadership.decisions": {
    hook: {
      show: [
        { big: "2 seconds", caption: "That's how long some choices take to make" },
        { at: "two weeks", big: "2 weeks", caption: "...and how long the regret can last" },
        { at: "decided too fast", emoji: "🏃💨🤦", caption: "Good people, too-fast choices" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "✋📝🤔❓", caption: "Four fingers, four steps: Stop, List, Think, Ask" },
          { at: "The first step, Stop", photo: "File:STOP sign.jpg", caption: "Step 1: Stop. Hit the brakes before you choose." },
          { at: "Strong feelings", emoji: "😡🤩😨", caption: "Anger, excitement and fear all shout 'Now!'" },
          { at: "even for ten seconds", big: "10 seconds", caption: "A short pause lets your thinking catch up" },
          { at: "sleeping on it", emoji: "🛏️🌙", caption: "For big choices, wait until morning" },
        ],
      },
      {
        show: [
          { emoji: "⬅️❓➡️", caption: "Pressure makes it feel like there are only two doors" },
          { at: "almost always more options", emoji: "🔀", caption: "Most choices have more than two paths" },
          { at: "sneak into a movie", emoji: "🎬🤫😬", caption: "Sneak in, or lose your friends? There's another way." },
          { at: "a third path exists", emoji: "🎟️🍿", caption: "Third path: everyone buys a ticket" },
          { at: "Listing your options", emoji: "📝1️⃣2️⃣3️⃣", caption: "Write your choices down so you can see them all" },
        ],
      },
      {
        show: [
          { emoji: "🤔➡️❓", caption: "Step 3: Think. What happens next?" },
          { at: "and after that", photo: "Chess", caption: "Chess players think several moves ahead. So can you." },
          { at: "five minutes and terrible for five weeks", big: "5 min vs. 5 weeks", caption: "Fun now can mean trouble later" },
          { at: "who else is affected", emoji: "👨‍👩‍👧🧑‍🤝‍🧑", caption: "Your choices ripple out to other people" },
          { at: "a year from now", emoji: "📆🔭", caption: "Will future you be glad?" },
        ],
      },
      {
        show: [
          { emoji: "❓🌟", caption: "Step 4: Ask. What would a person of good character do?" },
          { at: "someone you admire", emoji: "👵🧢🦸", caption: "A grandparent, a coach, or a hero from history" },
          { at: "help your grandmother on Saturday", emoji: "👵🗓️🎢", caption: "A promise to Grandma vs. a fun trip" },
          { at: "honestly ask her", emoji: "💬🤝", caption: "Keep the promise, or ask honestly about another day" },
          { at: "letting your values lead", photo: "Compass", caption: "Your values are a compass that points the way" },
        ],
      },
    ],
  },

  "leadership.team": {
    hook: {
      show: [
        { photo: "File:Endurance Final Sinking.jpg", caption: "The Endurance, crushed by ice in 1915, as sled dogs look on" },
        { at: "twenty-eight people", big: "28 men", caption: "28 men stuck on floating ice, with no radio" },
        { at: "came home alive", big: "28 men, 0 lost", caption: "Every single one survived" },
        { at: "How did their leader", photo: "Ernest Shackleton", caption: "Ernest Shackleton, the leader who brought them home" },
      ],
    },
    teach: [
      {
        show: [
          { photo: "Ernest Shackleton", caption: "Shackleton planned to walk across all of Antarctica" },
          { at: "a ship named Endurance", photo: "Endurance (1912 ship)", caption: "The Endurance, photographed by expedition member Frank Hurley" },
          { at: "Weddell Sea", photo: "File:Endurance night 1915 SLNSW.jpg", caption: "Endurance frozen in the Weddell Sea ice, photographed at night" },
          { at: "remote Elephant Island", photo: "Elephant Island", caption: "Elephant Island seen from space: icy, rocky and far from anyone" },
          { at: "about 800 miles", big: "800 miles", caption: "In a 22-foot boat, across some of Earth's roughest seas" },
        ],
      },
      {
        show: [
          { emoji: "🧭🤝", caption: "How do you keep 28 freezing men going?" },
          { at: "reindeer-fur sleeping bags", emoji: "🛌🦌❄️", caption: "Warm fur bags went to the crew, not the bosses" },
          { at: "A leader serves", big: "Serve first", caption: "A boss expects to be served. A leader serves." },
          { at: "set the example", photo: "File:Elephant island party (cropped).jpg", caption: "Shackleton's men on Elephant Island. They watched how their leader acted." },
          { at: "stayed calm and cheerful", photo: "File:Hurley and Shackleton, Antarctic Ice Flow, 1914-1915 State Library NSW a423023h.jpg", caption: "Shackleton (right) at the ice camp stove, calm as ever" },
        ],
      },
      {
        show: [
          { photo: "Antarctica", caption: "The first goal: cross Antarctica (green) on foot" },
          { at: "goal was impossible", emoji: "🚢❌", caption: "With the ship gone, the old plan was over" },
          { at: "bring everyone home alive", big: "Everyone home", caption: "One new goal everybody could understand" },
          { at: "Extra weight was left behind", emoji: "🎒⬇️", caption: "If it didn't help survival, it stayed behind" },
          { at: "here is where we are going now", emoji: "🧭➡️", caption: "Leaders point the way when plans change" },
        ],
      },
      {
        show: [
          { emoji: "👏🙌", caption: "Shackleton made sure his men got the credit" },
          { at: "Frank Worsley", photo: "Frank Worsley", caption: "Frank Worsley, the navigator who found South Georgia" },
          { at: "On the James Caird", photo: "James Caird (boat)", caption: "Launching the James Caird from Elephant Island, April 1916" },
          { at: "with his sextant", photo: "Sextant", caption: "A sextant measures the sun's angle to find your position" },
          { at: "He also took responsibility", emoji: "👉👥👈🙋", caption: "Success? Point to the team. Trouble? Point to yourself." },
        ],
      },
    ],
  },

  "leadership.speaking": {
    hook: {
      show: [
        { big: "November 1863", caption: "Two speakers, one event" },
        { at: "about two hours", big: "2 hours", caption: "Speaker number one" },
        { at: "about two minutes", big: "2 minutes", caption: "Speaker number two" },
        { at: "Can you guess which", emoji: "🤔🎤", caption: "Make your guess!" },
      ],
    },
    teach: [
      {
        show: [
          { photo: "Gettysburg National Cemetery", caption: "The Soldiers' National Cemetery at Gettysburg, Pennsylvania" },
          { at: "Edward Everett", photo: "Edward Everett", caption: "Edward Everett, the most famous speaker of his day" },
          { at: "President Abraham Lincoln", photo: "Abraham Lincoln", caption: "Abraham Lincoln, photographed in November 1863" },
          { at: "around 270 words", big: "~270 words", caption: "Shorter than this page of your lesson" },
          { at: "eighty-seven", big: "1863 - 87 = 1776", caption: "Back to the Declaration of Independence" },
        ],
      },
      {
        show: [
          { emoji: "🪝3️⃣🏁", caption: "Hook, three points, strong close" },
          { at: "Start with a hook", emoji: "🪝❓", caption: "A question or surprising fact grabs listeners" },
          { at: "give three main points", emoji: "1️⃣2️⃣3️⃣", caption: "Three is easy to remember" },
          { at: "close strong", emoji: "🏁💡", caption: "End with one sentence they'll remember" },
          { at: "first and last sentences", photo: "Lincoln Memorial", caption: "Lincoln's whole speech is carved inside the Lincoln Memorial" },
        ],
      },
      {
        show: [
          { emoji: "👀🎤", caption: "Your audience watches you, not just listens" },
          { at: "Stand tall", emoji: "🧍🦶", caption: "Feet planted, back straight" },
          { at: "Look at people's faces", emoji: "👀👥", caption: "Move your eyes around the room" },
          { at: "Use your hands naturally", emoji: "✋☝️✌️", caption: "Count your three points on your fingers" },
          { at: "a short pause", emoji: "⏸️😌", caption: "A pause makes you look calm, even if you're nervous" },
        ],
      },
      {
        show: [
          { emoji: "💓🎤", caption: "A pounding heart just means you care" },
          { at: "The best cure is practice", photo: "Demosthenes", caption: "Demosthenes of Athens practiced for years to become a great speaker" },
          { at: "in front of a mirror", emoji: "🪞🗣️", caption: "Alone, mirror, one person, small group" },
          { at: "a small card", emoji: "🗂️🔑", caption: "A few key words on a card, not a whole script" },
          { at: "more like yours", big: "Practice beats nerves", caption: "Each practice makes the speech feel like yours" },
        ],
        watch: { youtube: "K93fMnFKwfI", title: "The science of stage fright (and how to overcome it) - Mikael Cho", channel: "TED-Ed" },
      },
    ],
  },
};
