import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ShadcnPage(){
    return (
        <div className="container mx-auto py-4 px-3 mb-4">
            <Button variant={"default"} className="text-gray-800 bg-yellow-100 font-bold">デフォルトのボタンです</Button>
            <Button variant={"destructive"}>赤色のボタンです</Button>
            <Button variant={"outline"}>外枠だけのボタンです</Button>
            <Button variant={"ghost"}>ボタンっぽいものです</Button>


            <div className="flex gap-4 items-end">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
            </div>

             {/* カード例 1: 基本的なカード */}
            <Card className="w-[350px]">
                <CardHeader>
                <CardTitle>カードタイトル</CardTitle>
                <CardDescription>Card 概要</CardDescription>
                </CardHeader>
                <CardContent>
                <p>カードですよ。</p>
                カードですよ。カードですよ。カードですよ。カードですよ。
                </CardContent>
                <CardFooter>
                <Button>ボタン</Button>
                </CardFooter>
            </Card>
        </div>
    )
}