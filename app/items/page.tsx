import React from 'react';
import { createClient } from 'next-sanity';
import ItemsListClient from '@/components/ItemsListClient';
import Breadcrumbs from '@/components/Breadcrumbs';

const client = createClient({
  projectId: '88s4pwup',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-01',
});

export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default async function ItemsPage() {
  // Sanityから全ての植物データを取得
  const allItems = await client.fetch(`
  *[_type == "post"] | order(_createdAt desc) {
    title,
    titleEn,
    titleTh,      // ★これがないとタイ語で検索できません
    description,  // ★これがないと「アロカシア」という言葉が説明文にあってもヒットしません
    "slug": slug.current,
    "imageUrl": mainImage.asset->url
  }
`);

  return (
    <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>

      <Breadcrumbs items={[{ label: 'Items' }]} />

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2d5a27', marginBottom: '10px' }}>Plant Collection</h1>
        <p style={{ color: '#666' }}>Rare variegated plants from Cece Farm</p>
      </div>

      {/* 検索とリスト表示の処理をクライアントコンポーネントに渡す */}
      <ItemsListClient initialItems={allItems} />

    </main>
  );
}