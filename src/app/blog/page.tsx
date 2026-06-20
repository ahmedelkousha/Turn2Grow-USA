"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts, type BlogPost } from "@/lib/site-data";
import { PageHero } from "@/components/PageHero";
import { listBlogPosts, type AdminBlogPost } from "@/lib/firebase-data";
import { isFirebaseConfigured } from "@/lib/firebase";

type Item = { slug: string; title: string; excerpt: string; category: string; date: string; readTime: string; imageUrl?: string };

export default function BlogIndex() {
  const remote = useQuery({
    queryKey: ["public", "blog_posts"],
    queryFn: listBlogPosts,
    enabled: isFirebaseConfigured,
  });

  const seedItems: Item[] = (blogPosts as BlogPost[]).map((p) => ({
    slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, date: p.date, readTime: p.readTime, imageUrl: p.imageUrl,
  }));
  const remoteItems: Item[] = ((remote.data as AdminBlogPost[] | undefined) ?? []).map((p) => ({
    slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, date: p.date, readTime: p.readTime, imageUrl: p.imageUrl,
  }));
  
  const map = new Map<string, Item>();
  for (const i of seedItems) map.set(i.slug, i);
  for (const i of remoteItems) map.set(i.slug, i);
  const all = Array.from(map.values()).sort((a, b) => (a.date < b.date ? 1 : -1));
  const [featured, ...rest] = all;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={<>Field notes from the <span className="text-gradient-orange">build floor</span>.</>}
        description="What we've learned building scalable SaaS, complex workflows, and enterprise software in the real world — and what's worth your attention right now."
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {featured && (
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Link href={`/blog/${featured.slug}`} className="group block overflow-hidden rounded-3xl border border-border/60 bg-surface transition-all hover:border-primary/40 hover:shadow-glow">
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-orange md:aspect-auto">
                    {featured.imageUrl ? (
                      <img src={featured.imageUrl} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <>
                        <div className="absolute inset-0 grid-bg opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/10 to-transparent" />
                      </>
                    )}
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="rounded-full bg-background/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-foreground backdrop-blur">Featured</span>
                    </div>
                  </div>
                  <div className="p-8 sm:p-10">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">{featured.category}</p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{featured.title}</h2>
                    <p className="mt-3 text-sm text-muted-foreground sm:text-base">{featured.excerpt}</p>
                    <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.readTime}</span>
                    </div>
                    <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                  {post.imageUrl && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={post.imageUrl} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">{post.category}</p>
                    <h3 className="mt-3 text-lg font-semibold text-foreground">{post.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                      <span className="inline-flex items-center gap-1 text-primary">Read <ArrowRight className="h-3.5 w-3.5" /></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
