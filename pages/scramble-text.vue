<script setup lang="ts">
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/dist/ScrambleTextPlugin";
import { SplitText } from "gsap/dist/SplitText";

gsap.registerPlugin(ScrambleTextPlugin);

const textRef = ref(null);

onMounted(() => {
  const splitText = new SplitText(textRef.value, {
    type: "chars,words",
  });

  console.log(splitText.chars);

  const revealTimeline = gsap.timeline({ paused: true });

  gsap.set(splitText.chars, { opacity: 0 });
  splitText.chars.forEach((char, index) => {
    revealTimeline
      .to(
        char,
        {
          opacity: 1,
          duration: 0,
        },
        index * 0.025
      )
      .to(
        char,
        {
          duration: 0.5,
          scrambleText: {
            text: char.innerHTML,
            chars: "abcdefghijklmnopqrstuvwxyz",
          },
        },
        index * 0.025
      );
  });

  setTimeout(() => {
    gsap.set(textRef.value, { opacity: 1 });
    revealTimeline.play();
  }, 1000);
});
</script>

<template>
  <div
    class="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500"
  >
    <h1
      class="font-sans w-10/12 text-4xl font-bold text-gray-50 md:text-6xl lg:w-6/12"
      style="opacity: 0"
      ref="textRef"
    >
      This is some text that needs scrambling and I go onto multiple lines I
      really do
    </h1>
  </div>
</template>
