<script setup lang="ts">
  import { StyleValue } from "vue"
  import { NConfigProvider, NCode, useMessage } from "naive-ui"
  import { createTheme, codeDark } from "naive-ui"
  import { zhCN, dateZhCN } from "naive-ui"
  import highlight from "highlight.js"
  import hljsCSS from "highlight.js/lib/languages/css"

  highlight.registerLanguage("javascript", hljsCSS)

  const darkTheme = createTheme([codeDark])

  useHead({
    title: "Preview Box Shadows",
  })

  const refBox = ref()

  const initStyle: StyleValue = {
    boxShadow: `
      inset 5px 5px 5px rgba(0, 0, 0, 0.1),
      0 0 0 2px rgb(255, 255, 255),
      0.3em 0.3em 1em rgba(0, 0, 0, 0.3)
    `,
  }

  const inputColor = ref("")
  const inputStyle = computed(() => {
    return {
      boxShadow: `5px 5px 5px ${inputColor.value || "rgba(0, 0, 0, 0.1)"};`,
    }
  })

  const showCode = ref(false)
</script>

<template>
  <NConfigProvider
    :theme="isDark ? darkTheme : null"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :hljs="highlight"
  >
    <h1>施工中</h1>
    <div class="flex justify-between flex-wrap gap-4 text-base">
      <div
        class="b-solid b-gray rd-1 flex-1 min-w-300px w-100% flex flex-col gap-2 p-2 overflow-hidden"
      >
        <div class="w-100% flex justify-end items-center gap-2">
          <i
            class="i-lucide-copy cursor-pointer"
            @click=""
          />
          <i
            class="cursor-pointer"
            :class="showCode ? 'i-lucide-code-2' : 'i-lucide-code'"
            @click="showCode = !showCode"
          />
        </div>
        <div class="flex-1 min-h-240px xy-center">
          <div
            v-if="!showCode"
            ref="refBox"
            class="rd-1 w-100px h-100px"
            :style="initStyle"
          />
          <NCode
            v-else
            class="h-100% m-0 p-0 text-sm overflow-x-auto select-none"
            language="css"
            :code="JSON.stringify(inputStyle, null, 2)"
          />
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
  </NConfigProvider>
</template>
