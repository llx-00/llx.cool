<script setup lang="ts">
  const { meta } = useRoute();
</script>

<template>
  <h1>
    <span class="mr-2">{{
      meta.frontmatter.display || meta.frontmatter.title
    }}</span>
    <span
      v-if="meta.frontmatter.date"
      class="text-base ws-nowrap font-normal"
    >
      {{ formatDate(meta.frontmatter.date) }}
    </span>
  </h1>
  <p class="font-italic text-base mb-10">
    {{ meta.frontmatter.subtitle }}
  </p>
</template>
