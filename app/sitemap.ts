// 📄 app/sitemap.ts

// 👇 静的エクスポート（output: 'export'）に対応するための設定を追記
export const dynamic = 'force-static';

import { MetadataRoute } from 'next';
import { client } from "@/sanityClient";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 🟢 1. あなたのサイトの本番ドメイン
  const baseUrl = 'https://cecefarm.com'; 
  const languages = ['jp', 'en', 'th'];

  // 🟢 2. 静的なページ（各言語のトップページなど）のURLを生成
  const staticPaths = languages.flatMap((lang) => [
    {
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
    }
  ]);

  // 🟢 3. Sanityからすべての記事（postとstaticPage）のスラグと更新日時を取得
  const query = `*[(_type == "post" || _type == "staticPage")] { "slug": slug.current, _updatedAt }`;
  const items = await client.fetch(query);

  // 🟢 4. 「言語 × 記事スラグ」の全組み合わせのURLを自動生成
  const dynamicPaths = languages.flatMap((lang) =>
    items.map((item: any) => ({
      url: `${baseUrl}/${lang}/items/${item.slug}`,
      lastModified: item._updatedAt ? new Date(item._updatedAt) : new Date(),
    }))
  );

  // すべて合体させて一つのサイトマップとして出力
  return [...staticPaths, ...dynamicPaths];
}