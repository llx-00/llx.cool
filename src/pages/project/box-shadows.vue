<script setup lang="ts">
  import { StyleValue } from "vue";

  useHead({
    title: "Preview Box Shadows",
  });

  const refBox = ref();

  const initStyle: StyleValue = {
    boxShadow: `
      inset 5px 5px 5px rgba(0, 0, 0, 0.1),
      0 0 0 2px rgb(255, 255, 255),
      0.3em 0.3em 1em rgba(0, 0, 0, 0.3)
    `,
  };

  const inputColor = ref("");
  const inputStyle = computed(() => {
    return {
      boxShadow: `5px 5px 5px ${inputColor.value || "rgba(0, 0, 0, 0.1)"};`,
    };
  });

  const showCode = ref(false);
</script>

<template>
  <h1>施工中</h1>
  <div class="flex justify-between flex-wrap gap-4 text-base">
    <div
      class="b-solid b-gray rd-1 flex-1 min-w-300px w-100% flex flex-col gap-2 p-2 overflow-hidden"
    >
      <div class="w-100% flex justify-end items-center">
        <i
          :class="showCode ? 'i-lucide-code-2' : 'i-lucide-code'"
          @click="showCode = !showCode"
        />
      </div>
      <div class="flex-1 min-h-240px flex justify-center items-center">
        <div
          v-if="!showCode"
          ref="refBox"
          class="rd-1 w-100px h-100px"
          :style="initStyle"
        />
        <pre
          v-else
          class="h-100% m-0 p-0 text-sm overflow-x-auto"
          >{{ JSON.stringify(inputStyle, null, 2) }}</pre
        >
      </div>
    </div>
    <div
      class="b-solid b-gray rd-1 flex-1 min-w-300px min-h-240px w-100% flex flex-col p-2"
    >
      <div>
        <span class="min-w-30% inline-block">阴影颜色</span>
        <input
          type="color"
          v-model="inputColor"
        />
      </div>
      <div>
        <span class="min-w-30% inline-block">X轴偏移量</span>
        <input
          type="number"
          class="w-20%"
        />
        px
      </div>
      <div>
        <span class="min-w-30% inline-block">Y轴偏移量</span>
        <input
          type="number"
          class="w-20%"
        />
        px
      </div>
    </div>
  </div>
</template>
