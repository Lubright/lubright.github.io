這裡有一個 **OOP（物件導向程式設計）** 的 **Node.js** 範例，包括 **類別 (class)**、**繼承 (inheritance)**、**方法覆寫 (method overriding)**，以及 **public/private/static/final** 的使用方式。

---

### **📌 Node.js OOP Class 範例**

```js
class Animal {
  // 公有屬性
  name;

  // 私有屬性（# 在 ES6+ 表示 private）
  #age;

  // 靜態屬性
  static kingdom = "Animalia";

  // Constructor 建構子
  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }

  // 公開方法
  speak() {
    console.log(`${this.name} makes a noise.`);
  }

  // 私有方法（外部無法直接呼叫）
  #getAge() {
    return this.#age;
  }

  // 取得私有屬性的方法
  getAgeInfo() {
    return `${this.name} is ${this.#getAge()} years old.`;
  }

  // 靜態方法 (可直接用類別名稱呼叫)
  static getKingdom() {
    return `All animals belong to the ${this.kingdom} kingdom.`;
  }
}

// 繼承 Animal
class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age); // 呼叫父類別的 constructor
    this.breed = breed;
  }

  // 覆寫 (Method Overriding)
  speak() {
    console.log(`${this.name} barks.`);
  }
}

// 🚀 使用範例
const dog = new Dog("Buddy", 3, "Golden Retriever");

console.log(dog.name); // Buddy
console.log(dog.getAgeInfo()); // Buddy is 3 years old.
dog.speak(); // Buddy barks.

console.log(Animal.getKingdom()); // All animals belong to the Animalia kingdom.

// ❌ 私有屬性無法直接訪問
// console.log(dog.#age); // SyntaxError: Private field '#age' must be declared in an enclosing class
```

---

### **📌 JavaScript 的 Method Overriding**

在 **JavaScript 中的繼承** (`extends`) 允許子類別覆寫 (`override`) 父類別的方法。

- **super.method()** 可以用來呼叫 **父類別的方法**。

```js
class Parent {
  greet() {
    console.log("Hello from Parent");
  }
}

class Child extends Parent {
  greet() {
    super.greet(); // 先呼叫父類別的方法
    console.log("Hello from Child");
  }
}

const child = new Child();
child.greet();
// Hello from Parent
// Hello from Child
```

---

### **📌 Public / Private / Static / Final 的概念**

| **修飾詞**             | **JavaScript OOP 實現方式**                              | **範例**                                 |
| ---------------------- | -------------------------------------------------------- | ---------------------------------------- |
| **Public**             | 預設屬性與方法都是 public                                | `this.name = "John";`                    |
| **Private**            | 用 `#` 宣告私有屬性/方法                                 | `#age = 25;`                             |
| **Static**             | `static` 修飾屬性與方法，只能用類別訪問                  | `static kingdom = "Animalia";`           |
| **Final (不可被覆寫)** | **JS 沒有 `final`，但可以用 `Object.freeze()` 限制覆寫** | `Object.freeze(Class.prototype.method);` |

#### **❌ JavaScript 沒有 `final`，但可以防止覆寫**

```js
class Base {
  finalMethod() {
    console.log("This is a final method.");
  }
}

// 凍結方法，防止覆寫
Object.freeze(Base.prototype.finalMethod);

class Sub extends Base {
  finalMethod() {
    console.log("Trying to override..."); // ❌ TypeError
  }
}

const obj = new Sub();
obj.finalMethod(); // TypeError: Cannot assign to read only property 'finalMethod' of object
```

---

### **🚀 結論**

1. **Method Overriding**：透過 `extends` + `super.method()` 來覆寫父類別方法。
2. **Public / Private**：`this.property` 為公有，`#property` 為私有。
3. **Static**：使用 `static` 宣告靜態屬性與方法，只能透過類別訪問。
4. **Final**：JavaScript 沒有內建 `final`，但可以用 `Object.freeze()` 防止覆寫。

這樣的 OOP 設計可以應用在 **Node.js 後端開發**，例如 `class UserModel` 負責操作 MongoDB 資料庫，或者 `class AuthService` 負責 JWT 驗證。 🎯🚀

### **JavaScript 允許方法 Overloading 嗎？**

在 **JavaScript** 中，**沒有原生的函式重載 (Overloading)**，因為 **JavaScript 是動態語言**，**函式沒有固定的參數類型與數量**，所以當你在同一個類別或範圍內定義多個同名函式時，**後定義的函式會覆蓋前面的函式**。

---

### **🚫 不支援 Overloading 的示例**

在許多靜態語言（如 Java、C++），你可以這樣做：

```java
class Example {
  void greet() { System.out.println("Hello!"); }
  void greet(String name) { System.out.println("Hello, " + name + "!"); }
}
```

但在 JavaScript 中，這樣的 Overloading **不會生效**：

```js
class Example {
  greet() {
    console.log("Hello!");
  }

  greet(name) {
    console.log("Hello, " + name + "!");
  }
}

const obj = new Example();
obj.greet(); // 只會執行 "Hello, undefined!"，因為前面的方法被覆蓋了
obj.greet("Tom"); // Hello, Tom!
```

