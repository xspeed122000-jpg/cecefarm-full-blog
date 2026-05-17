// app/layout.tsx （一番外側のファイルです！）
import "./globals.css";
import Script from 'next/script'; // ★Google Analytics用の道具を読み込む

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Google Analytics の設定（あなたの測定ID: G-XXXXXXXXXX を書き換えてください） */}
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H0M06NKHPL" // ★ここに本物のIDを入れてください
          strategy="afterInteractive"
        />
        // ⭕️ 変更後（エラーが出ない安全な書き方）
<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-H0M06NKHPL'); 
    `,
  }}
/>
      </head>

      {/* 背景を白、文字を濃いグレーに固定して、ブラックアウトを防ぎます */}
      <body style={{ margin: 0, backgroundColor: '#ffffff', color: '#333333' }}>
        {children}
      </body>
    </html>
  );
}