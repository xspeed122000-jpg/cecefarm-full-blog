import React from 'react';
import { createClient } from 'next-sanity';
import { PortableText } from '@portabletext/react'; // ★追加
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

// --- ここから追加 ---
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 1. SanityからSEOタイトルと通常のタイトルを取得
  const item = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      seoTitle
    }
  `, { slug });

  // 2. 記事がない場合の安全策
  if (!item) return { title: 'Item Not Found' };

  // 3. ロジック（優先順位）を適用
  // SEOタイトルがあればそれを使い、なければ通常のタイトルを表示
  return {
    title: item.seoTitle || item.title,
  };
}
// --- ここまで追加 ---

export default async function ItemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const item = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      seoTitle,
      body,        // ★重要：descriptionを消すか、bodyを追加します
      "imageUrl": mainImage.asset->url,
      insta_url,
      "gallery_images": gallery_images[].asset->url
    }
  `, { slug });

  if (!item) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Item Not Found</div>;
  }

  return (
    <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      {/* 1. タイトル（パンくずリスト含む） */}
      <Breadcrumbs items={[{ label: 'Items', href: '/items' }, { label: item.title }]} />
      <h1 style={{ fontSize: '2.5rem', color: '#2d5a27', marginTop: '20px' }}>{item.title}</h1>

      {/* 2. アイキャッチ（メイン画像） */}
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          style={{ width: '100%', borderRadius: '20px', margin: '20px 0', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
        />
      )}

      {/* 3. インスタ動画 */}
      {item.insta_url && (
        <div style={{ margin: '40px 0' }}>
          <InstagramEmbed url={item.insta_url} />
        </div>
      )}

      {/* 4. 本文 (Body) */}
      {item.body && (
        <div style={{
          lineHeight: '1.8',
          color: '#333',
          margin: '40px 0',
          fontSize: '1.1rem',
          backgroundColor: '#fff'
        }}>
          {/* PortableTextコンポーネントを使ってリッチテキストを表示 */}
          <PortableText value={item.body} />
        </div>
      )}

      {/* 5. ギャラリー */}
      {item.gallery_images && item.gallery_images.length > 0 && (
        <div style={{ margin: '60px 0' }}>
          <h3 style={{ borderLeft: '4px solid #2d5a27', paddingLeft: '10px', marginBottom: '20px' }}>Photo Gallery</h3>
          <ImageGallery images={item.gallery_images} />
        </div>
      )}

    </main>
  );
}