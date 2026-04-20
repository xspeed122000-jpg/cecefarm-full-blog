import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // 以下の「(?! ... )」の中に、リダイレクトさせたくないページ名を書き足します
        // トップページ、about、pizza、さらに画像ファイル（.pngなど）を除外対象にします
        source: '/:slug((?!about|pizza|contact|items|studio|services|shop|api|_next|static|favicon.ico|[a-zA-Z0-9_-]+\\.(?:png|jpg|jpeg|gif|svg)).+)',
        
        destination: '/items/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;