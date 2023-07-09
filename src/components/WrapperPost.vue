<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div v-if="route.path !== '/'" my-10 font-mono text-sm>
    <span op50>{{ '>' }}&nbsp;</span>
    <RouterLink v-text="'cd ..'" underline op50 hover:op100 :to="route.path.split('/').slice(0, -1).join('/') || '/'" />
  </div>
</template>
