import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// 認証が不要なパス
const publicPaths = ['/login', '/regist'];

// 認証が必要なAPIパス（開発中は一時的にコメントアウト）
const protectedApiPaths = ['/api/timeClock']; // '/api/users'を一時的に削除

function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 静的ファイルやAPI以外のパブリックパスは除外
  if (pathname.startsWith('/_next/') || 
      pathname.startsWith('/public/') || 
      pathname.includes('.')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth_token')?.value;
  const isValidToken = token ? verifyToken(token) : null;

  // パブリックパスの場合
  if (publicPaths.includes(pathname)) {
    // すでにログイン済みの場合はホームにリダイレクト
    if (isValidToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // 保護されたAPIパスの場合
  if (protectedApiPaths.some(path => pathname.startsWith(path))) {
    if (!isValidToken) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // その他のパス（プライベートページ）
  if (!isValidToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
