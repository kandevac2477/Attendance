import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = NextResponse.json(
            { message: 'ログアウトしました' },
            { status: 200 }
        );

        // クッキーを削除
        response.cookies.set('auth_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0 // すぐに削除
        });

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { message: 'サーバーエラーが発生しました' },
            { status: 500 }
        );
    }
}
