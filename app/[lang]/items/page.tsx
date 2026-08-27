import { Suspense } from 'react';
import { client } from "@/sanityClient";
import { Metadata } from 'next';
import ItemsListClient from './ItemsListClient';

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: `Items | Cece Farm (${lang})`
  };
}

async function getItems(lang: string) {
  const query = `*[_type == "post" && language == $lang] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    "imageUrl": mainImage.asset->url
  }`;

  return await client.fetch(query, { lang });
}

async function getCategories() {
  const query = `*[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    description,
    "slug": slug.current
  }`;

  return await client.fetch(query);
}

export default async function ItemsPage({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;

  const items = await getItems(lang);
  const categories = await getCategories();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ItemsListClient
        items={items}
        categories={categories}
        lang={lang}
      />
    </Suspense>
  );
}

export async function generateStaticParams() {
  return [
    { lang: 'jp' },
    { lang: 'en' },
    { lang: 'th' }
  ];
}