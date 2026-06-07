import type { Metadata } from "next";
import { blogPosts } from "@/lib/site-data";
import { BlogPostClient } from "./client-page";

export async function generateStaticParams() {
  // Return just the local seeds. Firebase posts will be rendered dynamically (or caught by the client component).
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = blogPosts.find((post) => post.slug === slug);

  // Capitalize slug words for a clean fallback title if the post is dynamically loaded on the client side
  const fallbackTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const title = p ? `${p.title} — Turn2Grow Blog` : `${fallbackTitle} — Turn2Grow Blog`;
  const description = p ? p.excerpt : `Read our latest article, "${fallbackTitle}", and discover more insights on custom software, SaaS, AI, and product engineering from Turn2Grow.`;
  const imageUrl = p?.imageUrl || "/og-image.png";
  const keywords = p ? [p.category, "blog", "software development", "turn2grow"] : ["blog", "software development", "turn2grow", fallbackTitle.toLowerCase()];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://turn2grow.com/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://turn2grow.com/blog/${slug}`,
      siteName: "Turn2Grow",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seed = blogPosts.find((p) => p.slug === slug) ?? null;
  return <BlogPostClient slug={slug} seed={seed} />;
}
