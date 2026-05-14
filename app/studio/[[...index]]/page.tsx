'use client'

/**
 * このファイルは Sanity Studio（管理画面）を表示するための入り口です。
 * localhost:3000/studio にアクセスした際に実行されます。
 */

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config' // プロジェクトルートにある設定ファイルを読み込みます

export default function StudioPage() {
  return <NextStudio config={config} />
}
// app/studio/[[...index]]/page.tsx (または studio フォルダ内の page.tsx)

export function generateStaticParams() {
  // 管理画面（/studio）として、空のパスを1つだけ生成することをNext.jsに伝えます
  return [{ index: [] }];
}

// 静的書き出しモードで管理画面を動かすために、念のため追加
export const dynamic = 'force-static';