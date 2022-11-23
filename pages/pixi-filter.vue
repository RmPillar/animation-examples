<script setup lang="ts">
import StructureScroller from "~/components/Structure/Scroller.vue";
import Lenis from "@studio-freight/lenis";

const scrollerRef = ref<typeof StructureScroller | null>(null);
const scroller = ref<Lenis | null>(null);

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
  scroller.value = scrollerRef?.value?.scroller;
});
</script>

<template>
  <StructureScroller ref="scrollerRef">
    <div
      class="flex h-screen w-screen flex-col items-center justify-center bg-indigo-500"
      v-for="(image, index) in images"
      :key="index"
    >
      <PixiFilterLiquid :image="image" :scroller="scroller" />
    </div>
    <div
      class="flex h-screen w-screen flex-col items-center justify-center bg-indigo-500"
    >
      <PixiFilterGlitch :image="images[0]" />
    </div>
  </StructureScroller>
</template>

<style lang="postcss">
canvas {
  width: 100%;
}
</style>
