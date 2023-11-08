import { useDark, useToggle } from "@vueuse/core"

export const isDark = useDark()
export const toggleDark = useToggle(isDark)

/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
export function toggleDarkTransition(event: MouseEvent) {
  // @ts-ignoreexperimental API
  const isAppearanceTransition = document.startViewTransition

  if (!isAppearanceTransition) {
    devLog("过渡动画不可用")
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: "ease-in-out",
        pseudoElement: isDark.value
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      }
    )
  })
}
