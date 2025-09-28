import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("シードデータの投入を開始...");

  // タグを作成
  const nextjsTag = await prisma.tag.create({
    data: {
      name: "Next.js",
    },
  });

  const typescriptTag = await prisma.tag.create({
    data: {
      name: "TypeScript",
    },
  });

  const reactTag = await prisma.tag.create({
    data: {
      name: "React",
    },
  });

  const nodejsTag = await prisma.tag.create({
    data: {
      name: "Node.js",
    },
  });

  const prismaTag = await prisma.tag.create({
    data: {
      name: "Prisma",
    },
  });

  const webdevTag = await prisma.tag.create({
    data: {
      name: "Web開発",
    },
  });

  const tutorialTag = await prisma.tag.create({
    data: {
      name: "チュートリアル",
    },
  });

  // カテゴリを作成
  const nextjsCategory = await prisma.category.create({
    data: {
      name: "Next.js",
      description: "Next.js関連の記事",
    },
  });

  const reactCategory = await prisma.category.create({
    data: {
      name: "React",
      description: "React関連の記事",
    },
  });

  const typescriptCategory = await prisma.category.create({
    data: {
      name: "TypeScript",
      description: "TypeScript関連の記事",
    },
  });

  const javascriptCategory = await prisma.category.create({
    data: {
      name: "JavaScript",
      description: "JavaScript関連の記事",
    },
  });

  const otherCategory = await prisma.category.create({
    data: {
      name: "その他",
      description: "その他の記事",
    },
  });

