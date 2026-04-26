export const runtime = 'edge';
import { client } from '@/sanityClient';
import { PortableText } from '@portabletext/react';

// 言語のパターンを事前に定義（Cloudflareでの動作を安定させるため）
export function generateStaticParams() {
  return [{ lang: 'jp' }, { lang: 'en' }, { lang: 'th' }];
}

export default async function PhytoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  // 1. paramsを確実に解決する
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  // 2. Sanityからデータを取得
  // クエリの中身を確認：_typeが"staticPage"、slugが"phyto_cites"、languageがlangと一致するか
  const query = `*[_type == "staticPage" && slug.current == "phyto_cites" && language == $lang][0]`;
  const page = await client.fetch(query, { lang });

  // 3. データがない場合のデバッグ表示
  if (!page) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Page Not Found</h1>
        <p>Debug Info: Language is "{lang}"</p>
        <p>Sanityに _type: "staticPage", slug: "phyto_cites", language: "{lang}" のデータがあるか確認してください。</p>
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