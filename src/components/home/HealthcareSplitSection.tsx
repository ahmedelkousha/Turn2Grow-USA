"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import illusHealthcare from "@/assets/illus-healthcare.jpg";

export function HealthcareSplitSection() {
  return (
    <section className="border-y border-border/40 bg-surface/30 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-xs font-medium uppercase tracking-wider text-primary">Healthcare-first</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">Software clinicians actually want to use.</h2>
          <p className="mt-4 text-base text-muted-foreground">From EHR and telemedicine to billing and analytics, we ship platforms that respect clinical workflows, satisfy payers, and stay audit-ready.</p>
          <ul className="mt-6 space-y-3">
            {["HL7 / FHIR / EPCS integrations","BAA-covered cloud and AI stacks","Specialty-aware EHR and telehealth flows","Revenue cycle automation that lifts first-pass acceptance"].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {item}</li>
            ))}
          </ul>
          <Link href="/services/ehr-healthcare-software" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">Explore healthcare practice <ArrowRight className="h-4 w-4" /></Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-3xl border border-border/40 shadow-elegant">
          <img src={illusHealthcare.src} alt="Healthcare dashboard" width={1280} height={960} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
