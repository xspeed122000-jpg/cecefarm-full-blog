import React from 'react';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ナビゲーションリンクの共通スタイル
  const navLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#333',
    fontSize: '1.05rem',
    fontWeight: '600',
    transition: 'color 0.2s'
  };

  return (
    <html lang="ja">
      <body style={{ 
        margin: 0, 
        backgroundColor: '#FDFDFB', 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        fontFamily: 'sans-serif'
      }}>
        {/* ヘッダー：縦幅を広げ、ロゴを大きく */}
        <header style={{ 
          padding: '30px 50px', 
          backgroundColor: '#fff', 
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}>
          {/* ロゴエリア */}
          <Link href="/">
            <img 
              src="/logo.png" 
              alt="Cece Farm Logo" 
              style={{ height: '75px', width: 'auto', display: 'block' }} 
            />
          </Link>

          {/* ナビゲーションエリア */}
          <nav style={{ display: 'flex', gap: '40px' }}>
            <Link href="/about" style={navLinkStyle}>About</Link>
            <Link href="/services" style={navLinkStyle}>Service</Link>
            <Link href="/shop" style={navLinkStyle}>Shop Info</Link>
            <Link href="/contact" style={navLinkStyle}>Contact</Link>
          </nav>
        </header>

        {/* メインコンテンツ */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

        {/* フッター */}
        <footer style={{ 
          padding: '40px', 
          textAlign: 'center', 
          backgroundColor: '#1B3022', 
          color: '#fff',
          marginTop: 'auto'
        }}>
          <p>© {new Date().getFullYear()} Cece Farm & Cafe</p>
        </footer>
      </body>
    </html>
  );
}