<script setup>
// Template Refs
const displacementMapRef = ref(null);

// Expose
defineExpose({
  displacementMapRef,
});
</script>

<template>
  <svg
    viewBox="0 0 100 100"
    color-interpolation-filters="sRGB"
    class="hidden w-full"
  >
    <defs>
      <filter id="svgFilter__001" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.025"
          numOctaves="1"
          result="turbulence"
        ></feTurbulence>
        <feDisplacementMap
          in2="turbulence"
          in="SourceGraphic"
          ref="displacementMapRef"
          scale="100"
          xChannelSelector="R"
          yChannelSelector="G"
        ></feDisplacementMap>
        <feComposite
          operator="in"
          in="SourceGraphic"
          result="intermediate-1"
        ></feComposite>
      </filter>
    </defs>
  </svg>
</template>
