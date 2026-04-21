import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 旧URL（/posts/植物名）でアクセスしてきた人を、新URL（/items/植物名）へ飛ばす
      {
        source: '/posts/:slug',
        destination: '/items/:slug',
        permanent: true,
      },
      // ドメイン直下のアクセスを転送（ただし指定したページや画像は除外）
      {
        // 除外するもの：
        // 1. トップページ（$）
        // 2. 固定ページ（about, pizza, service, shop, contact 等）
        // 3. システム系（items, studio, api 等）
        // 4. ドットを含むファイル（.png, .webp, .ico 等すべて）
        source: '/:slug((?!$|about|pizza|service|shop|contact|items|studio|api|_next|static|favicon\\.ico|.*\\.[a-zA-Z0-9]+).+)',
        destination: '/items/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;