import React from 'react';
import { Phone, MapPin, Coffee, Utensils } from 'lucide-react';

export default function PizzaPage() {
  return (
    <div style={{ backgroundColor: '#fff', color: '#333', minHeight: '100vh', fontFamily: 'serif' }}>
      
      {/* ヒーローセクション：シズル感重視 */}
      <section style={heroStyle}>
        <div style={heroOverlayStyle}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>Cece Pizza</h1>
          <p style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>Homemade Roma Tomato Sauce & Fresh Garden Herbs</p>
        </div>
      </section>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
        
        {/* 私たちのこだわり（ストーリー） */}
        <section style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={sectionHeadingStyle}>The Farm-to-Table Pizza</h2>
          <p style={{ lineHeight: '1.8', color: '#555' }}>
            チェンマイ産の豊かな食材と、私たちの農園で育てたハーブ。
            じっくり煮込んだ自家製ローマトマトソースと、摘みたてのオレガノ、ローズマリーが香る
            「ここだけにしかない」ピザをお楽しみください。
          </p>
        </section>

        {/* メニューセクション */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={sectionHeadingStyle}>Pizza Menu</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <MenuItem name="Margherita" price="199B" description="Homemade Roma tomato sauce, fresh mozzarella, and our garden basil." />
            <MenuItem name="Garden Herb & Garlic" price="220B" description="A fragrant mix of rosemary, oregano, and roasted garlic from Cece Farm." />
            <MenuItem name="Spicy Salami & Chili" price="250B" description="Bold flavors with local Thai chilies and premium salami." />
          </div>
        </section>

        {/* サイドメニュー：コーヒー */}
        <section style={{ padding: '40px', backgroundColor: '#f9f6f2', borderRadius: '20px', marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <Coffee color="#6f4e37" />
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Chiang Mai Coffee</h2>
          </div>
          <p style={{ color: '#555' }}>ピザの後に、地元チェンマイで焙煎された深いコクのコーヒーをどうぞ。</p>
        </section>

        {/* 即時アクションボタン：スマホで見ている近所の方用 */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <a href="tel:あなたの番号" style={ctaButtonStyle('#2d5a27')}>
            <Phone size={20} /> Call to Order
          </a>
          <a href="/shop" style={ctaButtonStyle('#555')}>
            <MapPin size={20} /> View Map
          </a>
        </div>
      </div>
    </div>
  );
}

// 小部品：メニューアイテム
const MenuItem = ({ name, price, description }: { name: string, price: string, description: string }) => (
  <div style={{ borderBottom: '1px dashed #ccc', paddingBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    <div style={{ flex: 1 }}>
      <h3 style={{ margin: '0 0 5px 0', fontSize: '1.3rem' }}>{name}</h3>
      <p style={{ margin: 0, color: '#777', fontSize: '0.9rem' }}>{description}</p>
    </div>
    <span style={{ fontWeight: 'bold', fontSize: '1.2rem', marginLeft: '20px' }}>{price}</span>
  </div>
);

// スタイル
const heroStyle: React.CSSProperties = {
  height: '60vh',
  backgroundImage: 'url("https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop")', // 暫定のピザ画像
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff'
};

const heroOverlayStyle: React.CSSProperties = {
  backgroundColor: 'rgba(0,0,0,0.4)',
  padding: '40px',
  textAlign: 'center',
  borderRadius: '10px',
  backdropFilter: 'blur(4px)'
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: '2rem',
  textAlign: 'center',
  marginBottom: '40px',
  borderBottom: '2px solid #2d5a27',
  display: 'inline-block',
  width: '100%',
  paddingBottom: '10px'
};

const ctaButtonStyle = (color: string): React.CSSProperties => ({
  backgroundColor: color,
  color: '#fff',
  padding: '15px 30px',
  borderRadius: '50px',
  textDecoration: 'none',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
});