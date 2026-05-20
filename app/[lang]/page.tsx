import Link from 'next/link';
import Image from 'next/image';
import { createClient } from 'next-sanity';

export const dynamicParams = false; // 指定した言語（jp, en, th）以外は受け付けない設定

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

// 静的テキストデータにお問い合わせボタンの文字を追加
const infoText: Record<string, { title: string; desc: string; hoursLabel: string; hoursValue: string; addressLabel: string; addressValue: string; buttonText: string; contactButtonText: string }> = {
  jp: {
    title: "農園とカフェへのアクセス",
    desc: "チェンマイ・メーリムの豊かな自然に囲まれた Cece Farm & Cafe では、大切に育てられた希少な熱帯植物（レアプランツ）の鑑賞・購入と、プロの職人が焼き上げる本格ピザ、厳選されたオーガニックコーヒーをゆったりとお楽しみいただけます。",
    hoursLabel: "⏰ 営業時間",
    hoursValue: "9:00 - 17:00 （定休日: 水曜日）",
    addressLabel: "📍 住所",
    addressValue: "タイ チェンマイ県 メーリム区 キレック (Ki Lek, Mae Rim, Chiang Mai)",
    buttonText: "🗺️ Google マップで場所を見る",
    contactButtonText: "📩 お問い合わせはこちら"
  },
  en: {
    title: "VISIT CECE FARM & CAFE",
    desc: "Surrounded by the lush nature of Mae Rim, Chiang Mai, Cece Farm & Cafe offers a unique relaxing space where you can browse our rare exotic plants while enjoying authentic chef-crafted pizzas and premium organic coffee.",
    hoursLabel: "⏰ Opening Hours",
    hoursValue: "9:00 AM - 5:00 PM (Closed on Wednesdays)",
    addressLabel: "📍 Address",
    addressValue: "Ki Lek, Mae Rim District, Chiang Mai, Thailand",
    buttonText: "🗺️ Open Google Maps",
    contactButtonText: "📩 Contact Us"
  },
  th: {
    title: "เยี่ยมชม CECE FARM & CAFE",
    desc: "ล้อมรอบด้วยธรรมชาติอันร่มรื่นของแม่ริม เชียงใหม่ Cece Farm & Cafe พร้อมต้อนรับทุกท่านด้วยต้นไม้หายากที่พวกเราตั้งใจดูแล พร้อมเสิร์ฟพิซซ่าแสนอร่อยโดยเชฟมืออาชีพและกาแฟออร์แกนิกคัดสรรพิเศษในบรรยากาศผ่อนคลาย",
    hoursLabel: "⏰ เวลาทำการ",
    hoursValue: "09:00 น. - 17:00 น. (ปิดวันพุธ)",
    addressLabel: "📍 ที่อยู่",
    addressValue: "ขี้เหล็ก, อำเภอแม่ริม, เชียงใหม่, ประเทศไทย",
    buttonText: "🗺️ เปิด Google Maps",
    contactButtonText: "📩 ติดต่อเรา"
  }
};

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

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const currentInfo = infoText[lang] || infoText['en'];

  return (
    <main>
      {/* 1. Our Services セクション */}
      <section style={{ padding: '20px 20px 80px 20px', backgroundColor: '#fff' }}>
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

      {/* 2. Visit Cece Farm & Cafe セクション */}
      <section style={{ padding: '80px 20px', backgroundColor: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          
          <h2 style={{ fontSize: '1.8rem', letterSpacing: '0.15em', fontWeight: 'bold', color: '#333', marginBottom: '30px' }}>
            {currentInfo.title}
          </h2>

          <div style={{ position: 'relative', width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden', marginBottom: '40px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <Image src="/home/home_service_03.webp" alt="Cece Farm and Cafe" fill style={{ objectFit: 'cover' }} />
          </div>

          <p style={{ fontSize: '1rem', lineHeight: '1.9', color: '#555', marginBottom: '40px', textAlign: 'left', whiteSpace: 'pre-wrap', maxWidth: '700px', margin: '0 auto 40px auto' }}>
            {currentInfo.desc}
          </p>

          <div style={{ display: 'block', textAlign: 'left', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #eee', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ display: 'block', color: '#333', marginBottom: '5px', fontSize: '0.9rem' }}>{currentInfo.hoursLabel}</strong>
              <span style={{ color: '#666', fontSize: '1rem' }}>{currentInfo.hoursValue}</span>
            </div>
            <div>
              <strong style={{ display: 'block', color: '#333', marginBottom: '5px', fontSize: '0.9rem' }}>{currentInfo.addressLabel}</strong>
              <span style={{ color: '#666', fontSize: '1rem' }}>{currentInfo.addressValue}</span>
            </div>
          </div>

          {/* ボタン配置エリア（縦並びでスマートに配置） */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            
            {/* Googleマップボタン（ボタニカルグリーン・主ボタン） */}
            <a 
              href="https://maps.google.com/?q=Cece+Farm+Chiang+Mai" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-block', 
                backgroundColor: '#2C3E35', 
                color: '#fff', 
                padding: '15px 45px', 
                borderRadius: '30px', 
                textDecoration: 'none', 
                fontWeight: 'bold', 
                fontSize: '1rem',
                boxShadow: '0 4px 10px rgba(44,62,53,0.2)',
                width: '100%',
                maxWidth: '320px'
              }}
            >
              {currentInfo.buttonText}
            </a>

            {/* 新設: お問い合わせボタン（ホワイト背景にグリーン枠・副ボタン） */}
            <Link
              href={`/${lang}/contact`}
              style={{ 
                display: 'inline-block', 
                backgroundColor: '#fff', 
                color: '#2C3E35', 
                padding: '13px 45px', 
                borderRadius: '30px', 
                textDecoration: 'none', 
                fontWeight: 'bold', 
                fontSize: '0.95rem',
                border: '2px solid #2C3E35',
                boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                width: '100%',
                maxWidth: '320px',
                boxSizing: 'border-box'
              }}
            >
              {currentInfo.contactButtonText}
            </Link>

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

export function generateStaticParams() {
  return [{ lang: 'jp' }, { lang: 'en' }, { lang: 'th' }];
}