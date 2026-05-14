'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // --- 言語を判定するロジック ---
  const segments = pathname.split('/');
  const currentLang = ['jp', 'en', 'th'].includes(segments[1]) ? segments[1] : 'jp';

  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setKeyword(q);
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/${currentLang}/items?q=${encodeURIComponent(keyword)}`;
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const langPath = (path: string) => `/${currentLang}${path === '/' ? '' : path}`;

  const hamburgerButtonStyle: React.CSSProperties = {
    background: isMenuOpen ? '#000' : 'none',
    border: isMenuOpen ? '2px solid #000' : 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    color: isMenuOpen ? '#fff' : '#2d5a27',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 12px',
    transition: 'all 0.3s ease'
  };

  return (
    <>
      <header style={headerStyle}>
        <style dangerouslySetInnerHTML={{
          __html: `
          .service-container { position: relative; }
          .service-dropdown { 
            display: none; position: absolute; top: 100%; left: 0; 
            background: white; min-width: 180px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            padding: 10px 0; z-index: 100; border-radius: 8px;
          }
          .service-container:hover .service-dropdown { display: block; }
          .dropdown-item { 
            display: block; padding: 10px 20px; text-decoration: none; 
            color: #333; font-size: 0.85rem; 
          }
          .dropdown-item:hover { background: #f5f5f5; color: #2d5a27; }

          @media (max-width: 768px) {
            .header-container { flex-wrap: wrap !important; padding: 0 !important; }
            .logo-area { width: 60% !important; order: 1; }
            .menu-button-area { width: 40% !important; order: 2; display: flex !important; justify-content: flex-end; }
            .search-area { 
              width: 100% !important; order: 3; margin-top: 10px; display: flex !important;
              justify-content: center; padding: 0 10px; box-sizing: border-box;
            }
            .nav-menu.mobile-only {
              display: ${isMenuOpen ? 'flex' : 'none'} !important;
              position: absolute; top: 100%; left: 0; width: 100%;
              background: white; flex-direction: column; padding: 20px;
              box-shadow: 0 10px 15px rgba(0,0,0,0.1); box-sizing: border-box;
              z-index: 999;
            }
            .mobile-service-sub { 
               display: ${isServiceOpen ? 'flex' : 'none'} !important;
               flex-direction: column; background: #fafafa; padding-left: 20px;
            }
            .desktop-only { display: none !important; }
          }
          @media (min-width: 769px) { .mobile-only { display: none !important; } }
        `}} />

        <div className="header-container" style={containerStyle}>
          <div className="logo-area">
            <Link href={langPath('/')}>
              <img src="/logo.png" alt="Cece Farm" style={logoStyle} />
            </Link>
          </div>

          <nav className="nav-menu desktop-only" style={navStyle}>
            <Link href={langPath('/')} style={navLinkStyle}>Home</Link>
            <div className="service-container">
              <Link href={langPath('/service')} style={navLinkStyle}>Service ▾</Link>
              <div className="service-dropdown">
                <Link href="/jp/service/phyto_cites" className="dropdown-item">検疫証明書取得 (JP)</Link>
                <Link href="/en/service/phyto_cites" className="dropdown-item">Phyto / CITES (EN)</Link>
                <Link href="/th/service/phyto_cites" className="dropdown-item">Phyto / CITES (TH)</Link>
              </div>
            </div>
            <Link href={langPath('/about')} style={navLinkStyle}>About</Link>
            <Link href={langPath('/items')} style={navLinkStyle}>Items</Link>
            <Link href={langPath('/pizza')} style={navLinkStyle}>Pizza</Link>
            <Link href={langPath('/shop')} style={navLinkStyle}>Shop Info</Link>
            <Link href={langPath('/contact')} style={navLinkStyle}>Contact</Link>
          </nav>

          <div className="search-area">
            <form onSubmit={handleSearch} style={searchFormStyle}>
              <input
                type="text" placeholder="Search..." value={keyword}
                onChange={(e) => setKeyword(e.target.value)} style={inputStyle}
              />
              <button type="submit" style={buttonStyle}>Go</button>
            </form>
          </div>

          <div className="menu-button-area mobile-only">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={hamburgerButtonStyle}>
              <div style={{ fontSize: '1.5rem', lineHeight: '1' }}>{isMenuOpen ? '✕' : '☰'}</div>
              <div style={{ fontSize: '0.6rem', fontWeight: 'bold' }}>{isMenuOpen ? 'CLOSE' : 'MENU'}</div>
            </button>
          </div>
        </div>

        {/* スマホメニュー本体 */}
        <nav className="nav-menu mobile-only">
          <Link href={langPath('/')} onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Home</Link>

          <div style={{ ...mobileNavLinkStyle, cursor: 'pointer' }} onClick={() => setIsServiceOpen(!isServiceOpen)}>
            Service {isServiceOpen ? '▴' : '▾'}
          </div>
          <div className="mobile-service-sub">
            <Link href="/jp/service/phyto_cites" onClick={() => setIsMenuOpen(false)} style={{ ...mobileNavLinkStyle, fontSize: '0.9rem', border: 'none' }}>検疫証明書取得 (JP)</Link>
            <Link href="/en/service/phyto_cites" onClick={() => setIsMenuOpen(false)} style={{ ...mobileNavLinkStyle, fontSize: '0.9rem', border: 'none' }}>Phyto / CITES (EN)</Link>
            <Link href="/th/service/phyto_cites" onClick={() => setIsMenuOpen(false)} style={{ ...mobileNavLinkStyle, fontSize: '0.9rem', border: 'none' }}>Phyto / CITES (TH)</Link>
          </div>

          <Link href={langPath('/about')} onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>About</Link>
          <Link href={langPath('/items')} onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Items</Link>
          <Link href={langPath('/pizza')} onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Pizza</Link>
          <Link href={langPath('/shop')} onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Shop Info</Link>
          <Link href={langPath('/contact')} onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Contact</Link>
        </nav>
      </header>

      {showScrollTop && (
        <button onClick={scrollToTop} style={scrollTopButtonStyle}>▲</button>
      )}
    </>
  );
}

// --- スタイル（CSS）の定義 ---
const headerStyle: React.CSSProperties = {
  borderBottom: '1px solid #eee',
  padding: '10px 20px',
  backgroundColor: '#FAF8F5',
  position: 'fixed',
  width: '100%',
  top: 0,
  zIndex: 1000,
  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
  boxSizing: 'border-box'
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box'
};

const logoStyle: React.CSSProperties = {
  height: '50px',
  width: 'auto',
  display: 'block'
};

const navStyle: React.CSSProperties = { 
  display: 'flex', 
  gap: '15px',
  alignItems: 'center'
};

const navLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#333',
  fontSize: '0.85rem',
  fontWeight: '500',
  letterSpacing: '0.05em',
  textTransform: 'uppercase'
};

const mobileNavLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#333',
  fontSize: '1.1rem',
  fontWeight: '500',
  letterSpacing: '0.05em',
  padding: '15px 0',
  borderBottom: '1px solid #f5f5f5',
  display: 'block'
};

const searchFormStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 12px',
  borderRadius: '20px 0 0 20px',
  border: '1px solid #ddd',
  fontSize: '0.85rem'
};

const buttonStyle: React.CSSProperties = {
  padding: '6px 12px',
  backgroundColor: '#2d5a27',
  color: '#fff',
  border: 'none',
  borderRadius: '0 20px 20px 0',
  cursor: 'pointer',
  fontSize: '0.85rem'
};

const scrollTopButtonStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '45px',
  height: '45px',
  borderRadius: '50%',
  backgroundColor: 'rgba(45, 90, 39, 0.8)',
  color: '#fff',
  border: 'none',
  fontSize: '1.2rem',
  cursor: 'pointer',
  zIndex: 999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};