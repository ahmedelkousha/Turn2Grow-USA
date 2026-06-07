"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { LayoutDashboard, FileText, Briefcase, Inbox, LogOut, Loader2, AlertTriangle } from "lucide-react";

const nav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/blog", label: "Blog Posts", icon: FileText, exact: false },
  { to: "/admin/case-studies", label: "Case Studies", icon: Briefcase, exact: false },
  { to: "/admin/inquiries", label: "Inquiries", icon: Inbox, exact: false },
] as const;

export function AdminGate({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isFirebaseConfigured) { setReady(true); return; }
    const auth = getFirebaseAuth();
    if (!auth) { setReady(true); return; }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
      if (!u) router.push("/admin/login");
    });
    return () => unsub();
  }, [router]);

  if (!isFirebaseConfigured) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-primary" />
        <h1 className="mt-4 text-2xl font-semibold">Firebase not configured</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Open <code className="rounded bg-surface px-1.5 py-0.5">src/lib/firebase-config.ts</code> and paste
          your Firebase web app credentials. Instructions are inside that file.
        </p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null; // navigating to /admin/login

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border/60 bg-surface p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Admin</p>
          <p className="mt-1 truncate text-sm font-medium text-foreground" title={user.email ?? ""}>{user.email}</p>
          <nav className="mt-5 space-y-1">
            {nav.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  href={n.to}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-background hover:text-foreground"
                  }`}
                >
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={async () => {
              const auth = getFirebaseAuth();
              if (auth) await signOut(auth);
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
      <main className="min-w-0">{children}</main>
    </div>
  );
}
