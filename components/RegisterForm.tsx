"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Register } from "@/libs/user";
import { useForm } from "@/hooks/useForm";
import { toast } from "sonner";
import { UserRegister } from "@/types/user";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const { values, handleChange } = useForm<UserRegister>({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
    },
    validationRules: {
      email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      password: { required: true, minLength: 8 },
      passwordConfirm: { required: true, minLength: 8 },
      name: { required: true },
    },
  });
  const [isLoading, setIsLoading] = useState(false);


  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const { success } = await Register({
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
        name: values.name,
      });
      console.log(success);
      if (success) {
        toast.success("登録しました");
        router.push("/blog");
      } else {
        toast.error("サーバーの登録エラー");
      }
    } catch (error) {
      console.error("登録エラー:", error);
      toast.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">登録</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">お名前</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="山田太郎"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="パスワードを入力"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">パスワード確認</Label>
              <Input
                id="password-confirm"
                name="password-confirm"
                type="password"
                value={values.passwordConfirm}
                onChange={(e) =>
                  handleChange("passwordConfirm", e.target.value)
                }
                placeholder="パスワードを入力"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  登録中....
                </>
              ) : (
                "登録"
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                アカウントをお持ちの方は
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:underline"
                >
                  ログイン
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}