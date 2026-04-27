export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { client } from '@/sanityClient';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';

// 画像のURLを作るための準備
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// PortableTextの中で「画像」が出てきた時の表示ルール
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

export default async function PhytoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // slugを指定してデータを取得
  const query = `*[_type == "staticPage" && slug.current == "phyto_cites" && language == $lang][0]`;
  const page = await client.fetch(query, { lang });

  if (!page) return <div>Page Not Found</div>;

  return (
    <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{page.title}</h1>
      <article>
        {/* components={components} を追加することで画像が表示されるようになります */}
        <PortableText value={page.body} components={components} />
      </article>
    </main>
  );
}