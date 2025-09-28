"use server";
// CRUD機能を実装

import { PostCreateFromPrisma } from "@/types/post";
import { validateObject, ValidationRule } from "./validations";
import { Category, PrismaClient } from "@/lib/generated/prisma";
import { revalidatePath } from "next/cache";


const prisma = new PrismaClient({
  datasources:{
    db:{
      url:process.env.DATABASE_URL,
    } 
  }
});

// 投稿フォームのバリデーションルール（共通バリデーション機能を使用）
const postValidationRules: Partial<
  Record<keyof PostCreateFromPrisma, ValidationRule<PostCreateFromPrisma[keyof PostCreateFromPrisma]>>
> = {
  slug: {
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  title: {
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  content: {
    required: true,
    minLength: 10,
    maxLength: 5000,
  },
  category: {
    required: true,
  },
};

// Server Action用のバリデーション関数（共通バリデーション機能を使用）
function validatePostData(data: PostCreateFromPrisma): string[] {
  return validateObject(data, postValidationRules);
}

// Server Actionの結果を統一した型定義
type ActionResult = {
  success: boolean; // 成功か失敗かを表すフラグ
  message?: string; // 成功時のメッセージ（オプション）
  errors?: string[]; // エラーメッセージの配列（オプション）
  data?: any; // 作成されたデータ（オプション）
};


// C...作成
export async function createPostFromPrisma(
    formData: FormData
): Promise<ActionResult>{
    // 戻り値はActionResult型
    // フォームデータから値を取得（name属性で指定）
    const title = formData.get("title") as string; // タイトルを文字列として取得
    const content = formData.get("content") as string; // 内容を文字列として取得
    const category = formData.get("category") as string; // カテゴリを文字列として取得
    const slug = formData.get("slug") as string; // スラッグを文字列として取得
    const tags = JSON.parse(formData.get("tags") as string); // タグを文字列配列として取得
    const isPublishedString = formData.get("isPublished") as string; // 公開状態をブール値として取得
    const isPublished = isPublishedString === "true"; // 公開状態をブール値として取得
    const authorId = formData.get("authorId") as string;// 投稿者のIDを文字列として取得
    // 投稿データオブジェクトを作成
    const postCreate: PostCreateFromPrisma = {
    title: title || "",
    content: content || "",
    category: category || "",
    slug: slug || "",
    tags: tags || [],
    isPublished: isPublished || false,
    authorId: authorId,
    };

    // バリデーションを実行
    const validationErrors = validatePostData(postCreate);

    // バリデーションエラーがある場合は早期リターン
    if (validationErrors.length > 0) {
    return {
        success: false,
        errors: validationErrors,
    };
    }

    try {
    // カテゴリの存在確認
    const categoryExists = await prisma.category.findUnique({
        where: { id: postCreate.category },
    });
    console.log("カテゴリ存在確認:", categoryExists);

    // 著者の存在確認
    const authorExists = await prisma.profile.findUnique({
        where: { id: postCreate.authorId },
    });
    console.log("著者存在確認:", authorExists);

    const post = await prisma.post.create({
        data: {
            slug: postCreate.slug.trim(),
            title: postCreate.title.trim(),
            content: postCreate.content.trim(),
            category: {
                connect: {
                id: postCreate.category,
                },
            },
            tags: {
                connectOrCreate:
                postCreate.tags?.map((tagName) => ({
                    where: { name: tagName },
                    create: { name: tagName },
                })) || [],
            },
            isPublished: postCreate.isPublished,
            profile: {
                connect: {
                id: postCreate.authorId,
                },
            },
        },
    });

    console.log("投稿データ:", post); // 開発用のログ出力

    // Next.jsのキャッシュをクリアして最新情報を表示
    // これによりブログ一覧ページに新しい投稿が反映される
    revalidatePath("/blog");

    // 成功状態を返す（useActionStateがこの値を受け取る）
    return {
        success: true, // 成功フラグ
        message: "記事を投稿しました！", // ユーザーへのメッセージ
        data: post, // 作成されたデータ
    };
    } catch (error) {
    // 予期しないエラーが発生した場合の処理
    console.error("投稿エラー:", error); // エラーをコンソールに出力
    return {
        success: false, // 失敗フラグ
        errors: ["投稿の処理中にエラーが発生しました"], // ユーザーへのエラーメッセージ
    };
    }
}

// R...表示
export async function getAllPosts(){
    const posts = await prisma.post.findMany({
        include:{
            category:true,
            tags:true,
            profile:true,
        },
        where:{
            isPublished:true,
        }
    })
    return posts;
}

export async function getPostsByCategory(categoryName: string){
    const posts = await prisma.post.findMany({
        where:{ category:{name: categoryName}},
        include:{
            category: true,
            profile: true,
            tags: true,
        }
    });
    return posts;
}

export async function getPostBySlug(targetSlug:string){
    const post = await prisma.post.findFirst({
        include:{
            category:true,
            tags:true,
            profile:true,
        },
        where:{
            isPublished:true,
            slug: targetSlug
        }
    })
    return post;
}

// サイドバー用：カテゴリー別のリンクを取得する関数
export async function getCategoriesForSidebar() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            posts: {
              where: {
                isPublished: true, // 公開済みの投稿のみカウント
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      postCount: category._count.posts,
      href: `/blog/category/${category.name}`,
    }));
  } catch (error) {
    console.error("カテゴリー取得エラー:", error);
    return [];
  }
}

