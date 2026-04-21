import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 【ルール1】 /posts/〜 を /items/〜 に変換（二重付与を防止）
      {
        source: '/posts/:slug',
        destination: '/items/:slug',
        permanent: true,
      },
      // 【ルール2】 ドメイン直下のスラッグを /items/ に転送
      {
        // 以下の「(?! ... )」に該当するものは「絶対にリダイレクトしない」
        // - 空文字（トップページ）
        // - 固定ページ（about, pizza, contact）
        // - システム（items, studio, api, _next, static）
        // - ドットを含むファイル名（logo.png, favicon.ico, qr.webpなど全て）
        source: '/:slug((?!$|about|pizza|contact|items|studio|Service|shop|api|_next|static|favicon\\.ico|.*\\.[a-zA-Z0-9]+).+)',
        destination: '/items/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;