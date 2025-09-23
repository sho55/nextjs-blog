import { supabase } from "./supabase";
import { AuthError, User } from "@supabase/supabase-js"


export type AuthResult ={
    user?: User | null;
    success: boolean;
    message?:string;
    error?: AuthError;
}

// Supabase認証系
export const authService = {
    // 新規登録
    async signUp(
        email:string,
        password:string,
        full_name?:string,
    ): Promise<AuthResult> {
        try{
            const {data, error} = await supabase.auth.signUp({
                email,
                password,
                options:{
                    data:{
                        full_name:full_name || "",
                        role: "USER",
                    }
                }
            });

            console.log(error);

            if(error){
                return {
                    success:false,
                    message:this.getErrorMessage(error),
                    error
                }
            }
            return {
                success: true,
                user: data.user,
                message: "登録に成功しました。確認メールをご確認ください。"
            }
        }catch(error){
            console.error("ユーザー登録エラー:",error)
            return {
                success:false,
                message: "ユーザー登録中にエラーになりました"
            }
        }
    },

    // ログイン
    async signIn(
        email:string,
        password:string
    ):Promise<AuthResult>{
        try{
            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if(error){
                return{
                    success:false,
                    message: this.getErrorMessage(error),
                    error:error
                }
            }

            return {
                success:true,
                user: data.user,
                message:"ログインに成功しました"
            }
        }catch(error){
            console.error("ログインエラー:",error)
            return {
                success:false,
                message: "ログイン中にエラーになりました"
            }
        }
    },

    // ログアウト
    async signOut(): Promise<AuthResult>{
        try{
            const { error } = await supabase.auth.signOut();
            if(error){
                return{
                    success:false,
                    message: this.getErrorMessage(error),
                    error:error
                }
            }
            return {
                success:true,
                message:"ログアウトに成功しました"
            }
        }catch(error){
            console.error("ログアウトエラー:",error)
            return {
                success:false,
                message: "ログアウト中にエラーになりました"
            }
        }
    },

    // セッションの取得
    async getSession(){
        try{
            const {data:{ session }, error} = await supabase.auth.getSession();

            if(error){
                console.log("セッションの取得エラー",error);
                return null
            }
            return session
        }catch(error){
            console.error("セッション取得中エラー:",error);
            return null;
        }
    },

    // 現在のユーザーの取得
    async getCurrentUser(){
        try{
            const {data:{ user }, error} = await supabase.auth.getUser();

            if(error){
                console.log("ユーザーの取得エラー",error);
                return null
            }
            return user
        }catch(error){
            console.error("セッション取得中エラー:",error);
            return null;
        }
    },


    // エラーメッセージを日本語化
    getErrorMessage(error: AuthError):string {
        switch(error.message){
            case "Invalid login credentials":
            return "メールアドレスまたはパスワードが正しくありません";
            case "Email not confirmed":
            return "メールアドレスが確認されていません";
            case "User already registered":
            return "このメールアドレスは既に登録されています";
            case "Password should be at least 6 characters":
            return "パスワードは6文字以上で入力してください";
            case "Unable to validate email address: invalid format":
            return "メールアドレスの形式が正しくありません";
            case "Signup is disabled":
            return "ユーザー登録は現在無効になっています";
            case "Email rate limit exceeded":
            return "メール送信の制限を超えました。しばらく待ってから再試行してください";
            default:
            return error.message || "認証エラーが発生しました";
        }
    }
}