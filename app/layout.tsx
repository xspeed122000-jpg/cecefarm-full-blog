import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // --- スタイル定義をここに追加 (エラー防止) ---
  const navLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#333',
    fontSize: '1.05rem', // 少し文字を大きく
    fontWeight: '600',
    transition: 'color 0.2s'
  };

  return (
    <html lang="ja">
      <body style={{ margin: 0, backgroundColor: '#FDFDFB' }}>
        <header style={{ 
          padding: '35px 50px', // 上下のパディングを35pxに広げて縦幅を確保
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
          {/* ロゴ：高さを60px以上に設定して大きく見せる */}
          <Link href="/">
            <img 
              src="/logo.png" 
              alt="Cece Farm Logo" 
              style={{ height: '70px', width: 'auto', display: 'block' }} 
            />
          </Link>

          {/* ナビゲーション：Aboutを追加 */}
          <nav style={{ display: 'flex', gap: '40px' }}>
            <Link href="/about" style={navLinkStyle}>About</Link>
            <Link href="/services" style={navLinkStyle}>Service</Link>
            <Link href="/shop" style={navLinkStyle}>Shop Info</Link>
            <Link href="/contact" style={navLinkStyle}>Contact</Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer style={{ padding: '40px', textAlign: 'center', backgroundColor: '#1B3022', color: '#fff' }}>
          © {new Date().getFullYear()} Cece Farm & Cafe
        </footer>
      </body>
    </html>
  );
}