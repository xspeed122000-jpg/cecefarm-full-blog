import { client } from "@/sanityClient";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/PortableTextComponents";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

async function getPage(lang: string) {
    const query = `
        *[
            _type == "staticPage"
            && slug.current == "terms"
            && language == $lang
        ][0] {
            title,
            body
        }
    `;

    return await client.fetch(query, { lang });
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const page = await getPage(lang);

    if (!page) {
        return {
            title: "Terms & Conditions | Cece Farm",
        };
    }

    return {
        title: `${page.title} | Cece Farm`,
    };
}

export default async function TermsPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    const page = await getPage(lang);

    if (!page) {
        notFound();
    }

    return (
        <main
            style={{
                maxWidth: "900px",
                margin: "120px auto",
                padding: "0 20px",
                fontFamily: "sans-serif",
            }}
        >
            <h1
                style={{
                    fontSize: "2.5rem",
                    color: "#2d5a27",
                    marginBottom: "40px",
                }}
            >
                {page.title}
            </h1>

            <div
                className="prose"
                style={{
                    lineHeight: "1.8",
                    color: "#333",
                    fontSize: "1rem",
                }}
            >
                <PortableText
                    value={page.body}
                    components={portableTextComponents}
                />
            </div>
        </main>
    );
}

export async function generateStaticParams() {
    return [
        { lang: "jp" },
        { lang: "en" },
    ];
}