// 1. 基本設定
export const runtime = 'edge'; // Cloudflare Pagesにはこれが必要
export const dynamic = 'force-dynamic'; // 常に最新のSanityデータを取得

import { client } from '@/sanityClient';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';

// 画像のURLを作るための準備
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// PortableTextの画像表示ルール
const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img
            src={urlFor(value).url()}
            alt={value.alt || 'Content Image'}
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
          {value.caption && (
            <p style={{ fontSize: '14px', color: '#666' }}>{value.caption}</p>
          )}
        </div>
      );
    },
  },
};

// 言語バーのデータ（一箇所にまとめると管理が楽です）
const languages = [
  { code: 'jp', label: '日本語' },
  { code: 'en', label: 'English' },
  { code: 'th', label: 'ไทย' },
];

export default async function PhytoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // Sanityからデータを取得
  // slug.current match "phyto_cites*" は、slugが "phyto_cites" で始まるものを探します
  const query = `*[_type == "staticPage" && slug.current match "phyto_cites*" && language == $lang][0]`;
  const page = await client.fetch(query, { lang });

  if (!page) return <div style={{ padding: '40px', textAlign: 'center' }}>Page Not Found</div>;

  return (
    <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* 修正された言語切り替えバー */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center', // 中央寄せでカッコよく
        gap: '20px',
        margin: '0 0 40px 0',
        paddingBottom: '15px',
        borderBottom: '1px solid #f0f0f0',
        fontSize: '0.85rem',
        letterSpacing: '0.05em'
      }}>
        {languages.map((l) => (
          <Link
            key={l.code}
            // リンク先を /jp/phyto_cites などの形式に指定
            href={`/${l.code}/phyto_cites`}
            style={{
              textDecoration: 'none',
              // 現在の言語なら色を濃く、それ以外は薄く
              color: lang === l.code ? '#2C3E35' : '#aaa',
              fontWeight: lang === l.code ? 'bold' : 'normal',
              borderBottom: lang === l.code ? '1px solid #2C3E35' : 'none',
              paddingBottom: '4px'
            }}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <h1 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '30px' }}>
        {page.title}
      </h1>

      <article style={{ lineHeight: '1.8', color: '#444' }}>
        <PortableText value={page.body} components={components} />
      </article>
    </main>
  );
}