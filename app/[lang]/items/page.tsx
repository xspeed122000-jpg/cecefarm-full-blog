import { client } from "@/sanityClient"; // 共通クライアントを使用
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

// メタデータも多言語対応の準備
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { lang } = await params;
  const title = lang === 'th' ? "คอลเลกชันของเรา" : lang === 'en' ? "Our Collection" : "私たちのコレクション";
  return {
    title: `${title} | Cece Farm`,
    description: "Cece Farm's Rare Plant Collection.",
  };
}

async function getItems(lang: string) {
  // ★ クエリに language == $lang を追加
  const query = `*[_type == "post" && language == $lang] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    category,
    Category,
    "categories": categories[]->title, 
    "imageUrl": mainImage.asset->url
  }`;
  return await client.fetch(query, { lang });
}

export default async function ItemsPage({
  params,
  searchParams,
}: {
  params: any;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await params; // URLから言語を取得
  const items = await getItems(lang);
  const sParams = await searchParams;
  const query = typeof sParams.q === 'string' ? sParams.q.toLowerCase() : '';

  // 検索フィルタリング
  const filteredItems = query === ''
    ? items
    : items.filter((item: any) => {
        const title = (item.title || '').toLowerCase();
        return title.includes(query);
      });
// --- データのグルーピング (ロジック部) ---
const groupedItems = filteredItems.reduce((acc: any, item: any) => {
  let catName = "";

  // categories: ['Alocasia'] の形式に最適化
  if (item.categories && Array.isArray(item.categories) && item.categories.length > 0) {
    catName = item.categories[0];
  } else if (typeof item.category === 'string') {
    catName = item.category;
  } else if (typeof item.Category === 'string') {
    catName = item.Category;
  }

  // カテゴリーが取れなかった場合は「Others」に分類
  if (!catName || catName.trim() === "") {
    catName = "Others";
  }

  const finalCat = catName.trim();
  if (!acc[finalCat]) acc[finalCat] = [];
  acc[finalCat].push(item);
  return acc;
}, {});

// カテゴリー名のリストを作成し、アルファベット順に並べる
const sortedCategories = Object.keys(groupedItems).sort((a, b) =>
  a.toLowerCase().localeCompare(b.toLowerCase())
);

// --- 前半の getItems や params の取得などはそのまま ---

  return (
    <main style={{ maxWidth: '1100px', margin: '120px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2.5rem' }}>
        {lang === 'th' ? "คอลเลกชัน" : lang === 'en' ? "Our Collection" : "Our Collection"}
      </h1>

      {/* カテゴリータグの一覧 */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '12px', 
        justifyContent: 'center', 
        marginBottom: '60px',
        borderBottom: '1px solid #eee',
        paddingBottom: '30px'
      }}>
        {sortedCategories.map(category => (
          <a
            key={category}
            href={`#${category}`}
            style={{
              padding: '8px 20px',
              backgroundColor: '#2d5a27',
              color: '#fff',
              borderRadius: '25px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '600',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            {category} ({groupedItems[category].length})
          </a>
        ))}
      </div>

      {/* セクション表示部分 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px' }}>
        {sortedCategories.map(category => (
          <section key={category} id={category} style={{ scrollMarginTop: '150px' }}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              borderLeft: '5px solid #2d5a27', 
              paddingLeft: '15px', 
              marginBottom: '30px',
              color: '#2C3E35'
            }}>
              {category}
            </h2>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '30px' 
            }}>
              {groupedItems[category].map((item: any) => (
                <Link 
                  href={`/${lang}/items/${item.slug}`} 
                  key={item.slug} 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ 
                    borderRadius: '12px', 
                    overflow: 'hidden', 
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{ position: 'relative', width: '100%', height: '300px', backgroundColor: '#f9f9f9' }}>
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc' }}>
                          No Image
                        </div>
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
} // ← ここ！この関数の閉じカッコが重要です
export async function generateStaticParams() {
  return [
    { lang: 'jp' },
    { lang: 'en' },
    { lang: 'th' }
  ];
}