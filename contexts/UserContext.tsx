"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { User, AuthError, Session} from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/profile";
import { AuthResult, authService } from "@/lib/auth";

type UserContextType = {
  user: User | null;
  profile: Profile | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile,setProfile] = useState<Profile | null>(null);

  // エラークリア関数
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 初期化: 保存されたユーザー情報の読み込み
  useEffect(() => {
    // 初期セッション状態の取得
    const initializeAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        

        // プロフィールの情報を取得
        if(currentUser){
          // 処理を追加します 
          await fetchProfile(currentUser.id); 
        }
        
      } catch (error) {
        console.error("ユーザー情報の読み込みに失敗:", error);
        setError("保存されたユーザー情報の読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();


    // 認証状態の変更を監視する
    const {
      data:{ subscription},
    } = supabase.auth.onAuthStateChange(async(event,session) =>{
      console.log("認証イベント:",event);
      setUser(session?.user ?? null)
      setLoading(false)
      // プロフィールの情報を変更
      if(session?.user){
        // 処理を追加します  
        await fetchProfile(session.user.id)
      }else{
        setProfile(null);
      }
    })
    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async(userId: string) => {
    try{
      const { data, error } = await supabase.from("profile").select("*").eq("id",userId).single(); 

      if (error) {
        console.error("プロファイル取得エラー:", error);
        return;
      }
      setProfile(data);
    }catch(error){
      console.error("プロファイル取得中にエラーになりました:", error);
      return
    }
  }

  // ログイン処理（Supabaseを使用）
  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const result:AuthResult  = await authService.signIn(email,password,);

        if (!result.success) {
          setError(result.message || "ログインに失敗しました");
          return false;
        }

        return true;
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
    async (email: string, password: string, fullName: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const result: AuthResult = await authService.signUp(
          email,
          password,
          fullName,
        );

        if (!result.success) {
          setError(result.message || "登録に失敗しました");
          return false;
        }
        return true;
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
  const logout = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const result: AuthResult = await authService.signOut();

      if (!result.success) {
        setError(result.message || "ログアウトに失敗しました");
        return false;
      }
      return true;

    } catch (err) {
      console.error("ログアウトエラー:", err);
      // ローカル状態はクリアする（サーバー側でエラーが出てもローカルはログアウト）
      setUser(null);
      setProfile(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
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