import { UserProfileCard } from "@/components/UserProfileCard";

export default function MyPageTopPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">ダッシュボード</h1>
      </div>
      <div className="flex justify-center min-w-screen">
        <UserProfileCard />
      </div>
    </main>
  );
}