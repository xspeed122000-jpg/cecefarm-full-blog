import { Mail, Phone, MapPin, Clock } from 'lucide-react'; // アイコンライブラリを使用する場合（後でインストール可）

export default function ContactPage() {
  return (
    <div style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif', color: '#333' }}>
      
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#2d5a27' }}>Contact Us</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        
        {/* 左側：基本情報 */}
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginBottom: '25px', fontSize: '1.5rem' }}>Information</h2>
          
          <div style={infoItemStyle}>
            <Clock size={20} style={{ color: '#2d5a27' }} />
            <span>Open 9:30 AM – Close 8:00 PM</span>
          </div>

          <div style={infoItemStyle}>
            <MapPin size={20} style={{ color: '#2d5a27' }} />
            <span>Chiang Mai, Thailand（正確な住所をここに）</span>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '15px', color: '#666' }}>Connect with us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* WhatsApp (欧米向け) */}
              <a href="https://wa.me/あなたの番号" style={buttonStyle('#25D366')}>WhatsApp</a>
              {/* LINE (日本・タイ向け) */}
              <a href="https://line.me/ti/p/あなたのID" style={buttonStyle('#06C755')}>LINE (Japanese/Thai)</a>
              {/* Phone (タイ国内向け) */}
              <a href="tel:あなたの電話番号" style={buttonStyle('#555')}>Call Us</a>
              {/* Email */}
              <a href="mailto:your@email.com" style={buttonStyle('#eee', '#333')}>Email Support</a>
            </div>
          </div>
        </div>

        {/* 右側：Google Map 埋め込み */}
        <div style={{ height: '100%', minHeight: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=あなたのマップ埋め込みURL"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

const infoItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  marginBottom: '20px',
  fontSize: '1rem'
};

const buttonStyle = (bgColor: string, textColor: string = '#fff') => ({
  display: 'block',
  padding: '12px',
  borderRadius: '8px',
  textAlign: 'center' as const,
  textDecoration: 'none',
  backgroundColor: bgColor,
  color: textColor,
  fontWeight: 'bold',
  fontSize: '0.9rem',
  transition: 'opacity 0.2s'
});