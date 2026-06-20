"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FileText, Briefcase, Inbox, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { AdminGate } from "@/components/AdminGate";
import { listBlogPosts, listCaseStudies, listInquiries, seedSampleContent } from "@/lib/firebase-data";
import { Button } from "@/components/ui/button";

export default function AdminHomePage() {
  return (
    <AdminGate>
      <AdminHome />
    </AdminGate>
  );
}

function AdminHome() {
  const qc = useQueryClient();
  const posts = useQuery({ queryKey: ["admin", "blog_posts"], queryFn: listBlogPosts });
  const cases = useQuery({ queryKey: ["admin", "case_studies"], queryFn: listCaseStudies });
  const inq = useQuery({ queryKey: ["admin", "inquiries"], queryFn: listInquiries });
  const [seedMsg, setSeedMsg] = useState<string | null>(null);

  const seed = useMutation({
    mutationFn: seedSampleContent,
    onSuccess: (r) => {
      setSeedMsg(`Imported ${r.blogCreated} blog post(s), ${r.caseCreated} case study(ies), and ${r.serviceCreated} service(s). Skipped ${r.blogSkipped + r.caseSkipped + r.serviceSkipped} already-existing item(s).`);
      qc.invalidateQueries({ queryKey: ["admin"] });
      qc.invalidateQueries({ queryKey: ["public"] });
    },
    onError: (e) => setSeedMsg(e instanceof Error ? e.message : "Seed failed."),
  });

  const cards = [
    { label: "Blog posts", count: posts.data?.length ?? 0, icon: FileText, to: "/admin/blog", loading: posts.isLoading },
    { label: "Case studies", count: cases.data?.length ?? 0, icon: Briefcase, to: "/admin/case-studies", loading: cases.isLoading },
    { label: "New inquiries", count: inq.data?.filter((i) => i.status === "new").length ?? 0, icon: Inbox, to: "/admin/inquiries", loading: inq.isLoading },
  ] as const;

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gradient">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">Quick overview of content and inbound leads.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.to} className="group rounded-2xl border border-border/60 bg-surface p-5 transition-colors hover:border-primary/40">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
            <p className="mt-4 text-3xl font-semibold text-foreground">
              {c.loading ? <Loader2 className="h-6 w-6 animate-spin" /> : c.count}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-2xl border border-border/60 bg-surface p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Seed sample content</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Imports the placeholder blog posts and case studies into Firestore. Safe to run multiple times — existing slugs are skipped.
          </p>
          {seedMsg && <p className="mt-2 text-xs text-primary">{seedMsg}</p>}
        </div>
        <Button
          onClick={() => { setSeedMsg(null); seed.mutate(); }}
          disabled={seed.isPending}
          variant="orange"
          size="premium-sm"
          shape="full"
          className="shrink-0"
        >
          {seed.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {seed.isPending ? "Importing…" : "Import sample content"}
        </Button>
      </div>


      <div className="mt-10 rounded-2xl border border-border/60 bg-surface p-5">
        <h2 className="text-sm font-semibold text-foreground">Recent inquiries</h2>
        {inq.isLoading ? (
          <Loader2 className="mt-4 h-5 w-5 animate-spin text-muted-foreground" />
        ) : (inq.data?.length ?? 0) === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No inquiries yet. They&apos;ll appear here when the contact form is used.</p>
        ) : (
          <ul className="mt-3 divide-y divide-border/40">
            {inq.data!.slice(0, 5).map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium">{i.name} <span className="text-muted-foreground">· {i.email}</span></p>
                  <p className="truncate text-xs text-muted-foreground">{i.topic ?? "—"}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${i.status === "new" ? "bg-primary/15 text-primary" : "bg-surface text-muted-foreground"}`}>
                  {i.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
