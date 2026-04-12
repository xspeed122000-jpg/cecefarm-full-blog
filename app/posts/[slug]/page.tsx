export const dynamic = 'force-static'; // 強制的に「完全静的」にする魔法の言葉
export const dynamicParams = false;    // 事前に準備したページ以外は作らない設定

export default function PostPage({ params }: { params: { slug: string } }) {
  return (
    <article style={{ padding: '50px' }}>
      <h1>記事のページ</h1>
      <p>このページは「完全静的」にビルドされています。</p>
      <p>スラグ: {params.slug}</p>
    </article>
  );
}

// 静的ビルド時に「これだけは作っておいて」というリスト
export function generateStaticParams() {
  // まずはビルドを通すために、"first-post"という名前のページだけ準備します
  return [{ slug: 'first-post' }];
}