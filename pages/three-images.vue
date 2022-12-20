<script setup lang="ts">
import { Scene } from "~~/utils/ThreeImages/Scene";
import StructureScroller from "~~/components/Structure/Scroller.vue";
import { ImageContentDataType } from "~~/types/sections";

const canvasRef = ref(null);
const scrollerRef = ref<typeof StructureScroller | null>(null);

const sceneRef = ref<Scene | null>(null);

const imageContentData: ImageContentDataType[] = [
  {
    heading: "Lorem Ipsum Glitch Title Here",
    body: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: {
      src: "/images/spiderman-001.webp",
      hover: "/images/spiderman-003.webp",
      shape: "",
      effect: "glitch",
    },
    imageSide: "left",
  },
  {
    heading: "Lorem Ipsum Title Here",
    body: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: {
      src: "/images/spiderman-002.webp",
      hover: "/images/spiderman-003.webp",
      shape: "/images/spiderman-logo.jpg",
      effect: "shape",
    },
    imageSide: "right",
  },
  {
    heading: "Lorem Ipsum Title Here",
    body: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: {
      src: "/images/spiderman-001.webp",
      hover: "/images/spiderman-003.webp",
      shape: "",
      effect: "smoke",
    },
    imageSide: "left",
  },
];

const widescreenImageData = {
  image: {
    src: "/images/before.jpeg",
    hover: "/images/after.jpeg",
    shape: "",
    effect: "reveal",
  },
};

onMounted(() => {
  if (!canvasRef.value) return;
  sceneRef.value = new Scene(canvasRef.value);
});
</script>

<template>
  <StructureScrollSmoother>
    <div
      class="three-images-wrapper flex flex-col gap-y-164 bg-slate-500 py-100"
    >
      <ThreeImagesImageContent
        :section="section"
        v-for="(section, index) in imageContentData"
        :key="index"
      />
      <ThreeImagesWidescreenImage :section="widescreenImageData" />
    </div>
  </StructureScrollSmoother>
  <canvas
    class="pointer-events-none fixed inset-0 z-10 h-full w-full"
    ref="canvasRef"
  />
</template>
