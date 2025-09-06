import { Post, PostFromJsonPlaceHolder, PostFromJsonPlaceHolderWithUser, User } from "@/types/post";

// ダミー記事のデータ
export const posts: Post[] = [
  {
    slug: "about-nextjs",
    title: "Next.jsについて",
    content: `<h2>Next.jsの最新バージョンについて</h2>
        <p>Next.jsは15がリリースされてます。React19を標準サポートしてます。</p>`,
    abstract: "Next.jsについて解説します",
    date: "2025-08-01",
    category: "programming",
    author: "山田太郎",
    tags: ["Next.js", "React", "エンジニア"],
    readTime: 2,
  },
  {
    slug: "about-ts",
    title: "TypeScriptとは？",
    content: `<h2>TypeScriptのメリット</h2>
                <p>型を安全に扱うことができる言語</p>
                
                <h2>利点</h2>
                <p>誤ったデータが入ってきたときに即座に検知することができ、エラーが減る</p>`,
    abstract: "TypeScriptのメリットについて解説します",
    date: "2025-08-10",
    category: "programming",
    author: "山田太郎",
    tags: ["TypeScript", "React", "静的型付け言語"],
    readTime: 2,
  },
  {
    slug: "my-profile",
    title: "もんしょーのプロフィール",
    content: `<h2>はじめに</h2>
        <p>ITエンジニア。日々プログラミングを教えている。1994年生まれ。左利き。</p>`,
    abstract: "もんしょーという人物について紹介します",
    date: "2024-01-01",
    category: "other",
    author: "もんしょー",
    tags: ["プロフィール", "エンジニア", "もんしょー"],
    readTime: 1,
  },
];

// スラグから記事を取得する
export function getPostBySlug(slug: string): Post | null {
  return posts.find((post) => post.slug === slug) || null;
}

// カテゴリ別の記事を取得する
export function getPostsByCategory(category: string): Post[] {
  return posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

// 年月の記事を取得する
export function getPostsByYearMonth(year:string,month:string):Post[]{
  // 2025/08...OK
  // 2025/8...OKしたい
  // 0埋めをする
  const yearMonth = year+ "-" + month.padStart(2,"0");
  return posts.filter((post) => post.date.substring(0,7) === yearMonth)
}

//キーワード検索(タイトルと本文)
export function searchPostsByTitleAndContent(query:string):Post[]{
  // 検索キーワードがない場合
  if(!query || !query.trim()){
    return getAllPosts();
  }

  const searchTerm = query.toLowerCase().trim();

  return (
    posts.filter((post) => {
      // タイトル検索
      const titleMatch = post.title.toLocaleLowerCase().includes(searchTerm);
      //本文検索(HTMLタグを除去して検索)
      const contentText = post.content.replace(/<[^>]*>/g,"").toLowerCase();

      const contentMatch = contentText.includes(searchTerm);

      return titleMatch || contentMatch
    })
  )
}

export async function getPostsWithUsers(): Promise<PostFromJsonPlaceHolderWithUser[]> {
  try {
    const [postsRes,userRes] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/posts?_limit=5"),
        fetch("https://jsonplaceholder.typicode.com/users")
    ])
    if (!postsRes.ok || !userRes.ok) {
      throw new Error("データの取得に失敗しました");
    }

    // データ格納
    const posts: PostFromJsonPlaceHolder[] = await postsRes.json();
    const users: User[] = await userRes.json();

    // 投稿にユーザー情報を結合
    const postsWithUser = posts.map((post) => ({ ...post,
        user: users.find((user) => user.id === post.userId ) || ({} as User)
    }));
    return postsWithUser
  } catch (error) {
    console.error("データ取得エラー:", error);
    return []; // エラー時は空配列を返す
  }
}

// 全件取得する
export function getAllPosts(): Post[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
