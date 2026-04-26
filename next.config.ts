/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 1. 【最優先】旧URLから、新URL（言語付き）へのリダイレクト
      // 日本語版： /phyto_cites -> /jp/phyto_cites
      {
        source: '/phyto_cites',
        destination: '/jp/phyto_cites',
        permanent: true,
      },

      // 2. 以前からの /posts/ -> /items/ の転送
      {
        source: '/posts/:slug',
        destination: '/items/:slug',
        permanent: true,
      },

      // 3. ドメイン直下のアクセス転送（除外リストを更新）
      {
        // 除外リストに jp, en, th を追加しました
        source: '/:slug((?!$|about|pizza|service|shop|contact|items|studio|api|jp|en|th|_next|static|favicon\\.ico|.*\\.[a-zA-Z0-9]+).+)',
        destination: '/items/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;