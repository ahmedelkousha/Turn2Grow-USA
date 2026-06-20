"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Lock, Mail, Loader2, AlertTriangle } from "lucide-react";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) router.push("/admin");
    });
    return () => unsub();
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const auth = getFirebaseAuth();
    if (!auth) { setError("Firebase not configured."); return; }
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Sign-in failed";
      setError(msg.replace("Firebase: ", ""));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-20">
      <div className="w-full rounded-3xl border border-border/60 bg-surface p-8 shadow-card">
        <h1 className="text-2xl font-semibold text-gradient">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">Manage content and client inquiries.</p>

        {!isFirebaseConfigured && (
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-foreground">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>Firebase isn&apos;t configured yet. Open <code>src/lib/firebase-config.ts</code> and paste your project credentials.</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="mt-1.5 flex items-center rounded-xl border border-border bg-background/60 px-3 focus-within:border-primary">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-3 py-3 text-sm focus:outline-none"
                placeholder="admin@turn2grow.com" autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="mt-1.5 flex items-center rounded-xl border border-border bg-background/60 px-3 focus-within:border-primary">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent px-3 py-3 text-sm focus:outline-none"
                placeholder="••••••••" autoComplete="current-password"
              />
            </div>
          </div>
          {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
          <Button
            type="submit"
            disabled={busy}
            variant="orange"
            size="premium-lg"
            shape="full"
            className="w-full"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
          </Button>
        </form>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">← Back to site</Link>
        </p>
      </div>
    </div>
  );
}
