<script lang="ts" setup>
import { ImageContentDataType } from "~~/types/sections";

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
</script>

<template>
  <StructureScrollSmoother>
    <div
      class="three-images-wrapper flex flex-col gap-y-164 bg-slate-500 py-100"
    >
      <PixiShaderImageContent
        :section="section"
        v-for="(section, index) in imageContentData"
        :key="index"
      />
    </div>
  </StructureScrollSmoother>
</template>
