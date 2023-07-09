<script setup lang="ts">
const route = useRoute()
</script>
<template>
  <Header />
  <div max-w-800px box-border mx-auto p-4 sm:text-xl lt-sm:text-base>
    <RouterView />
    <WrapperPost />
    <Footer :key="route.path" />
  </div>
</template>
