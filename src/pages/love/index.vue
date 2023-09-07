<script setup lang="ts">
  import dayjs from "dayjs"
  import { PAGE_PWD } from "~/config"

  const router = useRouter()
  const route = useRoute()

  const show = ref(false)
  if (route.query.pwd !== PAGE_PWD) {
    router.push("404")
  } else {
    show.value = true
    history.replaceState({}, "", "love")
  }

  const TARGET_TIME = "2023/9/8 22:00:00"

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
    diffTime.value = getDiffTime(TARGET_TIME)

    const t = setInterval(() => {
      diffTime.value = getDiffTime(TARGET_TIME)
    }, 1000)

    onUnmounted(() => {
      clearInterval(t)
    })
  })
</script>

<template>
  <!--  -->
  <h1 v-if="show">💗 距离见到闹闹，还有</h1>
  <div
    v-if="show"
    class="w-100% xy-center text-2xl"
  >
    <span>{{ diffTime?.day ? diffTime.day + "天" : "" }}</span>
    <span>{{ diffTime?.minute ? diffTime.minute + "分" : "" }}</span>
    <span>{{ diffTime?.second ? diffTime.second + "秒" : "" }}</span>
  </div>
</template>
