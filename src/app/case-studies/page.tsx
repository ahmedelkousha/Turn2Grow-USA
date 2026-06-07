"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/lib/site-data";
import { PageHero } from "@/components/PageHero";
import { listCaseStudies, type AdminCaseStudy } from "@/lib/firebase-data";
import { isFirebaseConfigured } from "@/lib/firebase";

export default function CaseStudiesIndex() {
  const remote = useQuery({
    queryKey: ["public", "case_studies"],
    queryFn: listCaseStudies,
    enabled: isFirebaseConfigured,
  });

  const seed: CaseStudy[] = caseStudies;
  const remoteItems: CaseStudy[] = ((remote.data as AdminCaseStudy[] | undefined) ?? []).map((c) => ({
    slug: c.slug, client: c.client, industry: c.industry, title: c.title, summary: c.summary,
    challenge: c.challenge, solution: c.solution, results: c.results, services: c.services, duration: c.duration,
  }));
  
  const map = new Map<string, CaseStudy>();
  for (const i of seed) map.set(i.slug, i);
  for (const i of remoteItems) map.set(i.slug, i);
  const all = Array.from(map.values());

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title={<>Platforms that <span className="text-gradient-orange">moved the numbers</span>.</>}
        description="A selection of the products and platforms we've shipped — and the outcomes they unlocked."
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          {all.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link href={`/case-studies/${c.slug}`} className="group block overflow-hidden rounded-3xl border border-border/60 bg-surface transition-all hover:border-primary/40 hover:shadow-glow">
                <div className="grid gap-0 md:grid-cols-5">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-orange md:col-span-2 md:aspect-auto">
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary/10 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="rounded-full bg-background/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-foreground backdrop-blur">{c.industry}</span>
                    </div>
                  </div>
                  <div className="p-8 md:col-span-3 md:p-10">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.client}</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{c.title}</h2>
                    <p className="mt-3 text-sm text-muted-foreground sm:text-base">{c.summary}</p>
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {c.results.map((r) => (
                        <div key={r.label} className="rounded-lg border border-border/40 bg-background/30 p-3">
                          <p className="text-lg font-semibold text-gradient-orange">{r.metric}</p>
                          <p className="mt-0.5 text-[11px] text-muted-foreground">{r.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
