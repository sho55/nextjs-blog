// import { getPostsWithUsers } from "@/libs/posts";
import BlogSearch from "@/components/BlogSearch";
import { getAllPosts } from "@/libs/postFromPrisma";

export default async function BlogPage() {  
  // 1. サーバーコンポーネントでデータ取得
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          ブログ記事一覧
        </h1>
        <p className="text-gray-600">
          サーバーコンポーネントでデータ取得 + クライアントコンポーネントで検索
        </p>
      </div>

      {/* 2. サーバーで取得したデータをクライアントコンポーネントに渡す */}
      <BlogSearch posts={posts} />
    </div>
  );
}