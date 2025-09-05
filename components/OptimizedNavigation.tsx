"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function OptimizedNavigation() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  // ローディング付きナビゲーション
const navigateWithLoading = (href: string) => {
    setLoadingPath(href);
  // JavaScriptでのページ移動（ローディング付き）
  startTransition(async() => {
    // 3秒まつ
    await new Promise((resolve) => setTimeout(resolve, 3000));
    router.push(href);
      setLoadingPath(null);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">最適化されたナビゲーション</h3>

      {/* ローディング表示 */}
      {isPending && loadingPath && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md">
         <div className="flex items-center">
            <div className="animate-spin px-3 rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <span className="text-blue-600 text-sm">
              {loadingPath} に移動中...
            </span>
          </div>
        </div>
      )}

      {/* ナビゲーションボタン */}
      <div className="space-y-2">
        <button
          onClick={() => navigateWithLoading("/blog")}
          disabled={isPending}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          ブログ一覧
        </button>
        <button
          onClick={() => navigateWithLoading("/blog/category/programming")}
          disabled={isPending}
          className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          Programming カテゴリ
        </button>
        <button
          onClick={() => navigateWithLoading("/about")}
          disabled={isPending}
          className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:bg-gray-400"
        >
          About ページ
        </button>
      </div>
    </div>
  );
}