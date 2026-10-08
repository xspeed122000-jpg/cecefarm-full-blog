'use client';

import { useState } from 'react';
import Link from 'next/link';

type Category = {
  _id: string;
  title: string;
  slug: string;
};

type JournalPost = {
  _id: string;
  title: string;
  description?: string;
  publishedAt?: string;
  slug: string;
  imageUrl?: string;
  categories?: Category[];
};

type Props = {
  posts: JournalPost[];
  lang: string;
};

const categoryOrder = ['news', 'guide', 'farm-journal'];

const labels = {
  jp: { all: 'すべて', empty: '記事はまだありません。' },
  en: { all: 'All', empty: 'No articles yet.' },
  th: { all: 'ทั้งหมด', empty: 'ยังไม่มีบทความ' },
};

export default function JournalListClient({ posts, lang }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const t = labels[lang as keyof typeof labels] || labels.en;

  const availableCategories = Array.from(
    new Map(
      posts
        .flatMap((post) => post.categories || [])
        .filter((category) => categoryOrder.includes(category.slug))
        .map((category) => [category.slug, category])
    ).values()
  ).sort(
    (a, b) =>
      categoryOrder.indexOf(a.slug) - categoryOrder.indexOf(b.slug)
  );

  const filteredPosts =
    selectedCategory === 'all'
      ? posts
      : posts.filter((post) =>
          post.categories?.some(
            (category) => category.slug === selectedCategory
          )
        );

  return (
    <>
      {availableCategories.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '45px',
          }}
        >
          {[
            { slug: 'all', title: t.all },
            ...availableCategories,
          ].map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setSelectedCategory(category.slug)}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                border: '1px solid #d9e0dc',
                backgroundColor:
                  selectedCategory === category.slug
                    ? '#2C3E35'
                    : '#fff',
                color:
                  selectedCategory === category.slug
                    ? '#fff'
                    : '#2C3E35',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {category.title}
            </button>
          ))}
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>
          {t.empty}
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px',
          }}
        >
          {filteredPosts.map((post) => (
            <Link
              key={post._id}
              href={`/${lang}/journal/${post.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <article
                style={{
                  height: '100%',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '240px',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </div>

                <div style={{ padding: '22px' }}>
                  {post.categories && post.categories.length > 0 && (
                    <div
                      style={{
                        marginBottom: '10px',
                        fontSize: '0.85rem',
                        color: '#668063',
                        fontWeight: 600,
                      }}
                    >
                      {post.categories
                        .map((category) => category.title)
                        .join(' / ')}
                    </div>
                  )}

                  <h2
                    style={{
                      margin: '0 0 12px',
                      fontSize: '1.25rem',
                      lineHeight: 1.5,
                      color: '#2C3E35',
                    }}
                  >
                    {post.title}
                  </h2>

                  {post.publishedAt && (
                    <time
                      style={{ fontSize: '0.85rem', color: '#888' }}
                    >
                      {new Date(post.publishedAt).toLocaleDateString(
                        lang === 'jp'
                          ? 'ja-JP'
                          : lang === 'th'
                            ? 'th-TH'
                            : 'en-US'
                      )}
                    </time>
                  )}

                  {post.description && (
                    <p
                      style={{
                        marginTop: '14px',
                        marginBottom: 0,
                        lineHeight: 1.7,
                        color: '#666',
                        fontSize: '0.95rem',
                      }}
                    >
                      {post.description}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}