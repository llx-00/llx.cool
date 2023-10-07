<script setup lang="ts">
  import dayjs from "dayjs"
  import { globalStore } from "~/composables"

  const router = useRouter()

  const show = ref(false)

  const TARGET_TIME = "2023/10/13 21:00:00"

  function getDiffTime(targetTime: string) {
    const _targetTime = dayjs(targetTime)
    const _now = dayjs()

    const _diffSecond = Math.max(0, _targetTime.diff(_now, "second"))

    const day = Math.max(0, (_diffSecond / 86400) >> 0)
    const hour = Math.max(0, ((_diffSecond - day * 86400) / 3600) >> 0)
    const minute = Math.max(
      0,
      ((_diffSecond - (day * 86400 + hour * 3600)) / 60) >> 0
    )
    const second = Math.max(
      0,
      _diffSecond - (day * 86400 + hour * 3600 + minute * 60)
    )

    return {
      day,
      hour,
      minute,
      second,
    }
  }

  const diffTime = ref<ReturnType<typeof getDiffTime>>()

  onMounted(() => {
    if (globalStore.showHiddenPage) {
      diffTime.value = getDiffTime(TARGET_TIME)

      const t = setInterval(() => {
        diffTime.value = getDiffTime(TARGET_TIME)
      }, 1000)

      onUnmounted(() => {
        clearInterval(t)
      })

      show.value = true
    } else {
      router.push("/")
    }
  })
</script>

<template>
  <h1 v-if="show">💗 距离见到闹闹，还有</h1>
  <div
    v-if="show"
    class="w-100% xy-center text-2xl"
  >
    <span v-if="diffTime?.day">
      <code>{{ diffTime?.day }}</code>
      <span>天</span>
    </span>
    <span v-if="diffTime?.hour">
      <code>{{ diffTime?.hour }}</code>
      <span>小时</span>
    </span>
    <span>
      <code>{{ diffTime?.minute.toString().padStart(2, "0") }}</code>
      <span>分</span>
    </span>
    <span>
      <code>{{ diffTime?.second.toString().padStart(2, "0") }}</code>
      <span>秒</span>
    </span>
  </div>
</template>
