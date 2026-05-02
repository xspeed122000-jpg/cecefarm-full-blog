'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ItemsListClient({ initialItems }: { initialItems: any[] }) {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || ''; // URLから検索ワードを取得

    // ★ 修正箇所：検索ワードが空（''）の時は、空っぽにするのではなく「全件（initialItems）」を表示する！
    const filteredItems = query === ''
        ? initialItems
        : initialItems.filter((item) => {
            const searchTerm = query.toLowerCase();
            const title = (item.title || '').toLowerCase();
            const titleEn = (item.titleEn || '').toLowerCase();
            const titleTh = (item.titleTh || '').toLowerCase();

            return (
                title.includes(searchTerm) ||
                titleEn.includes(searchTerm) ||
                titleTh.includes(searchTerm)
            );
        });

    return (
        <div>
            {/* ↓ 前回追加した「検索ワードが空の場合のメッセージ」は削除してOKです */}

            <div style={gridStyle}>
                {/* マップ処理はそのまま */}
                {filteredItems.map((item: any) => (
                    <Link key={item.slug} href={`/items/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={cardStyle}>
                            {/* カードの中身（画像やタイトルの表示）はそのまま */}
                            <div style={imageWrapperStyle}>
                                {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={imageStyle} />}
                            </div>
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{item.title}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <p style={{ textAlign: 'center', marginTop: '50px', color: '#999' }}>
                    "{query}" に一致する植物は見つかりませんでした。
                </p>
            )}
        </div>
    );
}

const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' };
const cardStyle: React.CSSProperties = { backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eee' };
const imageWrapperStyle: React.CSSProperties = { width: '100%', height: '250px', backgroundColor: '#f0f0f0', overflow: 'hidden' };
const imageStyle: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover' };