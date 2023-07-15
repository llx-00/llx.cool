<script setup lang="ts">
  import { Game } from "~/types";

  const { games } = defineProps<{ games: Game[] }>();
</script>

<template>
  <PageTitle />
  <div class="p2 flex flex-wrap gap8">
    <div
      v-for="game in games"
      :key="game.name"
      class="flex flex-col flex-1 items-start min-w-350px"
    >
      <h5 class="my5 font-bold">
        <RouterLink :to="game.link">
          {{ game.name }}
        </RouterLink>
      </h5>
      <div class="text-sm op50 font-normal">
        {{ game.desc }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  a {
    margin: 0;
    text-decoration: none;

    &::before {
      display: none;
    }
  }
</style>
