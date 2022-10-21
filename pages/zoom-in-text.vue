<script setup lang="ts">
import gsap from "gsap";

const textRef = ref(null);
const outlineOneRef = ref(null);
const outlineTwoRef = ref(null);
const outlineThreeRef = ref(null);
const outlineFourRef = ref(null);

const timeline = ref(null);

onMounted(() => {
  if (timeline.value) return;

  timeline.value = gsap
    .timeline({ paused: true })
    .to(outlineOneRef.value, { opacity: 0.4, duration: 0.3 }, "<+=0.1")
    .to(
      outlineOneRef.value,
      { scale: 1, duration: 0.75, ease: "power2.inOut" },
      "<+=0"
    )
    .to(outlineTwoRef.value, { opacity: 0.4, duration: 0.3 }, "<+=0.1")
    .to(
      outlineTwoRef.value,
      { scale: 1, duration: 0.75, ease: "power2.inOut" },
      "<+=0"
    )
    .to(outlineThreeRef.value, { opacity: 0.4, duration: 0.3 }, "<+=0.1")

    .to(
      outlineThreeRef.value,
      { scale: 1, duration: 0.75, ease: "power2.inOut" },
      "<+=0"
    )
    .to(outlineFourRef.value, { opacity: 0.4, duration: 0.3 }, "<+=0.1")

    .to(
      outlineFourRef.value,
      { scale: 1, duration: 0.75, ease: "power2.inOut" },
      "<+=0.0"
    )
    .to(textRef.value, { opacity: 1 }, "-=0.5");
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
      @click="startTimeline"
    >
      <div
        class="absolute top-6/12 left-6/12 z-10 w-max-content -translate-x-6/12 -translate-y-6/12"
      >
        <h1
          class="font-geomanist text-9xl uppercase text-teal-500 opacity-0"
          ref="textRef"
        >
          Zoom In Text
        </h1>
      </div>
      <div
        class="text-outline absolute top-6/12 left-6/12 w-max-content -translate-x-6/12 -translate-y-6/12"
      >
        <h1
          ref="outlineOneRef"
          class="font-geomanist text-9xl uppercase text-gray-50 opacity-0"
          style="transform: scale(4)"
          data-speed="0.95"
        >
          Zoom In Text
        </h1>
      </div>
      <div
        class="text-outline absolute top-6/12 left-6/12 w-max-content -translate-x-6/12 -translate-y-6/12"
      >
        <h1
          ref="outlineTwoRef"
          class="font-geomanist text-9xl uppercase text-gray-50 opacity-0"
          style="transform: scale(4)"
          data-speed="0.9"
        >
          Zoom In Text
        </h1>
      </div>
      <div
        class="text-outline absolute top-6/12 left-6/12 w-max-content -translate-x-6/12 -translate-y-6/12"
      >
        <h1
          ref="outlineThreeRef"
          class="font-geomanist text-9xl uppercase text-gray-50 opacity-0"
          style="transform: scale(4)"
          data-speed="0.85"
        >
          Zoom In Text
        </h1>
      </div>
      <div
        class="text-outline absolute top-6/12 left-6/12 w-max-content -translate-x-6/12 -translate-y-6/12"
      >
        <h1
          ref="outlineFourRef"
          class="font-geomanist text-9xl uppercase text-gray-50 opacity-0"
          style="transform: scale(4)"
          data-speed="0.8"
        >
          Zoom In Text
        </h1>
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
