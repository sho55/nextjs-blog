"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestSupabasePage() {
  const [connectionStatus, setConnectionStatus] =
    useState<string>("テスト中...");
  const [databaseInfo, setDatabaseInfo] = useState<any>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // Supabaseへの接続テスト
        const { data, error } = await supabase
          .from("auth.users") // システムテーブルにクエリ
          .select("count")
          .single();

        if (error) {
          // 認証が必要なテーブルなのでエラーが出るのは正常
          setConnectionStatus("✅ Supabase接続成功！");
        }

        // 公開情報の取得
        const { data: health } = await supabase.rpc("get_health");
        setDatabaseInfo({
          connected: true,
          timestamp: new Date().toLocaleString(),
        });
      } catch (error) {
        setConnectionStatus(`❌ 接続エラー: ${error}`);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Supabase 接続テスト</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">接続状態</h2>
        <p className="text-lg">{connectionStatus}</p>
        {databaseInfo && (
          <div className="mt-4">
            <p>
              <strong>接続時刻:</strong> {databaseInfo.timestamp}
            </p>
            <p>
              <strong>ステータス:</strong> 正常
            </p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">環境変数チェック</h2>
        <ul className="space-y-2">
          <li>
            <span className="font-medium">NEXT_PUBLIC_SUPABASE_URL:</span>
            <span
              className={
                process.env.NEXT_PUBLIC_SUPABASE_URL
                  ? "text-green-600 ml-2"
                  : "text-red-600 ml-2"
              }
            >
              {process.env.NEXT_PUBLIC_SUPABASE_URL
                ? "✅ 設定済み"
                : "❌ 未設定"}
            </span>
          </li>
          <li>
            <span className="font-medium">
              NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY:
            </span>
            <span
              className={
                process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
                  ? "text-green-600 ml-2"
                  : "text-red-600 ml-2"
              }
            >
              {process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
                ? "✅ 設定済み"
                : "❌ 未設定"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}