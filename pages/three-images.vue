<script setup lang="ts">
import { Scene } from "~~/utils/Three/Scene";
const canvasRef = ref(null);
const imageRef = ref(null);

const sceneRef = ref<Scene | null>(null);

onMounted(() => {
  if (!canvasRef.value || !imageRef.value) return;

  sceneRef.value = new Scene(canvasRef.value, imageRef.value);

  console.log(sceneRef.value);
});
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-center bg-slate-500"
  >
    <div class="relative w-10/12 sm:w-8/12 lg:w-4/12">
      <img
        data-src="/images/spiderman-001.webp"
        src="/images/spiderman-001.webp"
        data-hover="/images/spiderman-002.webp"
        class="h-full w-full opacity-0"
        ref="imageRef"
      />
    </div>
    <canvas class="fixed inset-0 z-10 h-full w-full" ref="canvasRef" />
  </div>
</template>
