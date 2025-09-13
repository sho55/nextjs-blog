"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { UserApi } from "@/types/user";
import {
  Login,
  Register,
  Logout,
  AuthResponseType,
} from "@/libs/user";

type UserContextType = {
  user: UserApi | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // エラークリア関数
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 初期化: 保存されたユーザー情報の読み込み
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsedUser: UserApi = JSON.parse(savedUser);

          // 型安全な検証
          if (parsedUser.id && parsedUser.email) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("ユーザー情報の読み込みに失敗:", error);
        localStorage.removeItem("user");
        setError("保存されたユーザー情報の読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  // ログイン処理（認証サービスを使用）
  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const result: AuthResponseType = await Login({
          email,
          password,
        });

        if (result.success && result.user) {
          setUser(result.user);
          localStorage.setItem("user", JSON.stringify(result.user));
          return true;
        } else {
          setError(result.message || "ログインに失敗しました");
          return false;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "ログインに失敗しました";
        setError(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ユーザー登録処理
  const register = useCallback(
    async (email: string, password: string, name: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const result: AuthResponseType = await Register({
          email,
          password,
          name,
        });

        if (result.success && result.user) {
          setUser(result.user);
          localStorage.setItem("user", JSON.stringify(result.user));
          return true;
        } else {
          setError(result.message || "登録に失敗しました");
          return false;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "登録に失敗しました";
        setError(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ログアウト処理（ログアウトサービスを使用）
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await Logout();
      setUser(null);
      localStorage.removeItem("user");
      setError(null);
    } catch (err) {
      console.error("ログアウトエラー:", err);
      // ローカル状態はクリアする（サーバー側でエラーが出てもローカルはログアウト）
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        error,
        clearError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// カスタムフック
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

// 認証状態確認用のカスタムフック
export function useAuth() {
  const { user, loading } = useUser();

  return {
    isAuthenticated: !!user,
    isLoading: loading,
    user,
  };
}