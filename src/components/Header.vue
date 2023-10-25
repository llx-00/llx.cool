<script setup lang="ts">
  import { NavItem } from "~/types"

  function toggleThemeHandle(e: MouseEvent) {
    toggleDarkTransition(e)
  }

  const navItems: NavItem[] = [
    { label: "博客", path: "/posts", icon: "i-lucide-file-text" },
    // { label: "食谱", path: "/cookbooks", icon: "i-lucide-salad" },
    { label: "游戏", path: "/games", icon: "i-lucide-gamepad-2" },
    { label: "项目", path: "/projects", icon: "i-lucide-lightbulb" },
  ]
</script>
<template>
  <nav class="flex justify-between items-start p4 text-base">
    <RouterLink
      to="/"
      class="link select-none outline-none"
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

    <div class="flex gap4">
      <RouterLink
        class="link"
        :to="i.path"
        :title="i.label"
        v-for="i in navItems"
      >
        <i
          class="sm:mr-0.5"
          :class="i.icon"
        />
        <span class="lt-sm:hidden">{{ i.label }}</span>
      </RouterLink>

      <a
        class="link"
        href="https://twitter.com/lilongxiang2000"
        target="_blank"
      >
        <i class="i-lucide-twitter" />
      </a>

      <a
        class="link"
        href="https://github.com/llx-00"
        target="_blank"
      >
        <i class="i-lucide-github" />
      </a>

      <a
        class="link"
        @click="toggleThemeHandle"
      >
        <i class="i-lucide-sun dark:i-lucide-moon" />
      </a>
    </div>
  </nav>
</template>
