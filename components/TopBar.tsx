import LanguageSwitcher from './LanguageSwitcher';

interface TopBarProps {
  lang: string;
  journalTranslationMap: Record<string, Record<string, string>>;
}

export default function TopBar({
  lang,
  journalTranslationMap,
}: TopBarProps) {
  return (
    <div style={{
      width: '100%',
      backgroundColor: '#1c352d',
      color: '#ffffff',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '35px',
      boxSizing: 'border-box',
      gap: '12px',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        opacity: 0.9,
      }}>
        <span style={{ fontSize: '13px' }}>🌐</span>
        <span style={{
          fontSize: '11px',
          letterSpacing: '0.05em',
          fontWeight: 'bold',
        }}>
          LANGUAGE:
        </span>
      </div>

      <LanguageSwitcher
        lang={lang}
        journalTranslationMap={journalTranslationMap}
      />
    </div>
  );
}