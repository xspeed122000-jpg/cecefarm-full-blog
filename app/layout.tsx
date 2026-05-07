// app/layout.tsx
import React from 'react';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Inter, Playfair_Display } from 'next/font/google';
import type { Metadata } from "next";

import { GoogleAnalytics } from '@next/third-parties/google'; // ★ 追加

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'// ★後で簡単に呼び出せるように名前をつけます
});
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

// app/layout.tsx

export const metadata: Metadata = {
  title: {
    default: "Cece Farm | チェンマイの希少植物専門店 & カフェ",
    template: "%s | Cece Farm"
  },
  description: "タイ・チェンマイのメーリムに位置する希少な熱帯植物を扱うファーム＆カフェです。プロの視点で厳選した植物をご提案します。",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  // Keywordsは現在のSEOでは重要視されないため設定しなくても問題ありません。
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
      {/* ★ </body>の直後にこれを追加（測定IDを入れてください） */}
      <GoogleAnalytics gaId="G-H0M06NKHPL" />
    </html>
  );
}