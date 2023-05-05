<script setup>
import gsap from "gsap";
// Template Refs
const svgFilterRef = ref(null);

onMounted(() => {
  console.log(svgFilterRef.value.displacementMapRef);

  gsap.to(svgFilterRef.value.displacementMapRef, {
    duration: 2,
    attr: {
      scale: 0,
    },
    ease: "power2.inOut",
  });
});
</script>

<template>
  <div
    class="relative flex h-screen w-screen flex-col items-center justify-center bg-teal-400"
  >
    <svg-filter ref="svgFilterRef" />
    <div
      class="container relative z-10 flex flex-col items-center justify-center"
    >
      <h1
        class="mb-20 w-8/12 text-center text-8xl font-semibold text-gray-50"
        style="filter: url('#svgFilter__001')"
      >
        SVG Filter Effect
      </h1>
      <h2
        class="w-6/12 text-center text-4xl font-semibold text-gray-50"
        style="filter: url('#svgFilter__001')"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </h2>
    </div>

    <div class="absolute left-0 top-0 h-full w-6/12 bg-indigo-400"></div>
  </div>
</template>
