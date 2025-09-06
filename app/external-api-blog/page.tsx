import { PostFromJsonPlaceHolder, PostFromJsonPlaceHolderWithUser, User } from "@/types/post";
import { getPostsWithUsers } from "@/libs/posts";

export default async function BlogPage() {
  // サーバーコンポーネントで直接await
  const posts = await getPostsWithUsers();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          最新ブログ記事
        </h1>
        <p className="text-gray-600">
          外部APIから取得した記事データを表示（サーバーコンポーネント）
        </p>
      </div>

      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">記事ID: {post.id}</span>
                <p className="text-gray-300 text-md">{post.user.name}</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  続きを読む →
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">記事を読み込めませんでした</p>
          </div>
        )}
      </div>
    </div>
  );
}