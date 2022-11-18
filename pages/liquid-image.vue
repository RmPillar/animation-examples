<script setup>
import { ImageDisplacement } from "~/utils/ImageDisplacement";

const imageRef = ref(null);
const canvasRef = ref(null);
const scrollerRef = ref(null);

const images = [
  "/images/kratos.webp",
  "/images/freya.webp",
  "/images/atreus.webp",
  "/images/mimir.webp",
  "/images/thor.webp",
];

const shiftDisplacementFilter = (e) => {
  // const x = Math.min(e.clientX / 20, 50);
  // const y = Math.min(e.clientY / 20, 50);
  // gsap.to(filter.value.scale, { x, y });
};

const resetDisplacementFilter = () => {
  // gsap.to(filter.value.scale, { x: 0, y: 0 });
};

onMounted(() => {
  const imageDisplacements = images.map((image, index) => {
    return new ImageDisplacement(imageRef.value[index], canvasRef.value[index]);
  });
});
</script>

<template>
  <StructureScroller ref="scrollerRef">
    <div
      class="flex h-screen w-screen flex-col items-center justify-center bg-indigo-500"
      v-for="(image, index) in images"
      :key="index"
    >
      <div class="relative aspect-[4/5] w-4/12">
        <div
          :data-image="image"
          data-displacement-map="/displacement/displacement-liquid.png"
          class="absolute inset-0 h-full w-full"
          ref="imageRef"
        />
        <canvas
          class="pointer-events-none absolute inset-0 h-full w-full"
          ref="canvasRef"
        />
      </div>
    </div>
  </StructureScroller>
</template>

<style lang="postcss">
canvas {
  width: 100%;
}
</style>
