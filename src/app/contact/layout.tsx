import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Turn2Grow — Let's Build Together",
  description: "Get in touch with Turn2Grow. Tell us about your project — we respond within one business day.",
  openGraph: {
    title: "Contact Turn2Grow",
    description: "Start a project with a US-based digital software agency. Custom SaaS and SME software specialists.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
