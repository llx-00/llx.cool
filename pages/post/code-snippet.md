---
title: 代码片段集
date: 2023-7-27
---

# 记录一些有趣的代码片段

_持续更新中_

## 柯里化 `add(1)(2)(3)`

```ts
type TypeFunAdd = (...arg: number[]) => TypeFunAdd;

function add(...arg: number[]) {
  const f: TypeFunAdd = add.bind(null, ...arg);

  f.toString = () => arg.reduce((sum, i) => sum + i, 0).toString();

  return f;
}
```

## React 版本 `useDark()`

```ts
import { useEffect, useState } from "react";

export default function () {
  const [isDark, setDark] = useState<boolean>();
  const _HTML = document.children[0];

  useEffect(() => {
    if (isDark !== undefined) {
      if (isDark) {
        _HTML.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        _HTML.classList.remove("dark");
        localStorage.removeItem("theme");
      }
    }
  }, [isDark]);

  useEffect(() => {
    const _localTheme = localStorage.getItem("theme");
    const _mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setDark(e.matches);
    };
    _mediaQuery.addEventListener("change", handleChange);

    if (_mediaQuery.matches) {
      if (_localTheme === null) {
        setDark(false);
      } else {
        setDark(_localTheme === "dark");
      }
    } else {
      setDark(_localTheme === "dark");
    }

    return () => {
      _mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  function toggleDark() {
    setDark(!isDark);
  }

  return { isDark, toggleDark };
}
```
