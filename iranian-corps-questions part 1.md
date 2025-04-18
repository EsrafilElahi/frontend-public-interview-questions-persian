## سوالات مصاحبه فرانت‌اند — پاسخ ساده همراه با مثال کد

---

### 1. مفهوم Event Bubbling و Event Capturing

**توضیح:**

- **Bubbling**: رویداد از فرزند شروع شده و به سمت والدین بالا می‌رود.
- **Capturing**: رویداد از والدین شروع شده و به سمت فرزندان پایین می‌آید.

**کد نمونه:**

```html
<div id="parent">
  <button id="child">Click me</button>
</div>

<script>
  document.getElementById("parent").addEventListener(
    "click",
    () => {
      console.log("Parent clicked");
    },
    false
  ); // bubbling

  document.getElementById("child").addEventListener(
    "click",
    () => {
      console.log("Child clicked");
    },
    false
  );
</script>
```

---

### 2. استفاده از preventDefault در تگ a

**توضیح:**
در یک رویداد کلیک تگ <آ> استفاده می‌شود تا عمل پیش‌فرض آن، مانند پیمایش به یک URL، انجام نشود. این کار معمولاً برای جلوگیری از اجرای عملکرد پیش‌فرض (مثل انتقال به یک صفحه دیگر) و استفاده از JavaScript برای پردازش بیشتر اطلاعات مفید است.

- جلوگیری از عملکرد پیش‌فرض مثل رفتن به لینک.

**کد نمونه:**

```html
<a href="https://example.com" id="link">Go to site</a>

<script>
  document.getElementById("link").addEventListener("click", function (e) {
    e.preventDefault();
    alert("رفتنی در کار نیست!");
  });
</script>
```

---

### 3. قوانین هوک

**توضیح:**

1. هوک‌ها را فقط در سطح بالا (Top Level) فراخوانی کنید
   یعنی:

هوک‌ها را در داخل حلقه‌ها (loops)، شرط‌ها (conditions) یا توابع تو در تو (nested functions) فراخوانی نکنید.
‍‍‍‍‍‍

```jsx
if (condition) {
  const [value, setValue] = useState(0); // ❌ اشتباه - داخل شرط
}

for (let i = 0; i < 10; i++) {
  useEffect(() => {}); // ❌ اشتباه - داخل حلقه
}
```

```jsx
const [value, setValue] = useState(0); // ✅ درست - سطح بالا

useEffect(() => {}); // ✅ درست - سطح بالا
```

2. هوک‌ها را فقط از داخل کامپوننت‌های تابعی ری‌اکت یا هوک‌های سفارشی فراخوانی کنید

```jsx
function regularFunction() {
  const [value, setValue] = useState(0); // ❌ اشتباه - تابع معمولی
}
```

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // ✅ قانون رعایت شده است

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

3. هوک‌های سفارشی (Custom Hooks)

هنگام ساخت هوک‌های سفارشی:

نام هوک باید با use شروع شود (مثلاً useFetch یا useLocalStorage) 

می‌توانید از هوک‌های دیگر درون هوک سفارشی خود استفاده کنید

---

### 4. توضیح Cleanup در useEffect

**توضیح:**

- برای پاک‌سازی تایمرها، سابسکریپشن‌ها و غیره هنگام unmount شدن یا تغییر وابستگی‌ها.

**کد نمونه:**

```jsx
import { useEffect } from "react";

function Timer() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Tick");
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return <p>در حال اجرا...</p>;
}
```

---

### 5. Event Batching

**توضیح:**

- React چند setState را در یک چرخه ترکیب می‌کند تا عملکرد بهتر شود.

**کد نمونه:**

```jsx
import { useState } from "react";

function BatchingExample() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const handleClick = () => {
    setA(a + 1);
    setB(b + 1);
    // هر دو setState با هم batch می‌شوند
  };

  return (
    <button onClick={handleClick}>
      A: {a}, B: {b}
    </button>
  );
}
```

---

### 6. اسکوپ‌ها و TDZ (Temporal Dead Zone)

**توضیح:**

- **Scope**: محدوده‌ای که در آن متغیر در دسترس است.
- **TDZ**: بازه‌ای بین تعریف و مقداردهی `let`/`const` که نمی‌توان به متغیر دسترسی داشت.

**کد نمونه:**

```js
function test() {
  console.log(a); // undefined (var)
  // console.log(b); // خطا: TDZ (برای let)
  var a = 1;
  let b = 2;
}
```

---

### 7. هدر Set-Cookie

**توضیح:**

- سرور این هدر را می‌فرستد تا یک کوکی در مرورگر ذخیره شود.

**کد نمونه:**

```http
HTTP/1.1 200 OK
Set-Cookie: sessionId=abc123; HttpOnly; Secure; Path=/; Max-Age=3600
```

**در Node.js (Express):**

```js
res.setHeader("Set-Cookie", "token=123; HttpOnly; Path=/");
```
