import React from 'react';
import { createClient } from 'next-sanity';
import Breadcrumbs from '@/components/Breadcrumbs';

const client = createClient({
  projectId: '88s4pwup',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-01',
});

export const runtime = 'edge';

// params を Promise として受け取るのが最新の安全な書き方です
export default async function ItemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. URLのスラッグを安全に受け取る
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 2. Sanityからデータを取得
  const item = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      description,
      "imageUrl": mainImage.asset->url,
      insta_url,
      "gallery_images": gallery_images[].asset->url
    }
  `, { slug });

  // 3. データがない場合の表示
  if (!item) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>Item Not Found</h1>
        <p>URLのスラッグ「{slug}」に一致するデータがSanityに見つかりません。</p>
        <a href="/items" style={{ color: '#2d5a27' }}>一覧へ戻る</a>
      </div>
    );
  }

  // 4. データを表示（まずはシンプルに）
  return (
    <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <Breadcrumbs items={[{ label: 'Items', href: '/items' }, { label: item.title }]} />
      
      <h1 style={{ fontSize: '2rem', color: '#2d5a27', marginTop: '20px' }}>{item.title}</h1>
      
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.title} style={{ width: '100%', borderRadius: '15px', margin: '20px 0' }} />
      )}

      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
        <p><strong>Instagram URL:</strong> {item.insta_url || '設定なし'}</p>
        <p><strong>Gallery Images:</strong> {item.gallery_images?.length || 0}枚</p>
      </div>

      <p style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{item.description}</p>

      {/* 最後に生データを確認できるようにする */}
      <hr style={{ margin: '50px 0' }} />
      <details>
        <summary>Debug: Sanity Data JSON</summary>
        <pre style={{ fontSize: '12px', background: '#eee', padding: '10px' }}>
          {JSON.stringify(item, null, 2)}
        </pre>
      </details>
    </main>
  );
}