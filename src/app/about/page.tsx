"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Target, Compass, Shield, Sparkles, Rocket } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import aboutTeam from "@/assets/about-team.jpg";
import { Button } from "@/components/ui/button";

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
        description="Turn2Grow is a US-based software agency engineering custom platforms, scalable SaaS products, and cloud infrastructure. We're headquartered in Wilmington, North Carolina and ship for clients nationwide."
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
              We have deep experience building secure systems for SaaS, enterprise, and regulated sectors like healthcare. The connecting thread is the same: software built around your workflows, your goals, and your growth trajectory.
            </p>
            <Button asChild variant="orange" size="premium" shape="full" className="mt-8">
              <Link href="/contact">
                Work with us <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
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

      <section className="py-20 sm:py-24 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">Meet our team</h2>
            <p className="mt-4 text-base text-muted-foreground">The digital product builders behind our success.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Ahmed El Kousha",
                role: "Founder & Product Strategy",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
                bio: "Ex-strategy lead. Coordinates product scope, growth strategy, and ensures end-to-end alignment."
              },
              {
                name: "Sarah Chen",
                role: "Lead Technical Architect",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80",
                bio: "Cloud & backend pioneer. Heavy experience with SOC 2 compliance, multi-tenant databases, and security."
              },
              {
                name: "Marcus Vance",
                role: "Senior Fullstack Engineer",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80",
                bio: "Modern web specialist. Loves building performant APIs, dashboard integrations, and custom CRM systems."
              },
              {
                name: "Elena Rostova",
                role: "Head of UX & Product Design",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=400&q=80",
                bio: "Crafts elegant design systems, user journeys, and premium dark-mode visual styles."
              }
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-surface/50 p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{member.name}</h3>
                <p className="text-xs font-medium text-primary mt-1">{member.role}</p>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              { label: "Founded", value: "Wilmington, NC, USA" },
              { label: "Coverage", value: "Nationwide" },
              { label: "Focus", value: "SaaS, Enterprise & SMEs" },
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
