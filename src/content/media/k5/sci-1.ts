import type { CourseMedia } from "../types";

/** Slides for sci-1, by lesson id. */
export const sci1Media: CourseMedia = {
  "sci-1.sound": {
    hook: {
      show: [
        { emoji: "🌲🤫🌲", caption: "Shh. Listen to Whisperwood Forest." },
        { at: "The fog took", emoji: "🌫️🐦", caption: "The fog took the songbirds' songs!" },
        { at: "what a sound really is", big: "?", caption: "What is a sound, really?" },
        { at: "when you hum", emoji: "🙂🎵", caption: "Hum and notice. What do you feel?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "✋🗣️", caption: "Hand on your throat. Now hum!" },
          { at: "Your throat is shaking", emoji: "〰️", caption: "Your throat is shaking!" },
          { at: "called a vibration", big: "Vibration", caption: "A fast shake is called a vibration" },
          { at: "Pluck a guitar string", emoji: "🎸", caption: "A guitar string shakes: twang!" },
          { at: "Tap a drum", emoji: "🥁🔔", caption: "A drum top shakes. A bell shakes." },
        ],
      },
      {
        show: [
          { emoji: "🥁🤫", caption: "A soft tap makes a small shake" },
          { at: "bang it hard", emoji: "🥁💥", caption: "A hard bang makes a big shake: boom!" },
          { at: "Big shakes make loud", big: "📢 🤫", caption: "Big shakes are loud. Small shakes are soft." },
          { at: "ring a bell", emoji: "🔔✋", caption: "Touch a ringing bell. The shaking stops." },
          { at: "The sound stops too", emoji: "🔕", caption: "No shake, no sound!" },
        ],
      },
      {
        show: [
          { emoji: "🥣", caption: "Stretch plastic wrap over a bowl" },
          { at: "Sprinkle a little rice", emoji: "🍚", caption: "Sprinkle a little rice on top" },
          { at: "bang a pot", emoji: "🍳🥄💥", caption: "Bang a pot right next to it" },
          { at: "The rice hops", emoji: "🍚⬆️", caption: "Look! The rice hops!" },
          { at: "made the plastic shake", emoji: "🔊➡️〰️", caption: "Sound makes things shake" },
        ],
      },
    ],
  },

  "sci-1.light": {
    hook: {
      show: [
        { emoji: "🌲🌑🌲", caption: "Night in Whisperwood. It is very dark." },
        { at: "Pip the firefly glows", emoji: "✨", caption: "Pip the firefly glows!" },
        { at: "you can see the trees", emoji: "🌲✨🌲", caption: "Now you can see the trees" },
        { at: "Why does light help", big: "?", caption: "Why does light help us see?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🚪🌑", caption: "Shut the closet door. Lights off." },
          { at: "Can you see your hand", emoji: "✋❓", caption: "Can you see your hand? No!" },
          { at: "when light shines on them", emoji: "🔦➡️📕", caption: "We see things when light shines on them" },
          { at: "make their own light", emoji: "☀️💡🔥", caption: "The Sun, a lamp and a fire make their own light" },
          { at: "need light shining on them", emoji: "📕🧸", caption: "A book needs light shining on it" },
        ],
      },
      {
        show: [
          { emoji: "🔦➡️🪟", caption: "Light goes right through a window" },
          { at: "transparent", big: "Transparent", caption: "Clear things are transparent" },
          { at: "wax paper", emoji: "🔦➡️📄", caption: "Only a little light gets through wax paper" },
          { at: "translucent", big: "Translucent", caption: "Cloudy things are translucent" },
          { at: "Things that block light are opaque", emoji: "📦🚫", caption: "Things that block light are opaque" },
        ],
      },
      {
        show: [
          { emoji: "☀️🧍", caption: "Stand in the sunshine" },
          { at: "There is your shadow", emoji: "👤", caption: "There is your shadow!" },
          { at: "It blocks the light", emoji: "🧍🚫☀️", caption: "Your body blocks the light" },
          { at: "A shiny mirror bounces light", emoji: "🪞↩️", caption: "A mirror reflects, or bounces, light" },
          { at: "dance on the wall", emoji: "✨🧱", caption: "Make a spot of light dance on the wall!" },
        ],
      },
    ],
  },

  "sci-1.signals": {
    hook: {
      show: [
        { emoji: "✨😟", caption: "Pip has a problem" },
        { at: "call a friend across", emoji: "✨🌲🌲🌲✨", caption: "Pip's friend is far across the forest" },
        { at: "too far to hear a whisper", emoji: "🤫❌", caption: "Too far to hear a whisper" },
        { at: "send a message far away", big: "?", caption: "How can Pip send a message far away?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🔊➡️➡️", caption: "Loud sounds travel far" },
          { at: "beat big drums", emoji: "🥁", caption: "Long ago, big drums sent news" },
          { at: "bells rang", emoji: "🔔", caption: "Bells told people the time" },
          { at: "blows a whistle", emoji: "📯", caption: "A whistle calls the team" },
          { at: "foghorn booms", emoji: "🚢🌫️", caption: "A foghorn booms in thick fog" },
        ],
      },
      {
        show: [
          { emoji: "🌙💡", caption: "Light can be seen far away at night" },
          { at: "A lighthouse stands", emoji: "🗼🌊", caption: "A lighthouse stands by the sea" },
          { at: "warn ships about rocks", emoji: "🚢🪨", caption: "Its light warns ships about rocks" },
          { at: "One blink means yes", big: "💡 = yes", caption: "Make a code! One blink means yes." },
          { at: "Three blinks mean come here", big: "💡💡💡", caption: "Three blinks: come here!" },
        ],
      },
      {
        show: [
          { big: "❓", caption: "First, ask: what is the problem?" },
          { at: "draw a plan", emoji: "✏️📝", caption: "Next, draw a plan" },
          { at: "Try a cup phone", emoji: "🥤🧵🥤", caption: "Build it! Try a cup phone." },
          { at: "Your voice shakes the string", emoji: "🗣️〰️👂", caption: "Your voice shakes the string" },
          { at: "make it better", emoji: "🧪⭐", caption: "Test it. Then make it better!" },
        ],
      },
    ],
  },

  "sci-1.parts": {
    hook: {
      show: [
        { emoji: "🌰", caption: "A burr is a prickly seed ball" },
        { at: "It sticks to your socks", emoji: "🧦", caption: "It sticks to your socks!" },
        { at: "Why is it so sticky", big: "?", caption: "Why is it so sticky?" },
        { at: "a great invention", emoji: "💡", caption: "One man made a great invention" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🌻", caption: "Every part of a plant has a job" },
          { at: "Roots grow under the ground", emoji: "🌱💧", caption: "Roots hold the plant and drink up water" },
          { at: "The stem holds", emoji: "🎋", caption: "The stem holds the plant up tall" },
          { at: "Leaves catch sunlight", emoji: "🍃☀️", caption: "Leaves catch sunlight to make food" },
          { at: "thorns or spines", emoji: "🌹🌵", caption: "Thorns and spines keep hungry animals away" },
        ],
      },
      {
        show: [
          { emoji: "🐢", caption: "A turtle hides in its hard shell" },
          { at: "sharp quills", emoji: "🦔", caption: "A porcupine has sharp quills" },
          { at: "webbed feet", emoji: "🦆🌊", caption: "Webbed feet push water like paddles" },
          { at: "An eagle has sharp eyes", emoji: "🦅🐟", caption: "An eagle spots a fish from high up" },
          { at: "beak helps it grab food", emoji: "🐦🪱", caption: "A beak helps a bird grab food" },
        ],
      },
      {
        show: [
          { emoji: "🌿➡️🛠️", caption: "People copy nature to solve problems" },
          { at: "Burrs stuck to his dog", emoji: "🐕🌰", caption: "Burrs stuck to his dog's fur" },
          { at: "tiny hooks", emoji: "🪝🔍", caption: "Up close, burrs have tiny hooks" },
          { at: "made Velcro", big: "Velcro", caption: "He copied the hooks and made Velcro" },
          { at: "Swim fins copy", emoji: "🦆➡️🤿", caption: "Swim fins copy a duck's webbed feet" },
        ],
      },
    ],
  },

  "sci-1.families": {
    hook: {
      show: [
        { emoji: "🐥🐥", caption: "Peep, peep! Down by the creek" },
        { at: "a mother duck leads", emoji: "🦆🐥🐥🐥", caption: "A mother duck leads her ducklings" },
        { at: "Why do they stay so close", big: "?", caption: "Why do they stay so close?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🦆🐥🐥", caption: "A mother duck leads her ducklings to the water" },
          { at: "called a joey", emoji: "🦘", caption: "A joey rides in its mother's pouch" },
          { at: "emperor penguin dad", emoji: "🐧🥚", caption: "A penguin dad keeps the egg warm on his feet" },
          { at: "A mother crocodile", emoji: "🐊", caption: "A crocodile mom gently carries her babies" },
          { at: "Parents stay close", emoji: "💛", caption: "Parents stay close" },
        ],
      },
      {
        show: [
          { emoji: "🐣", caption: "A hungry baby bird opens its mouth wide" },
          { at: "brings a worm", emoji: "🐦🪱", caption: "The parent hears and brings a worm" },
          { at: "A lost lamb bleats", emoji: "🐑", caption: "A lost lamb bleats. Baa!" },
          { at: "A human baby cries", emoji: "👶", caption: "A baby cries when it is hungry" },
        ],
      },
      {
        show: [
          { emoji: "🐱➡️🐈", caption: "Kittens grow into cats" },
          { at: "An acorn grows", emoji: "🌰➡️🌳", caption: "An acorn grows into an oak tree" },
          { at: "not exactly the same", emoji: "🐈‍⬛🐈", caption: "But babies are not exactly the same" },
          { at: "A tadpole has a tail", emoji: "🐸", caption: "A tadpole grows into a frog" },
          { at: "A caterpillar becomes", emoji: "🐛➡️🦋", caption: "A caterpillar becomes a butterfly!" },
        ],
      },
    ],
  },

  "sci-1.sky": {
    hook: {
      show: [
        { emoji: "✨🔭", caption: "Pip loves to watch the sky" },
        { at: "the Sun comes up", emoji: "🌅", caption: "Every morning the Sun comes up" },
        { at: "the stars come out", emoji: "🌌", caption: "Every night the stars come out" },
        { at: "Can we guess", big: "?", caption: "Can we guess what the sky will do tomorrow?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🌅", caption: "Morning: the Sun rises in the east" },
          { at: "high in the sky", emoji: "☀️", caption: "Midday: the Sun is high" },
          { at: "sets in the west", emoji: "🌇", caption: "Evening: the Sun sets in the west" },
          { at: "our Earth is spinning", emoji: "🌍🔄", caption: "Really, the Earth is spinning" },
          { at: "A pattern that repeats", big: "🔁", caption: "A pattern that repeats is easy to predict" },
        ],
      },
      {
        show: [
          { emoji: "🌕", caption: "Sometimes the Moon is round and full" },
          { at: "shrinks to a half", emoji: "🌗", caption: "Then it shrinks to a half" },
          { at: "a thin sliver", emoji: "🌘", caption: "Then a thin sliver" },
          { at: "about every month", big: "🌕🌗🌑🌓🌕", caption: "The pattern starts over about every month" },
          { at: "Stars shine at night", emoji: "⭐🌌", caption: "Stars shine at night. In the day, they're still there!" },
        ],
      },
      {
        show: [
          { emoji: "📅", caption: "Days change across the year" },
          { at: "play outside after dinner", emoji: "☀️⚽", caption: "Summer: play outside after dinner!" },
          { at: "about 15 hours", big: "15 hours", caption: "A summer day: about 15 hours of daylight" },
          { at: "It is dark at dinner", emoji: "❄️🌙🍽️", caption: "Winter: dark at dinner time" },
          { at: "about 9 hours", big: "9 hours", caption: "A winter day: about 9 hours of daylight" },
        ],
      },
    ],
  },
};
