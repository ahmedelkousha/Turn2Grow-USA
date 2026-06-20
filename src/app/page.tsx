import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import { PartnersSection } from "@/components/home/PartnersSection";

// Dynamically import below-the-fold components to minimize First Load JS bundle size
const AboutIntroSection = dynamic(() =>
  import("@/components/home/AboutIntroSection").then((mod) => mod.AboutIntroSection)
);
const ServicesByDomainSection = dynamic(() =>
  import("@/components/home/ServicesByDomainSection").then((mod) => mod.ServicesByDomainSection)
);
const DifferentiatorsSection = dynamic(() =>
  import("@/components/home/DifferentiatorsSection").then((mod) => mod.DifferentiatorsSection)
);
const WhyChooseSection = dynamic(() =>
  import("@/components/home/WhyChooseSection").then((mod) => mod.WhyChooseSection)
);
const EnterpriseSplitSection = dynamic(() =>
  import("@/components/home/EnterpriseSplitSection").then((mod) => mod.EnterpriseSplitSection)
);
const AiSplitSection = dynamic(() =>
  import("@/components/home/AiSplitSection").then((mod) => mod.AiSplitSection)
);
const CaseStudiesSection = dynamic(() =>
  import("@/components/home/CaseStudiesSection").then((mod) => mod.CaseStudiesSection)
);
const TestimonialsSection = dynamic(() =>
  import("@/components/home/TestimonialsSection").then((mod) => mod.TestimonialsSection)
);
const BlogSection = dynamic(() =>
  import("@/components/home/BlogSection").then((mod) => mod.BlogSection)
);
const CtaSection = dynamic(() =>
  import("@/components/home/CtaSection").then((mod) => mod.CtaSection)
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <AboutIntroSection />
      <ServicesByDomainSection />
      <DifferentiatorsSection />
      <WhyChooseSection />
      <EnterpriseSplitSection />
      <AiSplitSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <BlogSection />
      <CtaSection />
    </>
  );
}
