import React from 'react';
import { createClient } from 'next-sanity';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

// Sanityクライアントの設定
const client = createClient({
  projectId: '88s4pwup',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-01',
});

export const dynamic = 'force-static';

export default async function ItemsPage() {
  // 「post」タイプの中から、ピザ以外の植物（商品）を取得する
  // ※もしSanity側で"item"などの別タイプを作っている場合は、"_type == 'item'"に変更してください
  const items = await client.fetch(`
    *[_type == "post"] | order(_createdAt desc) {
      title,
      "slug": slug.current,
      _createdAt,
      "imageUrl": mainImage.asset->url
    }
  `);

return (
    <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* パンくずリストを追加 */}
      <Breadcrumbs items={[{ label: 'Items' }]} />

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2d5a27' }}>Plant Collection</h1>
        {/* ... */}
  f    </div>
      {/* ... */}
    </main>
  );
}

  return (
    <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2d5a27', marginBottom: '10px' }}>Plant Collection</h1>
        <p style={{ color: '#666' }}>Rare variegated plants from Cece Farm</p>
      </div>

      {/* --- サイト内検索窓 (UIのみ) --- */}
      <div style={{ marginBottom: '40px', display: 'flex', gap: '10px', maxWidth: '600px', margin: '0 auto 50px' }}>
        <input 
          type="text" 
          placeholder="Search plants (e.g. Philodendron...)" 
          style={{ 
            flex: 1, 
            padding: '15px', 
            borderRadius: '12px', 
            border: '1px solid #ddd',
            fontSize: '1rem',
            outline: 'none'
          }} 
        />
        <button style={{ 
          backgroundColor: '#2d5a27', 
          color: '#fff', 
          padding: '0 25px', 
          borderRadius: '12px', 
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Search
        </button>
      </div>

      {/* --- 商品一覧グリッド --- */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '30px' 
      }}>
        {items.map((item: any) => (
          <Link key={item.slug} href={`/posts/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={cardStyle}>
              <div style={{ width: '100%', height: '250px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>No Image</div>
                )}
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 10px 0', color: '#333' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>
                  View Details →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  border: '1px solid #eee',
  transition: 'transform 0.2s'
};