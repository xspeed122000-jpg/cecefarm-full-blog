import React from 'react';
import { client } from "@/sanityClient";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import InstagramEmbed from '@/components/InstagramEmbed';
import ImageGallery from '@/components/ImageGallery';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { Metadata } from 'next';
import Link from 'next/link';

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;


    let item = await client.fetch(`
    *[(_type == "post" || _type == "staticPage") && slug.current == $slug && language == $lang][0] {
        title,
        seoTitle,
        body,
        "imageUrl": mainImage.asset->url,
        insta_url,
        "gallery_images": gallery_images[].asset->url,
        "categories": categories[]->{
            title,
            "slug": slug.current
        }
    }
`, { slug, lang });

    if (!item && lang !== 'jp') {
        item = await client.fetch(`
            *[(_type == "post" || _type == "staticPage") && slug.current == $slug && language == "jp"][0] {
                title, seoTitle, metaDescription
            }
        `, { slug });
    }

    if (!item) return { title: 'Not Found | Cece Farm' };

    const displayTitle = item.seoTitle || item.title;
    const baseUrl = 'https://cecefarm.com';

    return {
        title: displayTitle,
        description: item.metaDescription || `Cece Farm | ${displayTitle}. Rare plants from Chiang Mai.`,
        alternates: {
            canonical: `${baseUrl}/${lang}/items/${slug}`,
            languages: {
                'ja': `${baseUrl}/jp/items/${slug}`, // 'jp' ではなく一般的な 'ja' を使うのがSEOの標準です
                'en': `${baseUrl}/en/items/${slug}`,
                'th': `${baseUrl}/th/items/${slug}`,
                'x-default': `${baseUrl}/en/items/${slug}`, // デフォルト（または英語）を指定するのがルールです
            },
        },
    };
}


const portableTextComponents = {
    block: {
        // 🟢 H2（大見出し）
        h2: ({ children }: any) => (
            <h2 style={{
                fontSize: '1.8rem',
                color: '#2d5a27',
                borderLeft: '5px solid #2d5a27',
                paddingLeft: '12px',
                marginTop: '45px',
                marginBottom: '20px',
                fontWeight: 'bold',
                lineHeight: '1.4'
            }}>
                {children}
            </h2>
        ),
        // 🔵 H3（中見出し）
        h3: ({ children }: any) => (
            <h3 style={{
                fontSize: '1.4rem',
                color: '#333',
                borderBottom: '1px solid #ddd',
                paddingBottom: '8px',
                marginTop: '35px',
                marginBottom: '15px',
                fontWeight: 'bold',
                lineHeight: '1.4'
            }}>
                {children}
            </h3>
        ),
        // ⚪️ 普通の段落（Pタグ）の余白設定
        normal: ({ children }: any) => (
            // 👇 REGULAR_TEXT_STYLE を消去し、スッキリさせました
            <p style={{ marginBottom: '24px' }}>{children}</p>
        ),
    },
};

export default async function Page({ params }: { params: any }) {
    const { lang, slug } = await params;

    if (!slug) return notFound();

    let item = await client.fetch(`
  *[(_type == "post" || _type == "staticPage") && slug.current == $slug && language == $lang][0] {
    title,
    seoTitle,
    body,
    "imageUrl": mainImage.asset->url,
    insta_url,
    "gallery_images": gallery_images[].asset->url,
    "categories": categories[]->{
      title,
      "slug": slug.current
    }
  }
`, { slug, lang });

    if (!item) return notFound();

    const primaryCategory = item.categories?.[0];

    return (
        <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '80px auto', fontFamily: 'sans-serif' }}>
            <Breadcrumbs
                items={[
                    {
                        label: 'Items',
                        href: `/${lang}/items`,
                    },
                    ...(primaryCategory
                        ? [
                            {
                                label: primaryCategory.title,
                                href: `/${lang}/items/category/${primaryCategory.slug}`,
                            },
                        ]
                        : []),
                    {
                        label: item.title,
                    },
                ]}
            />
            <h1 style={{ fontSize: '2.5rem', color: '#2d5a27', marginTop: '20px' }}>{item.title}</h1>

            {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', borderRadius: '20px', margin: '20px 0', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
            )}

            {item.insta_url && (
                <div style={{ margin: '40px 0' }}><InstagramEmbed url={item.insta_url} /></div>
            )}

            {item.body && (
                <div className="prose" style={{ lineHeight: '1.8', color: '#333', margin: '40px 0', fontSize: '1.1rem' }}>
                    <PortableText value={item.body} components={portableTextComponents} />
                </div>
            )}

            {item.gallery_images && item.gallery_images.length > 0 && (
                <div style={{ margin: '60px 0' }}>
                    <h3 style={{ borderLeft: '4px solid #2d5a27', paddingLeft: '10px', marginBottom: '20px' }}>Photo Gallery</h3>
                    <ImageGallery images={item.gallery_images} />
                </div>
            )}

            {primaryCategory && (
                <div
                    style={{
                        marginTop: '60px',
                        paddingTop: '30px',
                        borderTop: '1px solid #ddd',
                    }}
                >
                    <Link
                        href={`/${lang}/items/category/${primaryCategory.slug}`}
                        style={{
                            color: '#2d5a27',
                            textDecoration: 'none',
                            fontWeight: '600',
                        }}
                    >
                        ← {primaryCategory.title} の一覧へ戻る
                    </Link>
                </div>
            )}

        </main>
    );
}

export async function generateStaticParams() {
    const query = `
        *[
            (_type == "post" || _type == "staticPage")
            && defined(slug.current)
            && language in ["jp", "en", "th"]
        ] {
            "slug": slug.current,
            language
        }
    `;

    const items = await client.fetch(query);

    return items.map((item: any) => ({
        lang: item.language,
        slug: item.slug,
    }));
}
