'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
  lang: string;
  journalTranslationMap: Record<string, Record<string, string>>;
}

export default function LanguageSwitcher({
  lang,
  journalTranslationMap = {},
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  const getPath = (targetLang: string) => {
    if (!pathname) return `/${targetLang}`;

    // Journalの個別記事かどうかを確認
    const segments = pathname.split('/').filter(Boolean);

    const isJournalArticle =
      segments.length === 3 &&
      segments[1] === 'journal';

    if (isJournalArticle) {
      // Sanityで関連付けた翻訳記事のURLを取得
      const translations = journalTranslationMap[pathname];

      if (translations?.[targetLang]) {
        return translations[targetLang];
      }

      // 翻訳記事が存在しない場合はJournal一覧へ
      return `/${targetLang}/journal`;
    }

    // Journal以外のページは従来の言語切り替えを維持
    const newSegments = pathname.split('/');

    if (newSegments.length > 1) {
      newSegments[1] = targetLang;
    } else {
      return `/${targetLang}`;
    }

    return newSegments.join('/');
  };

  const linkStyle = (isCurrent: boolean) => ({
    fontWeight: isCurrent ? 'bold' : 'normal',
    textDecoration: 'none',
    color: isCurrent ? '#fff' : '#ccc',
    transition: '0.2s',
  });

  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        fontSize: '11px',
        letterSpacing: '0.05em',
      }}
    >
      <Link
        href={getPath('jp')}
        style={linkStyle(lang === 'jp')}
      >
        JP
      </Link>

      <span style={{ color: '#666' }}>|</span>

      <Link
        href={getPath('en')}
        style={linkStyle(lang === 'en')}
      >
        EN
      </Link>

      <span style={{ color: '#666' }}>|</span>

      <Link
        href={getPath('th')}
        style={linkStyle(lang === 'th')}
      >
        TH
      </Link>
    </div>
  );
}