---
title: TypeScript 笔记
subtitle: 持续更新中
date: 2023-8-16
---

<PageTitle />

## `any` & `unknown`

`any` 类型除了关闭类型检查，还会污染其他具有正确类型的变量

```ts
let x: any = "hello";
let y: number;

y = x; // 不报错
y * 123; // 不报错，实际为 `"hello" * 123`
```

为解决污染问题，TypeScript 3.0 引入了`unknown`类型，可以视为严格版的`any`。

`unknown`与`any`基本一致，可被赋值任意类型，但不能直接赋值给其他类型的变量（除`any`和`unknown`类型）。

## 装饰器

装饰器提供了一种添加元数据、修改行为、验证或扩展目标元素功能的机制。它们是在运行时执行的函数。多个装饰器可以应用于一个声明。

### 类装饰器

扩展现有类，例如添加属性或方法、收集类的实例。

```ts
type Constructor<T = {}> = new (...args: any[]) => T;

function toCustomString<Class extends Constructor>(
  Value: Class,
  context: ClassDecoratorContext<Class>
) {
  return class extends Value {
    constructor(...args: any[]) {
      super(...args);
      console.log(JSON.stringify(this));
      console.log(JSON.stringify(context));
    }
  };
}

@toCustomString
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    return "Hello, " + this.name;
  }
}
const person = new Person("longxiang");
/* Logs:
{"name":"Simon"}
{"kind":"class","name":"Person"}
*/
```

### 属性装饰器

修改属性的行为，例如更改初始化值。

```ts
function upperCase<T>(
  target: undefined,
  context: ClassFieldDecoratorContext<T, string>
) {
  return function (this: T, value: string) {
    return value.toUpperCase();
  };
}

class MyClass {
  @upperCase
  prop1 = "hello!";
}

console.log(new MyClass().prop1); // Logs: HELLO!
```
