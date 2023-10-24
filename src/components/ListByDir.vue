<script setup lang="ts">
  import { useRouter } from "vue-router"
  import type { Post } from "~/types"

  const { dir } = defineProps<{
    dir: string
  }>()

  const router = useRouter()
  const routes: Post[] = router
    .getRoutes()
    .filter(
      i =>
        i.path.startsWith(dir) &&
        (import.meta.env.DEV ? true : i.meta.frontmatter.date)
    )
    .map(i => ({
      path: i.path,
      ...i.meta.frontmatter,
      date: formatDate(i.meta.frontmatter.date),
    }))

  const posts = computed(() =>
    routes.sort((a, b) => +new Date(b.date!) - +new Date(a.date!))
  )

  devLog(posts.value)
</script>

<template>
  <PageTitle />
  <!-- <pre>{{ JSON.stringify(posts, null, 2) }}</pre> -->
  <template v-if="posts.length">
    <div
      v-for="post in posts"
      :key="post.path"
      class="my4"
    >
      <span class="text-sm text-right ws-nowrap op75">
        {{ formatDate(post.date!) }}
      </span>
      <h3 class="mt-0">
        <RouterLink :to="post.path">
          <i
            v-if="post.type === 'cook'"
            class="i-lucide-chef-hat mr-1"
          />
          <i
            v-else
            class="i-lucide-file-signature mr-1"
          />
          <span>{{ post.title }}</span>
        </RouterLink>
      </h3>
    </div>
  </template>
</template>
