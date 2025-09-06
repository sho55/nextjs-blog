import { getPostsWithUsers } from "@/libs/posts";
import BlogSearch from "@/components/BlogSearch";

export default async function BlogSearchPage() {
  // サーバーでデータ取得
  const posts = await getPostsWithUsers();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          ブログ記事検索
        </h1>
        <p className="text-gray-600">
          サーバーコンポーネント + クライアントコンポーネントの組み合わせ
        </p>
      </div>

      {/* クライアントコンポーネントにデータを渡す */}
      <BlogSearch posts={posts} />
    </div>
  );
}