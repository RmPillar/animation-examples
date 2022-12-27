<script setup lang="ts">
import { PixiShader } from "~~/utils/PixiShader";

const props = defineProps<{
  section: {
    heading: string;
    body: string;
    image: {
      src: string;
      hover: string;
      shape: string;
      effect: string;
    };
    imageSide: "left" | "right";
  };
}>();

const imageRef = ref(null);
const canvasRef = ref(null);

const pixiApp = ref<PixiShader | null>(null);

onMounted(() => {
  if (!imageRef.value || !canvasRef.value) return;

  pixiApp.value = new PixiShader(imageRef.value, canvasRef.value);
});
</script>

<template>
  <section class="section-imageContent">
    <div class="container">
      <div
        class="flex items-center"
        :class="{ 'flex-row-reverse': section?.imageSide === 'left' }"
      >
        <div
          class="w-5/12"
          :class="section?.imageSide === 'left' ? 'ml-2/12' : 'mr-2/12'"
        >
          <h2
            v-if="section.heading"
            class="mb-20 text-4xl text-gray-50"
            v-text="section.heading"
          ></h2>
          <p
            class="text-lg text-gray-50"
            v-if="section.body"
            v-text="section.body"
          ></p>
        </div>

        <div class="relative w-5/12">
          <div class="relative aspect-[3/4]">
            <img
              v-if="section.image"
              :data-src="section.image.src"
              :data-hover="section.image.hover"
              :data-shape="section.image.shape"
              :data-effect="section.image.effect"
              :src="section.image.src"
              class="pointer-events-none h-full w-full object-cover opacity-0"
              ref="imageRef"
            />
            <canvas
              class="absolute inset-0 z-10 h-full w-full"
              ref="canvasRef"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
