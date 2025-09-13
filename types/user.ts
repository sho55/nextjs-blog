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