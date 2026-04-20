import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // 旧URL: domain.com/slug
        // (?!...) の部分は、これらで始まるURLは転送しないという「除外ルール」です
        source: '/:slug((?!items|studio|api|_next|static|favicon.ico).*)',
        
        // 新URL: domain.com/items/slug
        destination: '/items/:slug',
        
        // 恒久的な移転（301リダイレクト）としてSEO評価を引き継ぐ
        permanent: true,
      },
    ];
  },
};

export default nextConfig;