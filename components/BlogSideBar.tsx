"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAllPosts } from "@/libs/posts";

type BlogSidebarProps = {
  posts: ReturnType<typeof getAllPosts>;
};

export default function BlogSidebar({ posts }: BlogSidebarProps) {
  const pathname = usePathname();

  // カテゴリ別記事数の集計
  const categories = posts.reduce((acc, post) => {
    const category = post.category.toLowerCase();
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 最近の記事（上位5件）
  const recentPosts = posts.slice(0, 5);

  return (
    <aside className="space-y-6">
      {/* カテゴリ一覧 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">カテゴリ</h3>
        <nav className="space-y-2">
          <Link
            href="/blog"
            className={`flex justify-between px-3 py-2 rounded-md ${
              pathname === "/blog"
                ? "bg-blue-100 text-blue-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>すべて</span>
            <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">
              {posts.length}
            </span>
          </Link>

          {Object.entries(categories).map(([category, count]) => {
            const href = `/blog/category/${category}`;
            const isActive = pathname === href;

            return (
              <Link
                key={category}
                href={href}
                className={`flex justify-between px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="capitalize">{category}</span>
                <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                  {count}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 最近の記事 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">最近の記事</h3>
        <div className="space-y-3">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <h4 className="text-sm font-medium group-hover:text-blue-600">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(post.date).toLocaleDateString("ja-JP")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}