import Button from "@/components/ui/Button"

export default async function AboutPage(){
    await new Promise((resolve) => setTimeout(resolve,1000))
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="font-bold mb-4">このブログについて</h1>
            <p className="text-gray-600">
                Next.js学習者のために作成してます！
            </p>
            <Button variant="secondary">ホームボタン</Button>
        </main>
    )
}