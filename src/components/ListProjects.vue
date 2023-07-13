<script setup lang="ts">
import { Project } from '~/types'


const { projects } = defineProps<{ projects: Record<string, Project[]> }>()
</script>

<template>
  <PageTitle />
  <ul>
    <li v-for="key in Object.keys(projects)" :key="key">
      <h2 my5 font-bold>{{ key }}</h2>
      <div p2 flex flex-wrap gap4>
        <a v-for="item in projects[key]" target="_blank" :key="item.name" :title="item.name" :href="item.link" flex
          justify-between items-center my2 class="mx0! min-w-45%">
          <img v-if="item.logo" :src="item.logo" alt="project logo" px2 w6 h6>
          <div text-left flex-1 ml2>
            <div>
              <img v-show="key === 'Components'" src="/npm.svg" alt="npm logo" h2 mx1>
              {{ item.name }}
            </div>
            <div text-sm op50 font-normal>{{ item.desc }}</div>
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
