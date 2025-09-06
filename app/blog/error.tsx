"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-12">
        <div className="bg-red-50 rounded-lg p-8 max-w-md mx-auto">
          {/* エラーアイコン */}
          <span className="mx-auto text-4xl text-red-400 mb-6 ">⚠️</span>

          <h2 className="text-2xl font-bold text-red-800 mb-4">
            データの読み込みに失敗しました
          </h2>

          <p className="text-red-600 mb-6">
            記事データの取得中にエラーが発生しました。
            ネットワーク接続を確認して、もう一度お試しください。
            <br/>
            {error.message}
          </p>

          {/* 詳細情報（開発環境でのみ表示） */}
          {process.env.NODE_ENV === "development" && (
            <div className="bg-white p-4 rounded border mb-4 text-left">
              <h3 className="font-semibold text-red-800 mb-2">開発者情報:</h3>
              <p className="text-red-700 text-sm font-mono">{error.message}</p>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              🔄 再試行
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              🏠 ホームに戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}