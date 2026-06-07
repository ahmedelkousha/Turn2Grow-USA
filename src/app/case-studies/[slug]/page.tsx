import type { Metadata } from "next";
import { caseStudies } from "@/lib/site-data";
import { CaseStudyClient } from "./client-page";

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = caseStudies.find((c) => c.slug === slug);

  // Capitalize slug words for a clean fallback title if the case study is dynamically loaded on the client side
  const fallbackTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const title = s ? `${s.title} — Turn2Grow Case Study` : `${fallbackTitle} — Turn2Grow Case Study`;
  const description = s ? s.summary : `Read our latest case study, "${fallbackTitle}", and discover how Turn2Grow helps businesses engineer custom software solutions.`;
  const keywords = s ? [s.industry, ...s.services, "case study", "turn2grow"] : ["case study", "software engineering", "turn2grow", fallbackTitle.toLowerCase()];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://turn2grow.com/case-studies/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://turn2grow.com/case-studies/${slug}`,
      siteName: "Turn2Grow",
      type: "article",
      images: [
        {
          url: "/og-image.png",
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
      images: ["/og-image.png"],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seed = caseStudies.find((c) => c.slug === slug) ?? null;
  return <CaseStudyClient slug={slug} seed={seed} />;
}
