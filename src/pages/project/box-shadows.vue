<script setup lang="ts">
  import hljs from "highlight.js"
  import("highlight.js/styles/github.css")

  useHead({
    title: "Preview Box Shadows",
  })

  const initStyle = [
    "-10px -10px 10px -10px rgba(255, 255, 255, 0.5)",
    "10px 10px 10px -10px rgba(0, 0, 0, 0.5)",
  ]
  const boxStyles = ref<string[]>([...initStyle])
  const refBox = ref<HTMLDivElement>()

  function getCssCode() {
    return (
      "box-shadow: \n" + boxStyles.value.map(i => "  " + i).join(",\n") + ";"
    )
  }

  function getRandomBoxShadow() {
    return `${(Math.random() * 10 * (Math.random() > 0.5 ? -1 : 1)) >> 0}px ${
      (Math.random() * 10 * (Math.random() > 0.5 ? -1 : 1)) >> 0
    }px ${(Math.random() * 5 * (Math.random() > 0.5 ? -1 : 1)) >> 0}px ${
      (Math.random() * 5 * (Math.random() > 0.5 ? -1 : 1)) >> 0
    }px rgba(${(Math.random() * 255) >> 0}, ${(Math.random() * 255) >> 0}, ${
      (Math.random() * 255) >> 0
    }, ${Math.random().toFixed(2)})${Math.random() > 0.8 ? " inset" : ""}`
  }

  watch(boxStyles, () => {
    if (refBox.value) {
      refBox.value.style.boxShadow = boxStyles.value.join(", ")
    }
  })

  onMounted(() => {
    if (refBox.value) {
      refBox.value.style.boxShadow = boxStyles.value.join(", ")
    }
  })
</script>

<template>
  <h1>施工中</h1>

  <div class="flex flex-col justify-between gap-4 text-base">
    <nav class="w-100% flex justify-end items-center gap-4">
      <i
        class="i-lucide-paintbrush cursor-pointer"
        title="清空"
        @click="boxStyles = []"
      />
      <i
        class="i-lucide-copy cursor-pointer"
        title="复制CSS"
        @click="writeClipboardText(getCssCode())"
      />
      <i
        title="添加样式"
        class="i-lucide-plus-circle cursor-pointer"
        @click="boxStyles = [...boxStyles, getRandomBoxShadow()]"
      />
    </nav>
    <div
      class="b-solid b-gray rd-1 w-100% h-25vh xy-center bg-gray-100 dark:bg-gray-900"
    >
      <div
        class="rd-1 w-100px h-100px"
        ref="refBox"
      />
    </div>
    <div
      class="b-solid b-gray rd-1 w-100% h-25vh overflow-auto bg-gray-100 dark:bg-gray-900"
    >
      <pre
        class="w-100% h-100% m-2 text-sm select-none"
        v-html="hljs.highlight(getCssCode(), { language: 'css' }).value"
      />
    </div>
  </div>
</template>
