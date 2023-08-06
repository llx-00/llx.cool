---
title: 一些有趣的代码片段
subtitle: 持续更新中
date: 2023-7-27
---

<PageTitle />

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

## 牛顿迭代法实现 `Math.sqrt()`

```ts
function mySqrt(x: number) {
  const precision = 0.1;
  let ans = x / 2,
    last;

  do {
    last = ans;
    ans = (ans + x / ans) / 2;
  } while (Math.abs(ans - last) > precision);

  return ans >> 0;
}
```
