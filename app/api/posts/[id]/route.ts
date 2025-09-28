// import { NextRequest, NextResponse } from "next/server";
// 
// type RouteParams = {
//   params: { id: string };
// };
// 
// // 外部で定義された posts配列を参照（実際はデータベース）
// const posts = [
//   {
//     id: 1,
//     title: "Next.js入門",
//     content: "Next.jsの基本について学びましょう。",
//     author: "開発者A",
//     createdAt: "2024-01-01T00:00:00Z",
//   },
//   {
//     id: 2,
//     title: "React Hook の活用",
//     content: "useStateやuseEffectの使い方を解説。",
//     author: "開発者B",
//     createdAt: "2024-01-02T00:00:00Z",
//   },
// ];
// 
// export async function GET(request: NextRequest, { params }: RouteParams) {
//   try {
//     const { id } = params;
//     const postId = parseInt(id);
// 
//     const post = posts.find((p) => p.id === postId);
// 
//     if (!post) {
//       return NextResponse.json(
//         {
//           error: "記事が見つかりません",
//           message: `ID ${id} の記事は存在しません`,
//         },
//         { status: 404 }
//       );
//     }
// 
//     return NextResponse.json(
//       {
//         success: true,
//         data: post,
//         message: "記事を取得しました",
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("記事取得エラー:", error);
// 
//     return NextResponse.json(
//       {
//         error: "記事の取得に失敗しました",
//         message: "サーバーエラーが発生しました",
//       },
//       { status: 500 }
//     );
//   }
// }
// 
// export async function PUT(request: NextRequest, { params }: RouteParams) {
//   try {
//     const { id } = params;
//     const postId = parseInt(id);
//     const body = await request.json();
// 
//     const postIndex = posts.findIndex((p) => p.id === postId);
// 
//     if (postIndex === -1) {
//       return NextResponse.json(
//         {
//           error: "記事が見つかりません",
//           message: `ID ${id} の記事は存在しません`,
//         },
//         { status: 404 }
//       );
//     }
// 
//     // 記事を更新
//     posts[postIndex] = {
//       ...posts[postIndex],
//       ...body,
//       updatedAt: new Date().toISOString(),
//     };
// 
//     return NextResponse.json(
//       {
//         success: true,
//         data: posts[postIndex],
//         message: "記事が正常に更新されました",
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("記事更新エラー:", error);
// 
//     return NextResponse.json(
//       {
//         error: "記事の更新に失敗しました",
//         message: "サーバーエラーが発生しました",
//       },
//       { status: 500 }
//     );
//   }
// }
// 
// export async function DELETE(request: NextRequest, { params }: RouteParams) {
//   try {
//     const { id } = params;
//     const postId = parseInt(id);
// 
//     const postIndex = posts.findIndex((p) => p.id === postId);
// 
//     if (postIndex === -1) {
//       return NextResponse.json(
//         {
//           error: "記事が見つかりません",
//           message: `ID ${id} の記事は存在しません`,
//         },
//         { status: 404 }
//       );
//     }
// 
//     // 記事を削除
//     const deletedPost = posts.splice(postIndex, 1)[0];
// 
//     return NextResponse.json(
//       {
//         success: true,
//         data: deletedPost,
//         message: "記事が正常に削除されました",
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("記事削除エラー:", error);
// 
//     return NextResponse.json(
//       {
//         error: "記事の削除に失敗しました",
//         message: "サーバーエラーが発生しました",
//       },
//       { status: 500 }
//     );
//   }
// }
