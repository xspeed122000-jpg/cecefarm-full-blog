import { createClient } from 'next-sanity'

// ★ここをご自身のものに書き換えてください
const client = createClient({
  projectId: '88s4pwup', 
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-01',
})

export const dynamic = 'force-static'
export const dynamicParams = true // 新しい記事を投稿した時に自動生成されるように true に戻します

export default async function PostPage({ params }: { params: { slug: string } }) {
  // Sanityから記事を1件取得する「魔法の呪文（クエリ）」
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      description,
      body
    }`,
    { slug: params.slug }
  )

  // 記事が見つからない場合
  if (!post) {
    return <div style={{ padding: '50px' }}>記事が見つかりませんでした。</div>
  }

  return (
    <article style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{post.title}</h1>
      {post.description && (
        <p style={{ color: '#666', fontStyle: 'italic' }}>{post.description}</p>
      )}
      <hr />
      <div style={{ marginTop: '20px' }}>
        {/* ここに本文が表示されます。SNS埋め込みは次のステップで！ */}
        <p>本文のデータは届いています（表示設定はこれから行います）。</p>
      </div>
    </article>
  )
}

// 存在する記事のスラグをSanityから全部取ってきて、事前にページを作っておく設定
export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "post"].slug.current`)
  return slugs.map((slug: string) => ({ slug }))
  // dummy comment to trigger build
}