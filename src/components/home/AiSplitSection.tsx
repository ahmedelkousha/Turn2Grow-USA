"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import illusAi from "@/assets/illus-ai.jpg";

export function AiSplitSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative order-2 overflow-hidden rounded-3xl border border-border/40 shadow-elegant lg:order-1">
          <img src={illusAi.src} alt="AI network" width={1280} height={960} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tl from-background/40 to-transparent" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 lg:order-2">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">AI built into your stack</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">Intelligence that earns its keep.</h2>
          <p className="mt-4 text-base text-muted-foreground">We integrate LLMs, classical ML, and computer vision into the workflows where they create real economic value — never AI for AI&apos;s sake.</p>
          <Link href="/services/ai-machine-learning-integration" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">See AI services <ArrowRight className="h-4 w-4" /></Link>
        </motion.div>
      </div>
    </section>
  );
}
