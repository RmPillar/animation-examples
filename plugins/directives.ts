import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const charArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const getOptions = (options) => {
  const optionsWithDefaults = options ?? {
    speed: 5,
    chars: charArray,
    iterations: 5,
    scrollTrigger: {
      start: "top bottom-=200px",
      once: true,
    },
  };

  console.log(optionsWithDefaults);
  const scrollTriggerOptions = optionsWithDefaults.scrollTrigger;
  const scrambleOptions = {
    speed: optionsWithDefaults.speed ?? 5,
    chars: optionsWithDefaults.chars ?? charArray,
    iterations: optionsWithDefaults.iterations ?? 5,
  };

  console.log(scrollTriggerOptions, scrambleOptions);

  return { scrollTriggerOptions, scrambleOptions };
};

const setupScrambleEl = (el: HTMLElement) => {
  el.style.position = "relative";

  const textSpan = document.createElement("span");
  const textStyles = {
    pointerEvents: "none",
    opacity: "0",
  };
  Object.assign(textSpan.style, textStyles);
  textSpan.textContent = el.textContent;

  const scrambleTextSpan = document.createElement("span");
  const scrambleTextStyles = {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "100%",
    maxWidth: "100%",
  };
  Object.assign(scrambleTextSpan.style, scrambleTextStyles);

  el.textContent = "";

  el.append(textSpan, scrambleTextSpan);

  return scrambleTextSpan;
};

const scrambleTick = (
  text: string[],
  scrambledTextEl: HTMLElement,
  charIndex: number,
  scrambleIndex: number,
  options
) => {
  // Get a slice of text that will be scrambled
  const charStart = charIndex - 5 < 0 ? 0 : charIndex;
  const charEnd = charIndex - 5 < 0 ? charIndex + 1 : charIndex + 5;
  const charSlice = text.slice(charStart, charEnd);

  // Map through CharSlice array to create array of random characters
  const randomChars = charSlice
    .map((char, index) => {
      // If character is a space, ignore
      if (char === " ") {
        return " ";
      } else {
        const randomNumber = Math.floor(Math.random() * options.chars.length);
        return options.chars[randomNumber];
      }
    })
    .join("");

  // Get all characters in string before the start of the charSlice array and join them back together
  let setChars = text.slice(0, charStart).join("");

  // Set text with scrambled letters
  scrambledTextEl.textContent = `${setChars}${randomChars}`;
  // Increment scrambleIndex
  scrambleIndex++;

  // Every letter gets scrambled twice before moving on to the next letter
  // current character index gets incremented and scrambleIndex gets reset
  if (scrambleIndex >= options.iterations) {
    charIndex++;
    scrambleIndex = 0;
  }

  // If the character index is less than the length of the string
  // Wait 10 ms and call this function again
  if (charIndex <= text.length) {
    setTimeout(() => {
      scrambleTick(text, scrambledTextEl, charIndex, scrambleIndex, options);
    }, options.speed);
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("scramble", {
    mounted(el, binding) {
      const { scrambleOptions, scrollTriggerOptions } = getOptions(
        binding.value
      );

      const charIndex = 0;
      const scrambleIndex = 0;

      const splitText = el.textContent.split("").slice(1, -1);

      const scrambleTextSpan = setupScrambleEl(el);

      ScrollTrigger.create({
        ...scrollTriggerOptions,
        trigger: el,
        onEnter: () => {
          scrollTriggerOptions.onEnter && scrollTriggerOptions.onEnter();
          scrambleTick(
            splitText,
            scrambleTextSpan,
            charIndex,
            scrambleIndex,
            scrambleOptions
          );
        },
      });
    },
  });
});
