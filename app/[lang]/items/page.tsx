// app/[lang]/items/page.tsx
import { Suspense } from 'react'; // 1. Suspenseをインポート
import { client } from "@/sanityClient";
import { Metadata } from 'next';
import ItemsListClient from './ItemsListClient'; // 次に作るファイル

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { lang } = await params;
  const title = lang === 'th' ? "คอลเลกชันของเรา" : lang === 'en' ? "Our Collection" : "私たちのコレクション";
  return {
    title: `${title} | Cece Farm`,
    description: "Cece Farm's Rare Plant Collection.",
  };
}

async function getItems(lang: string) {
  const query = `*[_type == "post" && language == $lang] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    category,
    Category,
    "categories": categories[]->title, 
    "imageUrl": mainImage.asset->url
  }`;
  return await client.fetch(query, { lang });
}

export default async function ItemsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const items = await getItems(lang);

  return (
    // 2. クライアントコンポーネントを Suspense で囲む
    <Suspense fallback={<div>Loading...</div>}>
      <ItemsListClient items={items} lang={lang} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'jp' }, { lang: 'en' }, { lang: 'th' }];
}