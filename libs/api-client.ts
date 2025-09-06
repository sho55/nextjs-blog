export async function fetchData(url: string) {
  try {
    console.log(`データを取得中: ${url}`);

    const response = await fetch(url);

    // レスポンスが正常でない場合はエラー
    if (!response.ok) {
      throw new Error(`エラーが発生しました: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("API呼び出しエラー:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "データ取得に失敗しました",
    };
  }
}