<script setup lang="ts">
  import dayjs from "dayjs"
  import { globalStore } from "~/composables"
  import { PAGE_PWD } from "~/config"

  const router = useRouter()
  const show = ref(false)

  type TypeTargetTime = { title: string; date: string }
  const TARGET_TIMES: TypeTargetTime[] = [
    // <span>距离{{ i.title }}，{{ i.date.isMinus ? "已过去" : "还有" }}</span>
    { title: "第一次💋", date: "2023/8/11 23:00:00" },
    { title: "见闹闹", date: "2023/12/29 21:10:00" },
    { title: "长沙行", date: "2023/12/31 14:00:00" },
  ]

  function getDiffTime(targetTime: string) {
    const _targetTime = dayjs(targetTime)
    const _now = dayjs()

    let _diffSecond = _targetTime.diff(_now, "second")
    const isMinus = _diffSecond < 0

    // 保证算出来的 天、时、分、秒为正
    if (isMinus) _diffSecond = -_diffSecond
    const day = (_diffSecond / 86400) >> 0
    const hour = ((_diffSecond - day * 86400) / 3600) >> 0
    const minute = ((_diffSecond - (day * 86400 + hour * 3600)) / 60) >> 0
    const second = _diffSecond - (day * 86400 + hour * 3600 + minute * 60)

    return {
      day,
      hour,
      minute,
      second,
      isMinus,
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
      if (localStorage.getItem("PAGE_PWD") === PAGE_PWD) {
        globalStore.showHiddenPage = true
      } else router.push("/")
    }
  })
</script>

<template>
  <template
    v-if="show"
    v-for="i in diffTimes"
  >
    <h1>
      <span class="heartbeat">💗</span>
      <span>距离{{ i.title }}，{{ i.date.isMinus ? "已过去" : "还有" }}</span>
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
