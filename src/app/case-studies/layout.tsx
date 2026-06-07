import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Software Engineering Projects & Success | Turn2Grow",
  description: "Explore our real-world success stories. Discover how Turn2Grow builds, scales, and ships premium custom software, SaaS products, and AI systems for growing businesses.",
  keywords: [
    "software engineering case studies",
    "SaaS product development success",
    "telehealth app case study",
    "EHR modernization project",
    "cloud infrastructure migrations",
    "custom software development success"
  ],
  alternates: {
    canonical: "https://turn2grow.com/case-studies",
  },
  openGraph: {
    title: "Case Studies | Software Engineering Projects & Success | Turn2Grow",
    description: "Explore our real-world success stories. Discover how Turn2Grow builds, scales, and ships premium custom software, SaaS products, and AI systems for growing businesses.",
    url: "https://turn2grow.com/case-studies",
    siteName: "Turn2Grow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Case Studies — Turn2Grow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Software Engineering Projects & Success | Turn2Grow",
    description: "Explore our real-world success stories. Discover how Turn2Grow builds, scales, and ships premium custom software, SaaS products, and AI systems for growing businesses.",
    images: ["/og-image.png"],
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
