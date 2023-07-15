<script setup lang="ts">
  import { Project } from "~/types";

  const { projects } = defineProps<{ projects: Record<string, Project[]> }>();
</script>

<template>
  <PageTitle />
  <ul>
    <li
      v-for="key in Object.keys(projects)"
      :key="key"
    >
      <h3 class="my5 font-bold">
        {{ key }}
      </h3>
      <div class="p2 flex flex-wrap gap8">
        <div
          v-for="item in projects[key]"
          :key="item.name"
          class="flex-1 min-w-350px"
        >
          <h5>
            <a
              target="_blank"
              :href="item.link"
            >
              {{ item.name }}
            </a>
          </h5>
          <div class="text-left flex-1">
            <div class="text-sm op50 font-normal">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  a {
    margin: 0;

    &::before {
      display: none;
    }
  }
</style>
