'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ItemsListClient({ items, lang }: { items: any[], lang: string }) {
  const searchParams = useSearchParams();
  
  // URLの ?q= から検索ワードを取得（ビルド時には空文字になるので安全）
  const query = searchParams.get('q')?.toLowerCase() || '';

  // 1. 検索フィルタリング
  const filteredItems = query === ''
    ? items
    : items.filter((item: any) => (item.title || '').toLowerCase().includes(query));

  // 2. データのグルーピング
  const groupedItems = filteredItems.reduce((acc: any, item: any) => {
    let catName = "";
    if (item.categories && Array.isArray(item.categories) && item.categories.length > 0) {
      catName = item.categories[0];
    } else if (typeof item.category === 'string') {
      catName = item.category;
    } else if (typeof item.Category === 'string') {
      catName = item.Category;
    }

    if (!catName || catName.trim() === "") catName = "Others";
    const finalCat = catName.trim();
    if (!acc[finalCat]) acc[finalCat] = [];
    acc[finalCat].push(item);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedItems).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  return (
    <main style={{ maxWidth: '1100px', margin: '120px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2.5rem' }}>
        {lang === 'th' ? "คอลเลกชัน" : "Our Collection"}
      </h1>

      {/* カテゴリータグ */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '60px', borderBottom: '1px solid #1c352d', paddingBottom: '30px' }}>
        {sortedCategories.map(category => (
          <a key={category} href={`#${category}`} style={{ padding: '8px 20px', backgroundColor: '#ffffff', border: '1px solid #1c352d', color: '#1c352d', borderRadius: '25px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>
            {category} ({groupedItems[category].length})
          </a>
        ))}
      </div>

      {/* セクション表示 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px' }}>
        {sortedCategories.map(category => (
          <section key={category} id={category} style={{ scrollMarginTop: '150px' }}>
            <h2 style={{ fontSize: '1.8rem', borderLeft: '5px solid #2d5a27', paddingLeft: '15px', marginBottom: '30px', color: '#2C3E35' }}>
              {category}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
              {groupedItems[category].map((item: any) => (
                <Link href={`/${lang}/items/${item.slug}`} key={item.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                    <div style={{ position: 'relative', width: '100%', height: '300px', backgroundColor: '#f9f9f9' }}>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc' }}>No Image</div>
                      )}
                    </div>
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#2C3E35' }}>{item.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}