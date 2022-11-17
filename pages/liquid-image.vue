<script setup>
import { gsap } from "gsap";
import { ImageDisplacement } from "~/utils/ImageDisplacement";
import throttle from "lodash.throttle";

const imageRef = ref(null);
const canvasRef = ref(null);
const scrollerRef = ref(null);
const observer = ref(null);

const pixiApp = ref(null);

const images = [
  "/images/kratos.webp",
  "/images/freya.webp",
  "/images/atreus.webp",
  "/images/mimir.webp",
  "/images/thor.webp",
];

const shiftDisplacementFilter = (e) => {
  // const x = Math.min(e.clientX / 20, 50);
  // const y = Math.min(e.clientY / 20, 50);
  // gsap.to(filter.value.scale, { x, y });
};

const resetDisplacementFilter = () => {
  // gsap.to(filter.value.scale, { x: 0, y: 0 });
};

const observerCallback = (entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    // Check if observed element is 'intersecting' the viewport
    if (isIntersecting) {
      target.classList.add("onscreen");
    } else {
      target.classList.remove("onscreen");
    }
  });
};

onMounted(() => {
  const imageDisplacements = images.map((image, index) => {
    return new ImageDisplacement(imageRef.value[index], canvasRef.value[index]);
  });

  observer.value = new IntersectionObserver(observerCallback, {
    // Observed element needs to 75% into the viewport before the callback is fired
    threshold: 0.5,
  });

  imageRef.value.forEach((image) => {
    observer.value.observe(image);
  });

  scrollerRef.value.scroller.on(
    "scroll",
    throttle(({ velocity }) => {
      imageDisplacements.forEach((displacement, index) => {
        if (imageRef.value[index].classList.contains("onscreen")) {
          gsap.to(displacement.filter.scale, {
            y: Math.min(velocity * 3, 100),
          });
        }
      });
    }),
    100
  );
});
</script>

<template>
  <StructureScroller ref="scrollerRef">
    <div
      class="flex h-screen w-screen flex-col items-center justify-center bg-indigo-500"
      v-for="(image, index) in images"
      :key="index"
    >
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
    </div>
  </StructureScroller>
</template>

<style lang="postcss">
canvas {
  width: 100%;
}
</style>
