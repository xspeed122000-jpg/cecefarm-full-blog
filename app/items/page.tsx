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
  // カテゴリーが確実に存在する記事だけを取得し、画像URLをより強固に取得します
  const query = `*[_type == "post" && defined(category)] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    category,
    "imageUrl": mainImage.asset->url
  }`;
  return await client.fetch(query);
}

export default async function ItemsPage() {
  const items = await getItems();

  // 1. カテゴリーごとにグループ化（大文字小文字の差をなくす）
  const groupedItems = items.reduce((acc: any, item: any) => {
    // カテゴリー名をトリミングして「見た目」を整える
    const rawCat = item.category.trim();
    // 表示用には元の名前を、キー（分類用）には小文字を使います
    if (!acc[rawCat]) acc[rawCat] = [];
    acc[rawCat].push(item);
    return acc;
  }, {});

  // 2. カテゴリー名をアルファベット順にソート
  const sortedCategories = Object.keys(groupedItems).sort((a, b) => 
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  return (
    <main style={{ maxWidth: '1100px', margin: '120px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '60px', fontSize: '2.5rem' }}>Our Collection</h1>

      {/* カテゴリー目次（Uncategorizedは自動で消えます） */}
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

      {/* カテゴリー別表示 */}
      {sortedCategories.map(category => (
        <section key={category} id={category} style={{ marginBottom: '120px' }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            borderBottom: '2px solid #222', 
            paddingBottom: '12px', 
            marginBottom: '40px',
            textTransform: 'capitalize',
            color: '#222'
          }}>
            {category}
          </h2>

          {/* この div の中でだけ横に並ぶように固定します */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '40px' 
          }}>
            {groupedItems[category]
              .sort((a: any, b: any) => a.title.localeCompare(b.title))
              .map((item: any) => (
                <Link href={`/items/${item.slug}`} key={item.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
                    <div style={{ position: 'relative', width: '100%', height: '350px', backgroundColor: '#f0f0f0' }}>
                      {item.imageUrl ? (
                        <Image 
                          src={item.imageUrl} 
                          alt={item.title} 
                          fill 
                          style={{ objectFit: 'cover' }} 
                          unoptimized // ★画像が表示されない場合のデバッグ用に追加
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc' }}>
                          No Image
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '20px 10px', textAlign: 'center' }}>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>{item.title}</h3>
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