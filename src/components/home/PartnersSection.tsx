"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const row1 = [
  { name: "Loom", logo: "/logos/loom.svg" },
  { name: "Calendly", logo: "/logos/calendly.svg" },
  { name: "Typeform", logo: "/logos/typeform.svg" },
  { name: "Buffer", logo: "/logos/buffer.svg" },
  { name: "ClickUp", logo: "/logos/clickup.svg" },
  { name: "Retool", logo: "/logos/retool.svg" },
  { name: "Linear", logo: "/logos/linear.svg" },
  { name: "Resend", logo: "/logos/resend.svg" },
];

const row2 = [
  { name: "PostHog", logo: "/logos/posthog.svg" },
  { name: "Supabase", logo: "/logos/supabase.svg" },
  { name: "Sentry", logo: "/logos/sentry.svg" },
  { name: "Auth0", logo: "/logos/auth0.svg" },
  { name: "Clerk", logo: "/logos/clerk.svg" },
  { name: "Airtable", logo: "/logos/airtable.svg" },
  { name: "Render", logo: "/logos/render.svg" },
  { name: "Webflow", logo: "/logos/webflow.svg" },
];

export function PartnersSection() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted) return;

    // Slide row 1 left on scroll
    gsap.fromTo(
      row1Ref.current,
      { x: "0%" },
      {
        x: "-25%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    // Slide row 2 right on scroll
    gsap.fromTo(
      row2Ref.current,
      { x: "-25%" },
      {
        x: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  }, { scope: containerRef, dependencies: [mounted] });

  if (!mounted) {
    return (
      <section className="relative overflow-hidden bg-background py-16 sm:py-20 border-b border-border/40 min-h-[200px]">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Trusted by forward-thinking teams & enterprises
          </h2>
        </div>
      </section>
    );
  }

  // Repeat logos 4 times to prevent trailing gaps on wide viewports
  const slidesRow1 = [...row1, ...row1, ...row1, ...row1];
  const slidesRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section ref={containerRef} className="partners-section relative overflow-hidden bg-background py-16 sm:py-20 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Trusted by forward-thinking teams & enterprises
        </h2>
      </div>

      <div className="relative mt-10 flex flex-col gap-6 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] select-none overflow-hidden">
        {/* Row 1 - Slides Left */}
        <div className="w-full overflow-hidden">
          <div ref={row1Ref} className="flex gap-6 w-max flex-nowrap">
            {slidesRow1.map((p, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-full border border-border/60 bg-surface/50 px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-surface hover:shadow-glow">
                <img 
                  src={p.logo} 
                  alt={`${p.name} logo`} 
                  className="h-5 w-auto object-contain transition-opacity opacity-85 hover:opacity-100" 
                  loading="lazy"
                />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Slides Right */}
        <div className="w-full overflow-hidden">
          <div ref={row2Ref} className="flex gap-6 w-max flex-nowrap">
            {slidesRow2.map((p, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-full border border-border/60 bg-surface/50 px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-surface hover:shadow-glow">
                <img 
                  src={p.logo} 
                  alt={`${p.name} logo`} 
                  className="h-5 w-auto object-contain transition-opacity opacity-85 hover:opacity-100" 
                  loading="lazy"
                />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
