// デフォルトでサーバーコンポーネント（'use client'がない）

export default async function ServerComponent() {
  // サーバーサイドで実行される
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const post = await response.json();

  console.log("これはサーバーのコンソールに表示されます");

  return (
    <div className="bg-green-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">サーバーコンポーネント</h2>
      <p className="text-sm text-gray-600 mb-4">
        このコンポーネントはサーバーでレンダリングされます
      </p>
      <div className="bg-white p-4 rounded">
        <h3 className="font-medium">{post.title}</h3>
        <p className="text-gray-600 text-sm mt-2">{post.body}</p>
      </div>
    </div>
  );
}