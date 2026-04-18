// app/layout.tsx
import React from 'react';
import { Suspense } from 'react';
import Header from '@/components/Header';

// app/layout.tsx

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ /* 既存のスタイル */ }}>
        <Suspense fallback={<div style={{ height: '130px' }} />}>
          <Header />
        </Suspense>

        {/* mainタグにヘッダーの高さ分の余白を追加 */}
        <main style={{ 
          flex: 1, 
          paddingTop: '140px', // ★スマホの2段ヘッダー分、上を空けます
          boxSizing: 'border-box' 
        }}>
          {children}
        </main>

        <footer style={{ /* 既存のスタイル */ }}>
          <p>© {new Date().getFullYear()} Cece Farm & Cafe</p>
        </footer>
      </body>
    </html>
  );
}