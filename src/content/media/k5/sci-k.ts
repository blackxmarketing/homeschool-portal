import type { CourseMedia } from "../types";

/** Slides for sci-k, by lesson id. */
export const sciKMedia: CourseMedia = {
  "sci-k.pushpull": {
    hook: {
      show: [
        { emoji: "⚽", caption: "A ball, sitting very still" },
        { at: "How can we make it move", big: "?", caption: "How can we make it move?" },
        { at: "find out together", emoji: "👐🤲", caption: "Let's find out together!" },
      ],
    },
    teach: [
      {
        show: [
          { big: "Push & Pull", caption: "Two big words: push and pull" },
          { at: "A push moves something away", emoji: "👐➡️⚽", caption: "A push moves something away from you" },
          { at: "A pull moves something toward", emoji: "⚽⬅️🤲", caption: "A pull moves something toward you" },
          { at: "Some jobs need both", emoji: "🛷⛰️", caption: "Pull the sled up, push off to slide down" },
        ],
      },
      {
        show: [
          { emoji: "🤏💪", caption: "Pushes can be gentle or strong" },
          { at: "a tiny tap", emoji: "👆⚽🐢", caption: "A tiny tap: the ball rolls slowly and stops soon" },
          { at: "give it a big push", emoji: "💪⚽🚀", caption: "A big push: zoom! Fast and far" },
          { at: "Pulls work the same way", emoji: "🧺", caption: "Pull a wagon gently or hard: same idea" },
        ],
      },
      {
        show: [
          { big: "Which way?", caption: "Pushes and pulls have a direction" },
          { at: "Push a ball to the right", emoji: "⚽➡️", caption: "Push it right, it rolls right" },
          { at: "Push it to the left", emoji: "⬅️⚽", caption: "Push it left, it rolls left" },
          { at: "Soccer players", emoji: "⚽🏃", caption: "Soccer players tap the ball to change its way" },
        ],
      },
    ],
  },

  "sci-k.rampsbumpers": {
    hook: {
      show: [
        { emoji: "⚽🛋️", caption: "Uh oh! The ball rolls under the couch again" },
        { at: "How can we stop it", emoji: "🛑", caption: "How can we stop it?" },
        { at: "think like engineers", emoji: "👷🔧", caption: "Let's think like engineers" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🛝", caption: "A ramp is a slope, like a slide" },
          { at: "Set a toy car", emoji: "🚗⬇️", caption: "Set a car at the top and let go. Whee!" },
          { at: "The higher the ramp", emoji: "📈🚀", caption: "Higher ramp, faster car at the bottom" },
          { at: "Gravity pulls", emoji: "🌍⬇️", caption: "Gravity is a pull toward the ground" },
        ],
      },
      {
        show: [
          { emoji: "⚽➡️", caption: "A rolling ball goes straight" },
          { at: "A hard wall", emoji: "⚽🧱↩️", caption: "A hard wall pushes back. The ball bounces a new way" },
          { at: "Mini golf", emoji: "⛳", caption: "Mini golf has bumpers" },
          { at: "like a pillow", emoji: "⚽🛏️🛑", caption: "Something soft slows the ball and stops it" },
        ],
      },
      {
        show: [
          { big: "The plan", caption: "Engineers have a plan" },
          { at: "find the problem", emoji: "❓", caption: "1. Find the problem" },
          { at: "build an idea", emoji: "🧱🧱🧱", caption: "2. Build an idea" },
          { at: "Then test it", emoji: "⚽🧱", caption: "3. Test it" },
          { at: "make it better", emoji: "🔧", caption: "4. Make it better and test again" },
        ],
      },
    ],
  },

  "sci-k.sunlight": {
    hook: {
      show: [
        { emoji: "☀️🛣️🦶", caption: "A sunny sidewalk can feel hot on your feet" },
        { at: "the grass under a tree", emoji: "🌳🌿", caption: "But the grass under a tree feels cool" },
        { at: "Why is that", big: "?", caption: "Why is that?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "☀️⭐", caption: "The Sun is a giant star, very far away" },
          { at: "Sunlight brings warmth", emoji: "☀️➡️🔥", caption: "Sunlight brings warmth" },
          { at: "shines on sand", emoji: "🏖️", caption: "Sunlight warms the sand" },
          { at: "the water in a pond", emoji: "🦆💧", caption: "It warms rocks, soil and pond water too" },
          { at: "Ouch", emoji: "🦶😮", caption: "Ouch! That heat came from the Sun" },
        ],
      },
      {
        show: [
          { big: "Shade", caption: "Shade is a spot where sunlight is blocked" },
          { at: "A tree blocks the sun", emoji: "🌳⛱️🏠", caption: "Trees, umbrellas and roofs make shade" },
          { at: "Things in the shade stay cooler", emoji: "😎", caption: "Things in the shade stay cooler" },
          { at: "A cat on a hot day", emoji: "🐈🌳", caption: "On a hot day, a cat finds shade" },
          { at: "A lizard", emoji: "🦎🪨☀️", caption: "On a cool morning, a lizard finds a sunny rock" },
        ],
      },
      {
        show: [
          { emoji: "👷", caption: "Let's be engineers!" },
          { at: "A toy is getting too hot", emoji: "🧸🥵", caption: "Problem: a toy is getting too hot" },
          { at: "Build a shade", emoji: "📦🧸", caption: "Build a shade with a box, a plate or a towel" },
          { at: "Then feel the toy", emoji: "✋🧸", caption: "Wait, then feel the toy. Is it cooler?" },
          { at: "Try two shades", emoji: "📦🆚🧻", caption: "Try two shades. Which works better?" },
        ],
      },
    ],
  },

  "sci-k.needs": {
    hook: {
      show: [
        { emoji: "😋🥤", caption: "You get hungry and thirsty" },
        { at: "A puppy does too", emoji: "🐶", caption: "A puppy does too!" },
        { at: "What about a flower", emoji: "🌻", caption: "What does a flower need?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🐇🥕", caption: "Animals need food" },
          { at: "A bird eats", emoji: "🐦🌾", caption: "A bird eats seeds and bugs" },
          { at: "water to drink", emoji: "💧💨", caption: "Animals need water to drink and air to breathe" },
          { at: "a safe home", emoji: "🪺", caption: "Animals need a safe home, like a nest" },
          { at: "People are living things", emoji: "🧒🍎💧", caption: "People need food, water, air and a home too" },
        ],
      },
      {
        show: [
          { emoji: "🌱", caption: "Plants are living things too" },
          { at: "They need water", emoji: "💧", caption: "Plants need water and air" },
          { at: "they need sunlight", emoji: "☀️", caption: "And they need sunlight!" },
          { at: "make their own food", emoji: "🍃", caption: "Plants make their own food with sunlight" },
          { at: "Put a plant by a window", emoji: "🪟🪴", caption: "A plant by a window leans toward the light" },
        ],
      },
      {
        show: [
          { big: "Home", caption: "Living things live where they get what they need" },
          { at: "A fish needs water", emoji: "🐟💧", caption: "A fish needs water, so it lives in a pond or the sea" },
          { at: "A squirrel needs nuts", emoji: "🐿️🌳", caption: "A squirrel lives in the trees" },
          { at: "A cactus needs little water", emoji: "🌵🏜️", caption: "A cactus can live in the dry desert" },
          { at: "Your home has food", emoji: "🏠🛏️", caption: "Your home has food, water and a bed" },
        ],
      },
    ],
  },

  "sci-k.weather": {
    hook: {
      show: [
        { emoji: "🪟👀", caption: "Look out the window. What do you see?" },
        { at: "Is it sunny", emoji: "☀️☁️🌧️", caption: "Sunny, cloudy, or rainy?" },
        { at: "weather watchers", emoji: "📋✏️", caption: "Today we are weather watchers!" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "☀️", caption: "Weather is what it is like outside right now. Sunny?" },
          { at: "gray clouds", emoji: "☁️", caption: "Gray clouds cover the sky: cloudy" },
          { at: "water falling down", emoji: "🌧️", caption: "Water falling down: rainy" },
          { at: "white flakes", emoji: "❄️", caption: "Cold, white flakes: snowy" },
          { at: "trees bending", emoji: "🌬️🌳", caption: "Trees bending and swaying: windy" },
        ],
      },
      {
        show: [
          { emoji: "🌤️➡️🌧️", caption: "Weather changes, even in one day" },
          { at: "Make a chart", emoji: "📋☀️☁️🌧️", caption: "Draw the weather on a chart each day" },
          { at: "At the end of the week", emoji: "🔢", caption: "At the end of the week, count each kind" },
          { at: "Summer is often hot", emoji: "☀️🩳", caption: "Summer is often hot" },
          { at: "Winter is often cold", emoji: "❄️🧤", caption: "Winter is often cold" },
        ],
      },
      {
        show: [
          { emoji: "📺🌦️", caption: "Forecasters tell us what weather is coming" },
          { at: "grab a raincoat", emoji: "🧥☂️", caption: "Rain coming? Grab a raincoat" },
          { at: "a big storm", emoji: "⛈️", caption: "A big storm coming? Make a plan and stay inside" },
          { at: "Keep a flashlight ready", emoji: "🔦", caption: "Keep a flashlight ready" },
          { at: "when thunder roars", big: "Go indoors!", caption: "When thunder roars, go indoors!" },
        ],
      },
    ],
  },

  "sci-k.caring": {
    hook: {
      show: [
        { emoji: "🦫🌳", caption: "A beaver chews and chews on a tree" },
        { at: "Crash", emoji: "🌳💥", caption: "Crash! Down it falls" },
        { at: "What will the beaver build", big: "?", caption: "What will the beaver build?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🐾🏞️", caption: "Animals change the places where they live" },
          { at: "A beaver chews", emoji: "🦫🪵", caption: "A beaver piles sticks and mud across a stream" },
          { at: "makes a pond", emoji: "🏞️💧", caption: "The dam makes a pond: a safe home" },
          { at: "A squirrel digs", emoji: "🐿️🌰", caption: "A squirrel digs holes to hide nuts" },
          { at: "A bird builds a nest", emoji: "🐦🪺", caption: "A bird builds a nest" },
        ],
      },
      {
        show: [
          { emoji: "🧑‍🌾", caption: "People change the land too" },
          { at: "we build houses", emoji: "🏠", caption: "We build houses for shelter" },
          { at: "we plant gardens", emoji: "🥕🌽", caption: "We plant gardens and farms for food" },
          { at: "dig wells", emoji: "🪣💧", caption: "We dig wells and build pipes for water" },
          { at: "keep the land, water and air clean", emoji: "🌍✨", caption: "We want to keep the land, water and air clean" },
        ],
      },
      {
        show: [
          { emoji: "🌍💚", caption: "Three helpers to take care of our world" },
          { at: "Reduce means use less", emoji: "🚰⬇️", caption: "Reduce: use less. Turn off the water" },
          { at: "Reuse means use it again", emoji: "🫙🖍️", caption: "Reuse: use it again, like a crayon jar" },
          { at: "Recycle means sort", emoji: "♻️🥫📰", caption: "Recycle: paper, cans and bottles become new things" },
          { at: "plant trees", emoji: "🌱🐦", caption: "Plant trees and fill a bird bath" },
        ],
      },
    ],
  },
};
