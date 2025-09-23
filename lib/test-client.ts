import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

// TypeScriptの自動補完とタイプセーフティを確認
async function testClient() {
  // User作成時の型チェック（IDEで確認）
  const user = await prisma.profile.create({
    data: {
      email: "test@example.com",
      full_name: "テストユーザー",
      // ここで間違った型を入れるとエラーになることを実演
    },
  });

  console.log("作成されたユーザー:", user);
}
testClient();