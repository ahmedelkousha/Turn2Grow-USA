import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Custom Software, AI & Cloud Solutions | Turn2Grow",
  description: "Twelve specialized software engineering practices across Custom SaaS, AI Integration, Cloud Infrastructure, and Business Automation.",
  keywords: [
    "custom software development",
    "SaaS product development",
    "telemedicine platform",
    "EHR systems",
    "AI machine learning integration",
    "data analytics dashboards",
    "cloud infrastructure AWS",
    "cybersecurity compliance",
    "digital transformation",
    "business process automation",
    "custom CRM development"
  ],
  alternates: {
    canonical: "https://turn2grow.com/services",
  },
  openGraph: {
    title: "Services | Custom Software, AI & Cloud Solutions | Turn2Grow",
    description: "Twelve specialized software engineering practices across Custom SaaS, AI Integration, Cloud Infrastructure, and Business Automation for growing businesses.",
    url: "https://turn2grow.com/services",
    siteName: "Turn2Grow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Services — Turn2Grow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Custom Software, AI & Cloud Solutions | Turn2Grow",
    description: "Twelve specialized software engineering practices across Custom SaaS, AI Integration, Cloud Infrastructure, and Business Automation for growing businesses.",
    images: ["/og-image.png"],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
