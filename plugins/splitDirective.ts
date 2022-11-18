import { SplitText } from "../utils/Splitting";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("splitText", {
    mounted(el, { value }) {
      const splitText = new SplitText(el, value);
    },
  });
});
