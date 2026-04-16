'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');

  // URLの検索ワードが変わったら、入力欄の文字も同期させる
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setKeyword(q);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 検索実行：Itemsページへキーワードを持って移動
    router.push(`/items?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#2d5a27' }}>Cece Farm</h1>
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

// 簡易的なスタイル
const headerStyle: React.CSSProperties = { borderBottom: '1px solid #eee', padding: '15px 20px', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 100 };
const containerStyle: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' };
const searchFormStyle: React.CSSProperties = { display: 'flex', flex: 1, maxWidth: '500px' };
const inputStyle: React.CSSProperties = { flex: 1, padding: '10px 15px', borderRadius: '8px 0 0 8px', border: '1px solid #ddd', outline: 'none' };
const buttonStyle: React.CSSProperties = { padding: '10px 20px', backgroundColor: '#2d5a27', color: '#fff', border: 'none', borderRadius: '0 8px 8px 0', cursor: 'pointer' };