<script setup lang="ts">
import { Project } from '~/types'


const { projects } = defineProps<{ projects: Record<string, Project[]> }>()
</script>

<template>
  <PageTitle />
  <ul>
    <li v-for="key in Object.keys(projects)" :key="key">
      <h2 my-5 font-bold>{{ key }}</h2>
      <div p2 flex flex-wrap gap-4>
        <a v-for="item in projects[key]" target="_blank" :key="item.name" :title="item.name" :href="item.link" flex
          justify-between items-center my-2 class="mx-0! min-w-45%">
          <img v-if="item.logo" :src="item.logo" alt="project logo" px-2 w-6 h-6>
          <div text-left flex-1 ml-2>
            <div>
              <img v-show="key === 'Components'" src="/npm.svg" alt="npm logo" h-3 mx-1>
              {{ item.name }}
            </div>
            <div text-sm opacity-50 font-normal>{{ item.desc }}</div>
          </div>
        </a>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;

  &::before {
    display: none;
  }
}
</style>
