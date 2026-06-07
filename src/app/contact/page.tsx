"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { createInquiry } from "@/lib/firebase-data";
import { isFirebaseConfigured } from "@/lib/firebase";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s build something <span className="text-gradient-orange">that ships</span>.</>}
        description="Tell us about the problem you're solving. We respond within one business day with a sharp point of view and next steps."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          {/* Contact info */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl font-semibold text-foreground">Get in touch</h2>
            <p className="mt-3 text-sm text-muted-foreground">Prefer email or a call? We&apos;re flexible — pick whatever&apos;s easiest.</p>

            <div className="mt-8 space-y-5">
              {[
                { icon: Mail, label: "Email", value: "hello@turn2grow.com" },
                { icon: Phone, label: "Phone", value: "+1 (302) 555-0142" },
                { icon: MapPin, label: "Headquarters", value: "Delaware, United States" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 rounded-2xl border border-border/40 bg-surface/40 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-5">
              <p className="text-sm font-semibold text-foreground">Response time</p>
              <p className="mt-1 text-sm text-muted-foreground">We reply to every inbound within one US business day — usually faster.</p>
            </div>
          </motion.aside>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-card sm:p-8">
              {sent ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">Thanks — we&apos;ve got it.</h3>
                  <p className="mt-2 text-sm text-muted-foreground">We&apos;ll get back to you within one business day.</p>
                  <Link href="/" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                    Back to home <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setError(null);
                    const fd = new FormData(e.currentTarget);
                    const payload = {
                      name: String(fd.get("name") ?? "").trim(),
                      email: String(fd.get("email") ?? "").trim(),
                      company: String(fd.get("company") ?? "").trim() || undefined,
                      phone: String(fd.get("phone") ?? "").trim() || undefined,
                      topic: String(fd.get("topic") ?? "") || undefined,
                      message: String(fd.get("message") ?? "").trim(),
                    };
                    if (!payload.name || !payload.email || !payload.message) {
                      setError("Please fill in name, email, and message.");
                      return;
                    }
                    setBusy(true);
                    try {
                      if (isFirebaseConfigured) {
                        await createInquiry(payload);
                      }
                      setSent(true);
                    } catch (err) {
                      const msg = err instanceof Error ? err.message : "Failed to send. Please email us directly.";
                      setError(msg);
                    } finally {
                      setBusy(false);
                    }
                  }}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" name="name" placeholder="Jane Doe" required />
                    <Field label="Work email" name="email" type="email" placeholder="jane@company.com" required />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Company" name="company" placeholder="Acme Health" />
                    <Field label="Phone (optional)" name="phone" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">What are you looking to build?</label>
                    <select
                      name="topic"
                      className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
                      defaultValue=""
                    >
                      <option value="" disabled>Select a service area</option>
                      <option>EHR & Healthcare Software</option>
                      <option>Telemedicine Platform</option>
                      <option>Medical Billing</option>
                      <option>SaaS Product</option>
                      <option>CRM / Automation</option>
                      <option>AI / Machine Learning</option>
                      <option>Cloud / DevOps</option>
                      <option>Cybersecurity / Compliance</option>
                      <option>Something else</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Tell us about your project</label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      placeholder="Goals, timeline, team size, constraints — whatever's on your mind."
                      className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
                      defaultValue={""}
                    />
                  </div>
                  {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
                  <button
                    type="submit"
                    disabled={busy}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-orange px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
                  >
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
                    {busy ? "Sending..." : "Send message"}
                  </button>
                  <p className="text-xs text-muted-foreground">By submitting, you agree to be contacted about your inquiry. We never share your details.</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground">{label}{required && <span className="ml-0.5 text-primary">*</span>}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
      />
    </div>
  );
}
