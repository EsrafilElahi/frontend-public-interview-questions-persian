// Abort Controller In Fetch Request
const upload = (file: File) => {
  const controller = new AbortController();

  const response = fetch("/upload", {
    method: "POST",
    body: file,
    // there are 2 condition to cancel fetch request:
    // 1.abort this request on call 'controller.abort()'
    // 2.if it takes more than 3000ms
    signal: AbortSignal.any([controller.signal, AbortSignal.timeout(3000)]),
  });

  return { response, controller };
};

// Abort Listener
const controller = new AbortController();
controller.signal.addEventListener("abort", () => {
  // you can make any logic here
  console.log(controller.signal.reason);
});

controller.abort("user_canceled");

// Nextjs client side :
// app/upload/page.tsx
'use client';

import { useState, useRef } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('آماده برای آپلود');
  const controllerRef = useRef<AbortController | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setStatus('در حال آپلود...');
      
      const formData = new FormData();
      formData.append('file', file);

      // اضافه کردن timeout به همراه امکان لغو دستی
      const timeoutSignal = AbortSignal.timeout(30000); // 30 ثانیه timeout
      const combinedSignal = AbortSignal.any([controller.signal, timeoutSignal]);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        signal: combinedSignal,
      });

      if (!response.ok) {
        throw new Error('خطا در آپلود');
      }

      const data = await response.json();
      setStatus('آپلود با موفقیت انجام شد!');
      console.log('نتیجه آپلود:', data);
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setStatus('آپلود لغو شد یا زمان آن به پایان رسید');
      } else {
        setStatus(`خطا: ${error.message}`);
      }
    } finally {
      controllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (controllerRef.current) {
      controllerRef.current.abort('لغو توسط کاربر');
      setStatus('درخواست لغو شد');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">آپلود فایل</h1>
      
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleUpload}
          disabled={!file}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          آپلود فایل
        </button>
        
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          لغو آپلود
        </button>
      </div>
      
      <div className="mb-2">
        <p>وضعیت: {status}</p>
      </div>
      
      {progress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
