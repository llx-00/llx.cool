<script setup lang="ts">
  import dayjs from "dayjs"
  import md5 from "md5"
  import { globalStore } from "~/composables"
  import { PAGE_PWD } from "~/config"

  import { TARGET_TIMES } from "~/composables/store"

  const router = useRouter()
  const show = ref(false)

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
    { title: string; top?: boolean; date: ReturnType<typeof getDiffTime> }[]
  >([])

  function startInterval() {
    function getDiffTimes() {
      const arr = TARGET_TIMES.sort((a, b) => {
        return a.date < b.date ? 1 : -1
      }).map(i => ({
        ...i,
        date: getDiffTime(i.date),
      }))
      return arr.filter(i => i.top).concat(arr.filter(i => !i.top))
    }

    diffTimes.value = getDiffTimes()

    const t = setInterval(() => {
      diffTimes.value = getDiffTimes()
    }, 1000)

    onUnmounted(() => {
      clearInterval(t)
    })

    show.value = true
  }

  onMounted(() => {
    if (globalStore.showHiddenPage) {
      startInterval()
    } else {
      if (localStorage.getItem("PAGE_PWD") === PAGE_PWD) {
        globalStore.showHiddenPage = true
        startInterval()
      } else {
        const inputStr = prompt("暗号！👀")

        if (inputStr && md5(inputStr) === PAGE_PWD) {
          globalStore.showHiddenPage = true
          localStorage.setItem("PAGE_PWD", md5(inputStr))
          startInterval()
        } else router.push("/")
      }
    }
  })
</script>

<template>
  <h1><span class="heartbeat mr-1">💗</span>时间线</h1>
  <p
    v-if="show"
    v-for="i in diffTimes"
    class="w-100% text-base flex flex-wrap justify-between items-center"
    :class="i.date.isMinus ? 'op50' : null"
  >
    <span class="w-100% flex justify-between items-center">
      <span>距离“{{ i.title }}”，{{ i.date.isMinus ? "已过去" : "还有" }}</span>
      <i
        v-show="i.top"
        class="i-lucide-pin cursor-default"
      />
    </span>
    <!-- <span class="flex-1" /> -->
    <span class="w-100% text-end">
      <code>{{ i.date.day }}</code>
      <span>天</span>
      <code>{{ i.date.hour.toString().padStart(2, "0") }}</code>
      <span>小时</span>
      <code>{{ i.date.minute.toString().padStart(2, "0") }}</code>
      <span>分</span>
      <code>{{ i.date.second.toString().padStart(2, "0") }}</code>
      <span>秒</span>
    </span>
  </p>
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
