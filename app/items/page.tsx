import { createClient } from 'next-sanity';
import Image from "next/image";
import Link from "next/link";

export const runtime = 'edge';

// ★ 直接クライアントを設定（以前の設定内容に合わせて書き換えてください）
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // もしエラーが出るなら ここに "直接ID" を入れてもOK
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function getItems() {
  // queryの内容はそのまま
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    "category": category, 
    "mainImage": mainImage.asset->url
  }`;
  return await client.fetch(query);
}

export default async function ItemsPage() {
  const items = await getItems();

  // カテゴリーごとにグループ化
  const groupedItems = items.reduce((acc: any, item: any) => {
    const cat = item.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedItems).sort();

  return (
    <main style={{ maxWidth: '1100px', margin: '120px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '60px', fontSize: '2.5rem' }}>Our Collection</h1>

      {/* カテゴリー目次 */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '80px' }}>
        {sortedCategories.map(cat => (
          <a key={cat} href={`#${cat}`} style={{ 
            padding: '6px 14px', 
            backgroundColor: '#f0f0f0', 
            borderRadius: '20px', 
            fontSize: '0.8rem', 
            textDecoration: 'none', 
            color: '#555',
            border: '1px solid #ddd'
          }}>
            {cat}
          </a>
        ))}
      </nav>

      {/* カテゴリー別表示 */}
      {sortedCategories.map(category => (
        <section key={category} id={category} style={{ marginBottom: '100px' }}>
          <h2 style={{ 
            fontSize: '1.6rem', 
            borderBottom: '1px solid #ccc', 
            paddingBottom: '10px', 
            marginBottom: '30px',
            textTransform: 'capitalize',
            color: '#333'
          }}>
            {category}
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '30px' 
          }}>
            {groupedItems[category]
              .sort((a: any, b: any) => a.title.localeCompare(b.title))
              .map((item: any) => (
                <Link href={`/items/${item.slug}`} key={item.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ overflow: 'hidden', borderRadius: '12px', border: '1px solid #eee' }}>
                    <div style={{ position: 'relative', width: '100%', height: '280px' }}>
                      <Image 
                        src={item.mainImage} 
                        alt={item.title} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                      />
                    </div>
                    <div style={{ padding: '15px', textAlign: 'center' }}>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'normal' }}>{item.title}</h3>
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