export default function ShopPage() {
  return (
    <div style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
      <h1 style={{ borderBottom: '2px solid #2d5a27', paddingBottom: '10px' }}>店舗情報</h1>
      
      <section style={{ marginTop: '40px' }}>
        <h2>Cece Farm & Cafe</h2>
        <p>チェンマイの豊かな自然の中にある、植物に囲まれたカフェです。</p>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <tbody>
            <tr>
              <th style={tableHeaderStyle}>営業時間</th>
              <td style={tableDataStyle}>9:00 - 18:00（火曜定休）</td>
            </tr>
            <tr>
              <th style={tableHeaderStyle}>住所</th>
              <td style={tableDataStyle}>Chiang Mai, Thailand...（詳しい住所をここに）</td>
            </tr>
            <tr>
              <th style={tableHeaderStyle}>サービス</th>
              <td style={tableDataStyle}>観葉植物の販売、カフェ、輸出相談</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

const tableHeaderStyle = {
  textAlign: 'left' as const,
  padding: '15px',
  borderBottom: '1px solid #eee',
  width: '30%',
  backgroundColor: '#f9f9f9'
}

const tableDataStyle = {
  padding: '15px',
  borderBottom: '1px solid #eee'
}