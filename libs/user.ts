import { validateObject, ValidationRule } from './validations'
import { UserAuth } from '@/types/user';


// 例: email:demo@example.com, password:password
const dummyLoginData = {
  email: "demo@example.com",
  password: "password",
};
/**
 * バリデーション結果の型定義
 */
export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export function validateUserAuth(data: UserAuth): ValidationResult {
  // 基本バリデーションルール
  const rules: Partial<Record<keyof UserAuth, ValidationRule<UserAuth[keyof UserAuth]>>>  = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      required: true,
      minLength: 8
    }
  };

  // 基本バリデーション実行
  const errors = validateObject(data, rules);

  // パスワード確認の特殊チェック（フィールド間関連性）
  if (data.passwordConfirm !== undefined) {
    if (!data.passwordConfirm) {
      errors.push("パスワード確認は必須です");
    } else if (data.password !== data.passwordConfirm) {
      errors.push("パスワードが一致しません");
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export async function Login(user: UserAuth): Promise<{ status: boolean }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // ダミーの処理
    if (
      user.email === dummyLoginData.email &&
      user.password === dummyLoginData.password
    ) {
      console.log("ログインしました");
      return { status: true };
    } else {
      throw new Error("ログイン情報が正しくありません");
    }
  } catch (error) {
    console.error("ログインエラー:", error);
    throw new Error(`ログインに失敗しました:${error}`);
  }
}

export async function Register(user: UserAuth): Promise<{ status: boolean }> {
  try {
    const validation = validateUserAuth(user);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", ")!);
    }

    // ダミーの登録処理（実際にはAPI呼び出しやデータベース操作）
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 既存のユーザーチェック（ダミー）
    if (user.email === dummyLoginData.email) {
      throw new Error("このメールアドレスは既に使用されています");
    }

    console.log("ユーザー登録しました:", user.name);
    return { status: true };
  } catch (error) {
    console.error("登録エラー:", error);
    throw error; // エラーを再スローして呼び出し元で処理
  }
}

export async function Logout(): Promise<{ status: boolean }> {
  try {
    // ダミーの処理
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("ログアウトしました");
    return { status: true };
  } catch (error) {
    console.error(error);
    return { status: false };
  }
}