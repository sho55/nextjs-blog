import { getPostBySlug } from "@/libs/posts";
import { Metadata} from "next";
type Props = {
    params: {slug: string}
}

export async function generateMetadata({params}:Props) : Promise<Metadata> {
    const post = await getPostBySlug(params.slug);

    if(!post){
        return {
            title: "記事が見つかりません"
        }
    }

    return {
        title:`${post.title} | もんしょーのブログ`,
        description: post.content.slice(0,150).replace(/<[^>]*>/g,""),
        openGraph:{
            title: post.title,
            description: post.content.slice(0,150).replace(/<[^>]*>/g,""),
            type:"article"
        }
    }
}

export default async function PostPage({ params }:Props){
    const post = await getPostBySlug(params.slug)

    // エラーハンドリング
    // 記事がないとき
    if(!post){
        return(
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">記事が見つかりません</h1>
                <p className="text-gray-600">された記事が存在しないか、削除された可能性があります。</p>
            </div>
            
        )
    }

    return (
        <article className="bg-white rounded-lg shadow p-8">
            <header className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-100 text-blue-800 rounded-lg p-2">
                        {post.category}
                    </span>
                    <time className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleString("jp-JP")}
                    </time>
                    <span>{post.readTime}分で読める</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
                <div className="flex items-center text-sm text-gray-600">by:{post.author}</div>

                <div className="flex flex-wrap gap-2">
                    {post.tags.map(
                        (tag) => (
                            <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                #{tag}
                            </span>
                        )
                    )}
                </div>
            </header>
            {/* 本文 */}
            <div className="max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: post.content}}
            /> 
        </article>
    )
}