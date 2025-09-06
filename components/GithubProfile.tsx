"use client";

import { useState, useEffect } from "react";
import { getGitHubUser, GitHubUser } from "@/libs/github-api";

type GitHubProfileProps = {
  username: string;
};

export default function GitHubProfile({ username }: GitHubProfileProps) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGitHubData();
  }, [username]);

  const fetchGitHubData = async () => {
    // await new Promise((resolve) => setTimeout(resolve,30000))
    
    setLoading(true);
    setError(null);

    try {
      // GitHubユーザー情報を取得
      const result = await getGitHubUser(username);

      if (result.error) {
        throw new Error(`ユーザー情報の取得に失敗: ${result.error}`);
      }

      if (result.data) {
        setUser(result.data);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "GitHubデータの取得に失敗しました";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ローディング状態
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
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center p-3 bg-gray-50 rounded">
                <div className="h-6 bg-gray-200 rounded w-8 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // エラー状態
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium">
            GitHub データの取得に失敗
          </h3>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
        <button
          onClick={fetchGitHubData}
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
      {/* プロフィール情報 */}
      <div className="flex items-center space-x-6 mb-6">
        <img
          src={user.avatar_url}
          alt={`${username}'s avatar`}
          className="w-16 h-16 rounded-full border-2 border-gray-200"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {user.name || user.login}
          </h2>
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