<template>
  <nav flex p-4 text-base>
    <RouterLink to="/" absolute select-none outline-none>
      <img :src="isDark ? '/logo-dark.svg' : '/logo.svg'" w-6 lg:w-10 alt="logo">
    </RouterLink>
    <div flex-1 />
    <div flex gap-6 items-center>
      <RouterLink to="/posts" title="Blog" link>
        <span lt-sm:hidden>Blog</span>
        <i i-lucide-file-text sm:hidden />
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
