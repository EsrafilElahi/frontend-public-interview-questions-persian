// توی حالت عادی ری اکت وقتی تغییری اتفاق میفته. یو آی رو همه شو یکجا آپدیت میکنه تمام کامپوننت ها. اینپوت ها . لیست ها . ریزالت ها و ... همه شو به یکباره آپدیت میکنه تو صفحه
// اصلا توجه نمیکنه فانکشنی سنگین هست یا نه؟ ایونتی سنگین هست یا نه؟ 
// وقتی ایونتی. فانکشنی سنگین هست به يو آی آسیب میزنه و کند میکنه

// ولی وقتی از ترنزیشن استفاده کنیم. اون بخشی که سنگین هست رو میاد اولویت پایین میده و با تاخیر آپدیت میکنه یو آی اون بخش رو 
// و پندینگ هم داره برای هندل کردن این تاخیر 

// code example
import { useTransition } from 'react';

export default function TabButton({ children, isActive, onClick }) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>
  }
  if (isPending) {
    return <b className="pending">{children}</b>;
  }
  return (
    <button onClick={() => {
      startTransition(() => {
        onClick();
      });
    }}>
      {children}
    </button>
  );
}
