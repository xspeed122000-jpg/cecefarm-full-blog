import React from 'react';
import { createClient } from 'next-sanity';
import InstagramEmbed from '@/components/InstagramEmbed';
import ImageGallery from '@/components/ImageGallery';
import Breadcrumbs from '@/components/Breadcrumbs';

const client = createClient({
  projectId: '88s4pwup',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-01',
});

export const runtime = 'edge';

export default async function ItemDetailPage({ params }: { params: { slug: string } }) {
  // データの取得（クエリ）
  const item = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      description,
      "imageUrl": mainImage.asset->url,
      insta_url,
      "gallery_images": gallery_images[].asset->url
    }
  `, { slug: params.slug });

  // ★重要：データが見つからない場合の安全策
  if (!item) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Item not found (Slug: {params.slug})</h2>
        <p>SanityのデータとURLのスラッグが一致しているか確認してください。</p>
      </div>
    );
  }

  return (
    <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <Breadcrumbs items={[{ label: 'Items', href: '/items' }, { label: item.title || 'No Title' }]} />

      <h1 style={{ fontSize: '2rem', color: '#2d5a27', marginTop: '20px' }}>{item.title}</h1>
      
      {/* メイン画像（ある場合のみ表示） */}
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.title} style={{ width: '100%', borderRadius: '15px', margin: '20px 0' }} />
      )}

      {/* --- Instagram埋め込み --- */}
      {item.insta_url && (
        <div style={{ margin: '40px 0' }}>
          <h3 style={{ marginBottom: '15px' }}>Related Video</h3>
          <InstagramEmbed url={item.insta_url} />
        </div>
      )}

      {/* 説明文 */}
      <p style={{ lineHeight: '1.8', color: '#444', whiteSpace: 'pre-wrap' }}>{item.description}</p>

      {/* --- 3枚ギャラリー --- */}
      {item.gallery_images && item.gallery_images.length > 0 && (
        <div style={{ margin: '40px 0' }}>
          <h3 style={{ marginBottom: '15px' }}>Gallery</h3>
          <ImageGallery images={item.gallery_images} />
        </div>
      )}

      {/* デバッグ用：念のためデータの中身を画面下部に表示 */}
      <details style={{ marginTop: '50px', opacity: 0.5 }}>
        <summary>Debug: Data JSON</summary>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </details>
    </main>
  );
}