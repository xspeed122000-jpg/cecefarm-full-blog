import { createClient } from 'next-sanity';
import { PortableText } from '@portabletext/react'; // 本文がSanityのリッチテキスト（ブロックエディタ）の場合に使用

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

async function getPrivacyPolicy() {
  // 全てのデータの「タイプ名」と「スラッグ」をリストアップしてみる（デバッグ用）
  const debugQuery = `*[] { _type, "slug": slug.current }`;
  const allData = await client.fetch(debugQuery);
  console.log("Sanityにあるデータ一覧:", allData); // ターミナルに表示されます

 // app/privacy-policy/page.tsx のクエリ部分を修正
const query = `*[_type == "staticPage" && slug.current == "privacy-policy"][0] {
  title,
  body,
  content
}`;
  return await client.fetch(query);
}

export default async function PrivacyPolicyPage() {
  const data = await getPrivacyPolicy();

  // 万が一データが取れなかった場合の安全対策
  if (!data) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Privacy Policy</h1>
        <p style={{ color: '#999' }}>ページが見つかりません。Sanity側で公開されているかご確認ください。</p>
      </div>
    );
  }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '15px', color: '#333' }}>
        {data.title}
      </h1>
      <div style={{ lineHeight: '1.9', color: '#444', fontSize: '1rem', whiteSpace: 'pre-wrap' }}>
        {/* 本文がリッチテキスト（PortableText）形式の場合 */}
        {data.body && <PortableText value={data.body} />}
        
        {/* 本文がシンプルな普通のテキスト（プレーンテキスト）形式の場合 */}
        {data.content && <div>{data.content}</div>}
      </div>
    </main>
  );
}
export async function generateStaticParams() {
  return [
    { lang: 'jp' },
    { lang: 'en' },
    { lang: 'th' }
  ];
}