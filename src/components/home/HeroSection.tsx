"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import heroBg from "@/assets/hero-bg.jpg";

type Stat = { value: number; decimals?: number; prefix?: string; suffix?: string; label: string; staticValue?: string };
const stats: Stat[] = [
  { value: 12, suffix: "+", label: "Specialized services" },
  { value: 50, suffix: "+", label: "Products shipped" },
  { value: 99.95, decimals: 2, suffix: "%", label: "Production uptime" },
  { value: 0, staticValue: "HIPAA", label: "Compliance-ready" },
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-cover bg-fixed bg-center" style={{ backgroundImage: `url(${heroBg.src})` }} aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/85 to-background" aria-hidden />
      <div className="grid-bg absolute inset-0 -z-10 opacity-30" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Delaware, USA · Serving nationwide
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mx-auto mt-6 max-w-4xl text-center text-4xl font-semibold leading-[1.05] tracking-tight text-gradient sm:text-6xl md:text-7xl">
          We engineer software that <span className="text-gradient-orange">moves businesses forward</span>.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mx-auto mt-6 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
          Custom EHR, telemedicine, SaaS, AI, and cloud platforms built around your workflows — not a template. We don&apos;t just write code; we build growth engines.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-orange px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
            Start a project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-surface">
            Explore services
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }} className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/40 bg-border/40 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface/80 p-6 text-center">
              <p className="text-2xl font-semibold text-gradient-orange sm:text-3xl">
                {s.staticValue ? s.staticValue : <AnimatedCounter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />}
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
