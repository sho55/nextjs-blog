import { validateObject, ValidationRule } from './validations'
import { UserApi, UserAuth } from '@/types/user';


// 例: email:demo@example.com, password:password
const dummyLoginData = {
  email: "demo@example.com",
  password: "password",
};

// ダミーユーザーデータ（実際のアプリではAPIから取得）
const DEMO_USER: UserApi = {
  id: 1,
  email: dummyLoginData.email,
  name: "デモユーザー",
  role: "user",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export type AuthResponseType = {
  user?:UserApi;
  success:boolean;
  message?: string;
}

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

export async function Login(user: UserAuth): Promise<AuthResponseType> {
  try {
    const {email,password} = user
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const validation = validateUserAuth({email,password});
    if(!validation.isValid){
      return {
        success: false,
        message: validation.errors.join(","),
      };
    }

    // ダミーの処理
    if (
      email === dummyLoginData.email &&
      password === dummyLoginData.password
    ) {
      console.log("ログインしました");
      return { success: true, user:DEMO_USER, message:"ログインに成功しました" };
    } else {
     return { success: false, message:"メールアドレスまたはパスワードが正しくありません" }
    }
  } catch (error) {
    console.error("ログインエラー:", error);
    return {
          success: false,
          message: "認証中にエラーが発生しました",
        };
  }
}

export async function Register(user: UserAuth): Promise<AuthResponseType> {
  try {
    const {email,password,name} = user
    // ダミーの登録処理（実際にはAPI呼び出しやデータベース操作）
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    
    const validation = validateUserAuth({email,password});
    if(!validation.isValid){
      return {
        success: false,
        message: validation.errors.join(","),
      };
    }

    // 既存のユーザーチェック（ダミー）
    if (email === dummyLoginData.email) {
      throw new Error("このメールアドレスは既に使用されています");
    }

    // 作成できたときのユーザー(ダミー)
    const newUser: UserApi = {
      id:9999,
      email:email,
      name:name || "",
      role:"user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log("ユーザー登録しました:", user.name);
    return { success: true, user:newUser, message:"ユーザー登録に成功しました" };
  } catch (error) {
    console.error("登録エラー:", error);
    return { success: false, message:"ユーザー登録に失敗しました" };
  }
}

export async function Logout(): Promise<AuthResponseType> {
  try {
    // ダミーの処理
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("ログアウトしました");
    return {
      success: true,
      message: "ログアウトしました",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "ログアウト中にエラーが発生しました",
    };
  }
}

