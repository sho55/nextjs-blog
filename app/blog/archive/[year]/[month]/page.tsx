import { getPostsByYearMonth } from "@/libs/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    year: string;
    month: string;
  };
};

export default function ArchivePage({ params }: Props) {
  const { year, month } = params;

  // 年月のチェック
  const yearNum = parseInt(year);
  const monthNum = parseInt(month);

  if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    return notFound();
  }

  const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  const posts = getPostsByYearMonth(year,month);
  console.log(posts);
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl text-gray-800 font-bold py-4">
        {year}年{monthNames[monthNum - 1]}のアーカイブ
      </h1>
      {posts.length > 0 ?(
        <div className="space-y-3">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">{post.category}</span>
                <time className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString("jp-JP")}</time>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-800 transition-colors">
                {post.title}
                </Link>
              </h2>
              <div className="text-gray-500 mb-4">{post.abstract}</div>
            </article>
          ))}

        </div>
      ):(
        <div>
          <h2>記事が見つかりませんでした</h2>
          <p>「{year}年{monthNames[monthNum - 1]}]」の記事はまだありません。</p>
        </div>
      )}
    </div>
  );
}
