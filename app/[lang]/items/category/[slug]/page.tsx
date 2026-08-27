import { client } from "@/sanityClient";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  const category = await client.fetch(
    `
      *[_type == "category" && slug.current == $slug][0] {
        title,
        description
      }
    `,
    { slug }
  );

  if (!category) {
    return {
      title: "Category Not Found | Cece Farm",
    };
  }

  return {
    title: `${category.title} | Cece Farm`,
    description:
      category.description ||
      `${category.title} collection at Cece Farm.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  const category = await client.fetch(
    `
      *[_type == "category" && slug.current == $slug][0] {
        _id,
        title,
        description
      }
    `,
    { slug }
  );

  if (!category) {
    return notFound();
  }

  const items = await client.fetch(
    `
      *[
        _type == "post"
        && language == $lang
        && $categoryId in categories[]._ref
      ] | order(publishedAt desc) {
        title,
        "slug": slug.current,
        "imageUrl": mainImage.asset->url
      }
    `,
    {
      lang,
      categoryId: category._id,
    }
  );

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "120px auto",
        padding: "0 20px",
      }}
    >
      <div style={{ marginBottom: "40px" }}>
        <Link
          href={`/${lang}/items`}
          style={{
            textDecoration: "none",
            color: "#2d5a27",
            fontWeight: 600,
          }}
        >
          ← Items
        </Link>
      </div>

      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          color: "#2C3E35",
          marginBottom: "20px",
        }}
      >
        {category.title}
      </h1>

      {category.description && (
        <p
          style={{
            maxWidth: "750px",
            margin: "0 auto 50px",
            textAlign: "center",
            lineHeight: 1.8,
            color: "#555",
          }}
        >
          {category.description}
        </p>
      )}

      {items.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No items found in this category.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          {items.map((item: any) => (
            <Link
              href={`/${lang}/items/${item.slug}`}
              key={item.slug}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        color: "#ccc",
                      }}
                    >
                      No Image
                    </div>
                  )}
                </div>

                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "1.1rem",
                      color: "#2C3E35",
                    }}
                  >
                    {item.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const languages = ["jp", "en", "th"];

  const categories = await client.fetch(
    `
      *[
        _type == "category"
        && defined(slug.current)
      ] {
        "slug": slug.current
      }
    `
  );

  return languages.flatMap((lang) =>
    categories.map((category: any) => ({
      lang,
      slug: category.slug,
    }))
  );
}