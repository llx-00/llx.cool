---
title: React `useDark()`
subtitle: React 版本的 `useDark()`
date: 2023-10-9
---

```ts
import { useEffect, useState } from "react"

export function useDark() {
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  const setting = localStorage.getItem("prefers-color-scheme") || "auto"
  const [isDark, setDark] = useState<boolean>(
    setting === "dark" || (prefersDark && setting !== "light")
  )
  const _HTML = document.documentElement

  useEffect(() => {
    if (isDark !== undefined) {
      if (isDark) {
        _HTML.classList.add("dark")
        localStorage.setItem("prefers-color-scheme", "dark")
      } else {
        _HTML.classList.remove("dark")
        localStorage.removeItem("prefers-color-scheme")
      }
    }
  }, [isDark])

  useEffect(() => {
    const _localTheme = localStorage.getItem("prefers-color-scheme")
    const _mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      setDark(e.matches)
    }
    _mediaQuery.addEventListener("change", handleChange)

    if (_mediaQuery.matches) {
      if (_localTheme === null) {
        setDark(false)
      } else {
        setDark(_localTheme === "dark")
      }
    } else {
      setDark(_localTheme === "dark")
    }

    return () => {
      _mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  function toggleDark() {
    setDark(!isDark)
  }

  return { isDark, toggleDark }
}
```
