<script setup lang="ts">
const props = defineProps<{
  text: string;
  type: string;
}>();
</script>

<template>
  <h1
    class="heading font-sans relative mb-40 w-10/12 text-4xl font-bold text-gray-50 md:text-8xl lg:w-8/12"
    v-splitText="{ type, doubleWrap: true }"
    v-text="text"
  />
</template>
