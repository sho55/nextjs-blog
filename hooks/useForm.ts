"use client"
import { validateField, ValidationRule } from "@/libs/validations";
import { useCallback, useState } from "react";
type UseFormOptions<T> = {
    initialValues: T;
    validationRules?: Partial<Record<keyof T, ValidationRule<T[keyof T]>>>
    onSubmit?: (values:T) => void | Promise<void>;
};

type FormErrors<T> = {
    [K in keyof T]?: string
}

export function useForm<T extends Record<string, any>>({
        initialValues,
        validationRules = {},
        onSubmit,
    }: UseFormOptions<T>){
        const [values,setValues] = useState<T>(initialValues);
        const [errors,setErrors] = useState<FormErrors<T>>({});
        const [touched,setTouched] = useState<Record<keyof T,boolean>>({} as Record<keyof T, boolean>);
        const [isSubmitting,setIsSubmitting] = useState(false);

        //バリデーションを行う関数
        const validateFieldWrapper = useCallback(
            //nameはどの項目をチェックするのか、valueは入力された値
            (name: keyof T, value: T[keyof T]):string | null => {
                const rules = validationRules[name];
                if(!rules) return null;

                //バリデーションを実行する
                return validateField(value, rules)
            },[validationRules]//ここが変更されたときだけ、関数を再作成
        );

        // ユーザーが入力したときに呼ばれる関数
        const handleChange = useCallback((name: keyof T, value: T[keyof T]) =>{
            //フォームの値を更新する
            // prev...前の状態
            setValues((prev) => ({...prev, [name]: value}))

            // リアルタイムで判定
            if (touched[name]){
                const error = validateFieldWrapper(name,value);
                // エラーを更新
                setErrors((prev) => ({...prev,[name]:error}))
            }
        },[validateFieldWrapper,touched])//ここが変更されたときだけ関数を再生成

        // 入力フィールドからフォーカスが外れたときに呼ばれる関数
        const handleBlur = useCallback(
            // nameは「どの項目からフォーカスが外れたか」
            (name: keyof T) => {
              // その項目を「触れた（touched）」状態にマークする
              // これで次回から、この項目はリアルタイムでバリデーションされるようになる
              setTouched((prev) => ({ ...prev, [name]: true }));
        
              // フォーカスが外れた時点で、その項目の値をチェックする
              const error = validateFieldWrapper(name, values[name]);
              // エラー情報を更新
              setErrors((prev) => ({ ...prev, [name]: error }));
            },
            [validateFieldWrapper, values] // これらが変更された時だけ関数を再作成
          );
        
        // まとめてチェックする関数
        const validateAll = useCallback((): boolean => {
            // 新しいエラー情報を格納するための空のオブジェクト
            const newErrors: FormErrors<T> = {};
            // 全体的に有効かどうかを示すフラグ（最初はtrueで、エラーがあったらfalseになる）
            let isValid = true;
        
            // valuesオブジェクトのすべてのキー（項目名）を取得して、一つずつチェック
            Object.keys(values).forEach((key) => {
              // keyをTypeScriptの型として正しく扱うためのキャスト
              const fieldKey = key as keyof T;
              // その項目の値をチェックして、エラーメッセージを取得
              const error = validateFieldWrapper(fieldKey, values[fieldKey]);
              // エラーがある場合
              if (error) {
                // エラー情報に追加
                newErrors[fieldKey] = error;
                // 全体として無効にマーク
                isValid = false;
              }
            });
        
            // 新しく見つかったエラー情報で更新
            setErrors(newErrors);
            // 全体が有効かどうかを返す（true = 全て正常、false = エラーあり）
            return isValid;
          }, [values, validateFieldWrapper]); // これらが変更された時だけ関数を再作成
        
        // 送信前に呼ばれる関数
        const handleSubmit = useCallback(
            // asyncは「非同期処理」を示すキーワード（時間のかかる処理を待つため）
            async (e?: React.FormEvent) => {
              // ブラウザのデフォルトのフォーム送信動作を無効化
              // （ページが再読み込みされるのを防ぐ）
              e?.preventDefault();
        
              // 既に送信処理中の場合は、何もしない（二重送信防止）
              if (isSubmitting) return;
        
              // すべての入力項目を「触れた（touched）」状態にする
              // これで、まだ触れていない項目もエラーチェックの対象になる
              const allTouched = Object.keys(values).reduce(
                (acc, key) => ({
                  ...acc, // 今までの結果をコピー
                  [key]: true, // この項目を「触れた」状態にする
                }),
                {} as Record<keyof T, boolean> // 初期値は空のオブジェクト
              );
              setTouched(allTouched);
        
              // すべての項目をチェックして、エラーがあるかどうか確認
              if (!validateAll()) {
                // エラーがある場合は送信処理を中止
                return;
              }
        
              // 送信処理が定義されている場合のみ実行
              if (onSubmit) {
                // 送信中状態にする（ローディング表示などのため）
                setIsSubmitting(true);
                try {
                  // 実際の送信処理を実行（非同期処理なのでawaitで待つ）
                  await onSubmit(values);
                } catch (error) {
                  // エラーが発生した場合はコンソールに出力
                  console.error("送信エラー:", error);
                } finally {
                  // 成功・失敗に関係なく、最後に送信中状態を解除
                  setIsSubmitting(false);
                }
              }
            },
            [values, validateAll, onSubmit, isSubmitting] // これらが変更された時だけ関数を再作成
          );
        
        //　リセットする関数
          const reset = useCallback(() => {
            // すべての入力値を初期値に戻す
            setValues(initialValues);
            // すべてのエラーメッセージをクリア
            setErrors({});
            // すべての「触れた」状態をリセット（誰も何も触っていない状態に戻す）
            setTouched({} as Record<keyof T, boolean>);
            // 送信中状態もリセット
            setIsSubmitting(false);
          }, [initialValues]); // initialValuesが変更された時だけ関数を再作成


        return {
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            reset,
            isValid: Object.keys(errors).length === 0,
        }
    }