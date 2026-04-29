import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server' // requestではなくserverからインポート

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // --- 1. 除外したい単語リスト ---
  // ここに含まれる言葉で始まるURLは、/items/ に転送しません
  const excludeList = [
    '/about',
    '/pizza',
    '/service',
    '/shop',
    '/contact',
    '/items',
    '/studio',
    '/api',
    '/privacy-policy', 
    '/sitemap',
    '/jp',
    '/en',
    '/th',
    '/_next',
    '/favicon.ico',
    '/logo.png',
    '/sitemap.xml',
    '/robots.txt',
  ]

  // --- 2. 判定ロジック ---
  // ルート以外、かつ除外リストにない、かつドット(.)を含まない（静的ファイルでない）場合
  const isTarget = pathname !== '/' && 
                   !excludeList.some(excluded => pathname.startsWith(excluded)) &&
                   !pathname.includes('.')

  if (isTarget) {
    // 例: /old-post-name を /items/old-post-name に転送
    const url = request.nextUrl.clone()
    url.pathname = `/items${pathname}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// ミドルウェアを適用する範囲
export const config = {
  matcher: '/:path*',
}