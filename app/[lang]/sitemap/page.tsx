// app/sitemap/page.tsx
export default function SitemapPage() {
  const links = [
    { name: 'Top Page', href: '/' },
    { name: 'All Items (Blog)', href: '/items' },
    { name: 'Phyto & CITES Service', href: '/phyto_cites' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <main style={{ maxWidth: '800px', margin: '120px auto', padding: '0 20px' }}>
      <h1>Sitemap</h1>
      <ul style={{ lineHeight: '2.5' }}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} style={{ color: '#0070f3' }}>{link.name}</a>
          </li>
        ))}
      </ul>
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