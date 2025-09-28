import DeletePostButton from "@/components/DeletePostButton";
import { EditPostButton } from "@/components/EditPostButton";
import { getPostBySlug } from "@/libs/postFromPrisma";
import { Metadata} from "next";
type Props = {
    params: Promise<{slug:string}>
}

export async function generateMetadata({params}:Props) : Promise<Metadata> {
    const {slug} = await params;
    const post = await getPostBySlug(slug);

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
    const {slug} = await params;
    const post = await getPostBySlug(slug)

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
                        {post.category?.name}
                    </span>
                    <time className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleString("jp-JP")}
                    </time>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
                <div className="flex items-center text-sm text-gray-600">by:{post.profile.full_name}</div>

                <div className="flex flex-wrap gap-2">
                    {post.tags.map(
                        (tag) => (
                            <span key={tag.id} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                #{tag.name}
                            </span>
                        )
                    )}
                </div>
            </header>
            {/* 本文 */}
            <div className="max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: post.content}}
            /> 
            
            <div className="flex justify-between py-4">
            {/* 削除ボタン */}
            <DeletePostButton postId={post.id} />
            {/* 編集ボタン */}
            <EditPostButton postAuthorId={post.profile.id} postSlug={post.slug}/>
          
            </div>
        </article>
    )
}