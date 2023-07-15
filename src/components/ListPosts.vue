<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { formatDate } from "~/utils";
  import type { Post } from "~/types";

  const router = useRouter();
  const routes: Post[] = router
    .getRoutes()
    .filter(i => i.path.startsWith("/posts/"))
    .map(i => ({
      path: i.path,
      title: i.meta.frontmatter.title,
      date: i.meta.frontmatter.date,
    }));

  const posts = computed(() =>
    routes.sort((a, b) => +new Date(b.date) - +new Date(a.date))
  );
</script>

<template>
  <div
    v-if="!posts.length"
    py2
  >
    <h1>空空如也</h1>
    <p>There's nothing here</p>
  </div>
  <div v-else>
    <PageTitle />
  </div>
  <ul v-if="posts.length">
    <li
      v-for="route in posts"
      :key="route.path"
      select-none
    >
      <RouterLink :to="route.path">
        <span>{{ route.title }}</span>
        <span class="mx2 text-sm op50 ws-nowrap">
          {{ formatDate(route.date, true) }}
        </span>
      </RouterLink>
    </li>
  </ul>
</template>
