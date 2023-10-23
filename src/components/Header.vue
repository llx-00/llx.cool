<script setup lang="ts">
  import { NavItem } from "~/types"

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

  const navItems: NavItem[] = [
    { label: "博客", path: "/posts", icon: "i-lucide-file-text" },
    { label: "食谱", path: "/cookbooks", icon: "i-lucide-salad" },
    { label: "游戏", path: "/games", icon: "i-lucide-gamepad-2" },
    { label: "项目", path: "/projects", icon: "i-lucide-lightbulb" },
  ]

  const showColMenu = ref(false)
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
      <a
        class="link sm:hidden"
        @click="
          () => {
            showColMenu = !showColMenu
          }
        "
      >
        <i class="i-lucide-more-horizontal" />
      </a>

      <div
        class="flex gap4 items-center lt-sm:flex-col lt-sm:absolute lt-sm:top-14 lt-sm:translate-x--60%"
        :class="['showColMenuBtn', showColMenu ? 'show' : 'hidden']"
      >
        <RouterLink
          :to="i.path"
          class="link"
          :title="i.label"
          v-for="i in navItems"
        >
          <i :class="i.icon" />
          <span>{{ i.label }}</span>
        </RouterLink>
      </div>

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

<style lang="scss" scoped>
  .showColMenuBtn {
    top: -10rem;
    // opacity: 0;
    transition: all 0.2s ease-in-out;

    &.show {
      // opacity: 1;
      top: 3.5rem;
    }
    &.hidden {
      // opacity: 0;
      top: -10rem;
      pointer-events: none;
    }
  }
</style>
