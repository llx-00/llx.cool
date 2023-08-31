<script setup lang="ts">
  useHead({
    meta: [
      { property: "og:title", content: "Longxiang Li" },
      { property: "og:image", content: "https://llx.cool/og/index.png" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:creator", content: "@lilongxiang2000" },
      { name: "twitter:image", content: "https://llx.cool/og/index.png" },
      {
        name: "msapplication-TileColor",
        content: isDark.value ? "#000000" : "#ffffff",
      },
    ],
  })
</script>
<template>
  <Header />
  <div class="body max-w-800px box-border mx-auto p4">
    <RouterView />
    <WrapperPost />
    <Footer />
  </div>
  <!-- <PaperBg /> -->
</template>

<style scoped lang="scss">
  .body {
    @media (min-width: 420px) {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }

    @media (max-width: 419.9px) {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
</style>
