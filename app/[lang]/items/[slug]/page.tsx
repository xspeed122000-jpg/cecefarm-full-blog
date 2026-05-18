import React from 'react';
import { client } from "@/sanityClient";
import { PortableText } from "@portabletext/react";
import { notFound, redirect } from "next/navigation"; // 📝 redirect を追加
import InstagramEmbed from '@/components/InstagramEmbed';
import ImageGallery from '@/components/ImageGallery';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { Metadata } from 'next';

export const dynamicParams = false;

// 1. SEO用メタデータの生成（予備対策を追加）
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;

    // まず指定された言語で取得を試みる
    let item = await client.fetch(`
        *[(_type == "post" || _type == "staticPage") && slug.current == $slug && language == $lang][0] {
            title, seoTitle, metaDescription
        }
    `, { slug, lang });

    // 📝 もし見つからず、かつ現在の言語が「jp」以外なら、予備として「jp」のデータを取得する
    if (!item && lang !== 'jp') {
        item = await client.fetch(`
            *[(_type == "post" || _type == "staticPage") && slug.current == $slug && language == "jp"][0] {
                title, seoTitle, metaDescription
            }
        `, { slug });
    }

    if (!item) return { title: 'Not Found | Cece Farm' };

    const displayTitle = item.seoTitle || item.title;
    return {
        title: displayTitle,
        description: `Cece Farm | ${displayTitle}. Rare plants from Chiang Mai.`,
    };
}

// 👇 1. ファイルの上部（Page関数の外など）に、見出しの見た目を定義する「components」を追加します
// 📄 修正版の portableTextComponents

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

// 2. メインのページコンポーネント（自動リダイレクト機能を搭載）
export default async function Page({ params }: { params: any }) {
    const { lang, slug } = await params;

    if (!slug) return notFound();

    // まずは指定された言語（en や th）で記事を探す
    let item = await client.fetch(`
        *[(_type == "post" || _type == "staticPage") && slug.current == $slug && language == $lang][0] {
            title, seoTitle, body,
            "imageUrl": mainImage.asset->url,
            insta_url,
            "gallery_images": gallery_images[].asset->url
        }
    `, { slug, lang });

    // 📝 【ここが核心】もし指定された言語の記事がまだ無くて、それが「jp」以外（en/th）の場合
    if (!item && lang !== 'jp') {
        // 日本語版の記事が実在するか確認する
        const jpItem = await client.fetch(`
            *[(_type == "post" || _type == "staticPage") && slug.current == $slug && language == "jp"][0] { _id }
        `, { slug });

        // 日本語版が存在するなら、エラーにせず、自動的に日本語版のURLへと「飛ばす」！
        if (jpItem) {
            redirect(`/jp/items/${slug}`);
        }
    }

    // 日本語版すら存在しない本当の「お探しのページは見つかりません」の時だけ404を出す
    if (!item) return notFound();

    return (
        <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '80px auto', fontFamily: 'sans-serif' }}>
            <Breadcrumbs items={[{ label: item.title }]} />
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
        </main>
    );
}
// 📄 app/[lang]/items/[slug]/page.tsx の最下部を以下に書き換え

export async function generateStaticParams() {
    const languages = ['jp', 'en', 'th'];

    // 📝 修正：post だけでなく staticPage のスラグも一緒に取得するように変更
    const query = `*[(_type == "post" || _type == "staticPage")] { "slug": slug.current }`;
    const items = await client.fetch(query);

    // 言語 × スラグ の全組み合わせを生成
    return languages.flatMap((lang) =>
        items.map((item: any) => {
            // 万が一slugが空のデータがあってもエラーにならないための安全ガード
            if (!item.slug) return [];
            return {
                lang: lang,
                slug: item.slug,
            };
        }).flat()
    );
}
