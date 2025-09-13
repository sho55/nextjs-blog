// 認証に関わるタイプ
export type UserAuth = {
    email:string;
    password:string;
    passwordConfirm?:string;
    name?:string;
}

export type UserRegister = {
    email:string;
    password:string;
    passwordConfirm:string;
    name:string;
}

// フロントエンドやAPIに関わる
export type UserApi = {
    id: number;
    email: string;
    name: string;
    role?: string;
    created_at?: string;
    updated_at?: string;
}
