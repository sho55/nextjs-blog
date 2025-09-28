import Link from "next/link";
import { PostPrisma } from "@/types/post";

type PostCardProps = {
  post: PostPrisma;
  highlightText?: (text: string) => React.ReactNode;
  showCategory?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  showTags?: boolean;
  showContent?: boolean;
  contentLength?: number;
};

export default function PostCard({
  post,
  highlightText = (text) => text,
  showCategory = true,
  showAuthor = true,
  showDate = false,
  showTags = true,
  showContent = false,
  contentLength = 200,
}: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
      {/* カテゴリーバッジ */}
      {showCategory && post.category && (
        <Link href={`/blog/category/${post.category.name}`}>
          <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
            {post.category.name}
          </span>
        </Link>
      )}

      {/* メタ情報（日付） */}
      {showDate && (
        <div className="flex items-center gap-2 text-gray-500 mt-4">
          {post.createdAt && (
            <time>{new Date(post.createdAt).toLocaleDateString("ja-JP")}</time>
          )}
        </div>
      )}

      {/* タイトル */}
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:text-blue-800 transition-colors"
        >
          {highlightText(post.title)}
        </Link>
      </h2>

      {/* 著者情報 */}
      {showAuthor && post.profile && (
        <p className="text-blue-600 text-sm mb-2">by {post.profile.full_name}</p>
      )}

      {/* コンテンツ */}
      {showContent && post.content && (
        <p className="text-gray-600 mb-4 line-clamp-3">
          {highlightText(post.content.slice(0, contentLength) + "...")}
        </p>
      )}

      {/* 続きを読むボタン */}
      <div className="flex justify-between items-center mb-4">
        <Link href={`/blog/${post.slug}`}>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            続きを読む →
          </button>
        </Link>
      </div>

      {/* タグ */}
      {showTags && post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag.name}
              className="bg-gray-100 text-gray-700 text-xs py-1 px-2 rounded"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}