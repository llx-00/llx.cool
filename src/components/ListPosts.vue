<script setup lang="ts">
import { useRouter } from 'vue-router'
import { formatDate } from '~/utils'
import type { Post } from '~/types'


const props = defineProps<{
  type?: string
  posts?: Post[]
  extra?: Post[]
}>()

const router = useRouter()
console.log('router', router.getRoutes())
const routes: Post[] = router.getRoutes()
  .filter(i => i.path.startsWith('/posts/'))
  .map(i => ({
    path: i.path,
    title: i.meta.frontmatter.title,
    date: i.meta.frontmatter.date,
    lang: i.meta.frontmatter.lang,
  }))

const posts = computed(() =>
  [...(props.posts || routes), ...props.extra || []]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
)

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isFuture = (a?: Date | string | number) => a && new Date(a) > new Date()
const isSameYear = (a?: Date | string | number, b?: Date | string | number) => a && b && getYear(a) === getYear(b)
function isSameGroup(a: Post, b?: Post) {
  return (isFuture(a.date) === isFuture(b?.date)) && isSameYear(a.date, b?.date)
}

function getGroupName(p: Post) {
  if (isFuture(p.date))
    return 'Upcoming'
  return getYear(p.date)
}
</script>

<template>
  <div v-if="!posts.length" py2>
    <h1>空空如也</h1>
    <p>There's nothing here</p>
  </div>
  <ul v-if="posts.length">
    <li v-for="route, idx in posts" :key="route.path" select-none>
      <RouterLink :to="route.path">{{ route.title }}</RouterLink>
      <span text-sm op50 ws-nowrap>
        {{ formatDate(route.date, true) }}
      </span>
    </li>
  </ul>
</template>
