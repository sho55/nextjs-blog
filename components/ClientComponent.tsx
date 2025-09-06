"use client";
// components/ClientComponent.tsx
// 'use client'ディレクティブでクライアントコンポーネントを明示

import { useState, useEffect } from "react";

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("これはブラウザのコンソールに表示されます");
  }, []);

  const handleButtonClick = () => {
    setCount(count + 1);
    setMessage(`ボタンが${count + 1}回クリックされました！`);
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">クライアントコンポーネント</h2>
      <p className="text-sm text-gray-600 mb-4">
        このコンポーネントはブラウザでレンダリングされます
      </p>
      
      <div className="bg-white p-4 rounded">
        <div className="mb-4">
          <button
            onClick={handleButtonClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            クリック: {count}
          </button>
        </div>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="何か入力してください"
            className="w-full px-3 py-2 border rounded"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        
        {message && (
          <p className="text-green-600 font-medium">{message}</p>
        )}
        client-demo
        <p className="mt-2 text-sm text-gray-600">
          リアルタイムでインタラクション(対話的)ができます！
        </p>
      </div>
    </div>
  );
}