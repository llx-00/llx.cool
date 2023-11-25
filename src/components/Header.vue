<script setup lang="ts">
  import { NavItem } from "~/types"

  const NavItems: NavItem[] = [
    { label: "博客", path: "/posts", icon: "i-lucide-file-text" },
    { label: "游戏", path: "/games", icon: "i-lucide-gamepad-2" },
    { label: "项目", path: "/projects", icon: "i-lucide-lightbulb" },
  ]
</script>
<template>
  <nav class="flex justify-end items-start p4 text-base">
    <RouterLink
      to="/"
      class="link select-none outline-none absolute left-4"
    >
      <img
        v-show="isDark"
        :src="'/logo-dark.svg'"
        class="w-8"
        alt="logo"
      />
      <img
        v-show="!isDark"
        :src="'/logo.svg'"
        class="w-8"
        alt="logo"
      />
    </RouterLink>

    <div class="flex gap4">
      <RouterLink
        class="link"
        :to="i.path"
        :title="i.label"
        v-for="i in NavItems"
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
        @click="toggleDarkTransition"
      >
        <i class="i-lucide-sun dark:i-lucide-moon" />
      </a>
    </div>
  </nav>
</template>
