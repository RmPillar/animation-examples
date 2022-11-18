<script setup lang="ts">
import { ImageDisplacement } from "~/utils/ImageDisplacement";

const props = defineProps<{
  image: string;
}>();

const imageRef = ref(null);
const canvasRef = ref(null);

const imageDisplacement = ref<ImageDisplacement | null>(null);
const scrollTrigger = ref<ScrollTrigger | null>(null);

onMounted(() => {
  imageDisplacement.value = new ImageDisplacement(
    imageRef.value,
    canvasRef.value
  );
});
</script>

<template>
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
</template>
