// 1. 'use client' と runtime = 'edge' を消します（ここがポイント！）

// 本来はここでSanityからデータを取ってきますが、
// まずはエラーを消すための「仮の土台」を作ります。

export default function PostPage({ params }: { params: { slug: string } }) {
  return (
    <article style={{ padding: '50px' }}>
      <h1>記事のページ（静的ビルド版）</h1>
      <p>このページは「静的」に作られているので、3MB制限にかかりません。</p>
      <p>表示中のスラグ: {params.slug}</p>
    </article>
  );
}

// 2. この関数を追加することで、Cloudflareに「静的に作ってね」と伝えます
export function generateStaticParams() {
  // 本来はSanityから全記事のIDを取ってきますが、
  // まずはビルドを通すために空のリストを返します。
  return [];
}