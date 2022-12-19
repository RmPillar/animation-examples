<script setup lang="ts">
const props = defineProps<{
  section: {
    image: {
      src: string;
      hover: string;
      shape: string;
      effect: string;
    };
  };
}>();
</script>

<template>
  <section class="section-imageContent">
    <div class="container">
      <div>
        <img
          v-if="section.image"
          :data-src="section.image.src"
          :data-hover="section.image.hover"
          :data-shape="section.image.shape"
          :data-effect="section.image.effect"
          :src="section.image.src"
          class="three-image h-full w-full object-cover opacity-0"
        />
      </div>
    </div>
  </section>
</template>
