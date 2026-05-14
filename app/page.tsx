// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // ブラウザの言語設定を確認（例: "ja-JP" -> "ja"）
    const userLang = navigator.language.split('-')[0];

    // 言語に合わせて自動でリダイレクト
    if (userLang === 'ja') {
      router.replace('/jp');
    } else if (userLang === 'th') {
      router.replace('/th');
    } else {
      // それ以外（英語など）はデフォルトの英語ページへ
      router.replace('/en');
    }
  }, [router]);

  // 転送されるまでの間、真っ白な画面にならないよう一瞬だけ表示される内容
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'sans-serif',
      color: '#2d5a27'
    }}>
      <p>Welcome to Cece Farm. Redirecting...</p>
    </div>
  );
}