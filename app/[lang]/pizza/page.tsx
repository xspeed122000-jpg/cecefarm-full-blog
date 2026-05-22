// app/pizza/page.tsx （※ファイル名はご自身の環境に合わせてください）

export default function PizzaPage() {
  return (
    <main style={{
      height: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#FAF8F5' // ウォーム・アイボリーの背景色
    }}>
      <h1 style={{ fontSize: '3rem', color: '#2C3E35', marginBottom: '10px' }}>
        Cece Pizza
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#666', letterSpacing: '4px', margin: '0 0 30px 0' }}>
        COMING SOON
      </p>
      <div style={{ width: '50px', height: '2px', backgroundColor: '#333', marginBottom: '30px' }}></div>
      <p style={{ color: '#666', lineHeight: '1.6' }}>
        ขณะนี้เรากำลังเตรียมการเพื่อมอบพิซซ่าที่ดีที่สุดให้แก่คุณ <br />
        กรุณารอสักครู่จนกว่าเราจะเปิดให้บริการ<br />
        We are currently preparing to deliver the best pizza to you.<br />
        Please wait a little longer until our opening.<br />
        現在、最高のピザをお届けするための準備を進めております。<br />
        オープンまで、いましばらくお待ちください。
      </p>
    </main>
  );
}

export async function generateStaticParams() {
  return [
    { lang: 'jp' },
    { lang: 'en' },
    { lang: 'th' }
  ];
}