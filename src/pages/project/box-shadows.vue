<script setup lang="ts">
  import hljs from "highlight.js"
  import("highlight.js/styles/github.css")

  useHead({
    title: "Preview Box Shadows",
  })

  const initStyle = ["10px 10px 10px 5px rgba(128, 128, 128, 0.5)"]
  const boxStyles = ref<string[]>([...initStyle])
  const refBox = ref<HTMLDivElement>()
  const preHtml = ref<string>()

  function getCssCode() {
    return (
      "box-shadow: " +
      (boxStyles.value.length ? "\n" : "") +
      boxStyles.value.map(i => "  " + i).join(",\n") +
      ";"
    )
  }

  function getRandomBoxShadow() {
    // blur-radius 必须为正数
    return `${(Math.random() * 20 * (Math.random() > 0.5 ? -1 : 1)) >> 0}px ${
      (Math.random() * 20 * (Math.random() > 0.5 ? -1 : 1)) >> 0
    }px ${(Math.random() * 10) >> 0}px ${
      (Math.random() * 10 * (Math.random() > 0.5 ? -1 : 1)) >> 0
    }px rgba(${(Math.random() * 256) >> 0}, ${(Math.random() * 256) >> 0}, ${
      (Math.random() * 256) >> 0
    }, ${Math.random().toFixed(2)})${Math.random() > 0.8 ? " inset" : ""}`
  }

  function addStyle() {
    const _css = prompt("请输入样式")
    if (_css) {
      boxStyles.value = [...boxStyles.value, _css]
    }
  }

  watch(boxStyles, boxStyles => {
    if (refBox.value) {
      const _css = boxStyles.join(", ")
      const children = refBox.value.children
      for (let i = 0; i < children.length; i++) {
        ;(children[i].children[0] as HTMLDivElement).style.boxShadow = _css
      }
    }

    preHtml.value = hljs.highlight(getCssCode(), { language: "css" }).value
  })

  onMounted(() => {
    if (refBox.value) {
      const _css = boxStyles.value.join(", ")
      const children = refBox.value.children
      for (let i = 0; i < children.length; i++) {
        ;(children[i].children[0] as HTMLDivElement).style.boxShadow = _css
      }
    }

    preHtml.value = hljs.highlight(getCssCode(), { language: "css" }).value
  })

  const showStatus: { text: string; class?: string[] }[] = [
    {
      text: "normal",
    },
    {
      text: "dark",
      class: ["bg-#000"],
    },
    {
      text: "x",
    },
    {
      text: "c",
    },
    {
      text: "y",
    },
  ]
</script>

<template>
  <h1>Preview `box-shadow`</h1>

  <div class="flex flex-col justify-between gap-4 text-base">
    <nav class="w-100% flex justify-end items-center gap-4">
      <i
        class="i-lucide-trash-2 cursor-pointer"
        title="清空样式"
        @click="boxStyles = []"
      />
      <i
        class="i-lucide-code cursor-pointer"
        title="复制代码"
        @click="writeClipboardText(getCssCode())"
      />
      <i
        class="i-lucide-dices cursor-pointer"
        title="添加随机样式"
        @click="boxStyles = [...boxStyles, getRandomBoxShadow()]"
      />
      <i
        title="添加样式"
        class="i-lucide-plus-circle cursor-pointer"
        @click="addStyle"
      />
    </nav>
    <div
      class="b-1 b-solid b-gray rd-1 w-100% h-25vh flex items-center overflow-y-hidden overflow-x-auto"
      ref="refBox"
    >
      <div
        v-for="(status, index) in showStatus"
        class="min-w-200px h-100% xy-center flex-1 b-1 b-solid b-gray"
        :class="[
          ...(status.class || []),
          index === 0 ? 'b-l-0' : null,
          index === showStatus.length - 1 ? 'b-r-0' : null,
        ]"
      >
        <div class="min-w-100px min-h-100px xy-center b-1 b-solid b-gray rd-1">
          {{ status.text }}
        </div>
      </div>
    </div>
    <div class="b-1 b-solid b-gray rd-1 w-100% h-25vh flex overflow-auto">
      <pre
        class="flex-1 m-2 text-sm select-none"
        v-show="preHtml"
        v-html="preHtml"
      />
    </div>
  </div>
</template>
