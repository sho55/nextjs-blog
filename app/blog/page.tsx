import OptimizedNavigation from "@/components/OptimizedNavigation";
import SearchAndNavigation from "@/components/SearchAndNavigation"
import ServerActionNavigation from "@/components/ServerActionNavigation";
import { getAllPosts, searchPostsByTitleAndContent } from "@/libs/posts";
import { searchPosts } from "@/libs/search-actions";

type Props = {
    searchParams: {q?: string};
}

//JSX構文
export default function BlogPage({searchParams}:Props) {

    const query = searchParams.q;
    const posts = query ? searchPostsByTitleAndContent(query): getAllPosts();
    return (
        <div className="text-gray-700">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-700">{query? `「${query}」の検索結果` :"最近の記事"}</h1>
                <div>
                    {query && (
                        <p className="text-gray-600 mt-2">
                            {posts.length}件の記事か見つかりました
                        </p>
                    )}
                </div>
            </div>

            <SearchAndNavigation />
            <ServerActionNavigation/>
            <OptimizedNavigation />
            <div className="space-y-6">
                {/* 記事を表示 */}
                {posts.map(
                    (post) => (
                        <article key={post.slug}
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