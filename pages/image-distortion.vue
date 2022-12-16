<script setup lang="ts">
import { ImageDistortion } from "~~/utils/ImageDistortion";

const canvasRef = ref(null);
const imageRef = ref(null);
const imageTwoRef = ref(null);

const imageDistortion = ref<ImageDistortion | null>(null);

onMounted(() => {
  if (!canvasRef.value || !imageRef.value || !imageTwoRef.value) return;

  imageDistortion.value = new ImageDistortion(
    canvasRef.value,
    imageRef.value,
    imageTwoRef.value
  );
});
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-center bg-slate-500"
  >
    <div class="relative aspect-[4/5] w-10/12 sm:w-8/12 lg:w-4/12">
      <img
        src="/images/kratos.jpeg"
        ref="imageRef"
        class="pointer-events-none opacity-0"
      />
      <img
        src="/images/atreus.jpeg"
        ref="imageTwoRef"
        class="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      />
      <canvas class="absolute inset-0 h-full w-full" ref="canvasRef" />
    </div>
  </div>
</template>
