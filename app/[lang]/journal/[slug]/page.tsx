import { client } from "@/sanityClient";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";
import InstagramEmbed from "@/components/InstagramEmbed";
import Breadcrumbs from "@/components/Breadcrumbs";
import { portableTextComponents } from "@/components/PortableTextComponents";
import ServiceCTA from '@/components/ServiceCTA';

export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
    const { lang, slug } = await params;

    const post = await client.fetch(
        `
      *[
        _type == "post"
        && contentType == "journal"
        && slug.current == $slug
        && language == $lang
      ][0] {
        title,
        seoTitle,
        description
      }
    `,
        { slug, lang }
    );

    if (!post) {
        return {
            title: "Not Found | Cece Farm",
        };
    }

    const displayTitle = post.seoTitle || post.title;
    const baseUrl = "https://cecefarm.com";

    return {
        title: displayTitle,
        description:
            post.description ||
            `Cece Farm Journal | ${displayTitle}`,
        alternates: {
            canonical: `${baseUrl}/${lang}/journal/${slug}`,
        }, 
    };
}

export default async function JournalPostPage({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang, slug } = await params;

    const post = await client.fetch(
        `
    *[
      _type == "post"
      && contentType == "journal"
      && slug.current == $slug
      && language == $lang
    ][0] {
      title,
      publishedAt,
      body,
      insta_url,
      "imageUrl": mainImage.asset->url,
      "gallery_images": gallery_images[].asset->url,

      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      },

      "relatedItems": relatedItems[]->{
  _id,
  title,
  "slug": slug.current,
  "imageUrl": mainImage.asset->url
},
ctaLinks
    }
  `,
        { slug, lang }
    );

    if (!post) return notFound();

    return (
        <main
            style={{
                padding: "40px 20px",
                maxWidth: "800px",
                margin: "80px auto",
                fontFamily: "sans-serif",
            }}
        >
            <Breadcrumbs
                items={[
                    {
                        label: "Journal",
                        href: `/${lang}/journal`,
                    },
                    {
                        label: post.title,
                    },
                ]}
            />

            {post.categories?.length > 0 && (
                <div
                    style={{
                        marginTop: "25px",
                        color: "#668063",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                    }}
                >
                    {post.categories
                        .map((category: any) => category.title)
                        .join(" / ")}
                </div>
            )}

            <h1
                style={{
                    fontSize: "2.5rem",
                    lineHeight: 1.35,
                    color: "#2d5a27",
                    marginTop: "12px",
                }}
            >
                {post.title}
            </h1>

            {post.publishedAt && (
                <time
                    style={{
                        display: "block",
                        marginTop: "12px",
                        color: "#888",
                        fontSize: "0.9rem",
                    }}
                >
                    {new Date(post.publishedAt).toLocaleDateString(
                        lang === "jp"
                            ? "ja-JP"
                            : lang === "th"
                                ? "th-TH"
                                : "en-US"
                    )}
                </time>
            )}

            {post.imageUrl && (
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    style={{
                        width: "100%",
                        borderRadius: "20px",
                        margin: "30px 0",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    }}
                />
            )}

            {post.body && (
                <div
                    className="prose"
                    style={{
                        lineHeight: "1.8",
                        color: "#333",
                        margin: "40px 0",
                        fontSize: "1.1rem",
                    }}
                >
                    <PortableText
                        value={post.body}
                        components={portableTextComponents}
                    />
                </div>
            )}

            {post.insta_url && (
                <div style={{ margin: "50px 0" }}>
                    <InstagramEmbed url={post.insta_url} />
                </div>
            )}

            {post.gallery_images?.length > 0 && (
                <div style={{ margin: "60px 0" }}>
                    <h2
                        style={{
                            borderLeft: "4px solid #2d5a27",
                            paddingLeft: "10px",
                            marginBottom: "20px",
                        }}
                    >
                        Photo Gallery
                    </h2>

                    <ImageGallery images={post.gallery_images} />
                </div>
            )}

            {post.relatedItems?.length > 0 && (
                <section
                    style={{
                        margin: "70px 0 50px",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "1.8rem",
                            borderLeft: "5px solid #2d5a27",
                            paddingLeft: "15px",
                            marginBottom: "30px",
                            color: "#2C3E35",
                        }}
                    >
                        {lang === "jp"
                            ? "関連する植物"
                            : lang === "th"
                                ? "พืชที่เกี่ยวข้อง"
                                : "Related Plants"}
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "25px",
                        }}
                    >
                        {post.relatedItems.map((item: any) => (
                            <Link
                                href={`/${lang}/items/${item.slug}`}
                                key={item._id}
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
                                        backgroundColor: "#fff",
                                        height: "100%",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "240px",
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
                                        <h3
                                            style={{
                                                margin: 0,
                                                fontSize: "1.1rem",
                                                color: "#2C3E35",
                                            }}
                                        >
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            <div
                style={{
                    marginTop: "60px",
                    paddingTop: "30px",
                    borderTop: "1px solid #ddd",
                }}
            >
                <ServiceCTA lang={lang} ctaLinks={post.ctaLinks} />

                <Link
                    href={`/${lang}/journal`}
                    style={{
                        color: "#2d5a27",
                        textDecoration: "none",
                        fontWeight: 600,
                    }}
                >
                    ← Journal
                </Link>
            </div>
        </main>
    );
}

export async function generateStaticParams() {
    const posts = await client.fetch(`
    *[
      _type == "post"
      && contentType == "journal"
      && defined(slug.current)
      && language in ["jp", "en", "th"]
    ] {
      "slug": slug.current,
      language
    }
  `);

    return posts.map((post: any) => ({
        lang: post.language,
        slug: post.slug,
    }));
}