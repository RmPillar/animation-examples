import { SplitText } from "../utils/splitting";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("splitText", {
    mounted(el, { value }) {
      const splitText = new SplitText(el, value);
    },
  });
});
