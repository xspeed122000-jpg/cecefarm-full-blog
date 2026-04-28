import { client } from "@/sanityClient";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

export const runtime = 'edge';

async function getStaticPage(slug: string) {
  const query = `*[_type == "staticPage" && slug.current == $slug][0]`;
  const data = await client.fetch(query, { slug });
  return data;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const page = await getStaticPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main style={{ maxWidth: '800px', margin: '120px auto', padding: '0 20px' }}>
      <h1>{page.title}</h1>
      
      {/* 言語切り替えバー */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        alignItems: 'center',
        margin: '20px 0 40px 0', 
        paddingBottom: '10px', 
        borderBottom: '1px solid #eee',
        fontSize: '0.9rem',
        color: '#666'
      }}>
        <span style={{ fontWeight: 'bold' }}>Language:</span>
        <a href="#jp" style={{ color: '#0070f3', textDecoration: 'none' }}>JP</a>
        <span style={{ color: '#ccc' }}>|</span>
        <a href="#en" style={{ color: '#0070f3', textDecoration: 'none' }}>EN</a>
        <span style={{ color: '#ccc' }}>|</span>
        <a href="#th" style={{ color: '#0070f3', textDecoration: 'none' }}>TH</a>
      </div>

      <div className="prose">
        <PortableText value={page.body} />
      </div>
    </main>
  );
}