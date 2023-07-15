<script setup lang="ts">
const route = useRoute()

const router = useRouter()
</script>

<template>
  <div v-if="route.path !== '/'" my-10 font-mono text-sm>
    <span op50>{{ '>' }}&nbsp;</span>
    <RouterLink v-text="'cd ..'" underline op50 hover:op100 :to="''" @click.prevent="router.back()" />
  </div>
</template>
