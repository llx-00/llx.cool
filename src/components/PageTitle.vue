<script setup lang="ts">
  import { Post } from "~/types"

  const route = useRoute()

  const frontmatter = computed(() => {
    return route.meta.frontmatter as Post | undefined
  })
</script>

<template>
  <template v-if="route.path !== '/'">
    <h1 v-if="frontmatter?.display || frontmatter?.title">
      {{ frontmatter?.display || frontmatter?.title }}
    </h1>
    <div
      v-if="frontmatter?.date"
      class="text-base ws-nowrap font-normal"
    >
      {{ formatDate(frontmatter.date) }}
    </div>
    <p
      v-if="frontmatter?.subtitle"
      class="font-italic text-base"
    >
      {{ frontmatter?.subtitle }}
    </p>
  </template>
</template>
