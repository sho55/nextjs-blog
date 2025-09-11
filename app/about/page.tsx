import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"
export default async function AboutPage(){
    await new Promise((resolve) => setTimeout(resolve,1000))
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="font-bold mb-4">このブログについて</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>初心者に優しい</CardTitle>
                  <CardDescription>記事の内容をわかりやすく解説</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>上場企業の新人研修講師を担当</p>
                  ゼロからでもわかるように解説しています
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>現場目線で執筆</CardTitle>
                  <CardDescription>現役エンジニアが執筆した内容</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>王道からモダンまで</p>
                  Next,js,TypeScript,Laravel現場ですぐに使える技術が豊富
                </CardContent>
                <CardFooter>
                  {/*  */}
                    <Button asChild
                      variant="outline"
                      size="lg"
                      className="bg-blue-600 text-white cursor-pointer"
                    >
                    <Link href="/blog">
                    ブログ記事はこちら
                    <ChevronRightIcon className="w-4 h-4" />
                    </Link>
                    </Button>
                  {/*  */}
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>個別指導実績多数</CardTitle>
                  <CardDescription>自社開発、受託開発内定</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>たった6ヶ月で就職内定を獲得</p>
                  初心者からでも、エンジニア歴7年以上の経験をもとに徹底サポート
                </CardContent>
                <CardFooter>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-gray-600 text-white cursor-pointer"
                    >
                      お問い合わせ
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
        </main>
    )
}