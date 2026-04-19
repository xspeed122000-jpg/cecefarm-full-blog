// components/InstagramEmbed.tsx
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    // 埋め込み後にインスタのスクリプトを再実行させる
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ width: '100%', maxWidth: '540px', background: '#FFF', border: '0', borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px' }}
      >
      </blockquote>
      <Script src="https://www.instagram.com/embed.js" />
    </div>
  );
}