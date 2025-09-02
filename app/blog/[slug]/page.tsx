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

async function getPostBySlug(slug:string){
    //ダミーデータ
    const posts = {
        "about-nextjs": {
            title:"Next.jsについて",
            content:`<h2>Next.jsの最新バージョンについて</h2>
            <p>Next.jsは15がリリースされてます。React19を標準サポートしてます。</p>`,
            date:"2025-08-01",
            category:"programming",
            author:"山田太郎"
        },
        "about-ts": {
            title:"TypeScriptとは？",
            content:`<h2>TypeScriptのメリット</h2>
                    <p>型を安全に扱うことができる言語</p>
                    
                    <h2>利点</h2>
                    <p>誤ったデータが入ってきたときに即座に検知することができ、エラーが減る</p>`,
            date:"2025-08-10",
            category:"programming",
            author:"山田太郎"
        },
        "my-profile": {
            title:"もんしょーのプロフィール",
            content:`<h2>はじめに</h2>
            <p>ITエンジニア。日々プログラミングを教えている。1994年生まれ。左利き。</p>`,
            date:"2024-01-01",
            category:"other",
            author:"もんしょー"
        },
    }
    return posts[slug as keyof typeof posts] || null;
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
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
                <div className="flex items-center text-sm text-gray-600">by:{post.author}</div>
            </header>
            {/* 本文 */}
            <div className="max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: post.content}}
            /> 
        </article>
    )
}