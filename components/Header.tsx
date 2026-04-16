// components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setKeyword(q);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/items?q=${encodeURIComponent(keyword)}`);
  };

  const navLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#333',
    fontSize: '0.9rem',
    fontWeight: '600',
    whiteSpace: 'nowrap'
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        {/* 左側：ロゴ画像 */}
        <Link href="/">
          <img src="/logo.png" alt="Cece Farm" style={{ height: '50px', width: 'auto' }} />
        </Link>

        {/* 中央：ナビゲーションメニュー */}
        <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Link href="/" style={navLinkStyle}>Home</Link>
          <Link href="/about" style={navLinkStyle}>About</Link>
          <Link href="/items" style={navLinkStyle}>Items</Link>
          <Link href="/pizza" style={navLinkStyle}>Pizza</Link>
          <Link href="/contact" style={navLinkStyle}>Contact</Link>
        </nav>

        {/* 右側：検索窓 */}
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
    </header>
  );
}

// スタイル設定（1つにまとめるため調整）
const headerStyle: React.CSSProperties = { 
  borderBottom: '1px solid #eee', 
  padding: '10px 20px', 
  backgroundColor: '#fff', 
  position: 'sticky', 
  top: 0, 
  zIndex: 1000,
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
};
const containerStyle: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' };
const searchFormStyle: React.CSSProperties = { display: 'flex', minWidth: '150px' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '6px 12px', borderRadius: '20px 0 0 20px', border: '1px solid #ddd', fontSize: '0.8rem' };
const buttonStyle: React.CSSProperties = { padding: '6px 12px', backgroundColor: '#2d5a27', color: '#fff', border: 'none', borderRadius: '0 20px 20px 0', cursor: 'pointer', fontSize: '0.8rem' };