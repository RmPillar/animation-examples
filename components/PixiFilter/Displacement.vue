<script setup lang="ts">
import Lenis from "@studio-freight/lenis";
import { DisplacementFilter } from "~~/utils/DisplacementFilter";

const props = defineProps<{
  image: {
    image: string;
    displacement: string;
  };
  scroller: Lenis | null;
}>();

const imageRef = ref(null);
const canvasRef = ref(null);

const displacementFilter = ref<DisplacementFilter | null>(null);

onMounted(() => {
  nextTick(() => {
    if (imageRef.value && props.scroller) {
      displacementFilter.value = new DisplacementFilter(
        imageRef.value,
        canvasRef.value,
        props.scroller
      );
    }
  });
});

onBeforeUnmount(() => {
  if (displacementFilter.value) {
    displacementFilter.value.destroyDisplacementHover();
  }
});
</script>

<template>
  <div class="relative aspect-[4/5] w-10/12 sm:w-8/12 lg:w-4/12">
    <div
      :data-image="image.image"
      :data-displacement-map="image.displacement"
      class="absolute inset-0 h-full w-full"
      ref="imageRef"
    />
    <canvas
      class="pointer-events-none absolute inset-0 h-full w-full"
      ref="canvasRef"
    />
  </div>
</template>
