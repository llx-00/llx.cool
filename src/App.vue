<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <Header />
  <div max-w-1024px box-border mx-auto p-4 text-5>
    <RouterView />
    <Footer :key="route.path" />
  </div>
</template>
