"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/site-data";
import { SectionHeading } from "@/components/SectionHeading";

export function CaseStudiesSection() {
  return (
    <section className="border-t border-border/40 bg-surface/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Proof, not promises" title="Recent work" description="A few of the platforms we've shipped." />
          <Link href="/case-studies" className="group inline-flex items-center gap-2 text-sm font-medium text-primary">All case studies <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {caseStudies.map((c, i) => (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}>
              <Link href={`/case-studies/${c.slug}`} className="group block h-full rounded-2xl border border-border/60 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                <p className="text-xs font-medium uppercase tracking-wider text-primary">{c.industry}</p>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {c.results.slice(0, 2).map((r) => (
                    <span key={r.label} className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground"><span className="text-primary">{r.metric}</span> · {r.label}</span>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-70 group-hover:opacity-100">Read case study <ArrowRight className="h-3.5 w-3.5" /></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
