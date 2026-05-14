// app/[lang]/sitemap/page.tsx

export default async function SitemapPage({ params }: { params: { lang: string } }) {
  // params を受け取る（Next.js 15以降は await が必要）
  const { lang } = await params;

  const links = [
    { name: 'Top Page', href: `/${lang}` },
    { name: 'All Items (Blog)', href: `/${lang}/items` },
    { name: 'Phyto & CITES Service', href: `/${lang}/service` },
    { name: 'Privacy Policy', href: `/${lang}/privacy-policy` },
    { name: 'Contact', href: `/${lang}/contact` },
  ];

  return (
    <main style={{ maxWidth: '800px', margin: '120px auto', padding: '0 20px' }}>
      <h1>Sitemap ({lang.toUpperCase()})</h1>
      <ul style={{ lineHeight: '2.5' }}>
        {links.map((link) => (
          <li key={link.href}>
            {/* aタグではなくLinkコンポーネントを使うのがNext.js流です */}
            <a href={link.href} style={{ color: '#0070f3' }}>{link.name}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'jp' }, { lang: 'en' }, { lang: 'th' }];
}