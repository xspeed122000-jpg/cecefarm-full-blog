import { client } from "@/sanityClient";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

export const runtime = 'edge';

// Sanityからデータを取得する関数
async function getStaticPage(slug: string) {
  const query = `*[_type == "staticPage" && slug.current == $slug][0]`;
  const data = await client.fetch(query, { slug });
  return data;
}

export default async function Page({ params }: { params: { slug: string } }) {
  // paramsは非同期で扱う必要があるためawait
  const { slug } = await params;
  const page = await getStaticPage(slug);

  // データが見つからない場合は404を表示
  if (!page) {
    notFound();
  }

  return (
    <main style={{ maxWidth: '800px', margin: '120px auto', padding: '0 20px' }}>
      <h1>{page.title}</h1>
      <div className="prose">
        {/* Sanityの本文（Body）を表示 */}
        <PortableText value={page.body} />
      </div>
    </main>
  );
}