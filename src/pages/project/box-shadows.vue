<script setup lang="ts">
  import hljs from "highlight.js"
  import("highlight.js/styles/github.css")

  useHead({
    title: "Preview box-shadow",
  })

  const initStyle = ["10px 10px 10px 5px rgba(128, 128, 128, 0.5)"]
  const boxStyles = ref<string[]>([...initStyle])
  const refBox = ref<HTMLDivElement>()
  const preHtml = ref<string>()
  const copyState = ref(true)

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
    const _css = prompt(
      "x偏移量 y偏移量 阴影模糊半径 阴影扩散半径 颜色",
      initStyle[0]
    )
    if (_css) {
      boxStyles.value = [...boxStyles.value, _css]
    }
  }

  function updateCss(el: HTMLDivElement, css: string) {
    const children = el.children
    for (let i = 0; i < children.length; i++) {
      ;(children[i].children[0] as HTMLDivElement).style.boxShadow = css
    }

    preHtml.value = hljs.highlight(getCssCode(), { language: "css" }).value
  }

  function copyCodeHandle() {
    if (copyState.value) {
      const p = writeClipboardText(getCssCode())
      if (p) {
        copyState.value = false
        p.then(() => {
          setTimeout(() => {
            copyState.value = true
          }, 1000)
        })
      }
    }
  }

  watch(boxStyles, boxStyles => {
    if (refBox.value) {
      updateCss(refBox.value, boxStyles.join(", "))
    }
  })

  onMounted(() => {
    if (refBox.value) {
      updateCss(refBox.value, boxStyles.value.join(", "))
    }
  })

  const showStatus: { text: string; class?: string }[] = [
    {
      text: "light",
      class: "bg-#fff text-#000",
    },
    {
      text: "dark",
      class: "bg-#000 text-#fff",
    },
  ]

  const historyList: string[] = []

  function backward() {
    const pop = boxStyles.value.at(-1)
    if (pop) {
      historyList.push(pop)
      boxStyles.value = [...boxStyles.value.slice(0, -1)]
    }
  }
  function forward() {
    const pop = historyList.pop()
    if (pop) {
      boxStyles.value = [...boxStyles.value, pop]
    }
  }
</script>

<template>
  <h1>Preview <code>`box-shadow`</code></h1>

  <div class="flex flex-col gap-4 text-base overflow-y-auto">
    <nav class="w-100% flex justify-end items-center gap-4 select-none">
      <span
        class="cursor-pointer"
        title="上一步"
        @click="backward"
      >
        <i class="i-lucide-undo" />
        <span class="lt-sm:hidden ml-1">上一步</span>
      </span>

      <span
        class="cursor-pointer"
        title="下一步"
        @click="forward"
      >
        <i class="i-lucide-redo" />
        <span class="lt-sm:hidden ml-1">下一步</span>
      </span>

      <span
        class="cursor-pointer c-red-500"
        title="清空样式"
        @click="
          () => {
            boxStyles = []
            historyList = []
          }
        "
      >
        <i class="i-lucide-trash-2" />
        <span class="lt-sm:hidden ml-1">清空样式</span>
      </span>

      <span
        class="cursor-pointer"
        title="复制代码"
        @click="copyCodeHandle"
      >
        <i
          :class="[
            copyState ? 'i-lucide-code ' : 'i-lucide-check-circle c-green',
          ]"
        />
        <span class="lt-sm:hidden ml-1">复制代码</span>
      </span>

      <span
        class="cursor-pointer"
        title="添加随机样式"
        @click="boxStyles = [...boxStyles, getRandomBoxShadow()]"
      >
        <i class="i-lucide-dices" />
        <span class="lt-sm:hidden ml-1">添加随机样式</span>
      </span>

      <span
        class="cursor-pointer"
        title="添加样式"
        @click="addStyle"
      >
        <i class="i-lucide-plus-circle" />
        <span class="lt-sm:hidden ml-1">添加样式</span>
      </span>
    </nav>
    <div
      class="b-1 b-solid b-gray box-border rd-1 w-100% flex items-center overflow-x-auto"
      ref="refBox"
    >
      <div
        v-for="(status, index) in showStatus"
        class="min-w-200px min-h-200px w-200px h-200px xy-center flex-1 b-1 b-y-0 b-dotted b-gray"
        :class="[
          status.class,
          index === 0 ? 'b-l-0' : null,
          index === showStatus.length - 1 ? 'b-r-0' : null,
        ]"
      >
        <div class="min-w-100px min-h-100px xy-center b-1 b-solid b-gray rd-1">
          {{ status.text }}
        </div>
      </div>
    </div>
    <div
      class="b-1 b-solid b-gray box-border rd-1 w-100% min-h-200px h-200px flex overflow-auto"
    >
      <pre
        class="flex-1 m-2 text-sm select-none"
        v-show="preHtml"
        v-html="preHtml"
      />
    </div>
  </div>
</template>
