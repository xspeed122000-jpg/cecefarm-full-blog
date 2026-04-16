'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SearchBox from './SearchBox';

export default function ItemsListClient({ initialItems }: { initialItems: any[] }) {
  const [query, setQuery] = useState('');

  // 入力された文字でアイテムを絞り込む（大文字小文字を区別しない）
  const filteredItems = initialItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <SearchBox query={query} setQuery={setQuery} />

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '30px' 
      }}>
        {filteredItems.map((item: any) => (
          <Link key={item.slug} href={`/posts/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={cardStyle}>
              <div style={{ width: '100%', height: '250px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>No Image</div>
                )}
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 10px 0', color: '#333' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>View Details →</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 検索結果がゼロの場合の表示 */}
      {filteredItems.length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
          一致する植物が見つかりませんでした。
        </div>
      )}
    </>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  border: '1px solid #eee'
};