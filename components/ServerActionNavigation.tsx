import { searchPosts, filterByCategory } from "@/libs/search-actions";

export default function ServerActionNavigation() {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">
        Server Actions ナビゲーション
      </h3>

      {/* 検索フォーム */}
      <form action={searchPosts} className="mb-4">
        <div className="flex gap-2">
          <input
            name="search"
            type="text"
            placeholder="Server Action検索..."
            className="flex-1 px-3 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            検索
          </button>
        </div>
      </form>

      {/* カテゴリフィルター */}
      <form action={filterByCategory}>
        <div className="flex gap-2">
          <select
            name="category"
            className="flex-1 px-3 py-2 border rounded-md"
          >
            <option value="">カテゴリを選択</option>
            <option value="programming">programming</option>
            <option value="other">other</option>
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            フィルター
          </button>
        </div>
      </form>
    </div>
  );
}