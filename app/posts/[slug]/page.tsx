'use client'
export const runtime = 'edge'

export default function PostPage({ params }: { params: { slug: string } }) {
  return (
    <article style={{ padding: '50px' }}>
      <h1>記事のページ（制作中）</h1>
      <p>ここが、記事の内容が表示される場所になります。</p>
      <p>URLの末尾（slug）: {params.slug}</p>
    </article>
  )
}