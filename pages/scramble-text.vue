<script setup lang="ts">
const scrambleOptions = ref({
  speed: 20,
  iterations: 2,
  scrollTrigger: {
    start: "top bottom-=200px",
    once: true,
    onEnter: () => console.log("hello"),
  },
});
</script>

<template>
  <div>
    <div
      class="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500"
    >
      <h1
        class="font-sans relative w-10/12 text-4xl font-bold text-gray-50 md:text-6xl lg:w-6/12"
        v-scramble="scrambleOptions"
      >
        This is some text that needs scrambling and I go onto multiple lines I
        really do
      </h1>
      <h2
        class="font-sans relative w-10/12 text-4xl font-bold text-gray-50 md:text-6xl lg:w-6/12"
      >
        Here Is some static text to prove this does not cause Layout Shift
      </h2>
    </div>
    <div
      class="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500"
    >
      <h1
        class="font-sans relative w-10/12 text-4xl font-bold text-gray-50 md:text-6xl lg:w-6/12"
        v-scramble
      >
        This is some text that needs scrambling and I go onto multiple lines I
        really do
      </h1>
    </div>
  </div>
</template>
