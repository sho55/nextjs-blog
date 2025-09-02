import { getAllPosts, getPostsByCategory } from "@/libs/posts";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
    params : {name:string};
}

export async function getFormattedCaseCategory({params}:Props){
    return  params.name.charAt(0).toLocaleUpperCase()+params.name.slice(1);
} 
// 動的メタデータの生成
export async function generateMetadata({params}:Props): Promise<Metadata>{
    const categoryName = await getFormattedCaseCategory({params});
    const posts = getPostsByCategory(params.name);
    return {
        title: `${categoryName}の記事一覧 | もんしょーのブログ`,
        description: `${categoryName}に関する記事を${posts.length}件を掲載してます`
    }
}

// 静的パスの生成→ビルド時に生成されるページ
export async function generateStaticParams(){
    const posts = getAllPosts();
    const categories = [
        ...new Set(posts.map((post)=> post.category.toLowerCase()))
    ]

    return categories.map((category) => ({
        name:category
    }));
}

export default async function CategoryPage({params}:Props){
    const categoryName = params.name;
    const posts = getPostsByCategory(categoryName);
    const displayCategoryName = await getFormattedCaseCategory({params});
    return (
        <div className="max-w-3xl mx-auto">
            {/* カテゴリーヘッダー */}
            <div className="mb-8">
                <div>
                    <Link href="/blog">
                    ←ブログの一覧に戻る
                    </Link>
                </div>
            {/* タイトル */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{displayCategoryName}の記事</h1>
            {posts.length > 0 && 
            <p className="text-gray-600">{posts.length}件の記事が見つかりました</p>}
            </div>
            
            {/* 一覧 */}
            {posts.length > 0 ? (
                <div className="space-y-6">
                    {posts.map((post) => (
                        <article key={post.slug} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
                            <div>
                                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">{post.category}</span>
                                <div className="flex items-center gap-2 text-gray-500 mt-4">
                                    <time>{new Date(post.date).toLocaleDateString("jp-JP")}</time>
                                    <span>{post.readTime}分</span>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3"><Link href={`/blog/${post.slug}`} className="hover:text-blue-800 transition-colors">{post.title}</Link></h2>
                            <p className="text-gray-500 mb-4">{post.abstract}</p>

                            <div>by{post.author}</div>
                            <div className="flex flex-wrap gap-2">{post.tags.slice(0,3).map((tag) => (
                                <span key={tag} className="bg-gray-100 text-gray-700 text-xs py-3 px-2 rounded">#{tag}</span>
                            ))}</div>
                        </article>
                    ))}
                    
                </div>
            ):(
                <div>
                    <h2>記事が見つかりませんでした</h2>
                    <p>「{displayCategoryName}」カテゴリの記事はまだありません。</p>
                </div>
            )}
        </div>
    )
}