這是因為 **JavaScript 只會保留最後定義的 `greet` 方法**，前面定義的會被覆蓋。

---

## **✅ 如何在 JavaScript 模擬 Overloading？**

### **方法 1️⃣：使用 `arguments` 處理不同數量的參數**

```js
class Example {
  greet() {
    if (arguments.length === 0) {
      console.log("Hello!");
    } else if (arguments.length === 1) {
      console.log("Hello, " + arguments[0] + "!");
    }
  }
}

const obj = new Example();
obj.greet(); // Hello!
obj.greet("Tom"); // Hello, Tom!
```

👉 `arguments` 是 JavaScript 內建的變數，**可用來處理不確定數量的參數**。

---

### **方法 2️⃣：使用 `default parameters`**

```js
class Example {
  greet(name = "Guest") {
    console.log(`Hello, ${name}!`);
  }
}

const obj = new Example();
obj.greet(); // Hello, Guest!
obj.greet("Tom"); // Hello, Tom!
```

👉 如果沒有傳入 `name`，則會使用預設值 `"Guest"`。

---

### **方法 3️⃣：使用 `typeof` 或 `instanceof` 判斷參數類型**

```js
class Example {
  greet(input) {
    if (typeof input === "undefined") {
      console.log("Hello!");
    } else if (typeof input === "string") {
      console.log("Hello, " + input + "!");
    } else if (typeof input === "number") {
      console.log("Hello, you are visitor #" + input);
    }
  }
}

const obj = new Example();
obj.greet(); // Hello!
obj.greet("Tom"); // Hello, Tom!
obj.greet(42); // Hello, you are visitor #42
```

👉 可以根據 **不同的參數類型** 來決定要執行哪種行為。

---

### **方法 4️⃣：使用 ES6 `rest parameter (...)`**

如果要處理更多 **變數數量不固定的參數**：

```js
class Example {
  greet(...names) {
    if (names.length === 0) {
      console.log("Hello!");
    } else {
      console.log("Hello, " + names.join(", ") + "!");
    }
  }
}

const obj = new Example();
obj.greet(); // Hello!
obj.greet("Tom"); // Hello, Tom!
obj.greet("Tom", "Amy"); // Hello, Tom, Amy!
```

👉 `...names` 會收集所有參數，變成一個陣列 (Array)。

---

## **🚀 結論**

JavaScript **不支援 Overloading**，但我們可以透過：

1. **`arguments`** 來處理變數數量不固定的參數
2. **`default parameters`** 設定預設值
3. **`typeof` 或 `instanceof`** 來判斷參數類型
4. **`rest parameter (...)`** 來收集所有參數

這些技巧可以達到類似 Overloading 的效果！🎯🚀

### **JavaScript 沒有原生的 `enum`，但可以用幾種方式模擬**

在 TypeScript 中有 `enum`，但 **JavaScript 本身沒有**。不過，我們可以透過 **Object、Freeze、Symbol 或 Map** 來模擬 `enum` 的行為。

---

## **🟢 1. 使用 `Object.freeze()` (最常見)**

```js
const Colors = Object.freeze({
  RED: "red",
  GREEN: "green",
  BLUE: "blue",
});

console.log(Colors.RED); // "red"
console.log(Colors.GREEN); // "green"

// Colors.RED = "yellow"; // 無法修改，因為 `freeze` 讓 `Colors` 變成不可變物件
```

👉 `Object.freeze()` **讓 `enum` 變成不可變的常數物件**，防止意外修改。

---

## **🟡 2. 使用 `Symbol`**

如果只需要唯一性而不需要具體值，可以用 `Symbol`：

```js
const Directions = {
  UP: Symbol("UP"),
  DOWN: Symbol("DOWN"),
  LEFT: Symbol("LEFT"),
  RIGHT: Symbol("RIGHT"),
};

console.log(Directions.UP); // Symbol(UP)
console.log(Directions.LEFT === Directions.RIGHT); // false
```

👉 `Symbol` 保證唯一性，但不能直接列舉 `enum` 的值。

---

## **🟠 3. 使用 ES6 `Map`**

```js
const Status = new Map([
  ["PENDING", 0],
  ["APPROVED", 1],
  ["REJECTED", 2],
]);

console.log(Status.get("PENDING")); // 0
console.log(Status.get("APPROVED")); // 1
```

👉 `Map` 讓 `enum` 更有彈性，可動態增減值。

---

## **🔵 4. 使用 `TypeScript` 的 `enum`**

如果用 TypeScript，`enum` 就是內建功能：

```ts
enum Colors {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

console.log(Colors.RED); // "red"
```

👉 **但 JavaScript 不支援 `enum`，所以這只能在 TypeScript 中用**。

---

## **🚀 總結**

✅ **推薦做法** → `Object.freeze()` (簡單、好用)  
✅ **如果要唯一性** → `Symbol`  
✅ **如果要動態增減** → `Map`  
✅ **如果用 TypeScript** → 內建 `enum` 🎯
