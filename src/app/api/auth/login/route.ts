import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// サーバー側バリデーションスキーマ
const loginSchema = z.object({
    email: z.string().email('有効なメールアドレスを入力してください'),
    password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
    
        // サーバー側バリデーション
        const validationResult = loginSchema.safeParse(body);
    
        if (!validationResult.success) {
            return NextResponse.json(
                { 
                    message: '入力データが無効です',
                    errors: validationResult.error.issues 
                },
                { status: 400 }
            );
        }
    
        const { email, password } = validationResult.data;
    
        // ここで実際の認証処理を実装
        // 例: データベースでのユーザー検証、パスワードハッシュ比較など
    
        // 仮の認証処理（実際の実装では適切な認証ライブラリを使用）
        if (email === 'test@example.com' && password === 'password123') {
            return NextResponse.json(
                { message: 'ログインに成功しました' },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: 'メールアドレスまたはパスワードが正しくありません' },
                { status: 401 }
            );
        }
    
    } catch (error) {
        return NextResponse.json(
            { message: 'サーバーエラーが発生しました' },
            { status: 500 }
        );
    }
} 