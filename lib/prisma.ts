
import { PrismaClient } from '@prisma/client';

// 開発環境でホットリロード時に新しいPrismaClientインスタンスが
// 繰り返し作成されるのを防ぐための設定
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default prisma;