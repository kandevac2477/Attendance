// app/api/users/route.ts
// このファイルはNext.jsのRoute Handlerとして機能します。

import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // lib/prisma.ts へのエイリアスパス、または相対パス

// GETリクエストのハンドラー
export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany(); // Prisma Clientを使ってデータを取得
    return NextResponse.json(users); // JSON形式でレスポンス
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}

// POSTリクエストのハンドラー
export async function POST(request: Request) {
  try {
    const body = await request.json(); // リクエストボディをJSONとしてパース
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        // その他の必要なデータ
      },
    });
    return NextResponse.json(newUser, { status: 201 }); // 作成されたリソースとステータス201
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
  }
}

// 他のHTTPメソッド（PUT, DELETEなど）も同様に定義できます。