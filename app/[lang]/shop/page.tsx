export default function ShopPage() {
  return (
    <div style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #2d5a27', paddingBottom: '10px', color: '#2d5a27' }}>Shop Information</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '40px' }}>
        
        {/* 上段：店舗詳細テキスト */}
        <section style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#333' }}>Cece Farm & Cafe</h2>
          <p style={{ color: '#666' }}>A plant‑filled café nestled in Chiang Mai’s lush nature.<br/>
 チェンマイの豊かな自然の中にある、植物に囲まれたカフェです。</p>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <tbody>
              <tr>
                <th style={tableHeaderStyle}>Opening hours 営業時間</th>
                <td style={tableDataStyle}>9:30 AM – 5:00 PM</td>
              </tr>
              <tr>
                <th style={tableHeaderStyle}>Address 住所</th>
                <td style={tableDataStyle}>THAILAND Chiang Mai 50180 Keilek Maerim 234 M.7</td>
              </tr>
              <tr>
                <th style={tableHeaderStyle}>Day Off 定休日</th>
                <td style={tableDataStyle}>open all year round なし（年中無休）</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 下段：Google Map */}
        <div style={{ height: '450px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2706.3251369021027!2d98.9488427!3d19.0128664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3fda20f94457%3A0x30420d9d34583ca!2scece%20farm!5e1!3m2!1sja!2sth!4v1776136950599!5m2!1sja!2sth" 
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

const tableHeaderStyle = {
  textAlign: 'left' as const,
  padding: '15px',
  borderBottom: '1px solid #eee',
  width: '30%',
  backgroundColor: '#f9f9f9',
  fontSize: '0.9rem'
}

const tableDataStyle = {
  padding: '15px',
  borderBottom: '1px solid #eee',
  fontSize: '0.9rem'
}

export async function generateStaticParams() {
  return [
    { lang: 'jp' },
    { lang: 'en' },
    { lang: 'th' }
  ];
}