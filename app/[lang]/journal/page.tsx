import { client } from "@/sanityClient";
import Link from "next/link";
import type { Metadata } from "next";
import JournalListClient from './JournalListClient';

export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;

    const metadata = {
        jp: {
            title: "Journal | Cece Farm",
            description:
                "Cece Farmの新着情報、タイからの植物の持ち帰り、国際配送、植物検疫などについて紹介します。",
        },
        en: {
            title: "Journal | Cece Farm",
            description:
                "News and practical guides from Cece Farm about plants, international shipping, plant quarantine and bringing plants home from Thailand.",
        },
        th: {
            title: "Journal | Cece Farm",
            description:
                "ข่าวสารและบทความจาก Cece Farm เกี่ยวกับพืช การจัดส่งระหว่างประเทศ และการนำพืชออกจากประเทศไทย",
        },
    };

    return metadata[lang as keyof typeof metadata] || metadata.en;
}

async function getJournalPosts(lang: string) {
    const query = `
    *[
      _type == "post"
      && language == $lang
      && contentType == "journal"
      && defined(slug.current)
    ] | order(publishedAt desc) {
      _id,
      title,
      description,
      publishedAt,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }
  `;

    return await client.fetch(query, { lang });
}

export default async function JournalPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const posts = await getJournalPosts(lang);

    const text = {
        jp: {
            title: "Journal",
            intro:
                "Cece Farmの新着情報、植物についての話、タイからの植物の持ち帰りや国際配送に関する情報を紹介します。",
            empty: "記事はまだありません。",
        },
        en: {
            title: "Journal",
            intro:
                "News, plant stories and practical information about international shipping and bringing plants home from Thailand.",
            empty: "No articles yet.",
        },
        th: {
            title: "Journal",
            intro:
                "ข่าวสาร เรื่องราวเกี่ยวกับพืช และข้อมูลเกี่ยวกับการจัดส่งพืชระหว่างประเทศจากประเทศไทย",
            empty: "ยังไม่มีบทความ",
        },
    };

    const t = text[lang as keyof typeof text] || text.en;

    return (
        <main
            style={{
                maxWidth: "1100px",
                margin: "120px auto",
                padding: "0 20px",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    maxWidth: "760px",
                    margin: "0 auto 60px",
                }}
            >
                <h1
                    style={{
                        fontSize: "2.5rem",
                        color: "#2C3E35",
                        marginBottom: "20px",
                    }}
                >
                    {t.title}
                </h1>

                <p
                    style={{
                        lineHeight: 1.8,
                        color: "#555",
                        fontSize: "1.05rem",
                    }}
                >
                    {t.intro}
                </p>
            </div>

            <JournalListClient posts={posts} lang={lang} />

        </main>
  );
}

export async function generateStaticParams() {
    return [{ lang: "jp" }, { lang: "en" }, { lang: "th" }];
}