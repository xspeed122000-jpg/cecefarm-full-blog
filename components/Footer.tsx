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
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Cece Farm</h2>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Rare Plants & Cafe in Chiang Mai</p>
        </div>

        <nav style={{ display: 'flex', gap: '20px', fontSize: '0.9rem' }}>
          <Link href="/sitemap" style={{ color: '#444', textDecoration: 'none' }}>Sitemap</Link>
          <Link href="/privacy-policy" style={{ color: '#444', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/contact" style={{ color: '#444', textDecoration: 'none' }}>Contact</Link>
        </nav>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '0.8rem', color: '#999' }}>
        © 2026 Cece Farm. All Rights Reserved.
      </div>
    </footer>
  );
}