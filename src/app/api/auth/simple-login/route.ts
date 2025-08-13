import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabaseClient';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: 'メールアドレスとパスワードを入力してください' },
                { status: 400 }
            );
        }

        if (!supabase) {
            return NextResponse.json(
                { message: 'データベース接続エラー' },
                { status: 500 }
            );
        }

        // Supabaseから直接ユーザーを検索（パスワード含む）
        const { data: users, error } = await supabase
            .from('User')
            .select('id, email, password, firstName, lastName, companyCode')
            .eq('email', email)
            .limit(1);

        if (error) {
            console.error('Database error:', error);
            return NextResponse.json(
                { message: 'データベースエラーが発生しました' },
                { status: 500 }
            );
        }

        if (!users || users.length === 0) {
            return NextResponse.json(
                { message: 'メールアドレスまたはパスワードが正しくありません' },
                { status: 401 }
            );
        }

        const user = users[0];

        // 平文パスワードの比較（本番環境では推奨されません）
        if (user.password !== password) {
            return NextResponse.json(
                { message: 'メールアドレスまたはパスワードが正しくありません' },
                { status: 401 }
            );
        }

        // ログイン成功
        return NextResponse.json({
            message: 'ログインに成功しました',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                companyCode: user.companyCode
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'サーバーエラーが発生しました' },
            { status: 500 }
        );
    }
}
