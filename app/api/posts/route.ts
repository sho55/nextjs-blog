import { NextRequest, NextResponse } from "next/server";

// ダミーデータ（実際のアプリではデータベースを使用）
let posts = [
  {
    id: 1,
    title: "Next.js入門",
    content: "Next.jsの基本について学びましょう。",
    author: "開発者A",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    title: "React Hook の活用",
    content: "useStateやuseEffectの使い方を解説。",
    author: "開発者B",
    createdAt: "2024-01-02T00:00:00Z",
  },
];

// 新しい記事を作成 (CREATE)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, author } = body;

    // バリデーション
    if (!title || !content || !author) {
      return NextResponse.json(
        {
          error: "必要な項目が不足しています",
          message: "title、content、authorは必須項目です",
          requiredFields: ["title", "content", "author"],
        },
        { status: 400 }
      );
    }

    // 新しい記事を作成
    const newPost = {
      id: posts.length + 1,
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      createdAt: new Date().toISOString(),
    };

    posts.push(newPost);

    return NextResponse.json(
      {
        success: true,
        data: newPost,
        message: "記事が正常に作成されました",
      },
      {
        status: 201,
        headers: {
          Location: `/api/posts/${newPost.id}`,
        },
      }
    );
  } catch (error) {
    console.error("記事作成エラー:", error);

    return NextResponse.json(
      {
        error: "記事の作成に失敗しました",
        message: "サーバーエラーが発生しました",
      },
      { status: 500 }
    );
  }
}

// 記事一覧を取得 (READ)
export async function GET() {
  try {

    return NextResponse.json(
      {
        success: true,
        data: posts,
        total: posts.length,
        message: `${posts.length}件の記事を取得しました`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("記事取得エラー:", error);

    return NextResponse.json(
      {
        error: "記事の取得に失敗しました",
        message: "サーバーエラーが発生しました",
      },
      { status: 500 }
    );
  }
}