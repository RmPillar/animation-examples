<script setup lang="ts">
import { ImageDisplacement } from "~/utils/ImageDisplacement";
import StructureScroller from "~/components/Structure/Scroller.vue";

const imageRef = ref<HTMLDivElement[]>([]);
const canvasRef = ref<HTMLCanvasElement[]>([]);
const scrollerRef = ref<typeof StructureScroller | null>(null);
const imageDisplacements = ref<ImageDisplacement[]>([]);

const images = [
  {
    image: "/images/kratos.webp",
    displacement: "/displacement/displacement-liquid.png",
  },
  {
    image: "/images/freya.webp",
    displacement: "/displacement/map-01.jpeg",
  },
  {
    image: "/images/atreus.webp",
    displacement: "/displacement/map-02.jpeg",
  },
  {
    image: "/images/mimir.webp",
    displacement: "/displacement/map-03.jpeg",
  },
  {
    image: "/images/thor.webp",
    displacement: "/displacement/map-04.jpeg",
  },
  {
    image: "/images/tyr.webp",
    displacement: "/displacement/map-05.jpeg",
  },
];

onMounted(() => {
  nextTick(() => {
    // @ts-ignore
    imageDisplacements.value = images.map((image, index) => {
      if (imageRef.value && scrollerRef.value) {
        return new ImageDisplacement(
          imageRef.value[index],
          canvasRef.value[index],
          scrollerRef.value.scroller
        );
      }
    });
  });
});

onBeforeUnmount(() => {
  imageDisplacements.value.forEach((displacement) => {
    if (displacement) {
      displacement.destroyDisplacementHover();
    }
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
    </div>
  </StructureScroller>
</template>

<style lang="postcss">
canvas {
  width: 100%;
}
</style>
