// 型定義
export type ValidationRule<T> ={
    required?:boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: T) => string | null;
}

//関数-フィールド単体
export function validateField<T>(
    value: T,
    rules: ValidationRule<T>
): string | null {
    // 必須チェック
    if( rules.required && (!value || String(value).trim() === "")){
        return "この項目は必須です";
    }

    const strValue = String(value);
    // 最小チェック
    if(rules.minLength && strValue.length < rules.minLength){
        return `${rules.minLength}文字以上で入力してください`;
    }

    // 最大チェック
    if(rules.maxLength && strValue.length > rules.maxLength){
        return `${rules.maxLength}文字以内で入力してください`;
    }
    //　パターンチェック
    if(rules.pattern && !rules.pattern.test(strValue)){
        return `入力形式が正しくありません`;
    }
    //　カスタムチェック
    if (rules.custom){
        return rules.custom(value);
    }

    return null
}

// 関数-オブジェクト全体

export function validateObject<T extends Record<string,any>>(
    data: T,
    ValidationRules: Partial<Record<keyof T, ValidationRule<T[keyof T]>>>
): string[]{
    const errors:string[] = [];

    // 例:{name: rules1, email: rules2}→[["name",rules1],["email",rules2]]変換
    Object.entries(ValidationRules).forEach(([fieldName, rules])=>{
        const key = fieldName as keyof T;
        const value = data[key];

        // エラーがあれば文字列,なければnull
        const fieldError = validateField(
            value,
            rules as ValidationRule<T[keyof T]>
        )

        // エラーが検知されたとき
        if(fieldError){
            //エラーの箇所
            const displayName = String(key);

            if(fieldError.includes("は必須です") || fieldError.includes("を選択してください")){
                errors.push(fieldError)
            }else{
                // 文字以上を入れてください等
                errors.push(`${displayName}${fieldError}`)
            }
        }
    })

    return errors;
}