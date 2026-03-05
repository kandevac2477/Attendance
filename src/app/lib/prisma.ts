import { PrismaClient } from '@/generated/prisma';

// 開発環境でホットリロード時に新しいPrismaClientインスタンスが
// 繰り返し作成されるのを防ぐための設定
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma;
}

export default prisma;