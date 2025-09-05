import SearchAndNavigation from "@/components/SearchAndNavigation"

type Post ={
    id: string,
    title: string,
    body: string,
    date: string,
    category: string,
    slug: string
}

//ダミーデータ
const posts: Post[] = [
    {
    id: "1",
    title: "Next.jsについて",
    body: "Reactベースのフレームワークです。",
    date: "2025-08-01",
    category: "programming",
    slug: "about-nextjs"   
    },
    {
    id: "2",
    title: "TypeScriptについて",
    body: "JavaScriptの型を安全に扱える言語",
    date: "2025-08-10",
    category: "programming",
    slug: "about-ts"   
    },
    {
    id: "3",
    title: "もんしょーのプロフィール",
    body: "1994年生まれ。東京都出身。",
    date: "2020-01-01",
    category: "other",
    slug: "my-profile"   
    },
]

//JSX構文
export default function BlogPage() {
    return (
        <div className="text-gray-700">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-700">最近の記事</h1>
            </div>

            <SearchAndNavigation />
            <div className="space-y-6">
                {/* 記事を表示 */}
                {posts.map(
                    (post) => (
                        <article key={post.id}
                        className="bg-white rounded-3xl shadow-2xl hover:shadow-2xs transition-shadow p-7"
                        >
                            <div>
                                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-0.5 rounded-full">{post.category}</span>
                                <time className="text-sm text-gray-500">
                                    {new Date(post.date).toLocaleDateString("jp-JP")}
                                </time>
                                <h2>{post.title}</h2>
                                <a href={`/blog/${post.slug}`} className="text-blue-500 hover:text-blue-800 font-medium inline-flex items-center">
                                    続きを読む
                                    
                                </a>
                            </div>
                        </article>
                    )
                )}
            </div>
        </div>
        
    )
}