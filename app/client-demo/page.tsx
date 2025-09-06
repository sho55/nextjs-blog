import ClientComponent from "@/components/ClientComponent";

export default function ClientDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">クライアントコンポーネントデモ</h1>
      <ClientComponent />
    </div>
  );
}