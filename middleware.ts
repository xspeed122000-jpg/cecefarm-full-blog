import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // --- 1. 除外リスト（これらはリダイレクトしない） ---
  const excludeList = [
    '/studio',
    '/api',
    '/_next',
    '/favicon.ico',
    '/logo.png',
    '/sitemap.xml',
    '/robots.txt',
  ]

  // 静的ファイル（画像など）や除外リストに一致する場合は何もしない
  if (
    pathname.includes('.') || 
    excludeList.some(excluded => pathname.startsWith(excluded))
  ) {
    return NextResponse.next()
  }

  // --- 2. 言語コードの判定 ---
  const locales = ['/jp', '/en', '/th']
  // URLが /jp, /en, /th のいずれかで始まっているかチェック
  const hasLocale = locales.some(locale => pathname.startsWith(locale) || pathname === locale)

  // --- 3. リダイレクト処理 ---
  if (!hasLocale) {
    // 言語コードがない場合、自動的に /jp を先頭につける
    
    let newPath = pathname

    

    // 新しいURLを組み立て (例: cecefarm.com/post -> cecefarm.com/jp/post)
    const redirectUrl = new URL(
      `/jp${newPath === '/' ? '' : newPath}`, 
      request.url
    )

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // すべてのパスに適用するが、Next.js内部のファイルは除外する設定
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}