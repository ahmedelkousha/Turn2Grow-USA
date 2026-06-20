"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import illusSecurity from "@/assets/illus-security.jpg";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function EnterpriseSplitSection() {
    const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
      const mm = gsap.matchMedia();
  
      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        const { isDesktop, isMobile } = context.conditions as any;
  
        if (isDesktop) {
          gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "top -40%",
              pinSpacing: false,
              pin: '.text-enterprise',
              markers: true,
              scrub: 1,
              invalidateOnRefresh: true
            }
          });
        }

        if (isMobile || isDesktop) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });

          tl.fromTo(".security-image",
            { scale: 1.35, yPercent: -20 },
            { scale: 1.0, yPercent: 20, ease: "none" },
            0
          );
        }
      });
  
      return () => mm.revert();
    }, { scope: containerRef });
  return (
    <section ref={containerRef} className="border-y border-border/40 bg-surface/30 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div initial={{ opacity: 0}} whileInView={{ opacity: 1}} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-enterprise">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">SaaS & Enterprise</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">Software built for high-stakes operations.</h2>
          <p className="mt-4 text-base text-muted-foreground">From custom B2B SaaS and payment reconciliation engines to secure CRM databases, we build platforms that respect complex workflows, satisfy security compliance, and run reliably at scale.</p>
          <ul className="mt-6 space-y-3">
            {[
              "SOC 2 and HIPAA compliance-ready infrastructure",
              "Secure, scalable database and api design",
              "Custom CRM, ERP, and payment automations",
              "Workflow optimization that cuts manual overhead"
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {item}</li>
            ))}
          </ul>
          <Link href="/services" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">Explore our services <ArrowRight className="h-4 w-4" /></Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-3xl border border-border/40 shadow-elegant">
          <img src={illusSecurity.src} alt="Security and compliance visualization" width={1280} height={960} loading="lazy" className="security-image h-[90vh] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
