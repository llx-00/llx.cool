<script setup lang="ts">
  import dayjs from "dayjs"
  import { globalStore } from "~/composables"

  const router = useRouter()

  const show = ref(false)

  const TARGET_TIMES: {
    title: string
    date: string
  }[] = [
    { title: "见闹闹", date: "2023/12/22 19:40:00" },
    { title: "长沙行", date: "2023/12/31 14:00:00" },
  ]

  function getDiffTime(targetTime: string) {
    const _targetTime = dayjs(targetTime)
    const _now = dayjs()

    const _diffSecond = Math.max(0, _targetTime.diff(_now, "second"))

    if (_diffSecond === 0) {
      return {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
      }
    }

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

  const diffTimes = ref<
    { title: string; date: ReturnType<typeof getDiffTime> }[]
  >([])

  onMounted(() => {
    if (globalStore.showHiddenPage) {
      diffTimes.value = TARGET_TIMES.map(i => ({
        ...i,
        date: getDiffTime(i.date),
      }))

      const t = setInterval(() => {
        diffTimes.value = TARGET_TIMES.map(i => ({
          ...i,
          date: getDiffTime(i.date),
        }))
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
  <template
    v-if="show"
    v-for="i in diffTimes"
  >
    <h1>
      <span class="heartbeat">💗</span> <span>距离{{ i.title }}，还有</span>
    </h1>
    <div class="w-100% text-end text-2xl">
      <span>
        <code>{{ i.date.day }}</code>
        <span>天</span>
      </span>
      <span>
        <code>{{ i.date.hour.toString().padStart(2, "0") }}</code>
        <span>小时</span>
      </span>
      <span>
        <code>{{ i.date.minute.toString().padStart(2, "0") }}</code>
        <span>分</span>
      </span>
      <span>
        <code>{{ i.date.second.toString().padStart(2, "0") }}</code>
        <span>秒</span>
      </span>
    </div>
  </template>
</template>

<style scoped lang="scss">
  .heartbeat {
    @keyframes heartbeat {
      0% {
        transform: scale(1);
      }
      10% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }

    display: inline-block;
    animation: heartbeat 1s ease-in-out infinite;
  }
</style>
