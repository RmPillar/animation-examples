<script setup lang="ts">
import Lenis from "@studio-freight/lenis";

const scroller = ref<Lenis | null>(null);

const raf = (time: number) => {
  if (scroller.value) {
    scroller.value.raf(time);
    requestAnimationFrame(raf);
  }
};

onMounted(() => {
  scroller.value = new Lenis({
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    smooth: true,
  });

  requestAnimationFrame(raf);
});

defineExpose({ scroller });
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
