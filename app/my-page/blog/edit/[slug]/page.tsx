import PostEditForm from "@/components/PostEditForm";
import { getCategories, getPostBySlug } from "@/libs/postFromPrisma";
type Props = {
  params: { slug: string };
};
export default async function PostCreationPage({ params }: Props) {
  const categories = await getCategories();
  // パラメータからslugを取得
  const resolvedParams = params;
  if (!resolvedParams.slug) {
    return <div>記事が見つかりません</div>;
  }
  //Slugからページの情報を取得
  const slug = resolvedParams.slug;

  const post = await getPostBySlug(slug);
  if (!post) {
    return <div>記事が見つかりません</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              記事を編集
            </h1>
            <PostEditForm categories={categories} post={post} />
          </div>
        </div>
      </div>
    </main>
  );
}