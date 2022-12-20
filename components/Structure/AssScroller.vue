<script setup lang="ts">
// import LocomotiveScroll from "locomotive-scroll";

const scroller = ref(null);

const emit = defineEmits(["scrollInit"]);

onMounted(async () => {
  let ASScroll;

  if (process.client) {
    ASScroll = await import("@ashthornton/asscroll");
  }

  scroller.value = new ASScroll.default();
  scroller.value.enable();

  emit("scrollInit", scroller.value);
});

defineExpose({ scroller });
</script>

<template>
  <div asscroll-container>
    <slot></slot>
  </div>
</template>
