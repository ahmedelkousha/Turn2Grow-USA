import { MetadataRoute } from 'next';
import { services, blogPosts, caseStudies } from "@/lib/site-data";

const BASE_URL = "https://turn2grow.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/case-studies`, changeFrequency: "monthly", priority: 0.8 },
    ...services.map((s) => ({ url: `${BASE_URL}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...blogPosts.map((p) => ({ url: `${BASE_URL}/blog/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...caseStudies.map((c) => ({ url: `${BASE_URL}/case-studies/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
