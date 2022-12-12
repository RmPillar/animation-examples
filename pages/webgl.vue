<script setup lang="ts">
import StructureScroller from "~/components/Structure/Scroller.vue";
import { WebgLImage } from "~~/utils/WebGLImageNew";
import vertex from "~/shaders/imageShader/vertex.glsl";
import fragment from "~/shaders/imageShader/fragment.glsl";

const canvasRef = ref(null);

const webGLProgram = ref<WebgLImage | null>(null);

onMounted(() => {
  if (canvasRef.value) {
    webGLProgram.value = new WebgLImage(
      canvasRef.value,
      "http://localhost:3000/images/kratos.webp",
      vertex,
      fragment
    );
  }
});
</script>

<template>
  <StructureScroller ref="scrollerRef">
    <div
      class="flex h-screen w-screen flex-col items-center justify-center bg-teal-500"
    >
      <div class="relative aspect-[4/5] w-10/12 sm:w-8/12 lg:w-4/12">
        <div
          data-image="/images/kratos.webp"
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
