import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-hero" />
      <div className="absolute -bottom-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-gradient sm:text-5xl">Ready to build a growth engine?</h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">Tell us what you&apos;re trying to ship. We&apos;ll come back within one business day with a sharp point of view and a plan.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-orange px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">Start a project <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/case-studies" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-6 py-3 text-sm font-medium text-foreground hover:bg-surface">See our work</Link>
        </div>
      </div>
    </section>
  );
}
