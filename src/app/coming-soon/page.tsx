"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  CheckCircle2,
  Loader2,
  Settings,
  X,
  Compass,
  Lock,
  Eye,
  Check,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { createInquiry } from "@/lib/firebase-data";
import { isFirebaseConfigured } from "@/lib/firebase";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

// Target date: October 15, 2026 00:00:00 UTC
const TARGET_DATE = new Date("2026-07-10T00:00:00Z");

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

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Simulation states (read from cookies after mount)
  const [simActive, setSimActive] = useState(false);
  const [simBypass, setSimBypass] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Calculate time left
    const calculateTimeLeft = () => {
      const difference = +TARGET_DATE - +new Date();
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Read cookie statuses
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)"));
      return match ? match[2] : null;
    };
    setSimActive(getCookie("coming_soon_active") === "true");
    setSimBypass(getCookie("coming_soon_bypass") === "true");

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setBusy(true);
    try {
      if (isFirebaseConfigured) {
        // Save to inquiries collection (allowed by security rules)
        await createInquiry({
          name: "Coming Soon Subscriber",
          email: email.trim(),
          topic: "Coming Soon Newsletter",
          message: "Early access newsletter subscription from coming soon page.",
        });
      }
      setSubscribed(true);
      toast.success("Thank you! We've saved your subscription.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setBusy(false);
    }
  };

  // Cookie helpers for simulated states
  const setCookie = (name: string, value: string, maxAge: number) => {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
    window.location.reload();
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    window.location.reload();
  };

  // Shift content up by 16 units to offset the main layout pt-16
  return (
    <div className="relative min-h-screen -mt-16 overflow-hidden bg-background text-foreground grid-bg flex flex-col justify-between px-4 py-8 sm:px-6 lg:px-8">
      <Toaster />

      {/* Decorative Radial Glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[5%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[130px] sm:left-[20%]" />
        <div className="absolute bottom-[-10%] right-[5%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] sm:right-[15%]" />
      </div>

      {/* Header / Logo */}
      <header className="relative z-10 flex justify-center py-6 sm:justify-start max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 my-auto flex flex-col items-center text-center max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Compass className="h-3.5 w-3.5 animate-spin-slow" /> Under Construction
          </span>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gradient">
            Something <span className="text-gradient-orange">Extraordinary</span> is Coming
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We are engineering a premium digital experience for growing businesses and SMEs. Enter your email to secure early access and launch updates.
          </p>
        </motion.div>

        {/* Countdown Timer */}
        {isMounted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg w-full mt-10 mx-auto"
          >
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
              { label: "Sec", value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl glass border border-border/40 shadow-glow relative group overflow-hidden"
              >
                <span className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground mt-1 sm:mt-2">
                  {unit.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Subscription Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-md mt-10"
        >
          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.form
                key="form"
                onSubmit={handleSubscribe}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col sm:flex-row gap-2.5 p-1.5 rounded-2xl sm:rounded-full glass border border-border/40 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring/30 transition-all duration-300 shadow-elegant"
              >
                <div className="relative flex-grow flex items-center px-3 py-2 sm:py-0">
                  <Mail className="absolute left-3.5 h-4.5 w-4.5 text-muted-foreground" />
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-7 bg-transparent border-0 text-sm text-foreground focus:ring-0 focus:outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <button
                  id="newsletter-submit"
                  type="submit"
                  disabled={busy}
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl sm:rounded-full bg-gradient-orange px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-60"
                >
                  {busy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Notify Me"
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 rounded-full border border-primary/30 bg-primary/5 px-6 py-4 shadow-glow"
              >
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  You&apos;re on the list! We&apos;ll be in touch soon.
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer / Socials & Developer Controls Button */}
      <footer className="relative z-10 flex flex-col items-center gap-4 py-8 mt-12 max-w-7xl mx-auto w-full border-t border-border/20 sm:flex-row sm:justify-between text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Turn2Grow. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
            {socialLinks.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border/60 p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary hover:bg-surface/50"
              >
                <item.icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
          <button
            id="demo-controls-trigger"
            onClick={() => setShowControls(true)}
            className="flex items-center gap-1 rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1.5 font-medium text-primary hover:bg-primary/10 transition-colors"
            title="Developer Simulation panel"
          >
            <Settings className="h-3.5 w-3.5 animate-spin-slow" /> Demo Controls
          </button>
        </div>
      </footer>

      {/* Developer simulation controls drawer */}
      <AnimatePresence>
        {showControls && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setShowControls(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-border bg-card p-6 shadow-elegant sm:max-w-md sm:mx-auto"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <Settings className="h-4 w-4 text-primary" /> Demo Control Panel
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Simulate and test the Coming Soon blocking middleware.
                  </p>
                </div>
                <button
                  id="demo-controls-close"
                  onClick={() => setShowControls(false)}
                  className="rounded-full border border-border p-1 hover:bg-muted text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4 py-4">
                {/* Mode status */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs rounded-xl border border-border/40 bg-surface/50 p-3">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Lock className="h-3.5 w-3.5" /> Coming Soon Blocking:
                    </span>
                    <span
                      className={`font-semibold ${
                        simActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {simActive ? "ACTIVE" : "INACTIVE (default)"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs rounded-xl border border-border/40 bg-surface/50 p-3">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="h-3.5 w-3.5" /> Navigation Bypass:
                    </span>
                    <span
                      className={`font-semibold ${
                        simBypass ? "text-emerald-500" : "text-muted-foreground"
                      }`}
                    >
                      {simBypass ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </div>
                </div>

                {/* Control Actions */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    id="sim-active-btn"
                    onClick={() => setCookie("coming_soon_active", "true", 604800)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-primary bg-primary/5 px-3 py-2.5 font-medium text-primary hover:bg-primary/10 transition-colors"
                  >
                    {simActive && <Check className="h-3.5 w-3.5" />} Simulate Active
                  </button>
                  <button
                    id="sim-clear-active-btn"
                    onClick={() => deleteCookie("coming_soon_active")}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-transparent px-3 py-2.5 font-medium text-muted-foreground hover:bg-surface transition-colors"
                  >
                    Clear Active
                  </button>

                  <button
                    id="sim-bypass-btn"
                    onClick={() => setCookie("coming_soon_bypass", "true", 604800)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/50 bg-emerald-500/5 px-3 py-2.5 font-medium text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                  >
                    {simBypass && <Check className="h-3.5 w-3.5" />} Enable Bypass
                  </button>
                  <button
                    id="sim-clear-bypass-btn"
                    onClick={() => deleteCookie("coming_soon_bypass")}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-transparent px-3 py-2.5 font-medium text-muted-foreground hover:bg-surface transition-colors"
                  >
                    Clear Bypass
                  </button>
                </div>

                <div className="border-t border-border/60 pt-3 flex flex-col gap-2">
                  <button
                    id="sim-reset-btn"
                    onClick={() => {
                      document.cookie =
                        "coming_soon_active=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                      document.cookie =
                        "coming_soon_bypass=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                      window.location.reload();
                    }}
                    className="w-full text-center rounded-xl bg-muted py-2 text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors"
                  >
                    Reset All Simulation Cookies
                  </button>
                  <p className="text-[10px] text-muted-foreground text-center">
                    Note: To test the redirect, click &quot;Simulate Active&quot; and then type any url like <code>/about</code> in your browser.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
