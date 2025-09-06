import ServerComponent from "@/components/ServerComponent";

export default function ServerDemoPage(){
    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">サーバーコンポーネントデモ</h1>
          <ServerComponent />
        </div>
      );
}