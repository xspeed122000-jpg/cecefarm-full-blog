import React from 'react';
import { client } from "@/sanityClient";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import InstagramEmbed from '@/components/InstagramEmbed';
import ImageGallery from '@/components/ImageGallery';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { Metadata } from 'next';

export const dynamicParams = false; // 指定した言語（jp, en, th）以外は受け付けない設定

// SEO用メタデータの生成
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  // paramsをawaitしてから、langとslugを両方取り出す
  const { lang, slug } = await params;

    const item = await client.fetch(`
        *[(_type == "post" || _type == "staticPage") && slug.current == $slug && language == $lang][0] {
            title,
            seoTitle,
            metaDescription
        }
    `, { slug, lang });

    if (!item) return { title: 'Not Found | Cece Farm' };

    const displayTitle = item.seoTitle || item.title;

    return {
        title: displayTitle,
        // 言語に応じた説明文。ここも後でSanityから取れるようにするとさらに完璧です
        description: `Cece Farm | ${displayTitle}. Rare plants from Chiang Mai.`,
    };
}

export default async function Page({ params }: { params: any }) {
    const { lang, slug } = await params;

    if (!slug) return notFound();

    // データの取得（postとstaticPageの両方に対応し、インスタやギャラリーも取得）
    const item = await client.fetch(`
        *[(_type == "post" || _type == "staticPage") && slug.current == $slug && language == $lang][0] {
            title,
            seoTitle,
            body,
            "imageUrl": mainImage.asset->url,
            insta_url,
            "gallery_images": gallery_images[].asset->url
        }
    `, { slug, lang });

    if (!item) return notFound();

    return (
        <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '80px auto', fontFamily: 'sans-serif' }}>

            {/* 1. パンくずリスト（URLに言語コードを反映） */}
            <Breadcrumbs items={[
                // 1つ目のHomeが自動で出るなら、ここは langPath('/') だけでOK
              
                // Privacy Policy の場合は Items を含めない
                { label: item.title }
            ]} />

            <h1 style={{ fontSize: '2.5rem', color: '#2d5a27', marginTop: '20px' }}>{item.title}</h1>

            {/* 2. アイキャッチ（メイン画像） */}
            {item.imageUrl && (
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: '100%', borderRadius: '20px', margin: '20px 0', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                />
            )}

            {/* 3. インスタ動画 */}
            {item.insta_url && (
                <div style={{ margin: '40px 0' }}>
                    <InstagramEmbed url={item.insta_url} />
                </div>
            )}

            {/* 4. 本文 (Body) */}
            {item.body && (
                <div className="prose" style={{ lineHeight: '1.8', color: '#333', margin: '40px 0', fontSize: '1.1rem' }}>
                    <PortableText value={item.body} />
                </div>
            )}

            {/* 5. ギャラリー */}
            {item.gallery_images && item.gallery_images.length > 0 && (
                <div style={{ margin: '60px 0' }}>
                    <h3 style={{ borderLeft: '4px solid #2d5a27', paddingLeft: '10px', marginBottom: '20px' }}>Photo Gallery</h3>
                    <ImageGallery images={item.gallery_images} />
                </div>
            )}
        </main>
    );
}
// app/[lang]/items/[slug]/page.tsx の末尾などに追加

export async function generateStaticParams() {
  const languages = ['jp', 'en', 'th'];
  
  // すべての商品スラグを取得
  const query = `*[_type == "post"] { "slug": slug.current }`;
  const items = await client.fetch(query);

  // 言語 × スラグ の全組み合わせを生成
  // 例: { lang: 'jp', slug: 'alocasia-black-velvet' }
  return languages.flatMap((lang) => 
    items.map((item: any) => ({
      lang: lang,
      slug: item.slug,
    }))
  );
}
