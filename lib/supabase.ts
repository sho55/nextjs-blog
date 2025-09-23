import { createClient } from "@supabase/supabase-js";

// 環境変数の存在チェック
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error("Missing Supabase environment variables");
}

// クライアントサイド用（Publishable Key）
export const supabase = createClient(supabaseUrl, supabasePublishableKey);

// サーバーサイド用（Secret Key）
export const supabaseAdmin = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    autoRefreshToken: false,
    // persistSession: false,
  },
});