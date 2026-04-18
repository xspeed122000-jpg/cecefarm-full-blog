// components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 検索ワードの同期
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setKeyword(q);
  }, [searchParams]);

  // スクロール監視（固定ヘッダーと「上に戻る」ボタン用）
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/items?q=${encodeURIComponent(keyword)}`);
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header style={headerStyle}>
        {/* レスポンシブ用スタイル（メディアクエリ） */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 768px) {
            .header-container {
              flex-wrap: wrap !important;
              padding: 10px 0 !important;
            }
            .logo-area {
              width: 50% !important;
              order: 1;
            }
            .menu-button-area {
              width: 50% !important;
              order: 2;
              display: flex !important;
              justify-content: flex-end;
            }
            .search-area {
              width: 100% !important;
              order: 3;
              margin-top: 10px;
              display: block !important;
            }
            .nav-menu {
              display: ${isMenuOpen ? 'flex' : 'none'} !important;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background: white;
              flex-direction: column;
              padding: 20px;
              box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            }
            .desktop-only { display: none !important; }
          }
          @media (min-width: 769px) {
            .mobile-only { display: none !important; }
          }
        `}} />

        <div className="header-container" style={containerStyle}>
          {/* 1. ロゴエリア */}
          <div className="logo-area" style={{ flex: '0 0 auto' }}>
            <Link href="/">
              <img src="/logo.png" alt="Cece Farm" style={logoStyle} />
            </Link>
          </div>

          {/* 2. PC用ナビゲーション（中央） */}
          <nav className="nav-menu desktop-only" style={navStyle}>
            <Link href="/" style={navLinkStyle}>Home</Link>
            <Link href="/about" style={navLinkStyle}>About</Link>
            <Link href="/items" style={navLinkStyle}>Items</Link>
            <Link href="/pizza" style={navLinkStyle}>Pizza</Link>
            <Link href="/services" style={navLinkStyle}>Service</Link>
            <Link href="/shop" style={navLinkStyle}>Shop Info</Link>
            <Link href="/contact" style={navLinkStyle}>Contact</Link>
          </nav>

          {/* 3. 検索エリア（スマホでは2段目、PCでは右端） */}
          <div className="search-area" style={searchAreaStyle}>
            <form onSubmit={handleSearch} style={searchFormStyle}>
              <input 
                type="text" 
                placeholder="Search..." 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={inputStyle}
              />
              <button type="submit" style={buttonStyle}>Go</button>
            </form>
          </div>

          {/* 4. スマホ用MENUボタン */}
          <div className="menu-button-area mobile-only" style={{ display: 'none' }}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={hamburgerButtonStyle}
            >
              <div style={{ fontSize: '1.2rem', lineHeight: '1' }}>{isMenuOpen ? '✕' : '☰'}</div>
              <div style={{ fontSize: '0.6rem', fontWeight: 'bold', marginTop: '2px' }}>{isMenuOpen ? 'CLOSE' : 'MENU'}</div>
            </button>
          </div>
        </div>

        {/* スマホ用展開メニュー */}
        <nav className="nav-menu mobile-only" style={{ display: 'none' }}>
          <Link href="/" onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Home</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>About</Link>
          <Link href="/items" onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Items</Link>
          <Link href="/pizza" onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Pizza</Link>
          <Link href="/services" onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Service</Link>
          <Link href="/shop" onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Shop Info</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Contact</Link>
        </nav>
      </header>

      {/* 5. 上に戻るボタン */}
      {showScrollTop && (
        <button onClick={scrollToTop} style={scrollTopButtonStyle}>
          ▲
        </button>
      )}
    </>
  );
}

// --- スタイル定義 ---

const headerStyle: React.CSSProperties = { 
  borderBottom: '1px solid #eee', 
  padding: '10px 20px', 
  backgroundColor: '#fff', 
  position: 'fixed', // 'sticky'から'fixed'へ。より確実に固定されます
  width: '100%',
  top: 0, 
  zIndex: 1000,
  boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
};

const containerStyle: React.CSSProperties = { 
  maxWidth: '1200px', 
  margin: '0 auto', 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center'
};

const logoStyle: React.CSSProperties = {
  height: '50px', // スマホでも邪魔にならないサイズ
  width: 'auto',
  display: 'block'
};

const navStyle: React.CSSProperties = { display: 'flex', gap: '15px' };
const navLinkStyle: React.CSSProperties = { textDecoration: 'none', color: '#333', fontSize: '0.85rem', fontWeight: '600' };
const mobileNavLinkStyle: React.CSSProperties = { textDecoration: 'none', color: '#333', fontSize: '1.1rem', fontWeight: '600', padding: '15px 0', borderBottom: '1px solid #f5f5f5' };

const searchAreaStyle: React.CSSProperties = { flex: '0 0 auto' };
const searchFormStyle: React.CSSProperties = { display: 'flex' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '8px 12px', borderRadius: '20px 0 0 20px', border: '1px solid #ddd', fontSize: '0.9rem' };
const buttonStyle: React.CSSProperties = { padding: '8px 15px', backgroundColor: '#2d5a27', color: '#fff', border: 'none', borderRadius: '0 20px 20px 0', cursor: 'pointer' };

const hamburgerButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#2d5a27',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '5px'
};

const scrollTopButtonStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '45px',
  height: '45px',
  borderRadius: '50%',
  backgroundColor: 'rgba(45, 90, 39, 0.8)', // Cece Farmカラーの半透明
  color: '#fff',
  border: 'none',
  fontSize: '1.2rem',
  cursor: 'pointer',
  zIndex: 999,
  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};