"use client";

import Link from "next/link";
import { Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./Logo";
import { services } from "@/lib/site-data";
import { useSameRouteNavigation } from "@/hooks/use-same-route-navigation";
import { useLinkClickEvent } from "@/hooks/use-link-click-event";
import { usePathname } from "next/navigation";

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
    </svg>
  );
}

const socialLinks = [
  { href: "https://www.facebook.com/turn2grow", label: "Facebook", icon: Facebook },
  { href: "https://www.instagram.com/turn2grow", label: "Instagram", icon: Instagram },
  { href: "https://x.com/turn2grovv", label: "Twitter (X)", icon: Twitter },
  { href: "https://www.threads.com/@turn2grow", label: "Threads", icon: ThreadsIcon },
  { href: "https://www.linkedin.com/company/turn2grow", label: "LinkedIn", icon: Linkedin },
];

export function Footer() {
  const handleLinkClick = useSameRouteNavigation();
  const pathname = usePathname();
  const handleLinkClickEvent = useLinkClickEvent();

  if (pathname?.startsWith("/coming-soon")) return null;

  return (
    <footer className="border-t border-border/40 bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link
              href="/"
              className="inline-block"
              onClick={(e) => handleLinkClickEvent(e, "/")}
            >
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              We engineer software that moves businesses forward. Custom SaaS, enterprise platforms, and cloud solutions.
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Wilmington, NC, United States</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@turn2grow.com</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <h4 className="text-sm font-semibold text-foreground">Services</h4>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link 
                    href={`/services/${s.slug}`} 
                    onClick={handleLinkClick(`/services/${s.slug}`)}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" onClick={handleLinkClick("/about")} className="text-sm text-muted-foreground hover:text-primary">About us</Link></li>
              <li><Link href="/case-studies" onClick={handleLinkClick("/case-studies")} className="text-sm text-muted-foreground hover:text-primary">Case studies</Link></li>
              <li><Link href="/blog" onClick={handleLinkClick("/blog")} className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/contact" onClick={handleLinkClick("/contact")} className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/40 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Turn2Grow. All rights reserved.</p>
          <p>SOC 2 conscious · HIPAA aware · Built in North Carolina</p>
        </div>
      </div>
    </footer>
  );
}
