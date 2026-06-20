"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useSameRouteNavigation } from "@/hooks/use-same-route-navigation";
import { useLinkClickEvent } from "@/hooks/use-link-click-event";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createInquiry } from "@/lib/firebase-data";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const handleLinkClick = useSameRouteNavigation();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { contextSafe } = useGSAP({ scope: overlayRef });

  const handleOpen = contextSafe(() => {
    setIsOpen(true);

    // Kill existing animations to prevent conflicts
    gsap.killTweensOf(overlayRef.current);
    gsap.killTweensOf(".menu-link-inner");
    gsap.killTweensOf(".menu-right-item");
    gsap.killTweensOf(".menu-link-button");
    gsap.killTweensOf(".menu-glow");
    gsap.killTweensOf(".menu-close-btn");

    // Enable visibility before animating opacity
    gsap.set(overlayRef.current, { autoAlpha: 1, pointerEvents: "auto" });
    document.body.style.overflow = "hidden"; // lock page scroll

    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" })
      .fromTo(".menu-glow", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }, 0)
      .fromTo(".menu-close-btn", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, "-=0.3")
      .fromTo(".menu-link-inner", { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, "-=0.5")
      .fromTo(".menu-link-button", { xPercent: -100 }, { xPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, "-=0.55")
      .fromTo(".menu-right-item", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 }, "-=0.6");
  });

  const handleClose = contextSafe((callback?: () => void) => {
    gsap.killTweensOf(overlayRef.current);
    gsap.killTweensOf(".menu-link-inner");
    gsap.killTweensOf(".menu-right-item");
    gsap.killTweensOf(".menu-link-button");
    gsap.killTweensOf(".menu-glow");
    gsap.killTweensOf(".menu-close-btn");

    document.body.style.overflow = ""; // restore scroll

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
        if (callback) callback();
      }
    });

    tl.to(".menu-link-inner", { yPercent: 110, duration: 0.5, ease: "power3.in", stagger: 0.04 })
      .to(".menu-link-button", { xPercent: -100, duration: 0.5, ease: "power3.in", stagger: 0.04 }, "-=0.4")
      .to(".menu-right-item", { opacity: 0, y: -20, duration: 0.4, ease: "power3.in", stagger: 0.04 }, "-=0.4")
      .to(".menu-close-btn", { opacity: 0, scale: 0.8, duration: 0.3 }, "-=0.3")
      .to(overlayRef.current, { opacity: 0, duration: 0.4, ease: "power2.inOut" }, "-=0.2");
  });

  const linkClickEvent = useLinkClickEvent();
  const handleLinkClickEvent = (e: React.MouseEvent<any>, href: string) => {
    linkClickEvent(e, href, isOpen ? handleClose : undefined);
  };

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const loadingToast = toast.loading("Subscribing...");

    try {
      await createInquiry({
        name: "Newsletter Subscriber",
        email: email.trim(),
        topic: "Newsletter Subscription",
        message: "Signed up for updates via fullscreen popup menu.",
      });

      toast.dismiss(loadingToast);
      toast.success(`Thank you! ${email} has been subscribed to updates.`);
      setEmail("");
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error("Error subscribing to newsletter:", err);
      toast.error("Subscription failed. Please try again later.");
    }
  };

  if (pathname?.startsWith("/coming-soon")) return null;

  return (
    <>
      {/* Top Trigger Bar */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? "glass" : "bg-transparent"
          }`}
      >
        <div className="mx-auto relative flex h-20 max-w-screen items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="t2g-logo shrink-0 z-50 absolute left-[8%]"
            onClick={(e) => handleLinkClickEvent(e, "/")}
          >
            <Logo />
          </Link>

          <div className="flex items-center gap-6 absolute right-[8%]">
            <ThemeToggle />
            <button
              onClick={handleOpen}
              className="group flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <span>Menu</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-50 w-screen h-screen bg-background/98 backdrop-blur-xl overflow-y-auto opacity-0 invisible ${isOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        {/* Decorative Radial Glows */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="menu-glow absolute top-[-20%] right-[-10%] h-[700px] w-[700px] rounded-full bg-primary/10 blur-[150px]" />
          <div className="menu-glow absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        {/* Modal Header Bar inside menu */}
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-border/10">
          <div className="shrink-0 select-none opacity-50">
            <Logo />
          </div>
          <button
            onClick={() => handleClose()}
            className="menu-close-btn flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <span>Close</span>
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Main Menu Grid Content */}
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 min-h-[calc(100vh-80px)] items-center">
          {/* Left Column: Huge Navigation Links */}
          <nav className="md:col-span-3 flex flex-col justify-center gap-4 sm:gap-6">
            {nav.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : (pathname?.startsWith(item.href) ?? false);
              return (
                <div key={item.href} className="menu-link-wrapper overflow-hidden py-1">
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClickEvent(e, item.href)}
                    className={`menu-link-inner block text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none hover:text-primary transition-colors pointer-events-auto ${isActive ? "text-primary text-gradient-orange" : "text-foreground"
                      }`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}

            {/* CTA Button under links */}
            <div className="menu-link-wrapper overflow-hidden py-2 mt-4 sm:mt-6">
              <Button
                asChild
                variant="orange"
                size="premium"
                shape="full"
                className="menu-link-button inline-flex items-center gap-2 cursor-pointer pointer-events-auto"
                onClick={(e) => handleLinkClickEvent(e, "/contact")}
              >
                <Link href="/contact">
                  Start a project <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </nav>

          {/* Right Column: Contact Details, Socials, Newsletter */}
          <div className="md:col-span-2 flex flex-col justify-between gap-12 h-full py-6 border-t md:border-t-0 md:border-l border-border/20 md:pl-12">

            {/* Newsletter widget */}
            <div className="menu-right-item space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Keep in touch</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Subscribe to our developer log and product updates. No spam, ever.
              </p>
              <form
                onSubmit={handleSubscribeSubmit}
                className="flex items-center border-b border-border/40 py-2 focus-within:border-primary transition-colors max-w-sm pointer-events-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent text-sm focus:outline-none placeholder-muted-foreground/40 text-foreground py-1 pointer-events-auto"
                  required
                />
                <button
                  type="submit"
                  className="text-primary hover:text-primary-glow font-semibold text-xs uppercase tracking-wider pl-4 cursor-pointer pointer-events-auto"
                >
                  Join
                </button>
              </form>
            </div>

            {/* Office Contact Info */}
            <div className="menu-right-item space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Office</h3>
              <p className="text-sm text-foreground/80 leading-relaxed font-mono">
                Turn2Grow LLC<br />
                609A Piner Rd, Wilmington, NC 28409<br />
                United States · Serving nationwide
              </p>
            </div>

            {/* Socials & Copyright */}
            <div className="menu-right-item space-y-6 pt-4 border-t border-border/10">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest text-xs font-medium pointer-events-auto">LinkedIn</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest text-xs font-medium pointer-events-auto">GitHub</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest text-xs font-medium pointer-events-auto">Twitter</a>
              </div>
              <p className="text-[10px] text-muted-foreground/60 font-mono">
                © {new Date().getFullYear()} Turn2Grow. All rights reserved.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
