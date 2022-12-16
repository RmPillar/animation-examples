<script setup lang="ts">
import gsap from "gsap";
import cards from "assets/data/cards.json";

const cardRefs = ref([]);

const timeline = ref(null);
const startPositions = ref([]);

const getStartPositions = () => {
  const angleIncrement = 360 / cards.length;
  startPositions.value = gsap.utils.shuffle(
    cards.map((card, index) => {
      return `transform: translate(${
        70 * Math.cos(((index * angleIncrement * Math.PI) / 180) * 2 * Math.PI)
      }vw, ${
        70 * Math.sin(((index * angleIncrement * Math.PI) / 180) * 2 * Math.PI)
      }vh)`;
    })
  );
};

const playTimeline = () => {
  timeline.value.play();
};

onMounted(() => {
  getStartPositions();
  timeline.value = gsap
    .timeline({
      paused: true,
    })
    .to(cardRefs.value, {
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "power4.inOut",
      stagger: 0.02,
    });
});
</script>

<template>
  <div
    class="relative flex h-screen w-screen items-center justify-center bg-gradient-to-r from-gray-50 to-gray-200"
  >
    <div
      v-for="(card, index) in cards"
      :key="index"
      :style="`--tw-rotate: ${Math.random() * 35 - 17.5}deg`"
      class="pointer-events-none absolute top-6/12 left-6/12 h-[520px] w-[360px] -translate-x-6/12 -translate-y-6/12"
    >
      <div
        class="pointer-events-auto h-full w-full origin-center rounded-3xl bg-gradient-to-tr"
        ref="cardRefs"
        :class="card.background"
        :style="startPositions[index]"
      ></div>
    </div>
    <button
      @click="playTimeline"
      class="rounded-xl border-2 border-gray-800 py-40 px-64 text-center font-tabular text-4xl"
    >
      Enter
    </button>
  </div>
</template>
