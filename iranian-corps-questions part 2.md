## پارت دوم سوالات React و Next — همراه با مثال

### 1. تفاوت align-items با align-content

**توضیح:**
- `align-items`: چینش آیتم‌ها در یک ردیف (محور عمودی) — روی خود آیتم‌ها اثر دارد.
- `align-content`: وقتی چند ردیف داریم، فاصله بین ردیف‌ها را تنظیم می‌کند.

**کد نمونه:**
```css
.container {
  display: flex;
  align-items: center;
  align-content: space-between;
  flex-wrap: wrap;
  height: 200px;
}
```

---

### 2. مفهوم position در CSS

**توضیح:**
- `static`: پیش‌فرض، مکان عادی در صفحه.
- `relative`: نسبت به مکان خودش.
- `absolute`: نسبت به اولین والد position‌دار.
- `fixed`: نسبت به viewpoer.
- `sticky`: بسته به اسکرول، ترکیبی از relative و fixed

**کد نمونه:**
```css
.box {
  position: absolute;
  top: 10px;
  left: 20px;
}
```

---

### 3. Sass Module چیست؟

**توضیح:**
- فایل Sass با پسوند `.module.scss` که فقط در همان کامپوننت قابل استفاده است.

**کد نمونه:**
```scss
/* styles.module.scss */
.button {
  background: red;
}
```
```jsx
import styles from './styles.module.scss';

function MyBtn() {
  return <button className={styles.button}>Click</button>;
}
```

---

### 4. اگر دو کلاس همنام در Sass Module تعریف کنیم چه می‌شود؟

**توضیح:**
- چون کلاس‌ها به صورت لوکال (scoped) تبدیل می‌شوند، تداخلی ایجاد نمی‌شود.

Sass Module نام کلاس‌ها را به صورت خودکار منحصر به فرد می‌کند (با اضافه کردن هش)

دو کلاس با نام یکسان در فایل‌های مختلف مشکلی ایجاد نمی‌کنند

هر کلاس فقط در ماژول خودش اعمال می‌شود


**کد نمونه:**
```scss
/* Button.module.scss و Card.module.scss */
.button {
  color: white;
}
```
در خروجی Webpack:
```css
.Button_button__abc123
.Card_button__def456
```

---

### 5. تفاوت Primitive و Non-Primitive

**توضیح:**
- **Primitive**: مقادیر ساده مثل string, number, boolean.
- **Non-Primitive**: مثل object, array, function.

**کد نمونه:**
```js
const a = 1; // primitive
const b = { value: 1 }; // non-primitive
```

---

### 6. تفاوت Mutable و Immutable

**توضیح:**
- **Mutable**: قابل تغییر (object, array).
- **Immutable**: غیرقابل تغییر (string, number).

**کد نمونه:**
```js
let str = "hello";
str[0] = "H"; // تغییری نمی‌کند

let arr = [1, 2];
arr[0] = 99; // تغییر می‌کند
```

---

### 7. پیاده‌سازی Memoization

**کد نمونه:**
```js
function memoize(fn) {
  const cache = {};
  return function(x) {
    if (cache[x]) return cache[x];
    const result = fn(x);
    cache[x] = result;
    return result;
  };
}

const square = memoize(x => x * x);
console.log(square(5));
console.log(square(5)); // از cache
```

---

### 8. پیاده‌سازی map با TypeScript

**کد نمونه:**
```ts
function map<T, U>(arr: T[], cb: (item: T, index: number) => U): U[] {
  const result: U[] = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(cb(arr[i], i));
  }
  return result;
}

const output = map([1, 2, 3], x => x * 2);
console.log(output); // [2, 4, 6]
```

---

### 9. تفاوت const و let در useState

**توضیح:**
- تفاوتی در مقدار state ایجاد نمی‌کند چون React خودش مدیریت state را انجام می‌دهد.

```js
const [count, setCount] = useState(0); // صحیح
let [count, setCount] = useState(0); // غیرمعمول (اما کار می‌کند)

// تفاوت:
// - const از تغییر متغیر جلوگیری می‌کند (اما setCount کار می‌کند)
// - let اجازه تغییر متغیر را می‌دهد (اما این روش توصیه نمی‌شود)
```

**کد نمونه:**
```js
const [count, setCount] = useState(0); // معمول
let [value, setValue] = useState(10);  // غیرمعمول ولی قابل اجرا
```

---

### 10. اگر useState با const تعریف شده، چطور مقدار تغییر می‌کند؟

**توضیح:**
- `count` تغییر نمی‌کند، بلکه React مقدار جدید را ذخیره می‌کند و دوباره رندر می‌کند.

**مثال:**
```js
const [count, setCount] = useState(0);
setCount(count + 1); // مقدار قبلی حفظ نمی‌شود، جدید جایگزین می‌شود
```

---

### 11. تفاوت Merge و Rebase

**Merge:** ترکیب دو تاریخچه با حفظ همه commit ها.
**Rebase:** تغییر پایه‌ی شاخه برای تاریخچه‌ای تمیزتر.

**تصویری:**
```bash
# merge
feature ←───← main
        \___/

# rebase
main ←───← feature (بدون شاخه فرعی)
```

---

### 12. تفاوت Server Component با SSR

**SSR (Server Side Rendering):** کامپوننت در سرور رندر و HTML ارسال می‌شود.
**Server Component:** کدی است که فقط در سرور اجرا می‌شود و اصلاً به کلاینت نمی‌رسد.

**مزیت Server Component:**
- کاهش حجم جاوااسکریپت سمت کلاینت
- کاهش bundle size سمت کلاینت
- امنیت و عملکرد بهتر

---

### 13. تابع معکوس‌ساز رشته

**کد نمونه:**
```js
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString("hello")); // "olleh"
```

