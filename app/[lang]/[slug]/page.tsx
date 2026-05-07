import { client } from "@/sanityClient";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

export const runtime = 'edge';

const portableTextComponents = {
    types: {
        // defineType の name である 'customHtml' を指定
        customHtml: ({ value }: any) => (
            // defineField の name である 'html' から中身を取り出す
            <div dangerouslySetInnerHTML={{ __html: value.html }} />
        ),
    },
};

async function getStaticPage(slug: string) {
    // 念のため、本文（body）の中身も取得できているか確認するクエリ
    const query = `*[_type == "staticPage" && slug.current == $slug][0]`;
    const data = await client.fetch(query, { slug });
    return data;
}

export default async function Page({ params }: { params: { lang: string, slug: string } }) {
  const { lang, slug } = params;
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
            <style dangerouslySetInnerHTML={{
                __html: `
  html { scroll-behavior: smooth; } /* スルスルと動くようになります */
  [id] { 
    scroll-margin-top: 100px; /* ヘッダーの高さ分（適宜調整）だけ手前で止まる設定 */
  }
` }} />
            <div className="prose">
                {/* ★修正：componentsプロパティを渡す */}
                <PortableText value={page.body} components={portableTextComponents} />
            </div>
        </main>
    );
}