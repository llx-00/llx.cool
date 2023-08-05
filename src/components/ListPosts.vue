<script setup lang="ts">
  import { useRouter } from "vue-router";
  import type { Post } from "~/types";

  const router = useRouter();
  const routes: Post[] = router
    .getRoutes()
    .filter(
      i =>
        i.path.startsWith("/post/") &&
        (import.meta.env.DEV ? true : i.meta.frontmatter.date)
    )
    .map(i => ({
      path: i.path,
      title: i.meta.frontmatter.title,
      date: i.meta.frontmatter.date,
    }));

  const posts = computed(() =>
    routes.sort((a, b) => +new Date(b.date) - +new Date(a.date))
  );

  console.log();
</script>

<template>
  <div
    v-if="!posts.length"
    class="py2"
  >
    <h1>空空如也</h1>
    <p class="font-italic text-base mb-10">There's nothing here</p>
  </div>
  <PageTitle v-else />
  <template v-if="posts.length">
    <div
      v-for="route in posts"
      :key="route.path"
      class="my4"
    >
      <h3 class="inline-block">
        <RouterLink :to="route.path">{{ route.title }}</RouterLink>
      </h3>
      <span class="mx2 text-sm ws-nowrap select-none">
        {{ formatDate(route.date, false) }}
      </span>
    </div>
  </template>
</template>
