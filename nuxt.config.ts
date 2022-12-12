import { defineNuxtConfig } from "nuxt/config";
import glsl from "vite-plugin-glsl";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["@/styles.css"],
  postcss: {
    plugins: {
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [glsl()],
  },
});
