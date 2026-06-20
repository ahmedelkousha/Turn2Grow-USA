import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Turn2Grow — Custom Software Agency in Wilmington, NC",
  description: "Turn2Grow is a US-based digital software agency engineering custom platforms for growing businesses and SMEs. Meet the team behind the growth engines.",
  openGraph: {
    title: "About Turn2Grow",
    description: "We engineer software that moves businesses forward.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
