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
    <main style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <section>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', textAlign: 'center' }}>Latest Updates</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '30px' 
        }}>
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="blog-card-link">
              <div className="blog-card">
                <div className="image-container">
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} className="card-image" />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="text-container">
                  <h3>{post.title}</h3>
                  <p>{new Date(post._createdAt).toLocaleDateString('ja-JP')}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}