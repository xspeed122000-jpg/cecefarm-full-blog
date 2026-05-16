import Image from 'next/image';

export default function ServicesPage() {
  return (
    <div style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>

      {/* イントロダクション */}
      <section style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2d5a27', marginBottom: '20px' }}>Our Services</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
          Cece Farmは、タイ・チェンマイの豊かな自然を背景に、植物の育成から輸出、
          そして心安らぐカフェ空間の提供まで、多角的なサービスを展開しています。
        </p>
      </section>

      {/* サービス一覧 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>

        {/* 1. 植物販売 & 育成 */}
        <section style={serviceSectionStyle}>
          <div style={textContainerStyle}>
            <h2 style={serviceTitleStyle}>01. Rare Plant Nursery</h2>
            <p style={serviceDescriptionStyle}>
              希少な斑入り観葉植物やサボテンを中心に、自社農園にて丁寧に育成しています。
              モンステラ、フィロデンドロン、サンセベリアなど、コレクター向けの高品質な株を取り揃えています。
            </p>
          </div>
          <div style={{ ...imagePlaceholderStyle, position: 'relative', overflow: 'hidden' }}>
            <Image
              src="/service/nursery.webp"
              alt="Cece Farm Nursery"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </section>

        {/* 2. 海外輸出サポート */}
        <section style={{ ...serviceSectionStyle, flexDirection: 'row-reverse' }}>
          <div style={textContainerStyle}>
            <h2 style={serviceTitleStyle}>02. Export & Logistics</h2>
            <p style={serviceDescriptionStyle}>
              タイから世界各国への植物輸出をサポートします。
              CITES（ワシントン条約）や植物検疫証明書（Phytosanitary Certificate）の取得など、
              複雑な通関手続きを専門スタッフが代行し、安全にお手元までお届けします。
            </p>
          </div>
          <div style={{ ...imagePlaceholderStyle, position: 'relative', overflow: 'hidden' }}>
            <Image
              src="/service/export_support.webp"
              alt="Export Support Service"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </section>

        {/* 3. カフェ & ピザ */}
        <section style={serviceSectionStyle}>
          <div style={textContainerStyle}>
            <h2 style={serviceTitleStyle}>03. Cece Cafe & Dining</h2>
            <p style={serviceDescriptionStyle}>
              長年の経験を持つシェフによる、本格的な日本食とこだわりのコーヒーを提供しています。
              緑に囲まれた空間で、特別なひとときをお過ごしいただけます。
            </p>
          </div>
          <div style={{ ...imagePlaceholderStyle, position: 'relative', overflow: 'hidden' }}>
            <Image
              src="/service/cafe.webp"
              alt="Cece Cafe"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </section>

      </div>
    </div>
  )
}

// スタイル定義
const serviceSectionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '40px',
  flexWrap: 'wrap' as 'wrap',
};

const textContainerStyle: React.CSSProperties = {
  flex: '1',
  minWidth: '300px',
};

const serviceTitleStyle: React.CSSProperties = {
  fontSize: '1.8rem',
  color: '#333',
  borderBottom: '2px solid #2d5a27',
  display: 'inline-block',
  marginBottom: '20px',
};

const serviceDescriptionStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#444',
  lineHeight: '1.8',
};

const imagePlaceholderStyle: React.CSSProperties = {
  flex: '1',
  minWidth: '300px',
  height: '300px',
  backgroundColor: '#f5f5f5',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
export function generateStaticParams() {
  return [{ lang: 'jp' }, { lang: 'en' }, { lang: 'th' }];
}