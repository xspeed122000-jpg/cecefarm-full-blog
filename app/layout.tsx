// app/layout.tsx
import React from 'react';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Inter, Playfair_Display } from 'next/font/google';
import type { Metadata } from "next";

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'// ★後で簡単に呼び出せるように名前をつけます
});
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  // ★ Googleなどの検索エンジンに見つけてもらう設定です
  robots: {
    index: true, 
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // ★ htmlタグに設定したフォントの情報を追加します
    <html lang="ja" className={`${inter.className} ${inter.variable} ${playfair.variable}`}>

      {/* ★ 不要な <body>{children}</body> を削除し、こちらに統一しました */}
      <body style={{
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Suspense fallback={<div style={{ height: '130px' }} />}>
          <Header />
        </Suspense>

        <main style={{
          flex: 1, // これにより、メイン部分が余ったスペースを埋めます
          paddingTop: '140px',
          boxSizing: 'border-box'
        }}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}