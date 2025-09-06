import { getGitHubUser } from "./github-api";

// キャッシュを保持するオブジェクト（メモリキャッシュ）
const memoryCache = new Map();
const CACHE_DURATION = 1 * 60 * 1000; // 1分間

// LocalStorageのキャッシュヘルパー関数
function getFromLocalStorage(key: string) {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

function setToLocalStorage(key: string, value: any) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // LocalStorage容量制限などでエラーが発生した場合は無視
  }
}

function removeFromLocalStorage(key: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    // エラーは無視
  }
}

// キャッシュ付きGitHubユーザー取得関数
export async function getCachedGitHubUser(username: string) {
  const cacheKey = `github-user-${username}`;
  const now = Date.now();

  // 1. まずメモリキャッシュをチェック
  if (memoryCache.has(cacheKey)) {
    const cached = memoryCache.get(cacheKey);
    if (now - cached.timestamp < CACHE_DURATION) {
      console.log(`メモリキャッシュからデータを取得: ${username}`);
      return { ...cached.result, fromCache: true };
    }
  }

  // 2. LocalStorageキャッシュをチェック
  const localCached = getFromLocalStorage(cacheKey);
  if (localCached && now - localCached.timestamp < CACHE_DURATION) {
    console.log(`LocalStorageキャッシュからデータを取得: ${username}`);

    // メモリキャッシュにも復元
    memoryCache.set(cacheKey, localCached);

    return { ...localCached.result, fromCache: true };
  }

  // 3. キャッシュがないか期限切れの場合、GitHub APIから取得
  console.log(`GitHub APIからデータを取得: ${username}`);
  const result = await getGitHubUser(username);

  // 結果をキャッシュに保存（メモリとLocalStorage両方）
  if (!result.error) {
    const cacheData = {
      result: { ...result, fromCache: false },
      timestamp: now,
    };

    // メモリキャッシュに保存
    memoryCache.set(cacheKey, cacheData);

    // LocalStorageに保存
    setToLocalStorage(cacheKey, cacheData);
  }

  return { ...result, fromCache: false };
}

// キャッシュをクリアする関数
export function clearCache(username?: string) {
  if (username) {
    const cacheKey = `github-user-${username}`;

    // メモリキャッシュをクリア
    memoryCache.delete(cacheKey);

    // LocalStorageキャッシュをクリア
    removeFromLocalStorage(cacheKey);

    console.log(`キャッシュをクリア: ${username}`);
  } else {
    // 全キャッシュクリア
    memoryCache.clear();

    // LocalStorageの全GitHubキャッシュをクリア
    if (typeof window !== "undefined") {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("github-user-")) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => removeFromLocalStorage(key));
    }

    console.log("全キャッシュをクリア");
  }
}