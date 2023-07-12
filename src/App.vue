<script setup lang="ts">
useHead({
  meta: [
    { name: 'description', content: 'Longxiang Li\'s Website' },
    { property: 'og:title', content: 'Longxiang Li' },
    { property: 'og:image', content: 'https://llx.cool/og/index.png' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: '@lilongxiang2000' },
    { name: 'twitter:image', content: 'https://llx.cool/og/index.png' },
  ],
})
</script>
<template>
  <Header />
  <div max-w-800px box-border mx-auto p-4 sm:text-xl lt-sm:text-base>
    <RouterView />
    <WrapperPost />
    <Footer />
  </div>
</template>
