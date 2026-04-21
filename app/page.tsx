import { createClient } from 'next-sanity'
import Link from 'next/link'

const client = createClient({
  projectId: '88s4pwup',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-01',
})

export const dynamic = 'force-static'

export default async function HomePage() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(_createdAt desc) {
      title,
      "slug": slug.current,
      _createdAt,
      "imageUrl": mainImage.asset->url
    }
  `)

  return (
    <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <section>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '40px', textAlign: 'center', color: '#2d5a27' }}>Latest Updates</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/items/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={cardStyle}>
                {/* 画像コンテナ：ここで高さを固定します */}
                <div style={{ width: '100%', height: '200px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                  {post.imageUrl ? (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', // 枠に合わせて自動でトリミング
                        transition: 'transform 0.3s'
                      }} 
                    />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                      No Image
                    </div>
                  )}
                </div>

                {/* テキスト部分 */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.1rem', margin: '0 0 10px 0', lineHeight: '1.4', height: '3em', overflow: 'hidden' }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>
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

// カード全体のスタイル
const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  transition: 'transform 0.2s, boxShadow 0.2s',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #eee'
};