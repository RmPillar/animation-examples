<script setup lang="ts">
import { Scene } from "~~/utils/ThreeImages/Scene";
const canvasRef = ref(null);
const sectionOneImageRef = ref([]);
const sectionTwoImageRef = ref(null);

const sceneRef = ref<Scene | null>(null);

const sectionOne = [
  {
    src: "/images/spiderman-001.webp",
    hover: "/images/spiderman-003.webp",
    shape: "",
  },
  {
    src: "/images/spiderman-002.webp",
    hover: "/images/spiderman-003.webp",
    shape: "/images/spiderman-logo.jpg",
  },
  // {
  //   src: "/images/spiderman-004.webp",
  //   hover: "/images/spiderman-005.webp",
  //   shape: "",
  // },
];

onMounted(() => {
  if (
    !canvasRef.value ||
    !sectionOneImageRef.value ||
    !sectionTwoImageRef.value
  )
    return;

  sceneRef.value = new Scene(canvasRef.value, [
    ...sectionOneImageRef.value,
    sectionTwoImageRef.value,
  ]);
});
</script>

<template>
  <div class="bg-slate-500 py-100">
    <div class="w-full max-w-[1660px] px-100">
      <div class="w-full">
        <img
          data-src="/images/before.jpeg"
          data-hover="/images/after.jpeg"
          src="/images/before.jpeg"
          class="h-full w-full object-cover opacity-0"
          ref="sectionTwoImageRef"
        />
      </div>
      <div class="flex items-center justify-center space-x-[100px]">
        <div
          class="relative aspect-[3/4] h-[666px] w-[500px]"
          v-for="(image, index) in sectionOne"
          :key="index"
        >
          <img
            :data-src="image.src"
            :data-hover="image.hover"
            :data-shape="image.shape"
            :src="image.src"
            class="h-full w-full object-cover opacity-0"
            ref="sectionOneImageRef"
          />
        </div>
      </div>
    </div>
    <canvas
      class="pointer-events-none fixed inset-0 z-10 h-full w-full"
      ref="canvasRef"
    />
  </div>
</template>
