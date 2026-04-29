// app/components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ 
      marginTop: '100px', 
      padding: '60px 20px', 
      borderTop: '1px solid #eee',
      backgroundColor: '#fafafa',
      color: '#666'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px' }}>
        
        {/* 左側：店名など */}
        <div>
          <h3 style={{ margin: 0, color: '#333' }}>Cece Farm</h3>
          <p style={{ fontSize: '0.8rem' }}>Rare Plants & Cafe</p>
        </div>

        {/* 右側：リンク */}
        <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem' }}>
          <Link href="/privacy-policy" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</Link>
          <span>|</span>
          <Link href="/sitemap" style={{ color: '#666', textDecoration: 'none' }}>Sitemap</Link>
          <span>|</span>
          <Link href="/contact" style={{ color: '#666', textDecoration: 'none' }}>Contact</Link>
        </div>

      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '0.7rem', color: '#999' }}>
        © 2026 Cece Farm. All Rights Reserved.
      </div>
    </footer>
  );
}