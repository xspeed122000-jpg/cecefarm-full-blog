import React from 'react';
import { createClient } from 'next-sanity';
import Breadcrumbs from '@/components/Breadcrumbs';

// Sanityクライアント（他のページと同じ設定）
const client = createClient({
  projectId: '88s4pwup',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-01',
});

// 詳細ページ用のデータ取得
async function getPost(slug: string) {
  return await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      body,
      "imageUrl": mainImage.asset->url
    }
  `, { slug });
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>

      {/* パンくずリスト：Home(自動) > Items > 現在のタイトル */}
      <Breadcrumbs
        items={[
          { label: 'Items', href: '/items' },
          { label: post.title }
        ]}
      />

      <article>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '20px', color: '#333' }}>{post.title}</h1>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '30px' }}
          />
        )}

        {/* 本文などのコンテンツ */}
        <div style={{ lineHeight: '1.8', color: '#444' }}>
          {/* Sanityのコンテンツを表示する処理など */}
        </div>
      </article>
    </main>
  );
}

// SNS埋め込みなどをどう表示するか、独自の「デザインルール」を決めます
const components = {
  types: {
    // SNS埋め込みの設定
    socialEmbed: ({ value }: any) => {
      const { url, platform } = value;
      return (
        <div style={{
          margin: '20px 0',
          padding: '15px',
          border: '1px solid #eee',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>
            {platform === 'twitter' ? '𝕏 (Twitter)' : 'Instagram'} の投稿
          </p>
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3', fontWeight: 'bold' }}>
            投稿を表示する
          </a>
        </div>
      );
    },
    // 画像の設定
    image: ({ value }: any) => (
      <img
        src={client.config().projectId && value.asset ? `https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}` : ''}
        alt="blog image"
        style={{ width: '100%', borderRadius: '8px', margin: '20px 0' }}
      />
    ),
  },
}

export const dynamic = 'force-static'
export const dynamicParams = true

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const query = `*[_type == "post" && slug.current == $slug][0]{title, description, body}`;
  const post = await client.fetch(query, { slug });

  if (!post) return <div style={{ padding: '50px' }}>記事が見つかりませんでした。</div>

  return (
    <article style={{ padding: '50px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{post.title}</h1>
      {post.description && (
        <p style={{ color: '#666', marginBottom: '30px', fontSize: '1.1rem' }}>{post.description}</p>
      )}
      <hr style={{ border: '0', borderTop: '1px solid #eee', marginBottom: '30px' }} />

      <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
        {/* ★ここで本文とSNS埋め込みを表示！ */}
        <PortableText value={post.body} components={components} />
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const query = `*[_type == "post" && defined(slug.current)].slug.current`;
  const slugs = await client.fetch(query);
  return slugs.map((slug: string) => ({ slug }));
}