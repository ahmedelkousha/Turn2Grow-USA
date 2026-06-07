"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { servicesGroupedByDomain } from "@/lib/site-data";
import { SectionHeading } from "@/components/SectionHeading";

export function ServicesByDomainSection() {
  return (
    <section className="relative border-y border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="What we build" title="Four practice areas. One accountable team." description="Twelve specialized services grouped across the four domains where we go deep — healthcare, intelligence, infrastructure, and custom software." />
          <Link href="/services" className="group inline-flex items-center gap-2 text-sm font-medium text-primary">
            All services <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="mt-14 space-y-12">
          {servicesGroupedByDomain().map((group, gi) => (
            <motion.div key={group.domain} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: gi * 0.05 }}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-2xl font-semibold tracking-tight text-gradient-orange">{group.domain}</h3>
                <p className="text-sm text-muted-foreground sm:max-w-md sm:text-right">{group.tagline}</p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.services.map((s, i) => (
                  <motion.div key={s.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: i * 0.04 }}>
                    <Link href={`/services/${s.slug}`} className="group relative block h-full overflow-hidden rounded-2xl border border-border/60 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <s.icon className="h-5 w-5" />
                      </div>
                      <h4 className="mt-5 text-base font-semibold text-foreground">{s.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                      <div className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-70 transition-opacity group-hover:opacity-100">
                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
