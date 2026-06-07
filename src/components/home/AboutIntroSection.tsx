"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users, Award } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

export function AboutIntroSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            <span className="h-1 w-1 rounded-full bg-primary" /> About Turn2Grow
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-gradient sm:text-4xl md:text-5xl">
            A small US team building <span className="text-gradient-orange">big growth engines</span>.
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            Turn2Grow is a Delaware-based digital software agency engineering custom platforms for healthcare providers and small-to-medium enterprises. We pair deep domain expertise with end-to-end delivery — one accountable team, from first sketch to long-term support.
          </p>
          <p className="mt-4 text-base text-muted-foreground">We do not just write code. We build software that moves your business forward — designed for compliance, security, and scale from day one.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: MapPin, label: "Headquartered", value: "Delaware, USA" },
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
            <Link href="/about" className="group inline-flex items-center gap-2 rounded-full bg-gradient-orange px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">
              More about us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/40">Get in touch</Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-3xl border border-border/40 shadow-elegant">
          <img src={aboutTeam.src} alt="Turn2Grow team" width={1600} height={1067} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-background/10 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-border/40 bg-background/70 p-4 backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">Our promise</p>
            <p className="mt-1 text-sm text-foreground">Outcomes over output. Craft over speed. And both, every sprint.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
