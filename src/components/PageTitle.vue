<script setup lang="ts">
  const { meta } = useRoute()
</script>

<template>
  <h1 class="mb-0">
    {{ meta.frontmatter.display || meta.frontmatter.title }}
  </h1>
  <div
    v-if="meta.frontmatter.date"
    class="text-base ws-nowrap font-normal"
  >
    {{ formatDate(meta.frontmatter.date) }}
  </div>
  <p class="font-italic text-base mb-10">
    {{ meta.frontmatter.subtitle }}
  </p>
</template>
