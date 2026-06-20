"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { HeroDashboardMockup } from "@/components/home/HeroDashboardMockup";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Stat = { value: number; decimals?: number; prefix?: string; suffix?: string; label: string; staticValue?: string };
const stats: Stat[] = [
  { value: 12, suffix: "+", label: "Specialized services" },
  { value: 50, suffix: "+", label: "Products shipped" },
  { value: 99.95, decimals: 2, suffix: "%", label: "Production uptime" },
  { value: 0, staticValue: "SOC 2", label: "Compliance posture" },
];




export function HeroSection() {

  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isTablet: "(min-width: 768px) and (max-width: 1023px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isDesktop, isTablet, isMobile } = context.conditions as any;

      // Adjust parameters based on device screen size
      const scrollDistance = isDesktop ? 600 : isTablet ? 600 : 500;
      const xOffset = isDesktop ? "500px" : isTablet ? "300px" : "150px";
      const containerHeight = isDesktop ? "65vh" : isTablet ? "65vh" : "90vh";

      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          markers: true,
          end: `+=${scrollDistance}`, // Responsive scroll trigger distance
          pinSpacing: true,
          pin: containerRef.current,
          scrub: 2
        }
      });

      tl1.to(".hero-title-1", { opacity: 0, x: `-${xOffset}` }, 0);
      tl1.to(".hero-title-2", { opacity: 0, x: xOffset }, 0)
        .to(".hero-dashboard-container", { maxWidth: isDesktop ? "85vw" : isTablet ? "85vw" : "98vw", y: isDesktop ? "-150px" : isTablet ? "-160px" : "-100px" }, 0)
        .fromTo(".mockup-chart-line", { strokeDashoffset: 400 }, { strokeDashoffset: 0, ease: "power2.inOut" }, "<")
        .fromTo(".mockup-chart-area", { opacity: 0 }, { opacity: 0.8, ease: "power2.inOut" }, "<")
        .to(".hero-dashboard-container", { maxWidth: isDesktop ? "80rem" : isTablet ? "60rem" : "40rem" })
        .to(".hero-stats-container", { marginTop: '0rem' })

      // .to(".hero-dashboard-container", {scale:1.1, opacity: 0.8, y: isMobile ? "-450px" : '-200px' })
      // .to("below-code", { opacity: isMobile ? 0 : 1 })
      // .to(".hero-stats-container", { scale: 0.9, opacity: 0.9, y: isDesktop ? -300 : isTablet ? -250 : -520, ease: "power2.inOut" })

      // .to(".hero-stats-container", { opacity: 0.4 })
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="hero" ref={containerRef} className="relative isolate overflow-hidden bg-background">
      {/* Decorative Radial Glows from Coming Soon page */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-1 absolute top-[-10%] left-[5%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[130px] sm:left-[20%]" />
        <div className="glow-2 absolute bottom-[-10%] right-[5%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] sm:right-[15%]" />
      </div>

      <div className="mx-auto max-w-8xl px-4 py-18 sm:px-6 sm:py-26 lg:px-8 lg:py-24">
        {/* 3D Dashboard Mockup */}
        <div className="w-full select-none uppercase">
          <h1 className="hero-title-1 mx-auto mt-6 text-center text-[1.6rem] font-extrabold sm:font-semibold leading-[1] tracking-tight text-gradient sm:text-[2.5rem] md:text-[3.1rem] lg:text-[4.3rem] xl:text-[5.4rem] 2xl:text-[6.5rem] opacity-60">
            We engineer software that
          </h1>
          <h2 className="hero-title-2 text-gradient-orange mx-auto text-center text-[1.5rem] font-extrabold sm:font-semibold  leading-[1] tracking-tight text-gradient sm:text-[2.5rem] md:text-[3rem] lg:text-[4.3rem] xl:text-[5.4rem] 2xl:text-[6.5rem]">moves businesses forward.</h2>
          <div className="mt-10 w-full transform rotate-0 select-none">
            <HeroDashboardMockup />
          </div>
        </div>
        <div>
          {/* Badge */}
          {/* <div className="mx-auto max-w-3xl text-center">
            <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary opacity-0">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Wilmington, NC, USA · Serving nationwide
            </span>
          </div> */}

          {/* Title */}
          {/* <h1 className="hero-title mx-auto mt-6 max-w-4xl text-center text-4xl font-semibold leading-[1.05] tracking-tight text-gradient sm:text-6xl md:text-7xl opacity-0">
            We engineer software that <span className="text-gradient-orange">moves businesses forward</span>.
          </h1> */}

          {/* Description */}
          {/* <p className="hero-desc mx-auto mt-6 max-w-2xl text-center text-base text-muted-foreground sm:text-lg opacity-0">
            Custom SaaS platforms, intelligent AI integrations, cloud infrastructure, and specialty workflows built around your business — not a template. We don&apos;t just write code; we build growth engines.
          </p> */}

          {/* Buttons */}
          {/* <div className="hero-buttons mt-10 flex flex-wrap items-center justify-center gap-3 opacity-0">
            <Button
              asChild
              variant="orange"
              size="premium"
              shape="full"
              className="group"
            >
              <Link href="/contact">
                Start a project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="premium-outline"
              size="premium"
              shape="full"
            >
              <Link href="/services">
                Explore services
              </Link>
            </Button>
          </div> */}
        </div>



        {/* Stats Grid */}
        <div className="hero-stats-container mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/40 bg-border/40 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="hero-stat-card bg-surface/80 p-6 text-center">
              <p className="text-2xl font-semibold text-gradient-orange sm:text-3xl">
                {s.staticValue ? s.staticValue : <AnimatedCounter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />}
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
