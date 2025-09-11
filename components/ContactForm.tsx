"use client";

import { sendContactForm } from "@/libs/contact";
import { Contact } from "@/types/contact";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {toast} from "sonner";

export default function ContactForm(){
    const [formData,setFormData] = useState<Contact>({
        name:"",
        email:"",
        body:"",
    })

    // 入力フィールドの変更処理
    const handleInputChange =(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // フォームの送信処理
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await sendContactForm(formData);
            console.log("お問い合わせを送信しました！！");
            toast.success("お問い合わせを送信しました！！");
            setFormData({
                name:"",
                email:"",
                body:"",
            });
        }catch(error){
            console.error("送信エラー:",error);
            toast.error("送信に失敗しました。")
        }
    }

    return(
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
            <CardTitle>お問い合わせ</CardTitle>
            </CardHeader>

            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 名前入力 */}
                <div className="space-y-2">
                <Label htmlFor="name">
                    お名前 <span className="text-destructive">*</span>
                </Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="山田太郎"
                />
                </div>

                {/* メールアドレス入力 */}
                <div className="space-y-2">
                <Label htmlFor="email">
                    メールアドレス <span className="text-destructive">*</span>
                </Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="example@example.com"
                />
                </div>

                {/* 内容 */}
                <div className="space-y-2">
                    <Label htmlFor="body">
                        内容 <span className="text-destructive">*</span>
                    </Label>
                    <Textarea id="body" name="body" value={formData.body} onChange={handleInputChange}
                                        required/>
                    </div>

                {/* 送信ボタン */}
                <Button
                type="submit"
                className="w-full bg-gray-800 text-white"
                size="lg"
                >
                送信する
                </Button>
            </form>
            </CardContent>
        </Card>
    )
}