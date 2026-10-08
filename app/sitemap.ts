// app/sitemap.ts

import type { MetadataRoute } from "next";
import { client } from "@/sanityClient";

export const dynamic = "force-static";

const baseUrl = "https://cecefarm.com";
const languages = ["jp", "en", "th"] as const;

type SitemapPost = {
  slug: string;
  language?: string | null;
  contentType?: string | null;
  _updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. トップページとJournal一覧
  const staticPaths: MetadataRoute.Sitemap = languages.flatMap((lang) => [
    {
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/${lang}/journal`,
      lastModified: new Date(),
    },
  ]);

  // 2. Sanityから公開済みの投稿を取得
  const query = `*[
    _type == "post" &&
    defined(slug.current)
  ] {
    "slug": slug.current,
    language,
    contentType,
    _updatedAt
  }`;

  const posts = await client.fetch<SitemapPost[]>(
    query,
    {},
    { next: { revalidate: 3600 } }
  );

  // 3. 投稿をItemsとJournalに分ける
  const dynamicPaths: MetadataRoute.Sitemap = posts.flatMap((post) => {
    const section =
      post.contentType === "journal" ? "journal" : "items";

    // 言語が設定されている記事は、その言語のURLのみ生成
    // 古いItemsで言語が未設定の場合は、従来どおり3言語で生成
    const targetLanguages =
      post.language && languages.some((lang) => lang === post.language)
        ? [post.language]
        : [...languages];

    return targetLanguages.map((lang) => ({
      url: `${baseUrl}/${lang}/${section}/${post.slug}`,
      lastModified: post._updatedAt
        ? new Date(post._updatedAt)
        : new Date(),
    }));
  });

  return [...staticPaths, ...dynamicPaths];
}