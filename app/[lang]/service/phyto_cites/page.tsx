// 1. 基本設定
import { client } from '@/sanityClient';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';

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

// ⭕️ 古い「const languages = [...]」は丸ごと消去しました

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
      
      {/* ⭕️ 古い「<nav>〜</nav>」のエリアを丸ごと綺麗に消去しました */}

      <h1 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '30px' }}>
        {page.title}
      </h1>

      <article style={{ lineHeight: '1.8', color: '#444' }}>
        <PortableText value={page.body} components={components} />
      </article>
    </main>
  );
}export async function generateStaticParams() {
  return [
    { lang: 'jp' },
    { lang: 'en' },
    { lang: 'th' }
  ];
}