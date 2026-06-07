"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock, ChevronRight, Loader2 } from "lucide-react";
import { getBlogPostBySlug } from "@/lib/firebase-data";
import { isFirebaseConfigured } from "@/lib/firebase";
import { type BlogPost as SeedBlogPost } from "@/lib/site-data";

export function BlogPostClient({ slug, seed }: { slug: string; seed: SeedBlogPost | null }) {
  const remote = useQuery({
    queryKey: ["public", "blog_post", slug],
    queryFn: () => getBlogPostBySlug(slug),
    enabled: isFirebaseConfigured && !seed,
  });

  if (!seed && remote.isLoading) {
    return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  const remoteData = remote.data;
  const post = seed ? { ...seed, imageUrl: seed.imageUrl } : (remoteData ? {
    slug: remoteData.slug, title: remoteData.title, excerpt: remoteData.excerpt, category: remoteData.category,
    date: remoteData.date, readTime: remoteData.readTime, author: remoteData.author,
    imageUrl: remoteData.imageUrl,
    content: remoteData.body.split(/\n\n+/).map((para) => {
      if (para.startsWith("## ")) return { heading: para.slice(3).trim(), body: "" };
      return { body: para.trim() };
    }).filter((b) => b.heading || b.body),
  } : null);

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="text-3xl font-semibold">Article not found</h1>
        <Link href="/blog" className="mt-6 inline-block text-primary hover:underline">Back to blog</Link>
      </div>
    );
  }

  return (
    <article className="relative">
      <header className="relative overflow-hidden border-b border-border/40 bg-hero">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate text-foreground">{post.title}</span>
          </nav>
          <span className="text-xs font-medium uppercase tracking-wider text-primary">{post.category}</span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="mt-3 text-3xl font-semibold tracking-tight text-gradient sm:text-5xl"
          >{post.title}</motion.h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
            <span>By {post.author}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        {post.imageUrl && (
          <div className="mb-10 overflow-hidden rounded-3xl border border-border/40">
            <img src={post.imageUrl} alt={post.title} className="aspect-[16/9] w-full object-cover" />
          </div>
        )}
        <div className="prose prose-invert max-w-none space-y-6">
          {post.content.map((block: { heading?: string; body: string }, i: number) => (
            <div key={i}>
              {block.heading && <h2 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">{block.heading}</h2>}
              {block.body && <p className="text-base leading-relaxed text-muted-foreground">{block.body}</p>}
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border/40 pt-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>
        </div>
      </div>
    </article>
  );
}
