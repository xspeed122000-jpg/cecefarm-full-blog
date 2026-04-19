'use client'

import { NextStudio } from 'next-sanity/studio'
// ここで sanity.config.ts を読み込みます。パス（../）の数はフォルダの深さに合わせます。
import config from '../../../sanity.config'

export default function StudioPage() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <NextStudio config={config} />
    </div>
  )
}