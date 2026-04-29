// app/layout.tsx
import React from 'react';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// app/layout.tsx

import type { Metadata } from "next"; // すでに import があればそのままでOK

export const metadata: Metadata = {
  robots: {
    index: false, // 後で書き換える
    follow: false, // 後で書き換える
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      {/* 1. bodyにflexを設定すると、コンテンツが少なくてもフッターが下に固定されます */}
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

        {/* 2. ここを修正！ HTMLのタグではなく、作成したコンポーネントを呼び出します */}
        <Footer /> 
      </body>
    </html>
  );
}