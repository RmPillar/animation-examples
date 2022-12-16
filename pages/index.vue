<script setup lang="ts">
const router = useRouter();

const getRouteName = (route) => {
  if (route.name === "index") return "Home";
  console.log(
    route.name
      .split("-")
      .map((name) => {
        return name.charAt(0).toUpperCase() + name.substring(1);
      })
      .join(" ")
  );

  return route.name
    .split("-")
    .map((name) => {
      return name.charAt(0).toUpperCase() + name.substring(1);
    })
    .join(" ");
};
</script>

<template>
  <main
    class="relative h-screen w-screen bg-gradient-to-br from-orange-400 to-yellow-600"
  >
    <div class="container">
      <div class="grid grid-cols-4 gap-20 py-108">
        <a
          :href="route.path"
          v-for="(route, index) in router.options.routes"
          :key="index"
          class="rounded-xl border-2 border-gray-50 py-32 px-20 text-center text-4xl text-gray-50"
          >{{ getRouteName(route) }}</a
        >
      </div>
    </div>
  </main>
</template>
