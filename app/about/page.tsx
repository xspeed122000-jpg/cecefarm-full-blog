import Image from "next/image";

// --- 1. スタイルの定義 ---
const sectionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '60px',
  marginBottom: '120px',
  flexWrap: 'wrap', // スマホ画面の時は自動で縦並びにする設定
};

const textContainerStyle: React.CSSProperties = {
  flex: '1',
  minWidth: '300px',
};

const imageContainerStyle: React.CSSProperties = {
  flex: '1',
  minWidth: '300px',
  height: '450px', // 画像の高さを少し大きくして迫力を出します
  position: 'relative', // ★これが「画像を収めるグラス」の役割です！
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)' // 少し影をつけてリッチに
};

const titleEnStyle: React.CSSProperties = {
  fontSize: '2.2rem',
  fontWeight: '700',
  color: '#2C3E35',
  marginBottom: '5px',
};

const titleJpStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  color: '#888',
  marginBottom: '30px',
  letterSpacing: '0.05em'
};

const enTextStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: '1.8',
  marginBottom: '20px',
  color: '#333'
};

const jpTextStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  lineHeight: '1.9',
  color: '#666'
};

// --- 2. ページ本体 ---
export default function AboutPage() {
  return (
    // ★ ページ全体の横幅を 1100px に制限し、中央寄せにします
    <main style={{ maxWidth: '1100px', margin: '150px auto 100px', padding: '0 20px' }}>
      
      {/* イントロ（ヒーローセクション） */}
      <div style={{ textAlign: 'center', marginBottom: '120px', maxWidth: '800px', margin: '150px auto 120px' }}>
        <h1 style={{ fontSize: '3rem', color: '#2C3E35', marginBottom: '20px' }}>Our Story</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '20px', color: '#333' }}>
          Chiang Mai, Thailand, is a world-renowned sanctuary for rare foliage plants. Our founding mission is to bridge the gap between these botanical treasures and collectors worldwide, ensuring a safe, affordable, and seamless delivery to your doorstep.
        </p>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          タイ・チェンマイは、世界でも有数の希少な観葉植物の宝庫です。私たちの創業理念は、これらの貴重な植物を適正な価格で、かつ安全に世界中のコレクターの皆様へお届けすることにあります。
        </p>
      </div>

      {/* セクション 1: Plants（画像左、テキスト右） */}
      <section style={sectionStyle}>
        <div style={imageContainerStyle}>
          <Image src="/about/rareplants20260503.webp" alt="Rare tropical plants at Cece Farm" fill style={{ objectFit: 'cover' }} />
        </div>
        <div style={textContainerStyle}>
          <h2 style={titleEnStyle}>Our Plants</h2>
          <p style={titleJpStyle}>植物へのこだわり</p>
          <p style={enTextStyle}>At Cece Farm, we specialize in a vibrant collection of tropical foliage, air plants, and premium fruit seedlings, curated with passion for every plant lover.</p>
          <p style={jpTextStyle}>Cece Farmでは、主に熱帯観葉植物を筆頭に、エアプランツや各種フルーツの苗木などを幅広く取り扱っております。<br />一点一点、愛情を込めて育てた植物たちをぜひご覧ください。</p>
        </div>
      </section>

      {/* セクション 2: Export Support（★ flexDirection: 'row-reverse' で画像右、テキスト左に！） */}
      <section style={{ ...sectionStyle, flexDirection: 'row-reverse' }}>
        <div style={imageContainerStyle}>
          <Image src="/about/e-phyto20260503.webp" alt="Phytosanitary and CITES certification service" fill style={{ objectFit: 'cover' }} />
        </div>
        <div style={textContainerStyle}>
          <h2 style={titleEnStyle}>Export Support</h2>
          <p style={titleJpStyle}>検疫証明書取得代行</p>
          <p style={enTextStyle}>We offer professional assistance for Phytosanitary and CITES certification, navigating the complexities of international regulations to ensure your plants are ready for global travel.</p>
          <p style={jpTextStyle}>観葉植物やフルーツの苗木をタイから持ち出す際に必要となる、検疫証明書（Phyto）やCITES書類の取得代行サービスを提供しています。<br />海外への輸出や持ち出しに不安がある方は、ぜひ私たちの専門サービスをご利用ください。</p>
        </div>
      </section>

      {/* セクション 3: Cece Pizza（画像左、テキスト右に戻る） */}
      <section style={sectionStyle}>
        <div style={imageContainerStyle}>
          <Image src="/about/cece-pizza-20260503.webp" alt="Artisan pizza at Cece Cafe" fill style={{ objectFit: 'cover' }} />
        </div>
        <div style={textContainerStyle}>
          <h2 style={titleEnStyle}>Cece Pizza</h2>
          <p style={titleJpStyle}>本格手作りピザ</p>
          <p style={enTextStyle}>Enjoy artisan pizzas at our on-site cafe, crafted by an owner-chef with 13 years of experience in Japanese restaurants. Our pizzas feature homemade Roma tomato sauce and fresh herbs like oregano and Italian basil, all grown right here in our nursery.</p>
          <p style={jpTextStyle}>併設のカフェでは、日本のレストランで13年のキャリアを積んだオーナーシェフによる本格的な手作りピザをお楽しみいただけます。<br />自家製ローマトマトを使用したソースや、自家栽培のオレガノ、イタリアンバジルといった新鮮なハーブの香りが自慢です。</p>
        </div>
      </section>

      {/* セクション 4: Cece Coffee（画像右、テキスト左） */}
      <section style={{ ...sectionStyle, flexDirection: 'row-reverse' }}>
        <div style={imageContainerStyle}>
          <Image src="/about/ch-icedcoffee.webp" alt="100% Chiang Mai grown coffee" fill style={{ objectFit: 'cover' }} />
        </div>
        <div style={textContainerStyle}>
          <h2 style={titleEnStyle}>Cece Coffee</h2>
          <p style={titleJpStyle}>チェンマイ産コーヒー</p>
          <p style={enTextStyle}>Savor the distinct profile of 100% Chiang Mai-grown coffee. Known for its refreshing clarity and deep, bold body, it is a unique local experience—especially unforgettable when served iced.</p>
          <p style={jpTextStyle}>当店のコーヒー豆は100%チェンマイ産です。<br />チェンマイコーヒーは、スッキリとした口当たりと深いコクという、相反する魅力を併せ持っています。<br />特にアイスコーヒーは抜群のおいしさです。ぜひ一度ご賞味ください！</p>
        </div>
      </section>

    </main>
  );
}