<script setup lang="ts">
const props = defineProps<{
  speed: number;
}>();

const textRef = ref(null);

defineExpose({
  textRef,
});
</script>

<template>
  <div
    class="text-outline absolute top-6/12 left-6/12 w-max-content -translate-x-6/12 -translate-y-6/12"
  >
    <h1
      ref="textRef"
      class="font-geomanist text-9xl uppercase text-gray-50 opacity-0"
      style="transform: scale(4)"
      :data-speed="speed"
    >
      Zoom In Text
    </h1>
  </div>
</template>
