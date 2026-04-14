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
      <body style={{
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
        backgroundColor: '#FDFDFB', // ここで全体の背景色を指定
        color: '#333'
      }}>
        {/* --- ヘッダー（固定式） --- */}
        <header style={{
          padding: '25px 40px', // 縦の25pxをさらに大きく（30px〜40pxなど）するとロゴの余裕が生まれます
          backgroundColor: '#fff',
          borderBottom: '1px solid #eee',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* ロゴエリア */}
          <Link href="/">
            <img
              src="/logo.png"
              alt="Cece Farm Logo"
              style={{ height: '60px', width: 'auto' }} // heightを大きく設定すればロゴが大きく表示されます
            />
          </Link>

          {/* ナビゲーション */}
          <nav style={{ display: 'flex', gap: '30px', fontWeight: 'bold' }}>
            <Link href="/about" style={navLinkStyle}>About</Link>
            <Link href="/services" style={navLinkStyle}>Service</Link>
            <Link href="/shop" style={navLinkStyle}>Shop Info</Link>
            <Link href="/contact" style={navLinkStyle}>Contact</Link>
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