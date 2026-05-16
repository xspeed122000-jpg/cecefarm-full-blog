'use client'; // クライアントサイドでの動作を宣言

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
  lang: string;
}

export default function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname(); // 現在のパス（例: "/jp/items"）を取得

  // 現在のURLパスから、言語部分だけを入れ替える関数
  const getPath = (targetLang: string) => {
    if (!pathname) return `/${targetLang}`;

    const segments = pathname.split('/'); 
    // split('/') すると、"/jp/items" は ["", "jp", "items"] という配列になります。
    // そのため、segments[1] が常に言語コード（jp, en, th）になります。

    if (segments.length > 1) {
      segments[1] = targetLang; // 2番目の要素（言語）を書き換え
    } else {
      return `/${targetLang}`; // 万が一パスが "/" だけだった場合の予備
    }

    return segments.join('/'); // 配列を再びパスの形に戻す
  };

  // 共通のスタイル（高さを抑えたヘッダー用）
  const linkStyle = (isCurrent: boolean) => ({
    fontWeight: isCurrent ? 'bold' : 'normal',
    textDecoration: 'none',
    color: isCurrent ? '#fff' : '#ccc', // 現在の言語は白、他はグレー
    transition: '0.2s',
  });

  return (
    <div style={{ display: 'flex', gap: '8px', fontSize: '11px', letterSpacing: '0.05em' }}>
      <Link href={getPath('jp')} style={linkStyle(lang === 'jp')}>JP</Link>
      <span style={{ color: '#666' }}>|</span>
      <Link href={getPath('en')} style={linkStyle(lang === 'en')}>EN</Link>
      <span style={{ color: '#666' }}>|</span>
      <Link href={getPath('th')} style={linkStyle(lang === 'th')}>TH</Link>
    </div>
  );
}