import { HeroSection } from "@/components/home/HeroSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { AboutIntroSection } from "@/components/home/AboutIntroSection";
import { ServicesByDomainSection } from "@/components/home/ServicesByDomainSection";
import { DifferentiatorsSection } from "@/components/home/DifferentiatorsSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { EnterpriseSplitSection } from "@/components/home/EnterpriseSplitSection";
import { AiSplitSection } from "@/components/home/AiSplitSection";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { CtaSection } from "@/components/home/CtaSection";

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
