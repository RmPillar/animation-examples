<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const wrapperRef = ref(null);
const mainTextRef = ref(null);
const outlineOneRef = ref(null);
const outlineTwoRef = ref(null);
const outlineThreeRef = ref(null);
const outlineFourRef = ref(null);

const timeline = ref(null);
const scrollTrigger = ref(null);

onMounted(() => {
  if (timeline.value) return;

  timeline.value = gsap
    .timeline({ paused: true })
    .to(outlineOneRef.value.textRef, { opacity: 0.4, duration: 0.3 }, "<+=0.1")
    .to(
      outlineOneRef.value.textRef,
      { scale: 1, duration: 0.75, ease: "power2.inOut" },
      "<+=0"
    )
    .to(outlineTwoRef.value.textRef, { opacity: 0.4, duration: 0.3 }, "<+=0.1")
    .to(
      outlineTwoRef.value.textRef,
      { scale: 1, duration: 0.75, ease: "power2.inOut" },
      "<+=0"
    )
    .to(
      outlineThreeRef.value.textRef,
      { opacity: 0.4, duration: 0.3 },
      "<+=0.1"
    )

    .to(
      outlineThreeRef.value.textRef,
      { scale: 1, duration: 0.75, ease: "power2.inOut" },
      "<+=0"
    )
    .to(outlineFourRef.value.textRef, { opacity: 0.4, duration: 0.3 }, "<+=0.1")

    .to(
      outlineFourRef.value.textRef,
      { scale: 1, duration: 0.75, ease: "power2.inOut" },
      "<+=0.0"
    )
    .to(mainTextRef.value.textRef, { opacity: 1 }, "-=0.5");

  setTimeout(() => {
    startTimeline();
  }, 1000);
});

const startTimeline = () => {
  if (timeline.value) {
    timeline.value.play(0);
  }
};
</script>

<template>
  <ZoomInTextScroller>
    <div
      class="relative h-screen w-screen bg-gradient-to-br from-gray-800 to-gray-900"
    >
      <div
        class="absolute top-6/12 left-6/12 h-full w-full -translate-x-6/12 -translate-y-6/12"
        ref="wrapperRef"
      >
        <ZoomInTextMainText ref="mainTextRef" />
        <ZoomInTextOutlineText ref="outlineOneRef" :speed="0.95" />
        <ZoomInTextOutlineText ref="outlineTwoRef" :speed="0.9" />
        <ZoomInTextOutlineText ref="outlineThreeRef" :speed="0.85" />
        <ZoomInTextOutlineText ref="outlineFourRef" :speed="0.8" />
      </div>
    </div>
    <div
      class="h-screen w-screen bg-gradient-to-tr from-gray-800 to-gray-900"
    ></div>
    <div
      class="h-screen w-screen bg-gradient-to-br from-gray-800 to-gray-900"
    ></div>
    <div
      class="h-screen w-screen bg-gradient-to-tr from-gray-800 to-gray-900"
    ></div>
  </ZoomInTextScroller>
</template>

<style lang="postcss">
.text-outline {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: currentColor;
  -webkit-text-fill-color: transparent;
}
</style>
