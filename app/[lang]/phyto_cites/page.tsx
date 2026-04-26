export const runtime = 'edge';
// キャッシュによる「古い404」を防ぐため、常に最新のデータを取得するように強制します
export const dynamic = 'force-dynamic'; 

import { client } from '@/sanityClient';
import { PortableText } from '@portabletext/react';

export default async function PhytoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  // 1. paramsを解決
  const { lang } = await params;

  // 2. Sanityからデータを取得
  // デバッグ用に、まずは全ての staticPage を取得するテストも兼ねたクエリ
  const query = `*[_type == "staticPage" && slug.current == "phyto_cites" && language == $lang][0]`;
  const page = await client.fetch(query, { lang });

  // 3. データが見つからない場合の表示
  if (!page) {
    return (
      <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
        <h1>Page Not Found (Data Error)</h1>
        <p>現在の言語設定: <strong>{lang}</strong></p>
        <hr />
        <p>以下の点を確認してください：</p>
        <ul>
          <li>Sanityで <b>_type</b> が <code>staticPage</code> になっているか</li>
          <li><b>slug</b> が <code>phyto_cites</code> になっているか</li>
          <li><b>language</b> フィールドが <code>{lang}</code> になっているか</li>
        </ul>
      </div>
    );
  }

  return (
    <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{page.title}</h1>
      <article>
        <PortableText value={page.body} />
      </article>
    </main>
  );
}