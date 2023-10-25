<script setup lang="ts">
  import { Post } from "~/types"

  const route = useRoute()

  const frontmatter = computed(() => {
    return route.meta.frontmatter as Post | undefined
  })
</script>

<template>
  <template v-if="route.path !== '/'">
    <h1 class="mb-0">
      {{ frontmatter?.display || frontmatter?.title }}
    </h1>
    <div
      v-if="frontmatter?.date"
      class="text-base ws-nowrap font-normal"
    >
      {{ formatDate(frontmatter.date) }}
    </div>
    <p class="font-italic text-base mb-10">
      {{ frontmatter?.subtitle }}
    </p>
  </template>
</template>
