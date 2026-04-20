import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ルール①：旧URLに /posts/ が含まれていた場合の修正
      // 例: /posts/welcome-to-cece-farm -> /items/welcome-to-cece-farm
      {
        source: '/posts/:slug',
        destination: '/items/:slug',
        permanent: true,
      },
      // ルール②：ドメイン直下のスラッグを /items/ へ転送（画像や固定ページを除外）
      {
        // 以下の「(?! ... )」の中に除外ルールをまとめます
        // 1. トップページ（空）は除外
        // 2. 固定ページ（about|pizza|contact等）は除外
        // 3. システムパス（items|studio|api|_next等）は除外
        // 4. 拡張子付きのファイル（.png|.jpg|.webp|.svg等）は全て除外
        source: '/:slug((?!$|about|pizza|contact|items|studio|Service|shop|api|_next|static|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)).+)',
        destination: '/items/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;