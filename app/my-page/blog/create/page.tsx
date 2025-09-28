import PostCreationForm from "@/components/PostCreation";
import { getCategories } from "@/libs/postFromPrisma";


export default async function PostCreationPage() {
  const categories = await getCategories();
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              記事を作成
            </h1>
            <PostCreationForm categories={categories}/>
          </div>
        </div>
      </div>
    </main>
  );
}