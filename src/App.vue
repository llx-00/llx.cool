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

  // 同步 msapplication-TileColor
  watchEffect(() => {
    const el = document.querySelector(
      'meta[name="msapplication-TileColor"]'
    ) as HTMLMetaElement | null

    const newContent = isDark.value ? "#000000" : "#ffffff"

    if (el) document.head.removeChild(el)

    const _el = document.createElement("meta") as HTMLMetaElement
    _el.name = "msapplication-TileColor"
    _el.content = newContent
    document.head.appendChild(_el)
  })
</script>
<template>
  <Header />
  <div class="max-w-800px box-border mx-auto p4">
    <PageTitle />
    <RouterView />
    <WrapperPost />
    <Footer />
  </div>
  <!-- <PaperBg /> -->
</template>
