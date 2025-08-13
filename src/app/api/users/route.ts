// app/api/users/route.ts
// このファイルはNext.jsのRoute Handlerとして機能します。

import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma'; // lib/prisma.ts へのエイリアスパス、または相対パス
import { supabase, supabaseAdmin } from '../../lib/supabaseClient';
import { User, ApiResponse } from '../../lib/types';
import { NextRequest } from 'next/server';

// GETリクエストのハンドラー
export async function GET(request: NextRequest) {
    try {
        console.log('ユーザー取得APIが呼び出されました');
        
        // クライアント解決（Service Roleがあれば優先）
        const client = (supabaseAdmin ?? supabase);
        if (!client) {
            console.error('Supabase環境変数が設定されていません');
            return NextResponse.json<ApiResponse<User[]>>({
                data: null,
                error: 'Supabase設定エラー（NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY を設定）'
            }, { status: 500 });
        }

        const { data: users, error } = await client.from('User').select('*');
    
        if (error) {
          console.error('Supabaseエラー:', error);
          return NextResponse.json<ApiResponse<User[]>>({
            data: null,
            error: `ユーザー取得に失敗しました: ${error.message}`
          }, { status: 500 });
        }
    
        console.log('ユーザー取得成功:', users?.length || 0, '件');
        return NextResponse.json<ApiResponse<User[]>>({
          data: users || [],
          error: null
        });
      } catch (error) {
        console.error('予期しないエラー:', error);
        return NextResponse.json<ApiResponse<User[]>>({
          data: null,
          error: `内部サーバーエラー: ${error instanceof Error ? error.message : '不明なエラー'}`
        }, { status: 500 });
      }

}

// POSTリクエストのハンドラー
export async function POST(request: Request) {
    try {
        const body = await request.json(); // リクエストボディをJSONとしてパース
        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                firstName: body.name,
                password: body.password,
                affiliationFlg: body.affiliationFlg,
                lastName: body.lastName,
                companyCode: body.companyCode,
                joiningDate: body.joiningDate,
                retirementDate: body.retirementDate,
                // その他の必要なデータ
            },
        });
        return NextResponse.json(newUser, { status: 201 }); // 作成されたリソースとステータス201
    } catch (error) {
        return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
    }
}

// 他のHTTPメソッド（PUT, DELETEなど）も同様に定義できます。

// Supabaseで同様に書いた場合（非推奨）
// const { data: allInvoices } = await supabase.from('invoices').select('*');
// const { data: allCustomers } = await supabase.from('customers').select('*');
// const totalInvoices = allInvoices?.length || 0;
// const totalCustomers = allCustomers?.length || 0;