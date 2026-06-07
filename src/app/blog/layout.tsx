import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Insights on Software Engineering & SaaS | Turn2Grow",
  description: "Insights, guides, and field notes on building custom software, SaaS platforms, AI systems, and cloud infrastructure.",
  keywords: [
    "software engineering blog",
    "SaaS architecture guides",
    "AI integration insights",
    "cloud devops articles",
    "custom software development blog",
    "SOC 2 compliance guides"
  ],
  alternates: {
    canonical: "https://turn2grow.com/blog",
  },
  openGraph: {
    title: "Blog | Insights on Software Engineering & SaaS | Turn2Grow",
    description: "Field notes on custom software, SaaS, AI, security, and product engineering from the Turn2Grow team.",
    url: "https://turn2grow.com/blog",
    siteName: "Turn2Grow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Turn2Grow Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Insights on Software Engineering & SaaS | Turn2Grow",
    description: "Field notes on custom software, SaaS, AI, security, and product engineering from the Turn2Grow team.",
    images: ["/og-image.png"],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
