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
    const query = `*[_type == "staticPage" && slug.current == $slug][0]`;
    const data = await client.fetch(query, { slug });
    return data;
}

export default async function StaticPage({ params }: { params: any }) {
  const { lang, slug } = await params;

  // 安全装置：もし slug（ページ名）がなければ、何もしない（またはエラーを回避する）
  if (!slug) {
    return <div>Page not found</div>;
  }

  // クエリを実行する際に、必ず変数を渡す
  const query = `*[_type == "staticPage" && slug.current == $slug && language == $lang][0]`;
  const page = await client.fetch(query, { 
    slug: slug, // ここが確実に渡されていることが大事
    lang: lang 
  });

  if (!page) return <div>Content not found</div>;

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