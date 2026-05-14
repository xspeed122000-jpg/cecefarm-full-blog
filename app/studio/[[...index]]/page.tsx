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