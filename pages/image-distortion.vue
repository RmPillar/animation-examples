<script setup lang="ts">
import { ImageDistortion } from "~~/utils/ImageDistortion";
import { RGBShiftEffect } from "~~/utils/EffectShell";

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
    <div
      class="relative aspect-[4/5] w-10/12 sm:w-8/12 lg:w-4/12"
      ref="canvasRef"
    >
      <!-- <canvas
        class="absolute inset-0 h-full w-full"
        data-image="/images/img1.jpeg"
        ref="canvasRef"
      /> -->
      <a
        aria-label="link-3"
        target="_blank"
        rel="noopener"
        draggable="false"
        class="link w-inline-block"
      >
        <h1 class="text-6xl">république</h1>
        <div class="text-2xl">people, paris</div>
        <img class="hidden" src="/images/img1.jpeg" alt="img3" />
      </a>
      <!-- <img
        class="absolute inset-0 h-full w-full"
        src="/images/img1.jpeg"
        ref="canvasRef"
      /> -->
    </div>
  </div>
</template>
