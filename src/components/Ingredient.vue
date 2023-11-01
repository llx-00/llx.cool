<script setup lang="ts">
  const { items } = defineProps<{ items?: string[] }>()
</script>

<template>
  <ul class="xy-center flex-wrap gap2">
    <li
      v-for="i in items"
      class="tag cursor-pointer p-2 b-rd outline-none bg-yellow-300 bg-op-50 hover:bg-op-100"
    >
      {{ i }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .tag {
    box-shadow: 2px 2px 2px rgba(128, 128, 128, 0.5);

    transition: all 0.2s ease-in-out;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 2px 4px 2px rgba(128, 128, 128, 0.5);
    }
  }
</style>
