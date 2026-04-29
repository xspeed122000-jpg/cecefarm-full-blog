// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{
            marginTop: 'auto',
            padding: '80px 20px',
            backgroundColor: '#1a1a1a', // 濃い目のグレー（赤ロゴを引き立てます）
            color: '#eee'
        }}>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center', // ★これで横並びの要素が綺麗に中央で揃います
                gap: '40px'
            }}>
                <div style={{ flex: '1', minWidth: '200px' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#fff' }}>Cece Farm</h2>
                    <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '5px' }}>Rare Plants & coffee</p>
                </div>

                {/* 中央：主要サービス（ここを埋める） */}
                <div style={{ flex: '1', minWidth: '200px' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#333' }}>Categories</h3>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                        <Link href="/items" style={{ color: '#666', textDecoration: 'none' }}>All Plants</Link>
                        <Link href="/phyto_cites" style={{ color: '#666', textDecoration: 'none' }}>Phyto & CITES</Link>
                    </nav>
                </div>

                {/* 右：サポート（縦並び） */}
                <div style={{ flex: '1', minWidth: '150px' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#333' }}>Support</h3>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                        <Link href="/sitemap" style={{ color: '#666', textDecoration: 'none' }}>Sitemap</Link>
                        <Link href="/privacy-policy" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</Link>
                        <Link href="/contact" style={{ color: '#666', textDecoration: 'none' }}>Contact</Link>
                    </nav>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '0.8rem', color: '#999' }}>
                © 2026 Cece Farm. All Rights Reserved.
            </div>
        </footer>
    );
}