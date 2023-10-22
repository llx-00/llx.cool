<script setup lang="ts">
  const { items } = defineProps<{ items?: { name: string }[] }>()
</script>

<template>
  <ul class="xy-center flex-wrap">
    <li
      v-for="i in items"
      class="m-1 px-2 b-rd-2 bg-yellow-300 bg-opacity-20 text-nowrap"
    >
      {{ i }}
    </li>
  </ul>
</template>
