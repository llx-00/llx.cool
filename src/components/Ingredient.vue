<script setup lang="ts">
  const { items } = defineProps<{ items?: string[] }>()
</script>

<template>
  <ul class="xy-center flex-wrap">
    <li
      v-for="i in items"
      class="tag m-1 px-2 b-rd bg-yellow-300 bg-op-50 text-nowrap hover:bg-op-100"
    >
      {{ i }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .tag {
    cursor: pointer;
    box-shadow: 2px 2px 2px rgba(128, 128, 128, 0.5);

    transition: all 0.2s ease-in-out;

    &:hover {
      box-shadow: 2px 4px 2px rgba(128, 128, 128, 0.5);
    }
  }
</style>
