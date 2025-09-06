"use client";

import { useState, useMemo } from "react";
import { PostFromJsonPlaceHolderWithUser } from "@/types/post";

type BlogSearchProps = {
  posts: PostFromJsonPlaceHolderWithUser[];
};

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // 検索結果をリアルタイムで計算
  const filteredPosts = useMemo(() => {
    if (searchTerm.trim() === "") {
      return posts;
    }

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.body || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  // 検索語句をハイライト表示する関数
  const highlightText = (text: string) => {
    if (!searchTerm.trim()) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* 検索フォーム */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="relative">
          <input
            type="text"
            placeholder="記事を検索... (タイトル、内容)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute left-3 top-3.5 h-5 w-5 text-gray-400">
            🔎
          </span>
        </div>

        {searchTerm && (
          <div className="mt-3 text-sm text-gray-600">
            「{searchTerm}」の検索結果: {filteredPosts.length}件
          </div>
        )}
      </div>

      {/* 検索結果 */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {highlightText(post.title)}
              </h2>

              {post.user && (
                <p className="text-blue-600 text-sm mb-2">
                  by {post.user.name}
                </p>
              )}

              <p className="text-gray-600 mb-4 line-clamp-3">
                {highlightText((post.body || "").slice(0, 200) + "...")}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  記事ID: {post.id}
                </span>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  続きを読む →
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <span className="left-3 top-3.5 text-4xl text-gray-400">🫥</span>
            <p className="text-gray-500 text-lg">
              {searchTerm
                ? "検索結果が見つかりませんでした"
                : "記事がありません"}
            </p>
            {searchTerm && (
              <p className="text-gray-400 text-sm mt-2">
                違うキーワードで検索してみてください
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}