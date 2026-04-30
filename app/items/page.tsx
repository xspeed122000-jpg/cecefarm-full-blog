
import { createClient } from 'next-sanity';
import Link from "next/link";
import Image from "next/image";

const client = createClient({
  projectId: '88s4pwup',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-01',
});

export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

async function getItems() {
  // 全ての記事を取得（投稿日順に取得）
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    "category": category, // Sanityのフィールド名に合わせて調整
    "mainImage": mainImage.asset->url
  }`;
  return await client.fetch(query);
}

export default async function ItemsPage() {
  // ItemsPage 内のクエリ修正
  const items = await getItems();
  // 1. カテゴリーごとにグループ化する処理
  const groupedItems = items.reduce((acc: any, item: any) => {
    const cat = item.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  // 2. カテゴリー名をアルファベット順にソート
  const sortedCategories = Object.keys(groupedItems).sort();

  return (
    <main style={{ maxWidth: '1100px', margin: '120px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '60px', fontSize: '2.5rem' }}>Our Collection</h1>

      {/* クイックナビ（カテゴリーへのジャンプリンク） */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '80px' }}>
        {sortedCategories.map(cat => (
          <a key={cat} href={`#${cat}`} style={{ padding: '8px 16px', backgroundColor: '#eee', borderRadius: '20px', fontSize: '0.8rem', textDecoration: 'none', color: '#333' }}>
            {cat}
          </a>
        ))}
      </nav>

      {/* カテゴリーごとの表示 */}
      {sortedCategories.map(category => (
        <section key={category} id={category} style={{ marginBottom: '100px' }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            borderBottom: '2px solid #333', 
            paddingBottom: '10px', 
            marginBottom: '30px',
            textTransform: 'capitalize' 
          }}>
            {category}
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '40px' 
          }}>
            {groupedItems[category]
              .sort((a: any, b: any) => a.title.localeCompare(b.title)) // 植物名もABC順に
              .map((item: any) => (
                <Link href={`/items/${item.slug}`} key={item.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ overflow: 'hidden', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                      <Image 
                        src={item.mainImage} 
                        alt={item.title} 
                        fill 
                        style={{ objectFit: 'cover', transition: 'transform 0.3s' }} 
                      />
                    </div>
                    <div style={{ padding: '15px' }}>
                      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.title}</h3>
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