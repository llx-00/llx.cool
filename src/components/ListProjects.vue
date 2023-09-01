<script setup lang="ts">
  import { Project } from "~/types"

  const { projects } = defineProps<{ projects?: Project[] }>()
</script>

<template>
  <PageTitle />
  <div class="p2 flex flex-wrap gap8">
    <div
      v-for="project in projects"
      :key="project.name"
      class="flex flex-col flex-1 items-start min-w-350px"
    >
      <h5 class="my5 font-bold">
        <RouterLink :to="`project/${project.link}`">
          {{ project.name }}
        </RouterLink>
      </h5>
      <div class="text-sm op50 font-normal">
        {{ project.desc }}
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
