<script setup lang="ts">
  import { e } from "unocss"

  useHead({
    title: "Icon creater",
  })

  const fileDialog = useFileDialog({
    accept: "image/*",
    multiple: false,
  })

  const fileInfo = ref<File | null>(null)
  const prewViewImg = ref("")

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
        @click="fileDialog.reset()"
      >
        <i class="i-lucide-download" />
        <span class="lt-sm:hidden ml-1">清空</span>
      </span>

      <span
        class="cursor-pointer"
        title="下载"
        @click="download"
      >
        <i class="i-lucide-download" />
        <span class="lt-sm:hidden ml-1">下载</span>
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
        class="w-200px h-200px m2 box-border b-dotted b-gray rd-1"
        :src="prewViewImg"
        alt=""
      />
    </div>
    <div
      class="p2 b-1 b-solid b-gray box-border rd-1 w-100% h-200px flex overflow-x-auto"
    ></div>
  </div>
</template>

<style scoped lang="scss"></style>
