<script setup lang="ts">
  import { Game, Project } from "~/types"

  const { items } = defineProps<{ items?: (Project | Game)[] }>()
</script>

<template>
  <PageTitle />
  <div class="p2 flex flex-wrap gap8">
    <div
      v-for="item in items"
      :key="item.name"
      class="flex flex-col flex-1 items-start min-w-350px"
    >
      <h5 class="my5 font-bold">
        <RouterLink :to="item.link">
          {{ item.name }}
        </RouterLink>
      </h5>
      <div class="text-sm op50 font-normal">
        {{ item.desc }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  a {
    margin: 0;

    &::before {
      display: none;
    }
  }
</style>
