<script setup lang="ts">
  function toggleThemeHandle(e: MouseEvent) {
    useHead({
      meta: [
        {
          name: "msapplication-TileColor",
          content: isDark.value ? "#000000" : "#ffffff",
        },
      ],
    })
    toggleDarkTransition(e)
  }
</script>
<template>
  <nav class="flex justify-end items-start p4 text-base">
    <RouterLink
      to="/"
      class="select-none outline-none absolute left-4"
    >
      <img
        v-show="isDark"
        :src="'/logo-dark.svg'"
        class="w6"
        alt="logo"
      />
      <img
        v-show="!isDark"
        :src="'/logo.svg'"
        class="w6"
        alt="logo"
      />
    </RouterLink>

    <div class="flex gap6 items-center">
      <RouterLink
        to="/posts"
        title="Blog"
        class="link"
      >
        <i class="i-lucide-file-text mr-0.75" />
        <span class="lt-sm:hidden">博客</span>
      </RouterLink>

      <RouterLink
        to="/cookbooks"
        title="Cookbooks"
        class="link"
      >
        <i class="i-lucide-salad mr-0.75" />
        <span class="lt-sm:hidden">食谱</span>
      </RouterLink>

      <RouterLink
        to="/games"
        title="Games"
        class="link"
      >
        <i class="i-lucide-gamepad-2 mr-0.75" />
        <span class="lt-sm:hidden">游戏</span>
      </RouterLink>

      <RouterLink
        to="/projects"
        title="Projects"
        class="link"
      >
        <i class="i-lucide-lightbulb mr-0.75" />
        <span class="lt-sm:hidden">项目</span>
      </RouterLink>

      <a
        class="link i-lucide-twitter"
        href="https://twitter.com/lilongxiang2000"
        target="_blank"
        title="Twitter"
      />

      <a
        class="link i-lucide-github"
        href="https://github.com/llx-00"
        target="_blank"
        title="GitHub"
      />

      <a
        class="link i-lucide-sun dark:i-lucide-moon"
        title="Toggle theme"
        @click="toggleThemeHandle"
      />
    </div>
  </nav>
</template>
