"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getCategoriesForSidebar,
  getLatestPostsForSidebar,
} from "@/libs/postFromPrisma";

type BlogSidebarProps = {
  categories: Awaited<ReturnType<typeof getCategoriesForSidebar>>;
  latestPosts: Awaited<ReturnType<typeof getLatestPostsForSidebar>>;
};

export default function BlogSidebar({
  categories,
  latestPosts,
}: BlogSidebarProps) {
  const pathname = usePathname();

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
          </Link>
          {categories.map((category) => {
            const isActive = pathname === category.href;

            if (category.postCount === 0) {
              return null;
            }

            return (
              <Link
                key={category.id}
                href={category.href}
                className={`flex justify-between px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="capitalize">{category.name}</span>
                <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                  {category.postCount}
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
          {latestPosts.map((post) => (
            <Link key={post.id} href={post.href} className="block group">
              <h4 className="text-sm font-medium group-hover:text-blue-600">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(post.createdAt).toLocaleDateString("ja-JP")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}