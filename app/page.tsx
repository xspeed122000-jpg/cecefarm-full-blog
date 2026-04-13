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
  // Sanityから全ての記事の「タイトル」「スラグ」「公開日」を取ってくる
  const posts = await client.fetch(`
    *[_type == "post"] | order(_createdAt desc) {
      title,
      "slug": slug.current,
      _createdAt
    }
  `)

  return (
    <main style={{ padding: '50px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '50px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Cece Farm Blog</h1>
        <p style={{ color: '#666' }}>チェンマイの農園から、植物と日々の記録を届けています</p>
      </header>

      <section>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '30px' }}>
          Latest Posts
        </h2>
        
        {posts.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {posts.map((post: any) => (
              <li key={post.slug} style={{ marginBottom: '20px' }}>
                <Link 
                  href={`/posts/${post.slug}`} 
                  style={{ textDecoration: 'none', color: '#0070f3', fontSize: '1.2rem', fontWeight: 'bold' }}
                >
                  {post.title}
                </Link>
                <div style={{ fontSize: '0.8rem', color: '#999' }}>
                  {new Date(post._createdAt).toLocaleDateString('ja-JP')}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>まだ記事がありません。</p>
        )}
      </section>
    </main>
  )
}