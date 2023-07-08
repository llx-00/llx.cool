<template>
  <nav flex p-4 text-6>
    <a href="/" icon-btn i-lucide-home />
    <div flex-1 />
    <div flex gap-6>
      <a icon-btn i-lucide-github href="https://github.com/llx-00/vue-spa-tem" target="_blank" title="GitHub" />

      <a icon-btn i-lucide-sun dark:i-lucide-moon @click="toggleDark()" />
    </div>
  </nav>
</template>
