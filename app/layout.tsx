import "./globals.css";
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" translate="no">
      <head>
        <meta name="google" content="notranslate" />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H0M06NKHPL"
          strategy="afterInteractive"
        />

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

      <body style={{ margin: 0, backgroundColor: '#ffffff', color: '#333333' }}>
        {children}
      </body>
    </html>
  );
}