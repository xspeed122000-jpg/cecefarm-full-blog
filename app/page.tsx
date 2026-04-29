// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

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

// ダミーの記事データ（人気Plants、最新記事用）
const dummyArticles = Array(6).fill(0).map((_, i) => ({
  id: `article-${i}`,
  date: `2026.${4 - (i % 2)}.${20 - i}`, // 簡易的な日付
  title: `Rare Variegated Monstera #${i + 1}`,
  subTitle: 'Thai Constellation',
  image: '/items/item-01.png', // ダミー画像
}));

export default function HomePage() {
  return (
    <main>
      {/* --- 1. Our Services セクション --- */}
      <section style={{ padding: '100px 20px', backgroundColor: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          {/* ★赤背景のロゴ画像。maxWidthでサイズを調整しています */}
          <div style={{ maxWidth: '300px', margin: '0 auto 40px auto' }}>
             <Image 
               src="/home/logo.webp" 
               alt="Cece Farm Logo" 
               width={1400} 
               height={750} 
               style={{ width: '100%', height: 'auto' }} 
             />
          </div>
          <h2 style={{ fontSize: '2.2rem', letterSpacing: '0.1em', fontWeight: 'bold' }}>OUR SERVICES</h2>
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
          {/* アクセス解析から3記事を選ぶためのプレースホルダー */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {dummyArticles.slice(0, 3).map((item) => (
              <div key={item.id} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                  <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '15px' }}>
                  <p style={{ fontSize: '0.8rem', color: '#999', margin: '0' }}>{item.subTitle}</p>
                  <h4 style={{ margin: '5px 0' }}>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Latest Articles セクション */}
      <section style={{ padding: '80px 20px', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Latest Articles</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {dummyArticles.map((item, i) => (
              <Link href="#" key={item.id} style={{ display: 'flex', gap: '15px', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', textDecoration: 'none', color: '#444' }}>
                {/* 投稿日 */}
                <div style={{ fontSize: '0.9rem', color: '#888', minWidth: '85px' }}>{item.date}</div>
                {/* タイトル */}
                <div style={{ flex: '1', fontSize: '1rem' }}>{item.title}</div>
                {/* ★追加：ピカピカするNewアイコン（CSSアニメーション） */}
                {i < 3 && ( // 最新3記事にNewを表示
                  <div className="new-badge" style={{ fontSize: '0.8rem', marginLeft: '10px' }}>NEW</div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ★ピカピカするNewアイコン用のCSSアニメーション */}
      <style dangerouslySetInnerHTML={{ __html: `
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