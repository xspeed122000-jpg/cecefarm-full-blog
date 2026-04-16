import React from 'react';
import Link from 'next/link';
import { Suspense } from 'react'; // 追加
import Header from '@/components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#333',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'color 0.2s'
  };

  return (
    <html lang="ja">
      <body style={{ margin: 0, backgroundColor: '#FDFDFB', display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <Suspense fallback={<div style={{ height: '60px' }} />}>
          <Header />
        </Suspense>

        {/* メニュー項目を増やしました */}
        <nav style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <Link href="/" style={navLinkStyle}>Home</Link>
          <Link href="/about" style={navLinkStyle}>About</Link>
          <Link href="/items" style={navLinkStyle}>Items</Link>
          <Link href="/pizza" style={navLinkStyle}>Pizza</Link> {/* 追加 */}
          <Link href="/services" style={navLinkStyle}>Service</Link>
          <Link href="/shop" style={navLinkStyle}>Shop Info</Link>
          <Link href="/contact" style={navLinkStyle}>Contact</Link>
        </nav>

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