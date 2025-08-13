/*===================================
メタデータの設定等しているファイル
googlfonntoの読み込みとか
====================================*/

// Google　フォントの設定
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { NavigationProvider } from '@/contexts/NavigationContext';
import MainLayout from '@/components/layouts/MainLayout';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: '勤怠管理システム',
    description: '従業員の勤怠管理、シフト管理、休暇申請を一括管理できるシステム',
};

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={geistSans.className}>
                <NavigationProvider>
                    <MainLayout>
                        {children}
                    </MainLayout>
                </NavigationProvider>
            </body>
        </html>
    );
}