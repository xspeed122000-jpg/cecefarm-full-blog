import { client } from '@/sanityClient';
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import { portableTextComponents } from '@/components/PortableTextComponents';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  // Sanityからタイトルを取得
  const page = await client.fetch(
    `*[_type == "staticPage" && slug.current match "phyto_cites*" && language == $lang][0]`,
    { lang }
  );

  const title = page?.title || 'Phyto / CITES Information';
  const baseUrl = 'https://cecefarm.com';
  const slugPath = 'service/phyto_cites';

  return {
    title: `${title} | Cece Farm`,
    alternates: {
      canonical: `${baseUrl}/${lang}/${slugPath}`,
      languages: {
        'ja': `${baseUrl}/jp/${slugPath}`,
        'en': `${baseUrl}/en/${slugPath}`,
        'th': `${baseUrl}/th/${slugPath}`,
        'x-default': `${baseUrl}/en/${slugPath}`,
      },
    },
  };
}

export default async function PhytoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

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
        <PortableText
          value={page.body}
          components={portableTextComponents}
        />
      </article>
    </main>
  );
} export async function generateStaticParams() {
  return [
    { lang: 'jp' },
    { lang: 'en' },
    { lang: 'th' }
  ];
}