<script setup lang="ts">
const textRef = ref(null);

defineExpose({
  textRef,
});
</script>

<template>
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
</template>
