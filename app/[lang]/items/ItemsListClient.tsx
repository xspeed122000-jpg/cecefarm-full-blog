'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Category = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

type Item = {
  title: string;
  slug: string;
  imageUrl?: string;
  categories?: Category[];
};

export default function ItemsListClient({
  items,
  categories,
  lang,
}: {
  items: Item[];
  categories: Category[];
  lang: string;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.trim().toLowerCase() || '';

  const filteredItems =
    query === ''
      ? []
      : items.filter((item) =>
        (item.title || '').toLowerCase().includes(query)
      );

  const recentItems = items.slice(0, 12);

  const visibleCategories = categories.filter((category) =>
    items.some((item) =>
      item.categories?.some(
        (itemCategory) => itemCategory._id === category._id
      )
    )
  );

  const title =
    lang === 'th'
      ? 'คอลเลกชัน'
      : lang === 'jp'
        ? '植物コレクション'
        : 'Our Collection';

  const categoryTitle =
    lang === 'th'
      ? 'หมวดหมู่'
      : lang === 'jp'
        ? 'カテゴリー'
        : 'Categories';

  const recentTitle =
    lang === 'th'
      ? 'รายการใหม่'
      : lang === 'jp'
        ? '新着アイテム'
        : 'New Items';

  const searchTitle =
    lang === 'th'
      ? `ผลการค้นหา: ${query}`
      : lang === 'jp'
        ? `「${query}」の検索結果`
        : `Search results for "${query}"`;

  return (
    <main
      style={{
        maxWidth: '1100px',
        margin: '120px auto',
        padding: '0 20px',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '50px',
          fontSize: '2.5rem',
          color: '#2C3E35',
        }}
      >
        {title}
      </h1>

      {query !== '' ? (
        <>
          <h2
            style={{
              fontSize: '1.8rem',
              marginBottom: '30px',
              color: '#2C3E35',
            }}
          >
            {searchTitle}
          </h2>

          {filteredItems.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#777' }}>
              {lang === 'jp'
                ? '該当するアイテムはありません。'
                : lang === 'th'
                  ? 'ไม่พบรายการ'
                  : 'No items found.'}
            </p>
          ) : (
            <ItemGrid items={filteredItems} lang={lang} />
          )}
        </>
      ) : (
        <>
          <section style={{ marginBottom: '80px' }}>
            <h2
              style={{
                textAlign: 'center',
                fontSize: '1.8rem',
                marginBottom: '30px',
                color: '#2C3E35',
              }}
            >
              {categoryTitle}
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
              }}
            >
              {visibleCategories.map((category) => {
                const count = items.filter((item) =>
                  item.categories?.some(
                    (itemCategory) => itemCategory._id === category._id
                  )
                ).length;

                return (
                  <Link
                    key={category._id}
                    href={`/${lang}/items/category/${category.slug}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <div
                      style={{
                        border: '1px solid #d9e0dc',
                        borderRadius: '14px',
                        padding: '24px',
                        height: '100%',
                        backgroundColor: '#fff',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                      }}
                    >
                      <h3
                        style={{
                          margin: '0 0 10px',
                          fontSize: '1.2rem',
                          color: '#2C3E35',
                        }}
                      >
                        {category.title}
                      </h3>

                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.9rem',
                          color: '#777',
                        }}
                      >
                        {count} Items
                      </p>

                      {category.description && (
                        <p
                          style={{
                            marginTop: '15px',
                            marginBottom: 0,
                            lineHeight: 1.7,
                            color: '#555',
                            fontSize: '0.95rem',
                          }}
                        >
                          {category.description}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section>
            <h2
              style={{
                fontSize: '1.8rem',
                borderLeft: '5px solid #2d5a27',
                paddingLeft: '15px',
                marginBottom: '30px',
                color: '#2C3E35',
              }}
            >
              {recentTitle}
            </h2>

            <ItemGrid items={recentItems} lang={lang} />
          </section>
        </>
      )}
    </main>
  );
}

function ItemGrid({
  items,
  lang,
}: {
  items: Item[];
  lang: string;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '30px',
      }}
    >
      {items.map((item) => (
        <Link
          href={`/${lang}/items/${item.slug}`}
          key={item.slug}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              backgroundColor: '#fff',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '300px',
                backgroundColor: '#f9f9f9',
              }}
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: '#ccc',
                  }}
                >
                  No Image
                </div>
              )}
            </div>

            <div
              style={{
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.1rem',
                  color: '#2C3E35',
                }}
              >
                {item.title}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}