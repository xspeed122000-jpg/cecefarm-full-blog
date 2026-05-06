// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from 'next-sanity';

export const runtime = 'edge';
export const revalidate = 0; // ★ 追加：キャッシュを無効化し、常に最新のデータを取得する
// ★ ここに電話（client）の組み立て設定を追加します！
const client = createClient({
  // ↓ ここは Itemsページと同じご自身のプロジェクトIDを入れてください
  projectId: "88s4pwup",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// 丸い画像の紹介項目のコンポーネント
function ServiceItem({ image, title, subTitle, text, href }: {
  image: string;
  title: string;
  subTitle: string;
  text: string;
  href: string;
}) {
  return (
    <div style={{ flex: '1', minWidth: '300px', maxWidth: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '220px', height: '220px', borderRadius: '50%', overflow: 'hidden', border: '5px solid #eee', marginBottom: '30px' }}>
        <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
      </div>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '5px', textAlign: 'center' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px', textAlign: 'center' }}>{subTitle}</p>
      <p style={{ fontSize: '0.9rem', color: '#777', lineHeight: '1.8', marginBottom: '20px', textAlign: 'left' }}>{text}</p>
      <Link href={href} style={{ color: '#0070f3', fontSize: '0.9rem', fontWeight: 'bold' }}>
        Learn More →
      </Link>
    </div>
  );
}

// ★ 1. ファイルの上部（他の関数の外）にデータ取得関数を追加します
async function getPopularPlants() {
  const popularSlugs = [
    "caladium-black-knight",
    "monstera-lechleriana-variegata",
    "philodendron-caramel-marble-variegated"
  ];

  // Sanityから指定した3つの記事を取得
  const query = `*[_type == "post" && slug.current in $slugs] {
    title,
    "slug": slug.current,
    "category": category,
    "imageUrl": mainImage.asset->url
  }`;

  // ※ 上部で定義した client を使います
  const plants = await client.fetch(query, { slugs: popularSlugs });

  // 指定した1位〜3位の順番通りに並び替えて返します
  return popularSlugs.map(slug => plants.find((p: any) => p.slug === slug)).filter(Boolean);
}

// ★ 追加：最新の投稿を取得する関数（[0...5] で6件取得します）
async function getLatestPosts() {
  // 1. order(_createdAt desc) に変更し、確実に最新順にします
  const query = `*[_type == "post"] | order(_createdAt desc)[0...5] {
    title,
    "slug": slug.current,
    "date": coalesce(publishedAt, _createdAt), // 2. 公開日が空欄なら、自動作成日を使う安全策
    "imageUrl": mainImage.asset->url
  }`;
  return await client.fetch(query);
}
export default async function HomePage() {
  // ★ 両方のデータを個別に取得します
  const popularPlants = await getPopularPlants();
  const latestPosts = await getLatestPosts(); // ← これを追加！

  return (
    <main>
      {/* 1. Our Services セクション */}
      <section style={{
        padding: '20px 20px 100px 20px', // ★ 上の余白をさらに 20px まで詰めました
        backgroundColor: '#fff'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          {/* ロゴ画像：上下のマージンを最小限に */}
          <div style={{
            maxWidth: '260px',
            margin: '0 auto 10px auto' // ★ ロゴの下の文字との隙間もさらに詰めました
          }}>
            <h1 style={{
              fontSize: '0px', // 目には見えないけれど、検索エンジンには読み取らせるテクニックです
              margin: 0,
              padding: 0,
              position: 'absolute'
            }}>
              Cece Farm - チェンマイの希少植物専門店
            </h1>
            <Image
              src="/home/logo.png" // 手書き風の新ロゴに差し替え
              alt="Cece Farm Logo"
              width={1400}
              height={750}
              style={{ width: '100%', height: 'auto' }}
              priority // ★ トップの画像なので優先読み込み
            />
          </div>

          <h2 style={{
            fontSize: '1.8rem',
            letterSpacing: '0.15em',
            fontWeight: 'bold',
            marginTop: '0',
            color: '#333'
          }}>
            OUR SERVICES
          </h2>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>

          <ServiceItem
            image="/home/home_service_01.webp"
            title="Plants (Items)"
            subTitle="Rare & Exotic Collection"
            text={`Experience the beauty of nature with our curated selection of rare variegated plants. From the lush fields of Chiang Mai, we bring you the finest botanical treasures.\n\n自社農園から厳選した、希少な斑入りモンステラなどのレアプランツをご紹介。コレクター垂涎の一鉢がここに。`}
            href="/items"
          />

          <ServiceItem
            image="/home/home_service_02.webp"
            title="Plant Export Support"
            subTitle="Phyto & CITES Service"
            text={`We provide professional assistance for obtaining Phytosanitary and CITES certificates, ensuring your plants reach their global destination safely and legally.\n\n複雑な植物検疫証明書（Phyto）やCITESの手続きを完全サポート。世界中へ安全に植物を届けるためのお手伝いをいたします。`}
            href="/service"
          />

          <ServiceItem
            image="/home/home_service_03.webp"
            title="Pizza & Coffee"
            subTitle="Cafe & Kitchen"
            text={`Enjoy authentic pizzas crafted by professional chefs and premium coffee brewed from selected beans, all within a relaxing space surrounded by greenery.\n\nプロの職人が焼き上げる本格ピザと、厳選された豆を使用したこだわりのコーヒーを提供。植物に囲まれた癒しの空間で。`}
            href="/contact"
          />

        </div>
      </section>

      {/* 2. Popular Plants セクション */}
      <section style={{ backgroundColor: '#fff', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Popular Plants</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {/* ★ dummyArticles から popularPlants に変更 */}
            {popularPlants.map((item: any) => (
              <Link href={`/items/${item.slug}`} key={item.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', width: '100%', height: '250px', backgroundColor: '#f0f0f0' }}>
                    {item.imageUrl && (
                      <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: 'cover' }} />
                    )}
                  </div>
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 5px 0', textTransform: 'capitalize' }}>
                      {item.category || 'Cece Farm'}
                    </p>
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

            {/* ★ 修正：popularPlants ではなく latestPosts を使います */}
            {latestPosts.map((item: any, i: number) => (
              <Link
                href={`/items/${item.slug}`} // href="#" だった部分を修正
                key={item.slug}
                style={{ display: 'flex', gap: '15px', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', textDecoration: 'none', color: '#444' }}
              >
                {/* 投稿日（Sanityの日記を整形） */}
                <div style={{ fontSize: '0.9rem', color: '#888', minWidth: '85px' }}>
                  {new Date(item.date).toLocaleDateString('ja-JP').replace(/\//g, '.')}
                </div>

                {/* タイトル */}
                <div style={{ flex: '1', fontSize: '1rem' }}>{item.title}</div>

                {/* 最新3記事にNewを表示 */}
                {i < 3 && (
                  <div className="new-badge" style={{ fontSize: '0.8rem', marginLeft: '10px' }}>NEW</div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ★ピカピカするNewアイコン用のCSSアニメーション */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .new-badge {
          color: #ff0000;
          font-weight: bold;
          animation: blink 1s infinite; /* 1秒かけて点滅を繰り返す */
        }
      ` }} />
    </main>
  );
}