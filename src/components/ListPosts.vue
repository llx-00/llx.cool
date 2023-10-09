<script setup lang="ts">
  import { useRouter } from "vue-router"
  import type { Post } from "~/types"

  const router = useRouter()
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
    }))

  const posts = computed(() =>
    routes.sort((a, b) => +new Date(b.date) - +new Date(a.date))
  )
</script>

<template>
  <PageTitle />
  <template v-if="posts.length">
    <div
      v-for="route in posts"
      :key="route.path"
      class="my4"
    >
      <span class="text-sm text-right ws-nowrap op75">
        {{ formatDate(route.date) }}
      </span>
      <h3 class="mt-0">
        <RouterLink :to="route.path">{{ route.title }}</RouterLink>
      </h3>
    </div>
  </template>
</template>
