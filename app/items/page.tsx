// app/items/page.tsx
import { createClient } from 'next-sanity';
import Image from "next/image";
import Link from "next/link";

export const runtime = 'edge';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function getItems() {
  // Sanityの標準的なカテゴリースキーマにも対応できるように取得項目を増やしています
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    category,
    Category,
    "categories": categories[]->title, 
    "imageUrl": mainImage.asset->url
  }`;
  return await client.fetch(query);
}

export default async function ItemsPage() {
  const items = await getItems();

  // ★ どんなデータ構造が来ても絶対にエラーにならない安全な分類処理
  const groupedItems = items.reduce((acc: any, item: any) => {
    let catName = "";

    // データが文字列か配列かを自動判定して取得
    if (typeof item.category === 'string') {
      catName = item.category;
    } else if (Array.isArray(item.category) && item.category.length > 0) {
      catName = item.category[0]; // 配列の場合（例：["Monstera"]）
    } else if (item.categories && Array.isArray(item.categories) && item.categories.length > 0) {
      catName = item.categories[0]; // Sanity標準の参照カテゴリの場合
    } else if (typeof item.Category === 'string') {
      catName = item.Category;
    }

    // カテゴリーが空欄のものはリストから除外
    if (!catName || typeof catName !== 'string') return acc;

    catName = catName.trim();
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(item);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedItems).sort((a, b) => 
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  return (
    <main style={{ maxWidth: '1100px', margin: '120px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '2.5rem' }}>Our Collection</h1>
      
      {/* 取得できたアイテム数を表示 */}
      <p style={{ textAlign: 'center', color: '#999', marginBottom: '60px', fontSize: '0.8rem' }}>
        {items.length} items found
      </p>

      {/* カテゴリー目次 */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '80px' }}>
        {sortedCategories.map(cat => (
          <a key={cat} href={`#${cat}`} style={{ 
            padding: '6px 14px', 
            backgroundColor: '#f8f8f8', 
            borderRadius: '20px', 
            fontSize: '0.8rem', 
            textDecoration: 'none', 
            color: '#666',
            border: '1px solid #eee'
          }}>
            {cat}
          </a>
        ))}
      </nav>

      {/* カテゴリー別表示（横並び混ざり防止済） */}
      {sortedCategories.map(category => (
        <section key={category} id={category} style={{ marginBottom: '120px' }}>
          <h2 style={{ 
            fontSize: '1.6rem', 
            borderBottom: '2px solid #333', 
            paddingBottom: '12px', 
            marginBottom: '40px',
            textTransform: 'capitalize'
          }}>
            {category}
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '40px' 
          }}>
            {groupedItems[category]
              .sort((a: any, b: any) => a.title.localeCompare(b.title))
              .map((item: any) => (
                <Link href={`/items/${item.slug}`} key={item.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
                    <div style={{ position: 'relative', width: '100%', height: '300px', backgroundColor: '#f0f0f0' }}>
                      {item.imageUrl ? (
                        <Image 
                          src={item.imageUrl} 
                          alt={item.title} 
                          fill 
                          style={{ objectFit: 'cover' }} 
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc', fontSize: '0.8rem' }}>
                          No Image
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '15px 5px', textAlign: 'center' }}>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>{item.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}