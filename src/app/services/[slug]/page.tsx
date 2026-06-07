import { notFound } from "next/navigation";
import { services } from "@/lib/site-data";
import { Metadata } from "next";
import { ServiceDetailClient } from "./client-page";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Not Found" };

  const serviceKeywords: Record<string, string[]> = {
    "ehr-healthcare-software": ["EHR software", "healthcare software", "electronic health records", "clinical workflows", "HIPAA compliant EHR", "specialty templates EHR"],
    "telemedicine-platforms": ["telemedicine platform", "virtual care software", "HIPAA telehealth app", "telehealth development", "clinical WebRTC", "remote patient care"],
    "medical-billing-systems": ["medical billing system", "revenue cycle management", "claims automation", "medical billing software", "RCM optimization", "clearinghouse integration"],
    "crm-development-automation": ["custom CRM development", "sales process automation", "pipeline management software", "custom CRM build", "CRM automation", "lead tracking system"],
    "custom-web-mobile-applications": ["custom web development", "custom mobile app development", "React Native developers", "Next.js web apps", "SME software solutions", "premium app engineering"],
    "saas-product-development": ["SaaS product development", "custom SaaS MVP", "multi tenant SaaS architecture", "Stripe subscription billing", "SaaS developers", "MVP build agency"],
    "ai-machine-learning-integration": ["AI integration services", "machine learning development", "LLM applications", "predictive analytics", "RAG systems", "business process AI"],
    "business-process-automation": ["business process automation", "workflow automation software", "back office automation", "process digitization", "ERP integration", "human in the loop automation"],
    "data-analytics-dashboards": ["data analytics dashboards", "custom business intelligence", "Snowflake BigQuery warehouse", "data analytics pipelines", "embedded analytics", "operational dashboards"],
    "cybersecurity-compliance": ["cybersecurity compliance", "HIPAA compliance audit", "SOC 2 Type II readiness", "zero trust architecture", "penetration testing", "secure software development"],
    "cloud-infrastructure": ["cloud infrastructure management", "AWS consulting services", "infrastructure as code", "CI CD pipelines", "cloud cost optimization", "devops engineering"],
    "digital-transformation-consulting": ["digital transformation consulting", "IT strategy roadmap", "technology consulting SMEs", "software architecture strategy", "fractional CTO services", "business digitization"]
  };

  const keywords = serviceKeywords[slug] || [];
  const imageUrl = service.imageUrl || "/og-image.png";

  return {
    title: `${service.title} | Custom Software | Turn2Grow`,
    description: service.short,
    keywords,
    alternates: {
      canonical: `https://turn2grow.com/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Custom Software | Turn2Grow`,
      description: service.short,
      url: `https://turn2grow.com/services/${slug}`,
      siteName: "Turn2Grow",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${service.title} — Turn2Grow`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Custom Software | Turn2Grow`,
      description: service.short,
      images: [imageUrl],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  
  return <ServiceDetailClient slug={slug} />;
}
