'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function SearchBox({ query, setQuery }: SearchBoxProps) {
  return (
    <div style={{ marginBottom: '40px', position: 'relative', maxWidth: '600px', margin: '0 auto 50px' }}>
      <input 
        type="text" 
        placeholder="植物名で検索 (例: Philodendron...)" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ 
          width: '100%',
          padding: '15px 15px 15px 45px', // 左側にアイコン用のスペースを空ける
          borderRadius: '12px', 
          border: '1px solid #ddd',
          fontSize: '1rem',
          outline: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }} 
      />
      <Search 
        size={20} 
        style={{ 
          position: 'absolute', 
          left: '15px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          color: '#888' 
        }} 
      />
    </div>
  );
}