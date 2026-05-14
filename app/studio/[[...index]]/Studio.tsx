// app/studio/[[...index]]/Studio.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config' // @ を使う（もしエラーが出たら下の手順へ）

export default function Studio() {
  // ブラウザ側で管理画面を表示する役割
  return <NextStudio config={config} />
}