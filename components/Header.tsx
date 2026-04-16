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

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        {/* ロゴ部分：テキストではなく画像を使うように変更 */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <img 
            src="/logo.png" // ★Oliverさんのロゴ画像のパスに合わせてください
            alt="Cece Farm" 
            style={{ height: '40px', width: 'auto' }} 
          />
        </Link>

        <form onSubmit={handleSearch} style={searchFormStyle}>
          <input 
            type="text" 
            placeholder="Search plants..." 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Search</button>
        </form>
      </div>
    </header>
  );
}

// sticky（固定）の設定を入れることで、スクロールしても常に上に出るようになります
const headerStyle: React.CSSProperties = { 
  borderBottom: '1px solid #eee', 
  padding: '10px 20px', 
  backgroundColor: '#fff', 
  position: 'sticky', // ★常に画面の一番上に固定
  top: 0, 
  zIndex: 1000 
};
const containerStyle: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' };
const searchFormStyle: React.CSSProperties = { display: 'flex', flex: 1, maxWidth: '400px' };
const inputStyle: React.CSSProperties = { flex: 1, padding: '8px 15px', borderRadius: '8px 0 0 8px', border: '1px solid #ddd', outline: 'none' };
const buttonStyle: React.CSSProperties = { padding: '8px 15px', backgroundColor: '#2d5a27', color: '#fff', border: 'none', borderRadius: '0 8px 8px 0', cursor: 'pointer' };