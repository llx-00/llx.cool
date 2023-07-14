---
title: Hello World
date: 2023-7-1
---

# Hello World

```ts
import { useDark, useToggle } from "@vueuse/core";

export const isDark = useDark();
export const toggleDark = useToggle(isDark);
```
