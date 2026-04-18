// components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // メニューの開閉状態

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setKeyword(q);
  }, [searchParams]);

  // ページ遷移したらメニューを閉じる
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/items?q=${encodeURIComponent(keyword)}`);
    setIsMenuOpen(false);
  };

  const navLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#333',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '10px 0',
  };

  return (
    <header style={headerStyle}>
      {/* スマホでメニューが開いている時に背景を固定するスタイル */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          .nav-menu {
            display: ${isMenuOpen ? 'flex' : 'none'} !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            padding: 20px;
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            z-index: 999;
          }
          .search-form {
            display: ${isMenuOpen ? 'flex' : 'none'} !important;
            margin-top: 15px;
          }
          .hamburger {
            display: block !important;
          }
        }
      `}} />

      <div style={containerStyle}>
        {/* 左側：ロゴ */}
        <Link href="/" style={{ flexShrink: 0 }}>
          <img src="/logo.png" alt="Cece Farm" style={logoStyle} />
        </Link>

        {/* スマホ用ハンバーガーボタン */}
        <button 
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={hamburgerButtonStyle}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* 中央：ナビゲーションメニュー */}
        <nav className="nav-menu" style={navStyle}>
          <Link href="/" style={navLinkStyle}>Home</Link>
          <Link href="/about" style={navLinkStyle}>About</Link>
          <Link href="/items" style={navLinkStyle}>Items</Link>
          <Link href="/pizza" style={navLinkStyle}>Pizza</Link>
          <Link href="/services" style={navLinkStyle}>Service</Link>
          <Link href="/shop" style={navLinkStyle}>Shop Info</Link>
          <Link href="/contact" style={navLinkStyle}>Contact</Link>
          
          {/* スマホの時だけメニュー内に出現する検索窓 */}
          <form onSubmit={handleSearch} className="search-form" style={mobileSearchFormStyle}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Go</button>
          </form>
        </nav>

        {/* 右側：PC用検索窓（画面が広い時だけ表示） */}
        <form onSubmit={handleSearch} className="search-form-desktop" style={desktopSearchFormStyle}>
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
    </header>
  );
}

// --- スタイル定義 ---

const headerStyle: React.CSSProperties = { 
  borderBottom: '1px solid #eee', 
  padding: '15px 20px', 
  backgroundColor: '#fff', 
  position: 'sticky', 
  top: 0, 
  zIndex: 1000,
  boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
};

const containerStyle: React.CSSProperties = { 
  maxWidth: '1200px', 
  margin: '0 auto', 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  position: 'relative'
};

const logoStyle: React.CSSProperties = {
  height: '60px', // スマホでも邪魔にならないよう少しだけ調整
  width: 'auto',
  display: 'block'
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: '20px',
  alignItems: 'center'
};

const hamburgerButtonStyle: React.CSSProperties = {
  display: 'none', // 基本は隠す
  fontSize: '2rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#333',
  padding: '5px'
};

const desktopSearchFormStyle: React.CSSProperties = {
  display: 'flex',
  minWidth: '180px'
};

const mobileSearchFormStyle: React.CSSProperties = {
  display: 'none', // デフォルトは隠してメディアクエリで制御
  width: '100%'
};

const inputStyle: React.CSSProperties = { 
  width: '100%', 
  padding: '8px 15px', 
  borderRadius: '20px 0 0 20px', 
  border: '1px solid #ddd', 
  fontSize: '0.9rem' 
};

const buttonStyle: React.CSSProperties = { 
  padding: '8px 15px', 
  backgroundColor: '#2d5a27', 
  color: '#fff', 
  border: 'none', 
  borderRadius: '0 20px 20px 0', 
  cursor: 'pointer', 
  fontSize: '0.9rem' 
};