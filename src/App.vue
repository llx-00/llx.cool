<script setup lang="ts">
  watchEffect(() => {
    const newColor = isDark.value ? "#000000" : "#ffffff"

    // 网页启动时，Safari 的状态栏样式
    updateMetaElement("apple-mobile-web-app-status-bar-style", newColor)
    // 移动设备浏览器的主题色
    updateMetaElement("theme-color", newColor)
    updateMetaElement("msapplication-TileColor", newColor)
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
