"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { services } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

export function ServiceDetailClient({ slug }: { slug: string }) {
  const service = services.find((s) => s.slug === slug)!;
  const Icon = service.icon;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/40 bg-hero">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-28">
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/services" className="hover:text-foreground">Services</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{service.title}</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-5"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-orange text-primary-foreground shadow-glow">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">{service.title}</p>
              <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-gradient sm:text-5xl">
                {service.hero}
              </h1>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            {service.overview}
          </motion.p>
          <div className="mt-8">
            <Button asChild variant="orange" size="premium" shape="full">
              <Link href="/contact">
                Scope this with us <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {service.imageUrl && (
        <section className="border-b border-border/40">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
            <div className="relative aspect-[21/9] overflow-hidden rounded-3xl border border-border/40 shadow-glow">
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Outcomes */}
      <section className="border-b border-border/40 bg-surface/40 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-xs font-medium uppercase tracking-wider text-primary">Outcomes we deliver</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {service.outcomes.map((o: string) => (
              <div key={o} className="flex items-start gap-3 rounded-xl border border-border/40 bg-background/40 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm text-foreground">{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">What you get</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {service.features.map((f: { title: string; description: string }, i: number) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-border/60 bg-surface p-6"
              >
                <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-border/40 bg-surface/30 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">How we work</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p: { step: string; title: string; description: string }, i: number) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative rounded-2xl border border-border/40 bg-background/50 p-6"
              >
                <span className="text-3xl font-semibold text-primary/60">{p.step}</span>
                <h3 className="mt-3 text-base font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">Frequently asked</h2>
          <div className="mt-10 space-y-3">
            {service.faq.map((f: { q: string; a: string }) => (
              <details key={f.q} className="group rounded-xl border border-border/60 bg-surface p-5 open:border-primary/40">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-foreground">
                  {f.q}
                  <ChevronRight className="h-4 w-4 text-primary transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border/40 py-20">
        <div className="absolute -bottom-20 left-1/2 h-60 w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">Let&apos;s scope your {service.title.toLowerCase()} engagement.</h2>
          <p className="mt-4 text-base text-muted-foreground">A 30-minute conversation is usually enough for us to come back with a sharp proposal.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="orange" size="premium" shape="full">
              <Link href="/contact">
                Talk to us <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="premium-outline" size="premium" shape="full">
              <Link href="/services">
                Browse all services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
