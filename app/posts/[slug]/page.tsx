import { createClient } from 'next-sanity'

// 1. Sanityクライアントの設定
const client = createClient({
  projectId: '88s4pwup', // ← ここを書き換え！
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-01',
})

export const dynamic = 'force-static'
export const dynamicParams = true

// 2. 記事ページの本体
// Next.js 15では params を「待機(await)」する必要があるため、少し書き方を変えています
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // クエリを1行にして、エラーが起きにくい「安全な形」にします
  const query = `*[_type == "post" && slug.current == $slug][0]{title, description, body}`;
  
  const post = await client.fetch(query, { slug });

  if (!post) {
    return <div style={{ padding: '50px' }}>記事が見つかりませんでした。</div>
  }

  return (
    <article style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{post.title}</h1>
      {post.description && (
        <p style={{ color: '#666', fontStyle: 'italic', marginBottom: '20px' }}>
          {post.description}
        </p>
      )}
      <hr />
      <div style={{ marginTop: '30px', lineHeight: '1.8' }}>
        {/* ここに本文が表示される準備をします */}
        <p>（記事の内容を読み込みました。次は本文をきれいに表示しましょう！）</p>
      </div>
    </article>
  )
}

// 3. 事前にページを作っておくための設定
export async function generateStaticParams() {
  const query = `*[_type == "post" && defined(slug.current)].slug.current`;
  const slugs = await client.fetch(query);
  return slugs.map((slug: string) => ({ slug }));
}