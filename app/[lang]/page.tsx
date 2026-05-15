import Link from 'next/link';
import Image from 'next/image';
import { createClient } from 'next-sanity';

// export const revalidate = 60; // これはコメントアウトか削除

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // 「あだ名」で呼ぶ
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// コンポーネント（変更なし）
function ServiceItem({ image, title, subTitle, text, href }: any) {
  return (
    <div style={{ flex: '1', minWidth: '300px', maxWidth: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '220px', height: '220px', borderRadius: '50%', overflow: 'hidden', border: '5px solid #eee', marginBottom: '30px' }}>
        <Image src={image || ''} alt={title || ''} fill style={{ objectFit: 'cover' }} />
      </div>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '5px', textAlign: 'center' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px', textAlign: 'center' }}>{subTitle}</p>
      <p style={{ fontSize: '0.9rem', color: '#777', lineHeight: '1.8', marginBottom: '20px', textAlign: 'left', whiteSpace: 'pre-wrap' }}>{text}</p>
      <Link href={href} style={{ color: '#0070f3', fontSize: '0.9rem', fontWeight: 'bold' }}>Learn More →</Link>
    </div>
  );
}

// --- getPopularPlants (人気の植物) ---
async function getPopularPlants(lang: string) {
  try {
    // 以前動いていた条件（例: isPopular == true）に言語条件を足します
    // ここでは仮に isPopular というフラグを使っていると想定します
    const query = `*[_type == "post" && (language == $lang || lang == $lang) && isPopular == true] | order(_createdAt desc)[0...4] { 
      title,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url
    }`;

    // もし isPopular などのフラグがない場合は、単にその言語の記事を出す
    const fallbackQuery = `*[_type == "post" && (language == $lang || lang == $lang)] | order(_createdAt desc)[0...4] {
      title,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url
    }`;

    const data = await client.fetch(query, { lang }, { next: { revalidate: 0 } });

    // もし人気記事が0件なら、とりあえずその言語の最新記事を出すようにします
    if (data.length === 0) {
      return await client.fetch(fallbackQuery, { lang });
    }

    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error("PopularPlants Error:", e);
    return [];
  }
}

// --- getLatestPosts (最新記事) ---
async function getLatestPosts(lang: string) {
  try {
    // 念のため language フィールドが存在するかどうかもチェックに加えます
    const query = `*[_type == "post" && (language == $lang || lang == $lang)] | order(_createdAt desc)[0...5] { 
      title, 
      "slug": slug.current, 
      "date": coalesce(publishedAt, _createdAt), 
      "imageUrl": mainImage.asset->url 
    }`;

    const data = await client.fetch(query, { lang }, { next: { revalidate: 0 } });
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error("LatestPosts Error:", e);
    return [];
  }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  // Next.js 15のルール通り、paramsをawaitして lang を取得
  const { lang } = await params;

  // 4. 関数に lang を渡して実行
  const popularPlants = await getPopularPlants(lang) || []; // こちらも同様に修正が必要かもしれません
  const latestPosts = await getLatestPosts(lang) || [];

  return (
    <main>
      {/* 1. Our Services セクション */}
      <section style={{ padding: '20px 20px 100px 20px', backgroundColor: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ maxWidth: '260px', margin: '0 auto 10px auto' }}>
            <h1 style={{ fontSize: '0px', margin: 0, padding: 0, position: 'absolute' }}>Cece Farm - チェンマイの希少植物専門店</h1>
            <Image src="/home/logo.png" alt="Cece Farm Logo" width={1400} height={750} style={{ width: '100%', height: 'auto' }} priority />
          </div>
          <h2 style={{ fontSize: '1.8rem', letterSpacing: '0.15em', fontWeight: 'bold', color: '#333' }}>OUR SERVICES</h2>
        </div>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
          <ServiceItem image="/home/home_service_01.webp" title="Plants (Items)" subTitle="Rare & Exotic Collection" text={`Experience the beauty of nature with our curated selection of rare variegated plants.\n\n自社農園から厳選した、希少な斑入りモンステラなどのレアプランツをご紹介。`} href={`/${lang}/items`} />
          <ServiceItem image="/home/home_service_02.webp" title="Plant Export Support" subTitle="Phyto & CITES Service" text={`We provide professional assistance for obtaining Phytosanitary and CITES certificates.\n\n複雑な植物検疫証明書（Phyto）やCITESの手続きを完全サポート。`} href={`/${lang}/service`} />
          <ServiceItem image="/home/home_service_03.webp" title="Pizza & Coffee" subTitle="Cafe & Kitchen" text={`Enjoy authentic pizzas crafted by professional chefs and premium coffee.\n\nプロの職人が焼き上げる本格ピザと、厳選された豆を使用したこだわりのコーヒー。`} href={`/${lang}/pizza`} />
        </div>
      </section>

      {/* 2. Popular Plants セクション */}
      <section style={{ backgroundColor: '#fff', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Popular Plants</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {popularPlants.map((item: any) => item && (
              <Link href={`/${lang}/items/${item.slug}`} key={item.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', width: '100%', height: '250px', backgroundColor: '#f0f0f0' }}>
                    {item.imageUrl && <Image src={item.imageUrl} alt={item.title || ''} fill style={{ objectFit: 'cover' }} />}
                  </div>
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 5px 0' }}>{item.category || 'Cece Farm'}</p>
                    <h4 style={{ margin: '0', fontSize: '1.1rem', color: '#222' }}>{item.title}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Latest Articles セクション */}
      <section style={{ padding: '80px 20px', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Latest Articles</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {latestPosts.length > 0 ? latestPosts.map((item: any, i: number) => {
              if (!item) return null;
              const d = item.date ? new Date(item.date) : new Date();
              const dateString = isNaN(d.getTime()) ? "" : `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

              return (
                <Link href={`/${lang}/items/${item.slug}`} key={item.slug} style={{ display: 'flex', gap: '15px', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', textDecoration: 'none', color: '#444' }}>
                  <div style={{ fontSize: '0.9rem', color: '#888', minWidth: '85px' }}>{dateString}</div>
                  <div style={{ flex: '1', fontSize: '1rem' }}>{item.title}</div>
                  {i < 3 && <div className="new-badge" style={{ fontSize: '0.8rem', marginLeft: '10px' }}>NEW</div>}
                </Link>
              );
            }) : <p style={{ textAlign: 'center', color: '#999' }}>No articles found.</p>}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
        .new-badge { color: #ff0000; font-weight: bold; animation: blink 1s infinite; }
      ` }} />
    </main>
  );
}
// app/[lang]/page.tsx の末尾などに追加

export async function generateStaticParams() {
  return [
    { lang: 'jp' },
    { lang: 'en' },
    { lang: 'th' }
  ];
}