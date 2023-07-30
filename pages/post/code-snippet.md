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

## 利用 `Array.prototype.reduce()` 统计字符串 CountMap

```ts
function getStrCountMap(str: string) {
  return str.split("").reduce((map, item) => {
    map.set(item, (map.get(item) || 0) + 1);
    return map;
  }, new Map<string, number>());
}
```
