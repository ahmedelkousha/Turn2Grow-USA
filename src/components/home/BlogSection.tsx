"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, Clock, ArrowRight, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/site-data";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function BlogSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: 1 | -1) => { const el = scrollRef.current; if (!el) return; el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" }); };
  return (
    <section className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="From the blog" title="Field notes from the build floor" description="What we have learned building SaaS platforms, complex workflows, and enterprise software in the real world." />
          <div className="flex items-center gap-3">
            <div className="hidden gap-2 sm:flex">
              <Button variant="premium-icon" size="premium-icon" shape="full" onClick={() => scrollBy(-1)} aria-label="Scroll blog left"><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="premium-icon" size="premium-icon" shape="full" onClick={() => scrollBy(1)} aria-label="Scroll blog right"><ChevronRight className="h-4 w-4" /></Button>
            </div>
            <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-medium text-primary">All articles <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
          </div>
        </div>
        <div className="relative mt-12">
          <div ref={scrollRef} className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8">
            {blogPosts.map((post, i) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: i * 0.05 }} className="snap-start shrink-0 basis-[85%] sm:basis-[55%] lg:basis-[32%]">
                <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface transition-all hover:border-primary/40 hover:shadow-glow">
                  {post.imageUrl && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">{post.category}</p>
                    <h3 className="mt-3 text-lg font-semibold text-foreground">{post.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-4">{post.excerpt}</p>
                    <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-80 group-hover:opacity-100">Read article <ArrowRight className="h-3.5 w-3.5" /></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-background to-transparent sm:block" />
        </div>
      </div>
    </section>
  );
}
