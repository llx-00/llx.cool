<script setup lang="ts">
  const { meta } = useRoute();
</script>

<template>
  <h1>{{ meta.frontmatter.display || meta.frontmatter.title }}</h1>
  <p class="font-italic text-base mb-10">
    {{ meta.frontmatter.subtitle }}
  </p>
</template>
