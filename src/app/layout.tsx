/*===================================
メタデータの設定等しているファイル
googlfonntoの読み込みとか
====================================*/

// Google　フォントの設定
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';
import { NavigationProvider } from '@/contexts/NavigationContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body>
        <NavigationProvider>
          <div>
            <Header />
            <main style={{ paddingTop: '64px' }}>
              {children}
            </main>
          </div>
        </NavigationProvider>
      </body>
    </html>
  );
}