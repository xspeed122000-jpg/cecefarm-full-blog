// app/layout.tsx
import React from 'react';
import { Suspense } from 'react';
import Header from '@/components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, backgroundColor: '#FDFDFB', display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        
        {/* このHeaderの中にロゴ、メニュー7種、検索窓がすべて入っています */}
        <Suspense fallback={<div style={{ height: '70px' }} />}>
          <Header />
        </Suspense>

        <main style={{ flex: 1 }}>
          {children}
        </main>

        <footer style={{ padding: '40px', textAlign: 'center', backgroundColor: '#1B3022', color: '#fff', marginTop: 'auto' }}>
          <p>© {new Date().getFullYear()} Cece Farm & Cafe</p>
        </footer>
      </body>
    </html>
  );
}