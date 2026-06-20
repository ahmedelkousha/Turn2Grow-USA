"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";

const testimonials = [
  { quote: "Turn2Grow rebuilt our patient intake and billing stack in twelve weeks. First-pass claim acceptance jumped from 78% to 94% — the ROI paid for the engagement in a single quarter.", name: "Dr. Maya Patel", role: "COO, Northshore Cardiology Group", rating: 5 },
  { quote: "They felt like an in-house team from week one. Weekly demos, brutally honest estimates, zero scope-creep games. The platform they shipped runs our entire operations today.", name: "Jordan Reyes", role: "Founder & CEO, FleetPulse", rating: 5 },
  { quote: "We had three failed vendor engagements before Turn2Grow. They diagnosed the architecture issues in week one and shipped a working pilot in six. Genuinely best-in-class.", name: "Sarah Kohlmann", role: "VP Product, MedLedger", rating: 5 },
  { quote: "The HIPAA and SOC 2 posture they brought saved us months of audit prep. Our enterprise health-system buyers signed faster because the controls were already documented.", name: "Andre Williams", role: "CTO, ClariCare Telehealth", rating: 5 },
  { quote: "Turn2Grow delivered an AI-assisted triage workflow our clinicians actually use daily. Adoption hit 92% in the first month — unheard of for us.", name: "Dr. Helen Cho", role: "Chief Medical Officer, Bayline Health", rating: 5 },
];

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: 1 | -1) => { const el = scrollRef.current; if (!el) return; el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" }); };
  return (
    <section className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="What clients say" title="Trusted by founders and operators" description="Real words from the teams we've shipped alongside." />
          <div className="hidden gap-2 sm:flex">
            <Button variant="premium-icon" size="premium-icon" shape="full" onClick={() => scrollBy(-1)} aria-label="Scroll testimonials left"><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="premium-icon" size="premium-icon" shape="full" onClick={() => scrollBy(1)} aria-label="Scroll testimonials right"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
        <div className="relative mt-12">
          <div ref={scrollRef} className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8">
            {testimonials.map((t, i) => (
              <motion.figure key={t.name} initial={{ opacity: 0}} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: i * 0.05 }} className="group relative flex snap-start shrink-0 basis-[88%] flex-col justify-between rounded-2xl border border-border/60 bg-surface p-7 transition-all hover:border-primary/40 hover:shadow-glow sm:basis-[60%] lg:basis-[40%]">
                <Quote className="h-8 w-8 text-primary/40" aria-hidden />
                <blockquote className="mt-4 text-base text-foreground sm:text-lg">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="mt-6 flex items-center gap-1 text-primary">{Array.from({ length: t.rating }).map((_, idx) => <Star key={idx} className="h-4 w-4 fill-current" />)}</div>
                <figcaption className="mt-3 border-t border-border/40 pt-4">
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 block w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}
