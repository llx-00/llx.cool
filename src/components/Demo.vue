<script setup>
import vueLogo from '~/assets/vue.svg'
import viteLogo from '/vite.svg'
</script>


<template>
  <div text-center>
    <a href="https://vitejs.dev" target="_blank">
      <img :src='viteLogo' class="logo" alt="Logo Vite" />
    </a>
    <a href="https://reactjs.org" target="_blank">
      <img :src='vueLogo' class="logo" alt="Logo Vue" />
    </a>
  </div>

  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex suscipit dignissimos possimus asperiores ullam mollitia.
    Aliquam aliquid neque iste saepe ea, architecto amet, esse iusto ducimus fugiat illum eos voluptates?</p>
</template>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
}
</style>
