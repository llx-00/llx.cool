<script setup lang="ts">
  import md5 from "md5"
  import AllHello from "~/hello"
  import { PAGE_PWD } from "~/config"

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
    const inputStr = prompt("Who are you? 👀")

    if (inputStr) {
      router.push(`love?pwd=${md5(inputStr)}`)
    }
  }
</script>

<template>
  <span @click="goLove">👋</span>
  <span>{{ " " }}</span>
  <span>{{ hello }}</span>
</template>
