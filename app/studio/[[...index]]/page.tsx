// app/studio/[[...index]]/page.tsx
import Studio from './Studio'

// Next.jsに「/studio は静的なページだよ」と教える設定
export const dynamic = 'force-static'

// 設定（Server）側でビルド時のパスを確定させる
export function generateStaticParams() {
  return [{ index: [] }]
}

export default function StudioPage() {
  // 上で作った Client Component を呼び出す
  return <Studio />
}