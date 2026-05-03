// app/items/page.tsx

import { createClient } from 'next-sanity';
import Image from "next/image";
import Link from "next/link";

export const runtime = 'edge'; 

const client = createClient({
  // ★ projectId に直接、ご自身のプロジェクトID（英数字の文字列）を記述してください
  // 例: projectId: "abc12345", 
  projectId: "88s4pwup",
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

// ★ 1. 関数が searchParams を受け取れるようにします
export default async function ItemsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const items = await getItems();
  // ★ 2. URLから検索ワード（q）を取得します
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q.toLowerCase() : '';

  // ★ 3. 取得した全アイテム（items）を、検索ワードで絞り込みます！
  const filteredItems = query === '' 
    ? items 
    : items.filter((item: any) => {
        const title = (item.title || '').toLowerCase();
        const titleEn = (item.titleEn || '').toLowerCase();
        const titleTh = (item.titleTh || '').toLowerCase();
        return title.includes(query) || titleEn.includes(query) || titleTh.includes(query);
      });
  
  // ★ どんなデータ構造が来ても絶対エラーにならない安全な分類処理
  const groupedItems = filteredItems.reduce((acc: any, item: any) => {
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

      {/* ★ 検索中のみ表示されるメッセージを追加 */}
      {query !== '' && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#2C3E35' }}>
            「{query}」の検索結果: {filteredItems.length}件
          </h2>
          <Link href="/items" style={{ color: '#666', textDecoration: 'underline', marginTop: '10px', display: 'inline-block' }}>
            × 検索をクリアして全件表示に戻る
          </Link>
        </div>
      )}

      {/* 取得できたアイテム数を表示（items を filteredItems に変更） */}
      <p style={{ textAlign: 'center', color: '#999', marginBottom: '60px', fontSize: '0.8rem' }}>
        {filteredItems.length} items found
      </p>

      {/* ★ 検索結果が0件の場合は「見つかりません」と表示してリストを隠す */}
      {filteredItems.length === 0 && query !== '' ? (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '50px', fontSize: '1.2rem' }}>
          一致する植物が見つかりませんでした。別のキーワードをお試しください。
        </p>
      ) : (
        <>
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

          {/* カテゴリー別表示 */}
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
                {groupedItems[category]
                  .sort((a: any, b: any) => a.title.localeCompare(b.title))
                  .map((item: any) => (
                    <Link href={`/items/${item.slug}`} key={item.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
                        <div style={{ position: 'relative', width: '100%', height: '300px', backgroundColor: '#f0f0f0' }}>
                          {item.imageUrl ? (
                            <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: 'cover' }} />
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
        </>
      )}
    </main>
  );
}