import React from 'react';
import { Suspense } from 'react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Inter, Playfair_Display } from 'next/font/google';
import type { Metadata } from "next";

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'// ★後で簡単に呼び出せるように名前をつけます
});
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

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

// 1. 引数に params を追加し、Promise型として定義します
export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // 2. await を使って、中身（lang）を取り出します
  const { lang } = await params;

  return (
    <>
      {/* 上部固定エリア（トップバー + ヘッダー） */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
        <TopBar lang={lang} />
        <Suspense fallback={<div style={{ height: '60px', backgroundColor: '#fff' }} />}>
          <Header lang={lang} />
        </Suspense>
      </div>

      <main style={{
        flex: 1,
        paddingTop: '120px', // ★ここをロゴやメニューが綺麗に見える高さ（110px〜130px）に微調整してください
        boxSizing: 'border-box'
      }}>
        {children}
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
export async function generateStaticParams() {
  return [{ lang: 'jp' }, { lang: 'en' }, { lang: 'th' }];
}