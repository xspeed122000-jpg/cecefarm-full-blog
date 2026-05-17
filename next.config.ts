/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静的書き出しモード
  images: {
    unoptimized: true, // 静的書き出しでは画像の最適化を無効にする必要があります
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
      /* 👇 タイ語ページ新設のため、古い /th からの転送は削除（コメントアウト）します
        {
          source: '/th', 
          destination: '/', 
          permanent: true, 
        },
      */
      {
        source: '/items/category/plants',
        destination: '/items',
        permanent: true,
      },
      {
        source: '/contact-us', 
        destination: '/contact', 
        permanent: true, 
      },
      {
        source: '/items/page',
        destination: '/items',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;