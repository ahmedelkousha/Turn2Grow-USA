"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Target, Compass, Shield, Sparkles, Rocket } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import aboutTeam from "@/assets/about-team.jpg";

const values = [
  { icon: Heart, title: "Craft, not output", body: "We measure ourselves by what we ship, not what we bill." },
  { icon: Target, title: "Outcomes over scope", body: "We're paid to move metrics — not to fill story points." },
  { icon: Compass, title: "Plain-language honesty", body: "No jargon, no fluff. If something won't work, we say so." },
  { icon: Shield, title: "Security as a default", body: "Every line of code is written with the audit log in mind." },
  { icon: Sparkles, title: "Curiosity over comfort", body: "We try new stacks, but only when they make our clients better." },
  { icon: Rocket, title: "Ship to learn", body: "Weekly demos, not quarterly reveals." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>We&apos;re a small team building <span className="text-gradient-orange">big growth engines</span>.</>}
        description="Turn2Grow is a US-based software agency engineering custom platforms for healthcare providers and small-to-medium enterprises. We're headquartered in Delaware and ship for clients nationwide."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-border/40 shadow-elegant"
          >
            <img src={aboutTeam.src} alt="Turn2Grow team collaborating" width={1600} height={1067} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">Why we exist</h2>
            <p className="mt-4 text-base text-muted-foreground">
              Most software projects fail because the strategy team doesn&apos;t own delivery, and the delivery team doesn&apos;t own outcomes. We built Turn2Grow to close that gap — a single, accountable team that handles discovery, design, engineering, deployment, and support.
            </p>
            <p className="mt-4 text-base text-muted-foreground">
              We started with deep roots in healthcare — EHR, telemedicine, revenue cycle, compliance — and expanded into the SaaS, CRM, AI, and cloud work that growing SMEs need to compete. The connecting thread is the same: software built around your workflows, your goals, and your growth trajectory.
            </p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-orange px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow">
              Work with us <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-border/40 bg-surface/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">What we believe</h2>
            <p className="mt-4 text-base text-muted-foreground">Six values that shape every engagement.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-2xl border border-border/60 bg-surface p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              { label: "Founded", value: "Delaware, USA" },
              { label: "Coverage", value: "Nationwide" },
              { label: "Focus", value: "Healthcare + SMEs" },
              { label: "Disciplines", value: "12 services" },
              { label: "Compliance posture", value: "HIPAA / SOC 2" },
              { label: "Team model", value: "Embedded, accountable" },
            ].map((s) => (
              <div key={s.label} className="border-l border-border/40 pl-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
