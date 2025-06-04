# فرآیند SSR و Hydration در Next.js

این سند مراحل Server-Side Rendering (SSR) و Hydration در Next.js را به صورت قدم به قدم توضیح میدهد.

## فهرست مطالب
1. [مقدمه](#مقدمه)
2. [Server-Side Rendering (SSR)](#server-side-rendering-ssr)
3. [Hydration](#hydration)
4. [مقایسه SSR و Hydration](#مقایسه-ssr-و-hydration)
5. [مثال عملی](#مثال-عملی)
6. [چرا این فرآیند مهم است؟](#چرا-این-فرآیند-مهم-است)

## مقدمه
Next.js از دو تکنیک اصلی برای رندر کردن صفحات استفاده میکند:
- **SSR**: رندر کردن صفحه در سرور
- **Hydration**: فعال کردن تعاملات در سمت کلاینت

## Server-Side Rendering (SSR)

1. **درخواست کاربر**  
   کاربر آدرس صفحه را در مرورگر وارد میکند.

2. **پردازش در سرور**  
   - سرور Next.js کد React را اجرا میکند
   - کامپوننتها به HTML تبدیل میشوند
   - دادههای مورد نیاز از APIها دریافت میشود

3. **ساخت صفحه نهایی**  
   سرور یک صفحه HTML کامل میسازد (با تمام محتوای اولیه)

4. **ارسال به کاربر**  
   HTML ساخته شده به مرورگر کاربر ارسال میشود

## Hydration

5. **دریافت جاوااسکریپت**  
   مرورگر فایلهای JS برنامه را دانلود میکند

6. **اتصال React به DOM**  
   - React به HTML موجود "میچسبد"
   - این فرآیند Hydration نام دارد

7. **فعال شدن تعاملات**  
   - event handlerها متصل میشوند
   - stateها فعال میشوند
   - برنامه مانند یک SPA معمولی کار میکند

## مقایسه SSR و Hydration

| ویژگی | SSR | Hydration |
|--------|-----|-----------|
| محل اجرا | سرور | کلاینت |
| خروجی | HTML کامل | تعاملات JS |
| سرعت نمایش | سریع | نیاز به زمان پردازش |
| سئو | بهینه | - |

## مثال عملی

```jsx
// کامپوننت LikeButton
function LikeButton() {
  const [likes, setLikes] = useState(0);
  
  return (
    <button onClick={() => setLikes(likes + 1)}>
      {likes} Likes
    </button>
  );
}