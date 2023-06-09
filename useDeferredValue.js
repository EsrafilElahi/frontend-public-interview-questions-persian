مثلا وقتی که یه استیت و یه ست استیت سنگین داریم
در حالت عادی وقتی ست استیت داخل یه فانکشن سنگینی هست و اگه ست استیت اجرا بشه یکم طول میکشه تا استیت آپدیت بشه و نمایش داده بشه
هر دفعه که این ست استیت اجرا میشه مثلا چیزی تایپ کنیم اون فانکشن پشت صحنه سنگین هم احرا میشه و مثلا دو ثانیه طول میکشه تا استیت جدید آپدیت بشه
که توی یو آی نمایش بده


ولی میتونیم با استفاده از این دفرد-ولیو میتونیم اون استیت نهایی آپدیت شده رو دفرد کنیم کنیم که یکم تاخیر داشته باشه
درحالی که اون استیت کار خودشو انجام میده و اون فانکشن سنگین هم تاثیری دیگ نداره
چون استیت جدید آپدیت نمیشه و همون لحظه تو یو آی نمایش نمیده
بخاصر همین ست استیت داره انجام میشه


سنگینی فانکشن بر روی نمایش داده شدن همزمان ست استیت و آپدیت یو آی با استیت جدید هست
نمیتونه هم سریع اون فانکشن سنگین ست استیت رو انجام بده هم یو آی رو با استیت جدید آپدیت کنه

// code example
import { useState, useDeferredValue } from 'react';
import SlowList from './SlowList.js';

export default function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}
