<script setup lang="ts">
  import md5 from "md5"
  import AllHello from "~/hello"
  import { PAGE_PWD } from "~/config"
  import { globalStore } from "~/composables"

  const { defaultVal, iterval } = defineProps<{
    defaultVal?: string
    iterval?: number
  }>()

  const hello = ref<string>(defaultVal || AllHello[0])
  const index = ref(0)
  onMounted(() => {
    const t = setInterval(() => {
      hello.value = AllHello[index.value++]

      if (index.value === AllHello.length) {
        index.value = 0
      }
    }, iterval || 1000)

    onUnmounted(() => {
      clearInterval(t)
    })
  })

  const router = useRouter()

  function goLove() {
    if (globalStore.showHiddenPage) {
      router.push("love")
    } else {
      const inputStr = prompt("Who are you? 👀")

      if (inputStr && md5(inputStr) === PAGE_PWD) {
        globalStore.showHiddenPage = true
        router.push("love")
      }
    }
  }
</script>

<template>
  <span
    class="cursor-pointer select-none"
    @click="goLove"
  >
    👋
  </span>
  <span>{{ hello }}</span>
</template>
