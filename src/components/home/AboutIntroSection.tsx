"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users, Award } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function AboutIntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for hydration and other sections (like PartnersSection) to finish mounting
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, []);
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
            pin: '.text-about',
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

        tl.fromTo(".about-image",
          { scale: 1.35, yPercent: -20 },
          { scale: 1.0, yPercent: 20, ease: "none" },
          0
        );

        tl.fromTo(".about-promise-card",
          { y: 30, opacity: 0.4 },
          { y: 0, opacity: 1, ease: "power1.out" },
          "<"
        );
      }
    });


    return () => mm.revert();
  }, { scope: containerRef });
  return (
    <section ref={containerRef} className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="text-about">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            <span className="h-1 w-1 rounded-full bg-primary" /> About Turn2Grow
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-gradient sm:text-4xl md:text-5xl">
            A small US team building <span className="text-gradient-orange">big growth engines</span>.
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            Turn2Grow is a North Carolina-based digital software agency engineering custom platforms, SaaS products, and cloud infrastructure. We pair deep technical expertise with end-to-end delivery — one accountable team, from first sketch to long-term support.
          </p>
          <p className="mt-4 text-base text-muted-foreground">We do not just write code. We build software that moves your business forward — designed for compliance, security, and scale from day one.</p>
          <div className="hidden mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: MapPin, label: "Headquartered", value: "Wilmington, NC, USA" },
              { icon: Users, label: "Serving", value: "Clients nationwide" },
              { icon: Award, label: "Posture", value: "HIPAA · SOC 2" },
            ].map((b) => (
              <div key={b.label} className="rounded-2xl border border-border/50 bg-surface/60 p-4">
                <b.icon className="h-5 w-5 text-primary" />
                <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{b.label}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{b.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              variant="orange"
              size="premium-sm"
              shape="full"
              className="group"
            >
              <Link href="/about">
                More about us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="premium-outline"
              size="premium-sm"
              shape="full"
            >
              <Link href="/contact">
                Get in touch
              </Link>
            </Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-3xl border border-border/40 shadow-elegant">
          <Image src={aboutTeam} alt="Turn2Grow team" width={1600} height={1067} placeholder="blur" className="about-image w-full object-cover h-[90vh]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-background/10 to-transparent" />
          <div className="about-promise-card absolute bottom-6 left-6 right-6 rounded-2xl border border-border/40 bg-background/70 p-4 backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">Our promise</p>
            <p className="mt-1 text-sm text-foreground">Outcomes over output. Craft over speed. And both, every sprint.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
