<script setup lang="ts">
import { ImageDistortion } from "~~/utils/ImageDistortion";

const canvasRef = ref(null);
const containerRef = ref(null);
const imageRef = ref(null);

const imageDistortion = ref<ImageDistortion | null>(null);

onMounted(() => {
  if (!canvasRef.value || !containerRef.value) return;

  // imageDistortion.value = new ImageDistortion(
  //   containerRef.value,
  //   canvasRef.value
  // );
});
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-center bg-slate-500"
    ref="containerRef"
  >
    <div class="relative aspect-[4/5] w-10/12 sm:w-8/12 lg:w-4/12">
      <canvas
        class="absolute inset-0 h-full w-full"
        data-image="/images/img1.jpeg"
        ref="canvasRef"
      />
    </div>
  </div>
</template>
