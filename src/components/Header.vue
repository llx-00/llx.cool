<template>
  <nav class="flex justify-end items-start p4 text-base">
    <RouterLink
      to="/"
      class="select-none outline-none absolute left-4"
    >
      <img
        :src="isDark ? '/logo-dark.svg' : '/logo.svg'"
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
        <span class="lt-sm:hidden">Blog</span>
        <i class="i-lucide-file-text sm:hidden" />
      </RouterLink>

      <RouterLink
        to="/games"
        title="Games"
        class="link"
      >
        <span class="lt-sm:hidden">Games</span>
        <i class="i-lucide-gamepad-2 sm:hidden" />
      </RouterLink>

      <RouterLink
        to="/projects"
        title="Projects"
        class="link"
      >
        <span class="lt-sm:hidden">Projects</span>
        <i class="i-lucide-lightbulb sm:hidden" />
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
        @click="toggleDark()"
      />
    </div>
  </nav>
</template>
