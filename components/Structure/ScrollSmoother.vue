<script setup lang="ts">
import gsap from "gsap";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const scroller = ref<ScrollSmoother | null>(null);
const progress = ref(0);

onMounted(() => {
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
  if (scroller.value) return;

  scroller.value = ScrollSmoother.create({
    smooth: 0, // how long (in seconds) it takes to "catch up" to the native scroll position
    ease: "power2.out",
    normalizeScroll: true,
  });
});

defineExpose({
  scroller,
  progress,
});
</script>

<template>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <slot />
    </div>
  </div>
</template>
