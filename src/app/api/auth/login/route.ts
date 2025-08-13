import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/app/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

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
    
        // データベースからユーザーを検索
        const user = await prisma.user.findFirst({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                firstName: true,
                lastName: true,
                companyCode: true,
            }
        });

        if (!user) {
            return NextResponse.json(
                { message: 'メールアドレスまたはパスワードが正しくありません' },
                { status: 401 }
            );
        }

        // パスワードの比較
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return NextResponse.json(
                { message: 'メールアドレスまたはパスワードが正しくありません' },
                { status: 401 }
            );
        }

        // JWTトークンを生成
        const token = jwt.sign(
            { 
                userId: user.id,
                email: user.email,
                companyCode: user.companyCode 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // レスポンスを作成してクッキーにトークンを設定
        const response = NextResponse.json(
            { 
                message: 'ログインに成功しました',
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    companyCode: user.companyCode
                }
            },
            { status: 200 }
        );

        // HttpOnlyクッキーにトークンを設定
        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 24時間
        });

        return response;
    
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'サーバーエラーが発生しました' },
            { status: 500 }
        );
    }
} 