<script setup lang="ts">
const textRef = ref(null);
const scrambledTextRef = ref(null);

const charIndex = ref(0);
const scrambleIndex = ref(0);
const splitText = ref([]);

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
  " ",
];

onMounted(() => {
  splitText.value = textRef.value.textContent.split("").slice(1, -1);
  charIndex.value = 0;

  scrambleTick();
});

const scrambleTick = () => {
  // Get a slice of text that will be scrambled
  const charStart = charIndex.value - 5 < 0 ? 0 : charIndex.value;
  const charEnd =
    charIndex.value - 5 < 0 ? charIndex.value + 1 : charIndex.value + 5;
  const charSlice = splitText.value.slice(charStart, charEnd);

  // Map through CharSlice array to create array of random characters
  const randomChars = charSlice
    .map((char, index) => {
      // If character is a space, ignore
      if (char === " ") {
        return " ";
      } else {
        const randomNumber = Math.floor(Math.random() * charArray.length);
        return charArray[randomNumber];
      }
    })
    .join("");

  // Get all characters in string before the start of the charSlice array and join them back together
  let setChars = splitText.value.slice(0, charStart).join("");

  // Set text with scrambled letters
  scrambledTextRef.value.innerHTML = `${setChars}${randomChars}`;
  // Increment scrambleIndex
  scrambleIndex.value++;

  // Every letter gets scrambled twice before moving on to the next letter
  // current character index gets incremented and scrambleIndex gets reset
  if (scrambleIndex.value >= 2) {
    charIndex.value++;
    scrambleIndex.value = 0;
  }

  // If the character index is less than the length of the string
  // Wait 10 ms and call this function again
  if (charIndex.value <= splitText.value.length) {
    setTimeout(() => {
      scrambleTick();
    }, 10);
  }
};
</script>

<template>
  <div
    class="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500"
  >
    <h1
      class="font-sans relative w-10/12 text-4xl font-bold text-gray-50 md:text-6xl lg:w-6/12"
    >
      <span
        ref="scrambledTextRef"
        class="absolute inset-0 h-full w-full max-w-full"
      >
      </span>
      <span ref="textRef" class="pointer-events-none opacity-0">
        This is some text that needs scrambling and I go onto multiple lines I
        really do
      </span>
    </h1>
  </div>
</template>
