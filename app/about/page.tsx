import React from 'react';

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#FDFDFB', color: '#333', minHeight: '100vh' }}>
      {/* ヒーローセクション：ビジョン */}
      <section style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
        <h1 style={{ fontSize: '3rem', color: '#2d5a27', marginBottom: '20px' }}>Our Story</h1>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
          植物の息吹を感じ、焼きたてのピザの香りに包まれる。<br />
          Cece Farmは、私たちの「夢」を形にした場所です。
        </p>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 20px' }}>
        
        {/* セクション1：夫婦の夢とピザ */}
        <section style={flexSectionStyle}>
          <div style={textBlockStyle}>
            <h2 style={headingStyle}>The Dream: Authenticity in Every Slice</h2>
            <p style={paragraphStyle}>
              長年、食の世界に身を置いてきましたが、私たち夫婦にはずっと温めてきた夢がありました。
              それは、自分たちの手で育てた食材を使い、最高のピザを焼くこと。
            </p>
            <p style={paragraphStyle}>
              試行錯誤を重ね、ようやく皆さまに提供できる準備が整いました。
              華やかなレストランではなく、素材の味がダイレクトに伝わる「究極のピザ」を目指しています。
            </p>
          </div>
          <div style={imagePlaceholderStyle}>
            <span style={{ color: '#aaa' }}>[Image: Pizza Oven or Baking Scene]</span>
          </div>
        </section>

        {/* セクション2：Farm to Table（自家製へのこだわり） */}
        <section style={{ ...flexSectionStyle, flexDirection: 'row-reverse' }}>
          <div style={textBlockStyle}>
            <h2 style={headingStyle}>Grown with Love, Served with Pride</h2>
            <p style={paragraphStyle}>
              Cece Farmのピザには、この農園の恵みが凝縮されています。
              ソースに使用するのは、自社栽培の濃厚なローマトマト。
              そして、庭から摘みたてのバジル、オレガノ、ローズマリー。
            </p>
            <p style={paragraphStyle}>
              チェンマイの豊かな土壌で育ったハーブの香りが、ピザの味を一層引き立てます。
            </p>
          </div>
          <div style={imagePlaceholderStyle}>
            <span style={{ color: '#aaa' }}>[Image: Fresh Herbs & Roma Tomatoes]</span>
          </div>
        </section>

        {/* セクション3：コーヒーと植物 */}
        <section style={flexSectionStyle}>
          <div style={textBlockStyle}>
            <h2 style={headingStyle}>Coffee & Greenery</h2>
            <p style={paragraphStyle}>
              ピザのお供には、厳選されたチェンマイ産のコーヒーをどうぞ。
              また、店内を彩る希少な観葉植物たちは、私たちのもう一つの情熱です。
            </p>
            <p style={paragraphStyle}>
              美味しい香りに包まれながら、緑豊かな空間で心ゆくまでリラックスしてください。
            </p>
          </div>
          <div style={imagePlaceholderStyle}>
            <span style={{ color: '#aaa' }}>[Image: Plants & Coffee]</span>
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
  flexWrap: 'wrap' as 'wrap',
};

const textBlockStyle: React.CSSProperties = {
  flex: '1',
  minWidth: '300px',
};

const headingStyle: React.CSSProperties = {
  fontSize: '2rem',
  color: '#2d5a27',
  marginBottom: '20px',
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
};