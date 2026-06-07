"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { servicesGroupedByDomain } from "@/lib/site-data";
import { PageHero } from "@/components/PageHero";

export default function ServicesIndex() {
  const groups = servicesGroupedByDomain();
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Four domains. <span className="text-gradient-orange">Twelve disciplines.</span></>}
        description="From custom SaaS platforms to AI integration, we deliver across the full software lifecycle — organized by the domains where we go deep."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
          {groups.map((group, gi) => (
            <motion.div
              key={group.domain}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: gi * 0.04 }}
            >
              <div className="flex flex-col gap-3 border-b border-border/40 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">Practice {String(gi + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">{group.domain}</h2>
                </div>
                <p className="max-w-md text-sm text-muted-foreground sm:text-right">{group.tagline}</p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.services.map((s, i) => (
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link
                      href={`/services/${s.slug}`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
                    >
                      {s.imageUrl && (
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <img
                            src={s.imageUrl}
                            alt={s.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                          <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-background/80 text-primary backdrop-blur">
                            <s.icon className="h-5 w-5" />
                          </div>
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                        <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
                        <div className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-primary">
                          Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