// サイドバー用：最新の投稿3件を取得する関数
export async function getLatestPostsForSidebar() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        isPublished: true, // 公開済みの投稿のみ
      },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3, // 最新3件のみ
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      href: `/blog/${post.slug}`,
      categoryName: post.category?.name || "未分類",
      createdAt: post.createdAt,
    }));
  } catch (error) {
    console.error("最新投稿取得エラー:", error);
    return [];
  }
}

// U...更新
export async function updatePostFromPrisma(
    formData:FormData):Promise<ActionResult>{

    const postId = formData.get("postId") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string; // categoryIdからcategoryに修正
    const slug = formData.get("slug") as string;
    const tagsString = formData.get("tags") as string;
    const tags = JSON.parse(tagsString) as string[];
    const isPublishedString = formData.get("isPublished") as string;
    const isPublished = isPublishedString === "true";
    const authorId = formData.get("authorId") as string;

    // postIdの必須チェック
    if (!postId) {
    return {
        success: false,
        errors: ["投稿IDが指定されていません"],
    };
    }

    // バリデーション用のデータオブジェクトを作成
    const updateData: PostCreateFromPrisma = {
    title: title || "",
    content: content || "",
    category: category || "",
    slug: slug || "",
    tags: tags || [],
    isPublished: isPublished || false,
    authorId: authorId,
    };

    // バリデーションを実行
    const validationErrors = validatePostData(updateData);
    if (validationErrors.length > 0) {
    console.log("バリデーションエラー詳細:", {
        updateData,
        validationErrors,
        postId,
        category,
        authorId,
    });
    return {
        success: false,
        errors: validationErrors,
    };
    }

    try {
    // カテゴリの存在確認
    const categoryExists = await prisma.category.findUnique({
        where: { id: category },
    });
    if (!categoryExists) {
        return {
        success: false,
        errors: ["指定されたカテゴリが存在しません"],
        };
    }

    // 著者の存在確認
    const authorExists = await prisma.profile.findUnique({
        where: { id: authorId },
    });
    if (!authorExists) {
        return {
        success: false,
        errors: ["指定された著者が存在しません"],
        };
    }

    // 投稿の更新処理
    const post = await prisma.post.update({
        where: { id: postId },
        data: {
        title: updateData.title.trim(),
        content: updateData.content.trim(),
        slug: updateData.slug.trim(),
        isPublished: updateData.isPublished,
        category: {
            connect: {
            id: category,
            },
        },
        tags: {
            set: [], // 既存のタグをすべて削除
            connectOrCreate:
            tags?.map((tagName) => ({
                where: { name: tagName },
                create: { name: tagName },
            })) || [],
        },
        profile: {
            connect: {
            id: authorId,
            },
        },
        },
        include: {
        category: true,
        tags: true,
        profile: true,
        },
    });

    // Next.jsのキャッシュをクリア
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);

    return {
        success: true,
        message: "記事を更新しました！",
        data: post,
    };
    } catch (error) {
    console.error("更新エラー:", error);
    return {
        success: false,
        errors: ["記事の更新中にエラーが発生しました"],
    };
    }
}

// D...削除
// 投稿削除関数
export async function deletePostFromPrisma(
  postId: string
): Promise<ActionResult> {
  // 投稿の削除
  try {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    return {
      success: true,
      message: "記事を削除しました！",
      data: post,
    };
  } catch (error) {
    console.error("削除エラー:", error);
    return {
      success: false,
      errors: ["記事の削除中にエラーが発生しました"],
    };
  }
}

export async function getCategories() {
    const categories = await prisma.category.findMany();
    return categories;
}