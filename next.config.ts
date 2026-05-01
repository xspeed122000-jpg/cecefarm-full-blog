import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 画像の許可設定
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      // 1. 旧URLから新URL（日本語）への転送
      {
        source: '/phyto_cites',
        destination: '/jp/phyto_cites',
        permanent: false,
      },
      // 2. 旧ブログURLからの転送
      {
        source: '/posts/:slug',
        destination: '/items/:slug',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;