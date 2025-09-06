"use client";

import { useState, useEffect } from "react";
import { getCachedGitHubUser, clearCache } from "@/libs/github-cache";
import { GitHubUser } from "@/libs/github-api";

type CachedGitHubProfileProps = {
  username: string;
};

export default function CachedGitHubProfile({
  username,
}: CachedGitHubProfileProps) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [username]);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getCachedGitHubUser(username);

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.data) {
        setUser(result.data);
        setFromCache(result.fromCache);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "GitHubデータの取得に失敗しました";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // キャッシュをクリアして再取得
  const handleClearCache = () => {
    clearCache(username);
    fetchUserData();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500">データを読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium">エラーが発生しました</h3>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
        <button
          onClick={fetchUserData}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          🔄 再試行
        </button>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* キャッシュ情報 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">GitHub プロフィール</h2>
          <span
            className={`text-xs px-2 py-1 rounded ${
              fromCache
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {fromCache ? "キャッシュから" : "APIから"}
          </span>
        </div>
        <button
          onClick={handleClearCache}
          className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200"
        >
          🔄 更新
        </button>
      </div>

      {/* プロフィール情報 */}
      <div className="flex items-center space-x-6 mb-6">
        <img
          src={user.avatar_url}
          alt={`${username}'s avatar`}
          className="w-16 h-16 rounded-full border-2 border-gray-200"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {user.name || user.login}
          </h3>
          <p className="text-gray-600">@{user.login}</p>
          {user.bio && <p className="text-gray-700 mt-2">{user.bio}</p>}
        </div>
      </div>

      {/* 統計情報 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded">
          <div className="text-xl font-bold text-gray-900">
            {user.public_repos}
          </div>
          <div className="text-sm text-gray-600">リポジトリ</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <div className="text-xl font-bold text-gray-900">
            {user.followers}
          </div>
          <div className="text-sm text-gray-600">フォロワー</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <div className="text-xl font-bold text-gray-900">
            {user.following}
          </div>
          <div className="text-sm text-gray-600">フォロー中</div>
        </div>
      </div>
    </div>
  );
}