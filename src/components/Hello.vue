<script setup lang="ts">
  import md5 from "md5"
  import { PAGE_PWD } from "~/config"
  import { globalStore } from "~/composables"

  const AllHello = [
    "Hello",
    "こんにちは",
    "안녕하세요",
    "Привет",
    "Hola",
    "Bonjour",
    "Hallo",
    "Ciao",
    "Olá",
    "Merhaba",
    "Hej",
    "你好",
  ]

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
    }, iterval || 2000)

    onUnmounted(() => {
      clearInterval(t)
    })
  })

  const router = useRouter()

  function goLove() {
    if (globalStore.showHiddenPage) {
      router.push("love")
    } else {
      const inputStr = prompt("暗号！👀")

      if (inputStr && md5(inputStr) === PAGE_PWD) {
        globalStore.showHiddenPage = true
        localStorage.setItem("PAGE_PWD", md5(inputStr))
        router.push("love")
      }
    }
  }
</script>

<template>
  <span
    class="cursor-pointer select-none hi"
    @click="goLove"
  >
    👋🏻
  </span>
  <span>{{ " " }}</span>
  <span>{{ hello }}</span>
</template>

<style scoped lang="scss">
  .hi {
    @keyframes hi {
      0% {
        transform: rotate(0turn);
      }
      25% {
        transform: rotate(-0.01turn);
      }
      50% {
        transform: rotate(0turn);
      }
      75% {
        transform: rotate(0.05turn);
      }
      100% {
        transform: rotate(0turn);
      }
    }

    display: inline-block;

    animation: hi 2s 1s linear infinite;
  }
</style>
