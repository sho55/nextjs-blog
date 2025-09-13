"use server"; // このファイルはサーバーで実行されることを示す

// Next.jsの機能をインポート
import { revalidatePath } from "next/cache"; // キャッシュを更新する機能
import { BlogCreate } from "@/types/blog";
import { ValidationRule, validateObject } from "@/libs/validations";

// 投稿フォームのバリデーションルール（共通バリデーション機能を使用）
const postValidationRules: Partial<
  Record<keyof BlogCreate, ValidationRule<BlogCreate[keyof BlogCreate]>>
> = {
  slug: {
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  title: {
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  content: {
    required: true,
    minLength: 10,
    maxLength: 5000,
  },
  category: {
    required:true,
  }
};

// Server Action用のバリデーション関数（共通バリデーション機能を使用）
function validatePostData(data: BlogCreate): string[] {
  return validateObject(data, postValidationRules);
}

// Server Actionの結果を統一した型定義
type ActionResult = {
  success: boolean; // 成功か失敗かを表すフラグ
  message?: string; // 成功時のメッセージ（オプション）
  errors?: string[]; // エラーメッセージの配列（オプション）
  data?: any; // 作成されたデータ（オプション）
};

// シンプルなServer Action関数（新規投稿用）
// FormDataを受け取り、投稿を作成する
export async function createPost(
  formData: FormData // フォームデータ（ブラウザが自動で渡す）
): Promise<ActionResult> {
  // 戻り値はActionResult型
  // フォームデータから値を取得（name属性で指定）
  const title = formData.get("title") as string; // タイトルを文字列として取得
  const content = formData.get("content") as string; // 内容を文字列として取得
  const category = formData.get("category") as string; // カテゴリを文字列として取得
  const slug = formData.get("slug") as string; // スラッグを文字列として取得
  const tags = formData.get("tags") as unknown as string[]; // タグを文字列配列として取得
  const isPublished = formData.get("isPublished") as unknown as boolean; // 公開状態をブール値として取得
  // 投稿データオブジェクトを作成
  const BlogCreate: BlogCreate = {
    title: title || "",
    content: content || "",
    category: category || "",
    slug: slug || "",
    tags: tags || [],
    isPublished: isPublished || false,
  };

  // バリデーションを実行
  const validationErrors = validatePostData(BlogCreate);

  // バリデーションエラーがある場合は早期リターン
  if (validationErrors.length > 0) {
    return {
      success: false,
      errors: validationErrors,
    };
  }

  try {
    // データベース保存をシミュレート（2秒間待機）
    // 実際のアプリでは、ここでデータベースへの保存処理を行う
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2秒待つ

    // 作成された投稿データのシミュレーション（Blog型に合わせて作成）
    const postData: BlogCreate = {
      slug: BlogCreate.slug.trim(),
      title: BlogCreate.title.trim(), // バリデーション済みタイトル
      content: BlogCreate.content.trim(), // バリデーション済み内容
      category: BlogCreate.category, // バリデーション済みカテゴリ
      tags: BlogCreate.tags,
      isPublished: BlogCreate.isPublished, // バリデーション済み公開状態
    };

    console.log("投稿データ:", postData); // 開発用のログ出力

    // Next.jsのキャッシュをクリアして最新情報を表示
    // これによりブログ一覧ページに新しい投稿が反映される
    revalidatePath("/blog");

    // 成功状態を返す（useActionStateがこの値を受け取る）
    return {
      success: true, // 成功フラグ
      message: "記事を投稿しました！", // ユーザーへのメッセージ
      data: postData, // 作成されたデータ
    };
  } catch (error) {
    // 予期しないエラーが発生した場合の処理
    console.error("投稿エラー:", error); // エラーをコンソールに出力
    return {
      success: false, // 失敗フラグ
      errors: ["投稿の処理中にエラーが発生しました"], // ユーザーへのエラーメッセージ
    };
  }
}