/*=================================
　処理内容：DB読み込み設定
呼び出されるファイル：
　・DBtests.tsx(test用)
呼び出すファイル：
　・.env.local
=================================*/
//.env.local呼び出し
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

//.env.localからsupabase接続情報を変数に格納
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//格納した値をエクスポート
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// サーバーサイド専用（Row Level Security をバイパスする場合）
export const supabaseAdmin: SupabaseClient | null =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      )
    : null;