//   // テストユーザープロフィールを作成（実際のUUIDを使用）
//   const testUser = await prisma.profile.create({
//     data: {
//       id: "550e8400-e29b-41d4-a716-446655440000", // 固定のUUID
//       email: "test@example.com",
//       full_name: "テストユーザー",
//       role: "USER",
//     },
//   });
// 
//   // サンプル投稿を作成
//   const samplePost1 = await prisma.post.create({
//     data: {
//       title: "初めてのNext.jsブログ",
//       content: `# Next.jsとPrismaを使ってブログを作ってみました
// 
// この記事では、Next.jsとPrismaを使ってブログアプリケーションを作成する方法を紹介します。
// 
// ## 主な機能
// - 記事の作成・編集・削除
// - カテゴリとタグによる分類
// - ユーザー認証
// - レスポンシブデザイン
// 
// ## 技術スタック
// - Next.js 14
// - TypeScript
// - Prisma
// - PostgreSQL
// - Tailwind CSS
// 
// Next.jsのApp Routerを使用して、モダンなWebアプリケーションを構築できます。`,
//       slug: "first-nextjs-blog",
//       isPublished: true,
//       authorId: testUser.id,
//       categoryId: nextjsCategory.id,
//       tags: {
//         connect: [
//           { id: nextjsTag.id },
//           { id: typescriptTag.id },
//           { id: prismaTag.id },
//         ],
//       },
//     },
//   });
// 
//   const samplePost2 = await prisma.post.create({
//     data: {
//       title: "TypeScriptの型安全性について",
//       content: `# TypeScriptの型安全性について
// 
// TypeScriptは、JavaScriptに型システムを追加した言語です。型安全性により、実行時エラーを減らし、開発効率を向上させることができます。
// 
// ## 型安全性のメリット
// 1. **コンパイル時エラー検出**: 実行前にエラーを発見
// 2. **IDEサポート**: 自動補完やリファクタリング支援
// 3. **ドキュメント化**: 型定義がドキュメントの役割も果たす
// 4. **リファクタリング安全性**: 型チェックにより安全な変更
// 
// ## 基本的な型定義
// \`\`\`typescript
// interface User {
//   id: string;
//   name: string;
//   email: string;
// }
// 
// function getUser(id: string): User | null {
//   // 実装
// }
// \`\`\`
// 
// TypeScriptを活用して、より安全で保守性の高いコードを書きましょう。`,
//       slug: "typescript-type-safety",
//       isPublished: true,
//       authorId: testUser.id,
//       categoryId: typescriptCategory.id,
//       tags: {
//         connect: [{ id: typescriptTag.id }, { id: tutorialTag.id }],
//       },
//     },
//   });
// 
//   const samplePost3 = await prisma.post.create({
//     data: {
//       title: "React Hooksの使い方",
//       content: `# React Hooksの使い方
// 
// React Hooksは、関数コンポーネントでstateやライフサイクルメソッドを使用できるようにする機能です。
// 
// ## 主要なHooks
// - **useState**: 状態管理
// - **useEffect**: 副作用の処理
// - **useContext**: コンテキストの使用
// - **useReducer**: 複雑な状態管理
// 
// ## useStateの例
// \`\`\`jsx
// import { useState } from 'react';
// 
// function Counter() {
//   const [count, setCount] = useState(0);
// 
//   return (
//     <div>
//       <p>カウント: {count}</p>
//       <button onClick={() => setCount(count + 1)}>
//         増加
//       </button>
//     </div>
//   );
// }
// \`\`\`
// 
// Hooksを使うことで、より簡潔で理解しやすいコンポーネントが書けるようになります。`,
//       slug: "react-hooks-guide",
//       isPublished: true,
//       authorId: testUser.id,
//       categoryId: reactCategory.id,
//       tags: {
//         connect: [
//           { id: reactTag.id },
//           { id: tutorialTag.id },
//           { id: webdevTag.id },
//         ],
//       },
//     },
//   });
// 
//   const samplePost4 = await prisma.post.create({
//     data: {
//       title: "JavaScriptの基礎知識",
//       content: `# JavaScriptの基礎知識
// 
// JavaScriptは、Web開発において最も重要な言語の一つです。動的で柔軟な言語特性を理解することが重要です。
// 
// ## JavaScriptの特徴
// - **動的型付け**: 変数の型が実行時に決まる
// - **プロトタイプベース**: クラスベースではない継承
// - **関数型プログラミング**: 関数を第一級オブジェクトとして扱う
// - **非同期処理**: Promiseやasync/awaitによる非同期処理
// 
// ## 基本的な構文
// \`\`\`javascript
// // 変数宣言
// const name = "JavaScript";
// let age = 25;
// 
// // 関数定義
// function greet(name) {
//   return \`Hello, \${name}!\`;
// }
// 
// // アロー関数
// const add = (a, b) => a + b;
// 
// // オブジェクト
// const person = {
//   name: "John",
//   age: 30,
//   greet() {
//     return \`Hello, I'm \${this.name}\`;
//   }
// };
// \`\`\`
// 
// JavaScriptの基礎をしっかりと理解して、効果的なWebアプリケーションを開発しましょう。`,
//       slug: "javascript-basics",
//       isPublished: true,
//       authorId: testUser.id,
//       categoryId: javascriptCategory.id,
//       tags: {
//         connect: [{ id: webdevTag.id }],
//       },
//     },
//   });
// 
//   const samplePost5 = await prisma.post.create({
//     data: {
//       title: "その他の技術について",
//       content: `# その他の技術について
// 
// Web開発には様々な技術スタックがあります。それぞれの特徴を理解して、プロジェクトに適した技術を選択することが重要です。
// 
// ## バックエンド技術
// - **Python (Django/Flask)**: データサイエンスやAI開発に強い
// - **Java (Spring Boot)**: エンタープライズ開発で人気
// - **Go**: 高性能なAPIサーバーに適している
// - **Rust**: メモリ安全性とパフォーマンスを両立
// 
// ## フロントエンドフレームワーク
// - **Vue.js**: 学習コストが低く、段階的に導入可能
// - **Angular**: 大規模アプリケーションに適している
// - **Svelte**: コンパイル時に最適化される
// - **Solid.js**: リアクティブなUIライブラリ
// 
// ## データベース
// - **MongoDB**: ドキュメント指向データベース
// - **Redis**: インメモリデータストア
// - **Elasticsearch**: 検索エンジン
// - **Neo4j**: グラフデータベース
// 
// ## クラウドサービス
// - **AWS**: 豊富なサービスとグローバル展開
// - **Google Cloud**: AI/MLサービスが充実
// - **Azure**: Microsoftエコシステムとの統合
// - **Vercel**: フロントエンド特化のデプロイプラットフォーム
// 
// プロジェクトの要件に応じて、最適な技術スタックを選択しましょう。`,
//       slug: "other-technologies",
//       isPublished: true,
//       authorId: testUser.id,
//       categoryId: otherCategory.id,
//       tags: {
//         connect: [
//           { id: nodejsTag.id },
//           { id: tutorialTag.id },
//           { id: webdevTag.id },
//         ],
//       },
//     },
//   });

  console.log("シードデータ投入完了！", {
    // user: testUser.email,
    categories: [
      nextjsCategory.name,
      reactCategory.name,
      typescriptCategory.name,
      javascriptCategory.name,
      otherCategory.name,
    ],
    tags: [
      nextjsTag.name,
      typescriptTag.name,
      reactTag.name,
      nodejsTag.name,
      prismaTag.name,
    ],
    // posts: [
    //   samplePost1.title,
    //   samplePost2.title,
    //   samplePost3.title,
    //   samplePost4.title,
    //   samplePost5.title,
    // ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
