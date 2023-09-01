<script setup lang="ts">
  import SoundMuyuOgg from "~/assets/muyu/muyu.ogg"
  import SoundMuyuMp3 from "~/assets/muyu/muyu.mp3"
  import ImgMuyuLight from "~/assets/muyu/muyu-light.png"
  import ImgMuyuDark from "~/assets/muyu/muyu-dark.png"

  const MaxCount = 999999

  const localCount = useStorage("muyu-count", 0)
  const { count, inc, reset } = useCounter(localCount.value, {
    min: 0,
    max: MaxCount,
  })
  watch([count], () => {
    localCount.value = count.value
  })

  const refImg1 = ref<HTMLImageElement | null>(null)
  const refImg2 = ref<HTMLImageElement | null>(null)
  const refAudio = ref<HTMLAudioElement | null>(null)

  const onClickHandle = useThrottleFn(() => {
    if (count.value === MaxCount) reset(0)
    else inc(1)

    if (refAudio.value) {
      refAudio.value.muted = false
      refAudio.value.play()
    }

    const elMeg = document.createElement("div")
    elMeg.textContent = "功德+1"
    elMeg.className = "msg"

    document.body.appendChild(elMeg)

    // 确保动画播从头开始
    refImg1.value?.classList.remove("click-animation")
    refImg1.value?.classList.add("click-animation")
    refImg2.value?.classList.remove("click-animation")
    refImg2.value?.classList.add("click-animation")
    setTimeout(() => {
      refImg1.value?.classList.remove("click-animation")
      refImg2.value?.classList.remove("click-animation")
    }, 400) // 立即结束未完成的动画
    setTimeout(() => {
      if (refAudio.value) {
        refAudio.value.muted = true
      }
    }, 800)
    setTimeout(() => {
      document.body.removeChild(elMeg)
    }, 800) // 移除时间略小于动画时间 防止闪烁
  }, 900) // 节流时间略大于点击动画时间

  const ePreventDefault = (e: Event) => {
    e.preventDefault()
  }

  onMounted(() => {
    // 防止移动端双击时局部视图被放大
    document.body.addEventListener("click", ePreventDefault)

    return () => {
      document.body.removeEventListener("click", ePreventDefault)
    }
  })
</script>

<template>
  <div class="flex place-items-center">
    <img
      v-show="isDark"
      class="muyu w-80% max-w-xl mx-auto select-none"
      :src="ImgMuyuDark"
      alt="木鱼"
      ref="refImg1"
      @click="onClickHandle"
    />
    <img
      v-show="!isDark"
      class="muyu w-80% max-w-xl mx-auto select-none"
      :src="ImgMuyuLight"
      alt="木鱼"
      ref="refImg2"
      @click="onClickHandle"
    />
    <audio
      ref="refAudio"
      v-show="false"
      preload="metadata"
    >
      <source
        :src="SoundMuyuOgg"
        type="audio/ogg"
      />
      <source
        :src="SoundMuyuMp3"
        type="audio/mpeg"
      />
    </audio>
  </div>
</template>

<style scoped lang="scss">
  .muyu {
    transition: all 0.2s ease-in-out;

    &.click-animation {
      transform: scale(0.85);
    }
  }

  :global(.msg) {
    position: absolute;
    top: 20%;
    left: 75%;
    color: #000;
    font-size: 1.5rem;

    -webkit-animation: 1.1s ease-in-out 1 alternate moveUp;
    animation: 1.1s ease-in-out 1 alternate moveUp;
  }
  :global(html.dark .msg) {
    color: #fff;
  }
  @keyframes moveUp {
    0% {
      top: 20%;
      opacity: 1;
      font-size: 1.5rem;
    }
    100% {
      top: 5%;
      opacity: 0.2;
      font-size: 1rem;
    }
  }
</style>
