<script setup lang="ts"></script>

<template>
  <div class="xy-center mx-auto">
    <div class="b-1 b-gray b-solid">
      <div
        v-for="i in 9"
        class="flex"
      >
        <div
          v-for="j in 9"
          class="cursor-pointer w-8 h-8 b-1 b-gray b-solid text-base hover:bg-gray xy-center"
        >
          {{ 9 * (i - 1) + j }}
        </div>
      </div>
    </div>
  </div>
</template>
