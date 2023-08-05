---
title: 代码片段集
# date: 2023-7-27
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

add(1)(2)(3); // 6
```
