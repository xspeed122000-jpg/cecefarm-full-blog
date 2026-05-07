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
      {
        source: '/th', // 旧URL
        destination: '/', // 新しい対応ページ（とりあえずトップなど）
        permanent: true, // 301リダイレクト（評価を引き継ぐ設定）
      },
      {
        source: '/items/category/plants',
        destination: '/items',
        permanent: true,
      },
      {
        source: '/contact-us', // 旧URL
        destination: '/contact', // 新しい対応ページ（とりあえずトップなど）
        permanent: true, // 301リダイレクト（評価を引き継ぐ設定）
      },
      {
        source: '/items/page',
        destination: '/items',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;