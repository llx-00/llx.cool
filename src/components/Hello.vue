<script setup lang="ts">
import AllHello from '~/hello'

const { defaultVal, iterval } = defineProps<{
  defaultVal?: string
  iterval?: number
}>()


const _hello = ref<string>(defaultVal || AllHello[0])
onMounted(() => {
  const t = setInterval(() => {
    _hello.value = AllHello[Math.random() * AllHello.length >> 0]
  }, iterval || 1000)

  onUnmounted(() => {
    clearInterval(t)
  })
})

</script>

<template>
  👋 <span>{{ _hello }}</span>
</template>
