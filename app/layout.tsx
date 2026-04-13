import './globals.css' // もしファイルがなければこの行は消してもOKです
import Link from 'next/link'

export const metadata = {
  title: 'Cece Farm | チェンマイの観葉植物・カフェ',
  description: 'タイ・チェンマイから希少な観葉植物と美味しいコーヒーをお届けします。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        
        {/* --- ヘッダー（固定式） --- */}
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderBottom: '1px solid #eee',
          padding: '0 20px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: 'blur(5px)' // 背景を少しぼかすオシャレ加工
        }}>
          {/* ロゴエリア */}
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#2d5a27' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Cece Farm
            </Link>
          </div>

          {/* ナビゲーション */}
          <nav>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              gap: '20px',
              margin: 0,
              padding: 0,
              fontSize: '0.9rem',
              fontWeight: 500
            }}>
              <li><Link href="/" style={navItemStyle}>Home</Link></li>
              <li><Link href="/products" style={navItemStyle}>商品一覧</Link></li>
              <li><Link href="/services" style={navItemStyle}>Service</Link></li>
              <li><Link href="/shop" style={navItemStyle}>店舗情報</Link></li>
              <li><Link href="/contact" style={navItemStyle}>お問い合わせ</Link></li>
            </ul>
          </nav>
        </header>

        {/* --- メインコンテンツ（記事やリストが表示される場所） --- */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

        {/* --- フッター --- */}
        <footer style={{
          backgroundColor: '#333',
          color: '#fff',
          padding: '40px 20px',
          marginTop: '50px'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '1.2rem' }}>
              Cece Farm & Cafe
            </div>
            <p style={{ fontSize: '0.8rem', color: '#ccc', lineHeight: '1.6' }}>
              Chiang Mai, Thailand<br />
              希少な観葉植物の輸出販売・カフェ運営
            </p>
            <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#888' }}>
              &copy; {new Date().getFullYear()} Cece Farm. All rights reserved.
            </div>
          </div>
        </footer>

      </body>
    </html>
  )
}

// リンクの共通スタイル
const navItemStyle = {
  textDecoration: 'none',
  color: '#333',
  transition: 'color 0.3s',
}