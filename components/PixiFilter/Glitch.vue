<script setup lang="ts">
import Lenis from "@studio-freight/lenis";
import { GlitchFilter } from "~/utils/GlitchFilter";

const props = defineProps<{
  image: {
    image: string;
    displacement: string;
  };
}>();

const imageRef = ref(null);
const canvasRef = ref(null);

const glitchFilter = ref<GlitchFilter | null>(null);

onMounted(() => {
  glitchFilter.value = new GlitchFilter(imageRef.value, canvasRef.value);
});
</script>

<template>
  <div class="relative aspect-[4/5] w-10/12 sm:w-8/12 lg:w-4/12">
    <div
      :data-image="image.image"
      class="absolute inset-0 h-full w-full"
      ref="imageRef"
    />
    <canvas
      class="pointer-events-none absolute inset-0 h-full w-full"
      ref="canvasRef"
    />
  </div>
</template>
