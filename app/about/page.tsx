import React from 'react';
import Image from "next/image";

// Define the styles
const sectionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '60px',
  marginBottom: '100px',
  flexWrap: 'wrap',
};

const textContainerStyle: React.CSSProperties = {
  flex: '1',
  minWidth: '300px',
  maxWidth: '600px',
};

const imageContainerStyle: React.CSSProperties = {
  flex: '1',
  minWidth: '300px',
  height: '400px',
  position: 'relative',
  borderRadius: '16px',
  overflow: 'hidden',
};

const titleEnStyle: React.CSSProperties = {
  fontSize: '2.0rem',
  fontWeight: '600',
};

const titleJpStyle: React.CSSProperties = {
  fontSize: '1.1rem',
};

const bodyContentStyle: React.CSSProperties = {
  maxWidth: '650px',
  margin: '0 auto',
  lineHeight: '1.8',
  textAlign: 'left'
};

const enTextStyle: React.CSSProperties = {
  fontSize: '1.0rem',
  marginBottom: '20px'
};

const jpTextStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  color: '#666'
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#FDFDFB', color: '#333', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* スマホ用レスポンシブスタイル */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          .hero-h1 { fontSize: 2rem !important; }
          .hero-p { fontSize: 1rem !important; }
          .flex-section { 
            gap: 30px !important; 
            margin-bottom: 60px !important; 
            flex-direction: column !important; /* スマホでは強制的に縦並び */
          }
          .text-block { min-width: 100% !important; }
          .image-block { 
            min-width: 100% !important; 
            height: 250px !important; /* スマホでは画像エリアを少し低く */
          }
          .section-heading { fontSize: 1.5rem !important; }
        }
      `}} />

      {/* ヒーローセクション */}
      <section style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
        <h1 className="hero-h1" style={{ fontSize: '3rem', color: '#2d5a27', marginBottom: '20px' }}>Our Story</h1>
        <p className="hero-p" style={{ fontSize: '1.2rem', color: '#666', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
          Chiang Mai, Thailand, is a world-renowned sanctuary for rare foliage plants. Our founding mission is to bridge the gap between these botanical treasures and collectors worldwide, ensuring a safe, affordable, and seamless delivery to your doorstep.<br />
          タイ・チェンマイは、世界でも有数の希少な観葉植物の宝庫です。私たちの創業理念は、これらの貴重な植物を適正な価格で、かつ安全に世界中のコレクターの皆様へお届けすることにあります。
        </p>
      </section>

      <div style={{ maxWidth: '650px', margin: '0 auto', lineHeight: '1.8', textAlign: 'left' }}>

        {/* セクション 1: Plants */}
        <section style={sectionStyle}>
          <div style={imageContainerStyle}>
            <Image
              src="/about/rareplants20260503.webp"
              alt="Rare tropical plants at Cece Farm"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div style={textContainerStyle}>
            <h2 style={titleEnStyle}>Our Plants</h2>
            <p style={titleJpStyle}>植物へのこだわり</p>
            <div style={bodyContentStyle}>
              <p style={enTextStyle}>At Cece Farm, we specialize in a vibrant collection of tropical foliage, air plants, and premium fruit seedlings, curated with passion for every plant lover.</p>
              <p style={jpTextStyle}>Cece Farmでは、主に熱帯観葉植物を筆頭に、エアプランツや各種フルーツの苗木などを幅広く取り扱っております。一点一点、愛情を込めて育てた植物たちをぜひご覧ください。</p>
            </div>
          </div>
        </section>
        <div style={textContainerStyle}></div>

        {/* セクション 2: Export Support (画像とテキストを入れ替える) */}
        <section style={{ ...sectionStyle, flexDirection: 'row-reverse' }}>
          <div style={imageContainerStyle}>
            <Image
              src="/about/e-phyto20260503.webp"
              alt="Phytosanitary and CITES certification service"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div style={textContainerStyle}>
            <h2 style={titleEnStyle}>Export Support</h2>
            <p style={titleJpStyle}>輸出・検疫サポート</p>
            <div style={bodyContentStyle}>
              <p style={enTextStyle}>We offer professional assistance for Phytosanitary and CITES certification, navigating the complexities of international regulations to ensure your plants are ready for global travel.</p>
              <p style={jpTextStyle}>観葉植物やフルーツの苗木をタイから持ち出す際に必要となる、検疫証明書（Phyto）やCITES（ワシントン条約）書類の取得代行サービスを提供しています。海外への輸出や持ち出しに不安がある方は、ぜひ私たの専門サービスをご利用ください。</p>
            </div>
          </div>
        </section>

        {/* セクション3：コーヒーとピザ */}
        <section style={sectionStyle}>
          <div style={imageContainerStyle}>
            <Image
              src="/about/cece-pizza-20260503.webp"
              alt="Cece Cafe - Pizza"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div style={textContainerStyle}>
            <h2 style={titleEnStyle}>Cece Cafe - Pizza</h2>
            <p style={titleJpStyle}>シーシーピザ</p>
            <div style={bodyContentStyle}>
              <p style={enTextStyle}>Enjoy artisan pizzas at our on-site cafe, crafted by an owner-chef with 13 years of experience in Japanese restaurants. Our pizzas feature homemade Roma tomato sauce and fresh herbs like oregano and Italian basil, all grown right here in our nursery.</p>
              <p style={jpTextStyle}>併設のカフェでは、日本のレストランで13年のキャリアを積んだオーナーシェフによる本格的な手作りピザをお楽しみいただけます。自家製ローマトマトを使用したソースや、自家栽培のオレガノ、イタリアンバジルといった新鮮なハーブの香りが自慢です。</p>
            </div>
          </div>
        </section>

        <div style={textContainerStyle}></div>
        {/* セクション4：チェンマイコーヒー */}
        <section style={{ ...sectionStyle, flexDirection: 'row-reverse' }}>
          <div style={imageContainerStyle}>
            <Image
              src="/about/ch-icedcoffee.webp"
              alt="Cece Cafe Chiang Mai coffee beans"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div style={textContainerStyle}>
            <h2 style={titleEnStyle}>Cece Cafe - coffee beans</h2>
            <p style={titleJpStyle}>チェンマイ産コーヒー豆</p>
            <div style={bodyContentStyle}>
              <p style={enTextStyle}>English: Savor the distinct profile of 100% Chiang Mai-grown coffee. Known for its refreshing clarity and deep, bold body, it is a unique local experience—especially unforgettable when served iced.</p>
              <p style={jpTextStyle}>当店のコーヒー豆は100%チェンマイ産です。チェンマイコーヒーは、スッキリとした口当たりと深いコクという、相反する魅力を併せ持っています。特にアイスコーヒーは抜群のおいしさです。ぜひ一度ご賞味ください！</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// スタイル定数
const flexSectionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '60px',
  marginBottom: '100px',
  flexWrap: 'wrap',
  width: '100%',
};

const textBlockStyle: React.CSSProperties = {
  flex: '1',
  minWidth: '300px',
  boxSizing: 'border-box',
};

const headingStyle: React.CSSProperties = {
  fontSize: '2rem',
  color: '#2d5a27',
  marginBottom: '20px',
  lineHeight: '1.3',
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: '1.8',
  color: '#444',
  marginBottom: '15px',
};

const imagePlaceholderStyle: React.CSSProperties = {
  flex: '1',
  minWidth: '300px',
  height: '400px',
  backgroundColor: '#f0f0f0',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
};