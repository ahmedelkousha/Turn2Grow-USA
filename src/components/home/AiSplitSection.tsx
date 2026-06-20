"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import illusAi from "@/assets/illus-ai.jpg";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

export function AiSplitSection() {
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
            pin: '.text-ai',
            markers: false,
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

        tl.fromTo(".ai-image",
          { scale: 1.35, yPercent: -20 },
          { scale: 1.0, yPercent: 20, ease: "none" },
          0
        );
      }
    });

    return () => mm.revert();
  }, { scope: containerRef });
  return (
    <section ref={containerRef} className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative order-2 overflow-hidden rounded-3xl border border-border/40 shadow-elegant lg:order-1">
          <Image src={illusAi} alt="AI network" width={1280} height={960} placeholder="blur" className="ai-image h-[90vh] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tl from-background/40 to-transparent" />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-ai order-1 lg:order-2">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">AI built into your stack</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">Intelligence that earns its keep.</h2>
          <p className="mt-4 text-base text-muted-foreground">We integrate LLMs, classical ML, and computer vision into the workflows where they create real economic value — never AI for AI&apos;s sake.</p>
          <Link href="/services/ai-machine-learning-integration" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">See AI services <ArrowRight className="h-4 w-4" /></Link>
        </motion.div>
      </div>
    </section>
  );
}
