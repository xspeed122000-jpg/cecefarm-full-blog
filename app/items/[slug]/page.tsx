import React from 'react';
import { createClient } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import InstagramEmbed from '@/components/InstagramEmbed';
import ImageGallery from '@/components/ImageGallery';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { Metadata } from 'next';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false, // ここが重要です
});

export const runtime = 'edge';

// ----------------------------------------------------
// ★ ここを修正しました（Descriptionの追加とタイトルの調整）
// ----------------------------------------------------
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const item = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      seoTitle
    }
  `, { slug });

  if (!item) return { title: 'Item Not Found | Cece Farm' };

  // SEOタイトルがあればそれを使い、なければ通常のタイトルを使用
  const displayTitle = item.seoTitle || item.title;

  return {
    // ★ | Cece Farm を削除（layout.tsxが自動で付けてくれます）
    title: displayTitle, 
    description: `Cece Farm | Rare Plants & Cafe in Chiang Mai. 希少植物専門店 & カフェ。チェンマイより ${displayTitle} などの希少品種を厳選してお届けします。日本への配送相談も承ります。`,
  };
}

// ----------------------------------------------------
// ★ ページ本体（ここは完璧なので何も変えていません！）
// ----------------------------------------------------
export default async function ItemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const item = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      seoTitle,
      body,
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
          <PortableText value={item.body}/>
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