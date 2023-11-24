<script setup lang="ts">
  import * as imageConversion from "image-conversion"

  useHead({
    title: "Icon creater",
  })

  const fileInfo = ref<File | null>(null)

  const prewViewImg = ref("")
  const createDone = ref(false)

  const fileDialog = useFileDialog({
    accept: "image/*",
    multiple: false,
  })
  watch(fileDialog.files, files => {
    if (files && files?.[0]) {
      const _file = files[0]
      devLog(_file)
      fileInfo.value = _file

      const url = URL.createObjectURL(_file)
      imageConversion.filetoDataURL(_file).then(dataUrl => {
        imageConversion
          .dataURLtoFile(dataUrl, imageConversion.EImageType.PNG)
          .then(blob => {
            const _url = URL.createObjectURL(blob)
            console.log(_url)
          })
      })

      prewViewImg.value = url
    } else {
      fileInfo.value = null
      prewViewImg.value = ""
    }
  })

  const outputList = ["16", "32", "64", "128", "152", "512"]

  function uploadFile() {
    if (fileInfo) {
      fileDialog.reset()
      createDone.value = false
    }

    fileDialog.open()
  }

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
        :class="[createDone ? null : 'cursor-not-allowed op50']"
        title="下载全部"
        @click="download"
      >
        <i class="i-lucide-download" />
        <span class="lt-sm:hidden ml-1">下载全部</span>
      </span>

      <span
        class="cursor-pointer"
        :title="createDone ? '重新上传' : '上传图片'"
        @click="uploadFile"
      >
        <i class="i-lucide-upload" />
        <span class="lt-sm:hidden ml-1">{{
          fileInfo ? "重新上传" : "上传图片"
        }}</span>
      </span>
    </nav>

    <div class="b-1 b-solid b-gray box-border rd-1 w-100% flex overflow-x-auto">
      <img
        class="w-200px h-200px m2 b-dotted b-gray rd-1 overflow-hidden select-none object-cover"
        :src="prewViewImg"
      />

      <div
        class="flex-1 h-200px m2 ml-0 b-dotted b-gray rd-1 overflow-x-hidden overflow-y-auto"
      >
        <div
          v-if="fileInfo"
          v-for="output in outputList"
          class="w-100% p1 flex justify-between items-center"
        >
          <span>
            {{ fileInfo.name.split(".").slice(0, -1).join(".") }}-{{
              output
            }}.png
          </span>
          <div>
            <i
              v-if="createDone"
              class="i-lucide-download cursor-pointer"
            />
            <i
              v-else
              class="rotate i-lucide-loader-2 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .rotate {
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
