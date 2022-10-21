<script setup lang="ts">
import gsap from "gsap";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const scroller = ref(null);

onMounted(() => {
  if (scroller.value) return;

  scroller.value = ScrollSmoother.create({
    smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true, // looks for data-speed and data-lag attributes on elements
    ease: "power2.out",
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  });
});
</script>

<template>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <slot />
    </div>
  </div>
</template>
