import React from 'react';
import { createClient } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs'; // パンくずリストをインポート

const client = createClient({
  projectId: '88s4pwup',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-01',
});

// PortableTextのコンポーネント設定（あなたの既存のものをここに置いてください）
const components = {
  /* ここに既存のSNS埋め込みなどのコンポーネント設定を入れる */
};

export const dynamicParams = true;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15では params を await する必要があります
  const { slug } = await params;
  
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title, 
    description, 
    body,
    "imageUrl": mainImage.asset->url
  }`;
  const post = await client.fetch(query, { slug });

  if (!post) {
    return <div style={{ padding: '50px' }}>記事が見つかりませんでした。</div>;
  }

  return (
    <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* 1. パンくずリストをここに設置 */}
      <Breadcrumbs 
        items={[
          { label: 'Items', href: '/items' },
          { label: post.title } 
        ]} 
      />

      {/* 2. 記事本文セクション */}
      <article style={{ marginTop: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>{post.title}</h1>
        
        {post.description && (
          <p style={{ color: '#666', marginBottom: '30px', fontSize: '1.1rem' }}>{post.description}</p>
        )}

        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '30px' }} 
          />
        )}

        <hr style={{ border: '0', borderTop: '1px solid #eee', marginBottom: '30px' }} />

        <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
          {/* PortableTextで本文を表示 */}
          <PortableText value={post.body} components={components} />
        </div>
      </article>
    </main>
  );
}

// 静的パス生成（これも既存のものを維持）
export async function generateStaticParams() {
  const query = `*[_type == "post" && defined(slug.current)].slug.current`;
  const slugs = await client.fetch(query);
  return slugs.map((slug: string) => ({ slug }));
}