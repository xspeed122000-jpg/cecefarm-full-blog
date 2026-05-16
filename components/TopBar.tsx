import LanguageSwitcher from './LanguageSwitcher';

interface TopBarProps {
  lang: string;
}

export default function TopBar({ lang }: TopBarProps) {
  return (
    <div style={{
      width: '100%',
      // 🌿 ボタニカルグリーンに変更（ベージュにするなら #f5f2eb）
      backgroundColor: '#1c352d', 
      // ✍️ 文字色を白に（ベージュにするなら #444444）
      color: '#ffffff',           
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '35px',
      boxSizing: 'border-box',
      gap: '12px',
      // 下に細いゴールドやシャドウを少し入れると、より境界が引き締まります
      borderBottom: '1px solid rgba(255,255,255,0.1)' 
    }}>
      {/* 左側：地球マークと言語切替の案内 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.9 }}>
        <span style={{ fontSize: '13px' }}>🌐</span>
        <span style={{ fontSize: '11px', letterSpacing: '0.05em', fontWeight: 'bold' }}>
          LANGUAGE:
        </span>
      </div>

      {/* 右側（と言いつつ左に並ぶ）：言語スイッチャー本体 */}
      <LanguageSwitcher lang={lang} />
    </div>
  );
}