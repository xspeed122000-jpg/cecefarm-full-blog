import React from 'react';
import { Suspense } from 'react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import type { Metadata } from "next";

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
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {

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
        paddingTop: '120px',
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