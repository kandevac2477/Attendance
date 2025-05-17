/*=================================
　処理内容：DB読み込み設定
呼び出されるファイル：
　・DBtests.tsx(test用)
呼び出すファイル：
　・.env.local
=================================*/

//.env.local呼び出し
import { createClient } from '@supabase/supabase-js';

//.env.localからsupabase接続情報を変数に格納
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//格納した値をエクスポート
export const supabase = createClient(supabaseUrl, supabaseAnonKey);