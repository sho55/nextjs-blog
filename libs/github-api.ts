import { fetchData } from "./api-client";

// GitHubユーザー情報の型定義（必要最小限）
export type GitHubUser = {
  login: string; // ユーザー名
  name: string | null; // 表示名
  bio: string | null; // 自己紹介
  avatar_url: string; // プロフィール画像
  public_repos: number; // 公開リポジトリ数
  followers: number; // フォロワー数
  following: number; // フォロー数
};

// GitHubユーザー情報を取得する関数
export async function getGitHubUser(username: string) {
  const url = `https://api.github.com/users/${username}`;
  return await fetchData(url);
}