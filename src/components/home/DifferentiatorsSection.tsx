"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const differentiators = [
  { icon: Sparkles, title: "Deep domain expertise", body: "Healthcare and SME software is what we do — not a side practice. We speak HL7, FHIR, HIPAA, SOC 2, and revenue cycle fluently." },
  { icon: Zap, title: "End-to-end delivery", body: "Discovery, design, engineering, deployment, and support — one accountable team, from first sketch to long-term ownership." },
  { icon: Shield, title: "Compliance by design", body: "Security and compliance aren't bolted on. They're architected in from line one, with documented controls and audit trails." },
  { icon: Rocket, title: "Agile without corner-cutting", body: "Two-week sprints, weekly demos, transparent backlogs. Speed and quality — pick both." },
];

export function DifferentiatorsSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="What sets us apart" title="The difference is in how we operate" description="We're not a body shop. We're a delivery team that treats your roadmap like our own — and stays accountable for outcomes, not just output." align="center" />
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
          {differentiators.map((d, i) => (
            <motion.div key={d.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: i * 0.05 }} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-surface/60 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-orange text-primary-foreground shadow-glow"><d.icon className="h-5 w-5" /></div>
                <h3 className="text-base font-semibold text-foreground">{d.title}</h3>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{d.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
