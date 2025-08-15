# مقایسه مکانیزم رندرینگ React و Vue

## تفاوت‌های کلیدی

### React

- از **Virtual DOM** برای مقایسه تغییرات استفاده می‌کند
- با هر تغییر state، **کل کامپوننت مجدداً رندر می‌شود**
- بهینه‌سازی نیازمند استفاده از:
  - `React.memo`
  - `useMemo`
  - `useCallback`

### Vue

- از **Virtual DOM هوشمندتر** استفاده می‌کند
- فقط **بخش‌های وابسته به داده‌های تغییرکرده** را رندر می‌کند
- بهینه‌سازی به صورت **پیشفرض** انجام می‌شود
- از سیستم **راکتیویتی مبتنی بر پروکسی** استفاده می‌کند

## مثال‌های کد

### React Example

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  console.log("کل کامپوننت رندر شد");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>افزایش</button>
      <p>تعداد: {count}</p>
      <ChildComponent />
    </div>
  );
}

function ChildComponent() {
  console.log("کامپوننت فرزند هم رندر شد");
  return <div>محتوای ثابت</div>;
}
```

<span dir='rtl'>
با هر کلیک، هر دو console.log اجرا میشوند، حتی اگر ChildComponent تغییری نکرده باشد!
</span>

### Vue Example

```jsx
<template>
  <div>
    <button @click="count++">افزایش</button>
    <p>تعداد: {{ count }}</p>
    <ChildComponent />
  </div>
</template>

<script>
export default {
  data() {
    return { count: 0 };
  },
  updated() {
    console.log('فقط اگر داده تغییر کند');
  }
};
</script>

<!-- ChildComponent.vue -->
<template>
  <div>محتوای ثابت</div>
</template>

<script>
export default {
  updated() {
    console.log('اگر داده‌ای تغییر نکند، این اجرا نمی‌شود');
  }
};
</script>

{/* # مثال Vue.js 3 با Composition API */}

<template>
  <div>
    <button @click="increment">افزایش</button>
    <p>تعداد: {{ count }}</p>
    <ChildComponent />
  </div>
</template>

<script setup>
import { ref, onUpdated } from 'vue';

const count = ref(0);

const increment = () => {
  count.value++;
};

onUpdated(() => {
  console.log('کامپوننت والد بررسی شد (فقط اگر تغییری اتفاق افتاده باشد)');
});
</script>

<!-- ChildComponent.vue -->
<template>
  <div>محتوای ثابت</div>
</template>

<script setup>
import { onUpdated } from 'vue';

onUpdated(() => {
  console.log('این پیام فقط زمانی نمایش می‌یابد که کامپوننت فرزند واقعاً به‌روزرسانی شود');
});
</script>
```

<span dir='rtl'>
- با کلیک روی دکمه، فقط updated والد اجرا میشود (مگر ChildComponent وابسته به داده‌ای باشد که تغییر کرده).

- Vue به صورت پیشفرض فقط بخش‌هایی از کامپوننت را رندر میکند که واقعاً به داده‌های تغییرکرده وابسته هستند.

مزیت: حتی اگر کامپوننت والد رندر شود، کامپوننت‌های فرزند به صورت خودکار بررسی می‌شوند که آیا نیاز به رندر دارند یا خیر.
</span>

| معیار                      | React                         | Vue                          |
| -------------------------- | ----------------------------- | ---------------------------- |
| **رندر کل کامپوننت**       | ✅ (مگر با `memo` بهینه شود)  | ❌ (فقط بخش‌های تغییرکرده)   |
| **وابسته به دستکاری دستی** | نیاز به `useMemo`/`memo` دارد | هوشمند (پیشفرض)              |
| **مثال**                   | هر کلیک = اجرای کل کد         | هر کلیک = فقط بخش‌های وابسته |
