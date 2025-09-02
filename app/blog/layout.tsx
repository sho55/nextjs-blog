import Link from "next/link";

export default function BlogLayout({
    children,
}:{
    children: React.ReactNode
}) {
    return(
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* サイドバー */}
                <aside className="md:col-span-1 text-sm text-gray-800">
                    <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                        <h3 className="text-lg font-bold mb-4">カテゴリー</h3>
                        <nav className="space-y-2">
                            <Link href="/blog" className="block text-gray-400 hover:text-blue-600 transition-colors">すべての記事</Link>
                            <Link href="/blog/category/programming" className="block text-gray-400 hover:text-blue-600 transition-colors">programming</Link>
                            <Link href="/blog/category/other" className="block text-gray-400 hover:text-blue-600 transition-colors">other</Link>
                        </nav>
                        <div className="mt-6">
                            <h3 className="text-lg font-bold mb-4">最近の投稿</h3>
                            <div className="space-y-2">
                                <Link href="#" className="block text-gray-400 hover:text-blue-600 transition-colors">Next.jsについて
                                </Link>
                                <Link href="#" className="block text-gray-400 hover:text-blue-600 transition-colors">TypeScriptについて
                                </Link>
                                <Link href="#" className="block text-gray-400 hover:text-blue-600 transition-colors">もんしょーのプロフィール
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>
                <main className="md:col-span-3">{children}</main>
            </div>
        </div>
    )
}