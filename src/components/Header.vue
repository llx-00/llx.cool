<template>
  <nav flex justify-end items-start p-4 text-base>
    <RouterLink to="/" select-none outline-none absolute left-4>
      <img :src="isDark ? '/logo-dark.svg' : '/logo.svg'" w-6 alt="logo">
    </RouterLink>
    <div flex gap-6 items-center>
      <RouterLink to="/blog" title="Blog" link>
        <span lt-sm:hidden>Blog</span>
        <i i-lucide-file-text sm:hidden />
      </RouterLink>
      <RouterLink to="/games" title="Games" link>
        <span lt-sm:hidden>Games</span>
        <i i-lucide-gamepad-2 sm:hidden />
      </RouterLink>
      <RouterLink to="/projects" title="Projects" link>
        <span lt-sm:hidden>Projects</span>
        <i i-lucide-lightbulb sm:hidden />
      </RouterLink>

      <a link i-lucide-twitter href="https://twitter.com/lilongxiang2000" target="_blank" title="Twitter" />
      <a link i-lucide-github href="https://github.com/llx-00" target="_blank" title="GitHub" />

      <a link i-lucide-sun dark:i-lucide-moon @click="toggleDark()" />
    </div>
  </nav>
</template>
