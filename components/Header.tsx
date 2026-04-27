// components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isServiceOpen, setIsServiceOpen] = useState(false);
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

  // components/Header.tsx (抜粋・修正版)

  // ★ここ！ Header関数の中に定義を移動します
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
          /* PC用：Serviceにホバーした時にメニューを出す */
          .service-container { position: relative; }
          .service-dropdown { 
            display: none; position: absolute; top: 100%; left: 0; 
            background: white; min-width: 180px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            padding: 10px 0; z-index: 100; borderRadius: 8px;
          }
          .service-container:hover .service-dropdown { display: block; }
          .dropdown-item { 
            display: block; padding: 10px 20px; text-decoration: none; 
            color: #333; font-size: 0.85rem; 
          }
          .dropdown-item:hover { background: #f5f5f5; color: #2d5a27; }
          @media (max-width: 768px) {
            /* スマホ用メニューの調整 */
            .mobile-service-sub { 
               padding-left: 20px; 
               display: ${isServiceOpen ? 'flex' : 'none'} !important;
               flex-direction: column;
               background: #fafafa;
            }
          @media (max-width: 768px) {
            .header-container { flex-wrap: wrap !important; padding: 0 !important; }
            .logo-area { width: 60% !important; order: 1; }
            .menu-button-area { width: 40% !important; order: 2; display: flex !important; justify-content: flex-end; }
            .search-area { 
              width: 100% !important; order: 3; margin-top: 10px; display: flex !important;
              justify-content: center; padding: 0 10px; box-sizing: border-box;
            }
            .search-area form { max-width: 90%; }
            .nav-menu.mobile-only {
              display: ${isMenuOpen ? 'flex' : 'none'} !important;
              position: absolute; top: 100%; left: 0; width: 100%;
              background: white; flex-direction: column; padding: 20px;
              box-shadow: 0 10px 15px rgba(0,0,0,0.1); box-sizing: border-box;
            }
            .desktop-only { display: none !important; }
          }
          @media (min-width: 769px) { .mobile-only { display: none !important; } }
        `}} />

        <div className="header-container" style={containerStyle}>
          {/* 左：ロゴ */}
          <div className="logo-area">
            <Link href="/">
              <img src="/logo.png" alt="Cece Farm" style={logoStyle} />
            </Link>
          </div>

          {/* 中央：PCメニュー */}
          <nav className="nav-menu desktop-only" style={navStyle}>
            
          
            <Link href="/" style={navLinkStyle}>Home</Link>
            <Link href="/about" style={navLinkStyle}>About</Link>
            <Link href="/items" style={navLinkStyle}>Items</Link>
            <Link href="/pizza" style={navLinkStyle}>Pizza</Link>
           <Link href="/" style={navLinkStyle}>Home</Link>
            {/* Serviceをドロップダウン化 */}
            <div className="service-container">
              <Link href="/services" style={navLinkStyle}>Service ▾</Link>
              <div className="service-dropdown">
                <Link href="/jp/phyto_cites" className="dropdown-item">Phyto / CITES (JP)</Link>
                <Link href="/en/phyto_cites" className="dropdown-item">Phyto / CITES (EN)</Link>
                <Link href="/th/phyto_cites" className="dropdown-item">Phyto / CITES (TH)</Link>
              </div>
            </div>
            <Link href="/shop" style={navLinkStyle}>Shop Info</Link>
            <Link href="/contact" style={navLinkStyle}>Contact</Link>
          </nav>

          {/* 右：検索窓 */}
          <div className="search-area">
            <form onSubmit={handleSearch} style={searchFormStyle}>
              <input
                type="text" placeholder="Search..." value={keyword}
                onChange={(e) => setKeyword(e.target.value)} style={inputStyle}
              />
              <button type="submit" style={buttonStyle}>Go</button>
            </form>
          </div>

          {/* 右端：ハンバーガーボタン（スマホのみ） */}
          <div className="menu-button-area mobile-only">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={hamburgerButtonStyle}>
              <div style={{ fontSize: '1.5rem', lineHeight: '1' }}>{isMenuOpen ? '✕' : '☰'}</div>
              <div style={{ fontSize: '0.6rem', fontWeight: 'bold' }}>{isMenuOpen ? 'CLOSE' : 'MENU'}</div>
            </button>
          </div>
        </div>

       {/* スマホ用展開メニュー */}
        <nav className="nav-menu mobile-only">
          {/* ... CLOSEボタン ... */}
          <Link href="/" onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Home</Link>
          
          {/* スマホ版 Service展開 */}
          <div style={{...mobileNavLinkStyle, cursor: 'pointer'}} onClick={() => setIsServiceOpen(!isServiceOpen)}>
            Service {isServiceOpen ? '▴' : '▾'}
          </div>
          {isServiceOpen && (
            <div className="mobile-service-sub">
              <Link href="/jp/phyto_cites" onClick={() => setIsMenuOpen(false)} style={{...mobileNavLinkStyle, fontSize: '0.9rem', paddingLeft: '20px'}}>Phyto / CITES (JP)</Link>
              <Link href="/en/phyto_cites" onClick={() => setIsMenuOpen(false)} style={{...mobileNavLinkStyle, fontSize: '0.9rem', paddingLeft: '20px'}}>Phyto / CITES (EN)</Link>
              <Link href="/th/phyto_cites" onClick={() => setIsMenuOpen(false)} style={{...mobileNavLinkStyle, fontSize: '0.9rem', paddingLeft: '20px'}}>Phyto / CITES (TH)</Link>
            </div>
          )}
        
          <Link href="/about" onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>About</Link>
          <Link href="/items" onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Items</Link>
          <Link href="/pizza" onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Pizza</Link>
          <Link href="/services" onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Service</Link>
          <Link href="/shop" onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Shop Info</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} style={mobileNavLinkStyle}>Contact</Link>
        </nav>
      </header>

      {/* 上に戻るボタン */}
      {showScrollTop && (
        <button onClick={scrollToTop} style={scrollTopButtonStyle}>▲</button>
      )}
    </>
  );
}

// Header.tsx の一番下、 return 以降のスタイル定義をこれに差し替えてください

const headerStyle: React.CSSProperties = {
  borderBottom: '1px solid #eee',
  padding: '10px 20px',
  backgroundColor: '#fff',
  position: 'fixed',
  width: '100%',
  top: 0,
  zIndex: 1000,
  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
  boxSizing: 'border-box' // 右側のはみ出し防止
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
  maxWidth: '100%',
  display: 'block'
};

const navStyle: React.CSSProperties = { display: 'flex', gap: '15px' };

const navLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#333',
  fontSize: '0.85rem',
  fontWeight: '600'
};

const mobileNavLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#333',
  fontSize: '1.1rem',
  fontWeight: '600',
  padding: '15px 0',
  borderBottom: '1px solid #f5f5f5'
};

// components/Header.tsx のスタイル定義部分を修正

const searchAreaStyle: React.CSSProperties = {
  flex: '0 0 auto',
  marginLeft: 'auto', // これでPC時に右側に寄ります
  maxWidth: '300px',  // ★検索窓の最大幅を制限（お好みで 250px などに）
  width: '100%',      // スマホでは maxWidth の範囲で広がります
};

const searchFormStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end', // 中身を右側に寄せます
  boxSizing: 'border-box',
  width: '100%'
};

// 入力欄も少しスリムに調整
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 12px', // 少し上下を細くしました
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

const closeMenuButtonStyle: React.CSSProperties = {
  backgroundColor: '#000',      // 黒背景
  color: '#fff',               // 白文字
  border: '2px solid #000',    // 黒の太枠
  padding: '8px 16px',
  borderRadius: '4px',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  letterSpacing: '1px'
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
  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};