// app/[lang]/items/page.tsx
import { Suspense } from 'react'; // 1. Suspenseをインポート
import { client } from "@/sanityClient";
import { Metadata } from 'next';
import ItemsListClient from './ItemsListClient'; // 次に作るファイル

export const dynamicParams = false; // 指定した言語（jp, en, th）以外は受け付けない設定

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params; // items ページには slug はないので lang だけにする
    return { title: `Items | Cece Farm (${lang})` };
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