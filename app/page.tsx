import { createClient } from 'next-sanity'
import Link from 'next/link'

const client = createClient({
  projectId: '88s4pwup', // ← ここを書き換え！
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-01',
})

export const dynamic = 'force-static'

export default async function HomePage() {
  // 画像のURLも取得できるようにクエリを強化します
  const posts = await client.fetch(`
    *[_type == "post"] | order(_createdAt desc) {
      title,
      "slug": slug.current,
      _createdAt,
      "imageUrl": mainImage.asset->url
    }
  `)

  return (
    <main style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <section>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', textAlign: 'center' }}>Latest Updates</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // 横に並べる設定
          gap: '30px'
        }}>
         // ...（中略）
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                className="card" // ここにクラス名をつけておくと後でCSSが楽です
                style={{
                  border: '1px solid #eee',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease', // 動きを滑らかにする設定
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)' // 軽い影をつける
                }}
                // マウスが乗った時の動き（簡易版）
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                }}
              >
// ...（以下、画像エリアなどはそのまま）
                {/* 画像エリア */}
                <div style={{ width: '100%', height: '180px', backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc' }}>No Image</div>
                  )}
                </div>

                {/* テキストエリア */}
                <div style={{ padding: '15px' }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', lineHeight: '1.4' }}>{post.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#999', margin: 0 }}>
                    {new Date(post._createdAt).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}