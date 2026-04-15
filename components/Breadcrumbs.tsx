import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react'; // アイコンを使うと綺麗です

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center', fontSize: '0.85rem' }}>
        {/* Homeは固定で表示 */}
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={linkStyle}>Home</Link>
          <ChevronRight size={14} style={separatorStyle} />
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
              {isLast || !item.href ? (
                <span style={{ color: '#333', fontWeight: '600' }}>{item.label}</span>
              ) : (
                <>
                  <Link href={item.href} style={linkStyle}>{item.label}</Link>
                  <ChevronRight size={14} style={separatorStyle} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const linkStyle = {
  color: '#888',
  textDecoration: 'none',
  transition: 'color 0.2s',
};

const separatorStyle = {
  margin: '0 8px',
  color: '#ccc',
};