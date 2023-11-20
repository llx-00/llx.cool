<script setup lang="ts">
  useHead({
    title: "Icon creater",
  })

  const fileDialog = useFileDialog({
    accept: "image/*",
    multiple: false,
  })

  const fileInfo = ref<File | null>(null)
  const prewViewImg = ref("")

  const outputList = ["16", "32", "64", "128", "152", "512"]

  function uploadFile() {
    fileDialog.open()
  }

  watch(fileDialog.files, files => {
    if (files && files?.[0]) {
      const _file = files[0]
      fileInfo.value = _file

      const url = URL.createObjectURL(_file)
      prewViewImg.value = url
    } else {
      fileInfo.value = null
      prewViewImg.value = ""
    }
  })

  function download() {}
</script>

<template>
  <h1>Icon create</h1>

  <div class="flex flex-col gap-4 text-base overflow-y-auto">
    <nav class="w-100% flex justify-end items-center gap-4 select-none">
      <span
        class="font-mono"
        :title="fileInfo?.name"
        >{{ fileInfo?.name }}</span
      >

      <span class="flex-1" />

      <span
        class="cursor-pointer"
        title="清空"
        @click="
          () => {
            fileDialog.reset()
          }
        "
      >
        <i class="i-lucide-trash-2" />
        <span class="lt-sm:hidden ml-1">清空</span>
      </span>

      <span
        class="cursor-pointer"
        title="下载全部"
        @click="download"
      >
        <i class="i-lucide-download" />
        <span class="lt-sm:hidden ml-1">下载全部</span>
      </span>

      <span
        class="cursor-pointer"
        title="上传文件"
        @click="uploadFile"
      >
        <i class="i-lucide-upload" />
        <span class="lt-sm:hidden ml-1">上传文件</span>
      </span>
    </nav>

    <div class="b-1 b-solid b-gray box-border rd-1 w-100% flex overflow-x-auto">
      <img
        class="w-200px h-200px m2 b-dotted b-gray rd-1 overflow-hidden select-none"
        :src="prewViewImg"
        alt=""
      />

      <div
        class="flex-1 h-200px m2 ml-0 b-dotted b-gray rd-1 overflow-x-hidden overflow-y-auto"
      >
        <div
          v-if="fileInfo"
          v-for="output in outputList"
          class="w-100% p1 flex justify-between items-center"
        >
          <span class="ml-1">
            {{
              fileDialog.files.value?.[0].name
                .split(".")
                .slice(0, -1)
                .join(".")
            }}_{{ output }}.{{
              fileDialog.files.value?.[0].name.split(".").at(-1)
            }}
          </span>
          <div>
            <!-- todo 根据渲染状态显示不同图标 -->
            <i class="i-lucide-loader-2" />
            <i class="i-lucide-download" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  i.i-lucide-loader-2 {
    @keyframes rotate {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    animation: rotate 1s ease-in-out infinite;
  }
</style>
