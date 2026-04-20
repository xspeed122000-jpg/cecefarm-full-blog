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

export default async function ItemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const item = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      description,
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
      <Breadcrumbs items={[{ label: 'Items', href: '/items' }, { label: item.title }]} />
      
      <h1 style={{ fontSize: '2.5rem', color: '#2d5a27', marginTop: '20px' }}>{item.title}</h1>
      
      {/* メイン画像 */}
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.title} style={{ width: '100%', borderRadius: '20px', margin: '20px 0', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
      )}

      {/* --- Instagramの表示 --- */}
      {item.insta_url && (
        <div style={{ margin: '40px 0' }}>
          <h3 style={{ borderLeft: '4px solid #E1306C', paddingLeft: '10px', marginBottom: '20px' }}>Instagram Video</h3>
          <InstagramEmbed url={item.insta_url} />
        </div>
      )}

      {/* 説明文 */}
      <div style={{ backgroundColor: '#fdfdfd', padding: '30px', borderRadius: '15px', border: '1px solid #eee', margin: '40px 0' }}>
        <p style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap', color: '#333' }}>{item.description}</p>
      </div>

      {/* --- 3枚ギャラリーの表示 --- */}
      {item.gallery_images && item.gallery_images.length > 0 && (
        <div style={{ margin: '40px 0' }}>
          <h3 style={{ borderLeft: '4px solid #2d5a27', paddingLeft: '10px', marginBottom: '20px' }}>Photo Gallery</h3>
          <ImageGallery images={item.gallery_images} />
        </div>
      )}

      {/* デバッグ用（不要になったら消してOK） */}
      <details style={{ marginTop: '100px', opacity: 0.3 }}>
        <summary>Debug Info</summary>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </details>
    </main>
  );
}