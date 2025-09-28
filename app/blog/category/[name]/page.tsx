import { getPostsByCategory } from "@/libs/postFromPrisma";
import Link from "next/link";
import PostCard from "@/components/PostCard";

type Props = {
    params : {name:string};
}

export async function getFormattedCaseCategory({params}:Props){
    return  params.name.charAt(0).toLocaleUpperCase()+params.name.slice(1);
} 

export default async function CategoryPage({params}:Props){
    const categoryName = decodeURIComponent(params.name);
    // const categoryName = params.name;
    const posts = await getPostsByCategory(categoryName);
    // const displayCategoryName = await getFormattedCaseCategory({params});
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{categoryName}の記事</h1>
            {posts.length > 0 && 
            <p className="text-gray-600">{posts.length}件の記事が見つかりました</p>}
            </div>
            
            {/* 一覧 */}
            {posts.length > 0 ? (
                <div className="space-y-6">
                    {posts.map((post) => (
                        <PostCard
                        key={post.id}
                        post={post}
                        showCategory={true}
                        showAuthor={true}
                        showContent={true}
                        showDate={true}
                        />
                    ))}
                    
                </div>
            ):(
                <div>
                    <h2>記事が見つかりませんでした</h2>
                    <p>「{categoryName}」カテゴリの記事はまだありません。</p>
                </div>
            )}
        </div>
    )
}