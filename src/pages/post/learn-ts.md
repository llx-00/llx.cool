---
title: TypeScript 笔记
subtitle: 持续更新中
date: 2023-8-16
type: post
---

## `any` & `unknown`

`any` 类型除了关闭类型检查，还会污染其他具有正确类型的变量。

```ts
let x: any = "hello"
let y: number

y = x // 不报错
y * 123 // 不报错，实际为 `"hello" * 123`
```

为解决污染问题，TypeScript 3.0 引入了`unknown`类型，可以视为严格版的`any`。

`unknown`与`any`基本一致，可被赋值任意类型，但不能直接赋值给其他类型的变量（除`any`和`unknown`类型）。

## 装饰器

装饰器提供了一种添加元数据、修改行为、验证或扩展目标元素功能的机制。它们是在运行时执行的函数。多个装饰器可以应用于一个声明。

### 类装饰器

扩展现有类，例如添加属性或方法、收集类的实例。

```ts
type Constructor<T = {}> = new (...args: any[]) => T

function toCustomString<Class extends Constructor>(
  Value: Class,
  context: ClassDecoratorContext<Class>
) {
  return class extends Value {
    constructor(...args: any[]) {
      super(...args)
      console.log(JSON.stringify(this))
      console.log(JSON.stringify(context))
    }
  }
}

@toCustomString
class Person {
  name: string

  constructor(name: string) {
    this.name = name
  }

  greet() {
    return "Hello, " + this.name
  }
}
const person = new Person("longxiang")
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
    return value.toUpperCase()
  }
}

class MyClass {
  @upperCase
  prop1 = "hello!"
}

console.log(new MyClass().prop1) // Logs: HELLO!
```

### 方法装饰器

更改或增强方法的行为。

```ts
function log<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >
) {
  const methodName = String(context.name)

  function replacementMethod(this: This, ...args: Args): Return {
    console.log(`LOG: Entering method '${methodName}'.`)
    const result = target.call(this, ...args)
    console.log(`LOG: Exiting method '${methodName}'.`)
    return result
  }

  return replacementMethod
}

class MyClass {
  @log
  sayHello() {
    console.log("Hello!")
  }
}

console.log(new MyClass().sayHello()) // Logs: Hello!
```

### 工具类型

常用的内置工具来操作类型。

#### `Awaited<T>`

构造一个递归解包 Promise 的类型。

```ts
type A = Awaited<Promise<string>> // string
```

#### `Partial<T>` & `Required<T>`

构造一个类型，并将 T 的所有属性设置为可选/必选。

```ts
type Person = {
  name: string
  age: number
}

// { name?: string | undefined; age?: number | undefined; }
type A = Partial<Person>
// { name: string; age: number; }
type B = Required<A>
```

#### `Readonly<T>`

构造一个类型，并将 T 的所有属性设置为只读。

#### `Record<K, T>`

构造一个具有类型 T 的一组属性 K 的类型。

#### `Pick<T, K>`

通过从 T 中选取指定属性 K 来构造类型。

#### `Omit<T, K>`

通过从 T 中省略指定属性 K 来构造类型。

```ts
type Product = {
  name: string
  price: number
}

// { name: string; }
type Name = Omit<Product, "price">
```

#### `Exclude<T, U>`

通过从 T 中排除类型 U 的所有值来构造类型。

```ts
type Union = "a" | "b" | "c"
type MyType = Exclude<Union, "a" | "c"> // b
```

#### `Extract<T, U>`

通过从 T 中提取类型 U 的所有值来构造类型。

```ts
type Union = "a" | "b" | "c"
type MyType = Extract<Union, "a" | "c"> // a | c
```

#### `NonNullable<T>`

通过从 T 中排除 null 和 undefined 来构造类型。

```ts
type Union = "a" | null | undefined | "b"
type MyType = NonNullable<Union> // 'a' | 'b'
```

#### `Parameters<T>`

提取函数类型 T 的参数类型。

```ts
type Func = (a: string, b: number) => void
type MyType = Parameters<Func> // [a: string, b: number]
```

#### `ConstructorParameters<T>`

提取构造函数类型 T 的参数类型。

```ts
class Person {
  constructor(public name: string, public age: number) {}
}

// [name: string, age: number]
type PersonConstructorParams = ConstructorParameters<typeof Person>
const params: PersonConstructorParams = ["John", 30]
const person = new Person(...params)
// Person { name: 'John', age: 30 }
console.log(person)
```

#### `ReturnType<T>`

提取函数类型 T 的返回类型。

```ts
type Func = (name: string) => number
// number
type MyType = ReturnType<Func>
```

#### `InstanceType<T>`

提取类类型 T 的实例类型。

```ts
class Person {
  name: string

  constructor(name: string) {
    this.name = name
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}!`)
  }
}

type PersonInstance = InstanceType<typeof Person>

const person: PersonInstance = new Person("John")

// Hello, my name is John!
person.sayHello()
```

#### `ThisParameterType<T>`

从函数类型 T 中提取“this”参数的类型。

```ts
interface Person {
  name: string
  greet(this: Person): void
}
// Person
type PersonThisType = ThisParameterType<Person["greet"]>
```

#### `OmitThisParameter<T>`

从函数类型 T 中删除“this”参数。

```ts
function capitalize(this: String) {
  return this[0].toUpperCase + this.substring(1).toLowerCase()
}
// () => string
type CapitalizeType = OmitThisParameter<typeof capitalize>
```

#### `ThisType<T>`

作为上下文类型 this 的一部分。

```ts
type Logger = {
  log: (error: string) => void
}

let helperFunctions: { [name: string]: Function } & ThisType<Logger> = {
  hello: function () {
    this.log("some error") // 有效，因为“log”是“this”的一部分
    this.update() // 无效
  },
}
```

#### `Uppercase<T>` & `Lowercase<T>`

将输入类型 T 的名称设为大/小写。

```ts
type MyType = Uppercase<"abc"> // "ABC"
type MyType = Lowercase<"ABC"> // "abc"
```

#### `Capitalize<T>` & `Uncapitalize<T>`

将输入类型 T 的名称大写/取消大写。

```ts
type MyType = Capitalize<"abc"> // "Abc"
type MyType = Uncapitalize<"Abc"> // "abc"
```
