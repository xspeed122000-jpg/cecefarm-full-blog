'use client'; // ★ブラウザ側で動かす宣言

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 画面が300px以上下にスクロールされたらボタンを表示する
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showScrollTop) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '30px',     // 画面の右下から30px上
        right: '30px',      // 画面の右下から30px左
        backgroundColor: '#1c352d', // ★トップバーとお揃いのボタニカルグリーン
        color: '#ffffff',
        border: 'none',
        borderRadius: '50%', // 綺麗な丸ボタンにします
        width: '45px',
        height: '45px',
        cursor: 'pointer',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)', // 少し影をつけて浮かせる
        zIndex: 9999, // 何があっても一番上に表示
        transition: '0.3s',
      }}
    >
      ▲
    </button>
  );
}