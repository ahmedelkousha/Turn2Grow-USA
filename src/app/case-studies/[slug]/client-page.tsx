"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, ChevronRight, Loader2 } from "lucide-react";
import { getCaseStudyBySlug } from "@/lib/firebase-data";
import { isFirebaseConfigured } from "@/lib/firebase";
import { type CaseStudy } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

export function CaseStudyClient({ slug, seed }: { slug: string; seed: CaseStudy | null }) {
  const remote = useQuery({
    queryKey: ["public", "case_study", slug],
    queryFn: () => getCaseStudyBySlug(slug),
    enabled: isFirebaseConfigured && !seed,
  });

  if (!seed && remote.isLoading) {
    return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }
  
  const study = seed ?? remote.data ?? null;
  
  if (!study) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="text-3xl font-semibold">Case study not found</h1>
        <Link href="/case-studies" className="mt-6 inline-block text-primary hover:underline">Back to case studies</Link>
      </div>
    );
  }

  return (
    <>
      <header className="relative overflow-hidden border-b border-border/40 bg-hero">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/case-studies" className="hover:text-foreground">Case Studies</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate text-foreground">{study.client}</span>
          </nav>
          <span className="text-xs font-medium uppercase tracking-wider text-primary">{study.industry} · {study.client}</span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-gradient sm:text-5xl"
          >{study.title}</motion.h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{study.summary}</p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border/40 bg-border/40 sm:grid-cols-4">
            {study.results.map((r: { metric: string; label: string }) => (
              <div key={r.label} className="bg-surface/80 p-5">
                <p className="text-2xl font-semibold text-gradient-orange sm:text-3xl">{r.metric}</p>
                <p className="mt-1 text-xs text-muted-foreground">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="py-20">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 sm:px-6 md:grid-cols-3 md:gap-16">
          <aside>
            <div className="rounded-2xl border border-border/40 bg-surface/40 p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Duration</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{study.duration}</p>
              <div className="mt-5 border-t border-border/40 pt-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Services</p>
                <ul className="mt-2 space-y-1.5">
                  {study.services.map((s: string) => (<li key={s} className="text-sm text-foreground">{s}</li>))}
                </ul>
              </div>
            </div>
          </aside>
          <div className="md:col-span-2 space-y-10">
            <div>
              <h2 className="text-xs font-medium uppercase tracking-wider text-primary">The challenge</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{study.challenge}</p>
            </div>
            <div>
              <h2 className="text-xs font-medium uppercase tracking-wider text-primary">Our solution</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{study.solution}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> All case studies
          </Link>
          <Button asChild variant="orange" size="premium-sm" shape="full">
            <Link href="/contact">
              Start a similar project <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
