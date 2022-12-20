<script setup lang="ts">
// import LocomotiveScroll from "locomotive-scroll";

const scroller = ref(null);

const emit = defineEmits(["scrollInit"]);

onMounted(async () => {
  let locomotiveScroll;

  if (process.client) {
    locomotiveScroll = await import("locomotive-scroll");
  }

  scroller.value = new locomotiveScroll.default({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  });

  emit("scrollInit", scroller.value);
});

defineExpose({ scroller });
</script>

<template>
  <div data-scroll-container>
    <slot></slot>
  </div>
</template>
