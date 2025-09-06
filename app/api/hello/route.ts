import { NextRequest, NextResponse } from "next/server";

// GET リクエストの処理（データ取得）
export async function GET() {
  return NextResponse.json(
    {
      message: "Hello from Next.js API!",
      timestamp: new Date().toISOString(),
      status: "success",
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    // リクエストボディの取得
    const body = await request.json();

    console.log("受信したデータ:", body);

    return NextResponse.json(
      {
        message: "データを受信しました",
        receivedData: body,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "無効なデータ形式",
        message: "JSON形式のデータを送信してください",
      },
      { status: 400 }
    );
  }
}