// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{
            marginTop: 'auto',
            padding: '60px 20px',
            borderTop: '1px solid #eee',
            backgroundColor: '#f9f9f9'
        }}>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
            }}>        
            </div>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: '40px'
            }}>
                
                {/* 左：店名 */}
                <div style={{ flex: '1', minWidth: '200px' }}>
                    <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Cece Farm</h2>
                    <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.6' }}>
                        Rare Plants & pizza coffee<br />
                        Chiang Mai, Thailand
                    </p>
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