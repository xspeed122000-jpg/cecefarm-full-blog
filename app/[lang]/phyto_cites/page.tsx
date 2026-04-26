export const runtime = 'edge';
import { client } from '@/sanityClient'; // 先ほど作ったファイルを指定
import { PortableText } from '@portabletext/react';


export default async function PhytoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  // Sanityから「指定した言語」かつ「スラグがphyto_cites」のページを取得
  const query = `*[_type == "staticPage" && slug.current == "phyto_cites" && language == $lang][0]`;
  const page = await client.fetch(query, { lang });

  if (!page) return <div>Page Not Found</div>;

  return (
    <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{page.title}</h1>
      <article>
        <PortableText value={page.body} />
      </article>
    </main>
  );
}