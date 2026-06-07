"use client";

import { motion } from "framer-motion";
import { BadgeCheck, HeartHandshake, Timer, Lock } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SectionHeading } from "@/components/SectionHeading";

const whyChoose = [
  { icon: BadgeCheck, title: "Senior-only delivery team", body: "No junior hand-offs. The people scoping your project are the ones shipping it." },
  { icon: HeartHandshake, title: "Fixed-team, flexible scope", body: "A dedicated squad that adapts as you learn — not a rigid statement of work." },
  { icon: Timer, title: "Weekly demos, not quarterly reveals", body: "You see working software every Friday. Course-correct early, ship with confidence." },
  { icon: Lock, title: "Compliance-first engineering", body: "HIPAA, SOC 2, and audit-readiness baked into the architecture — not bolted on later." },
];

const whyStats = [
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 4.9, decimals: 1, suffix: "/5", label: "Average rating" },
  { value: 24, suffix: "h", label: "Response time" },
  { value: 100, suffix: "%", label: "On-shore team" },
];

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-surface/30 py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Why Turn2Grow" title="Why teams choose Turn2Grow" description="The reasons clients pick us — and stay for the long haul." align="center" />
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2">
          {whyChoose.map((w, i) => (
            <motion.div key={w.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: i * 0.05 }} className="group flex gap-4 rounded-2xl border border-border/50 bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-gradient-orange group-hover:text-primary-foreground"><w.icon className="h-5 w-5" /></div>
              <div><h3 className="text-base font-semibold text-foreground">{w.title}</h3><p className="mt-1.5 text-sm text-muted-foreground">{w.body}</p></div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }} className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/40 bg-border/40 sm:grid-cols-4">
          {whyStats.map((s) => (
            <div key={s.label} className="bg-surface p-6 text-center">
              <p className="text-3xl font-semibold text-gradient-orange sm:text-4xl"><AnimatedCounter value={s.value} decimals={s.decimals} suffix={s.suffix} /></p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
